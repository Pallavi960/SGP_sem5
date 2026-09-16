import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  userPhone: string | null
  userName: string | null
  signInWithOtp: (phone: string, name?: string) => Promise<{ error: AuthError | Error | null }>
  verifyOtp: (phone: string, token: string, name?: string) => Promise<{ session: Session | null; user: User | null; error: AuthError | Error | null }>
  updateUserName: (name: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [cachedName, setCachedName] = useState<string | null>(() => localStorage.getItem('smartfarm_user_name'))

  useEffect(() => {
    // 1. Initial session fetch
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting Supabase session:', error.message)
        }
        setSession(data.session)
        setUser(data.session?.user ?? null)
        if (data.session?.user?.user_metadata?.full_name) {
          setCachedName(data.session.user.user_metadata.full_name)
          localStorage.setItem('smartfarm_user_name', data.session.user.user_metadata.full_name)
        }
      } catch (err) {
        console.error('Unexpected auth initialization error:', err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // 2. Listen to real-time auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      if (currentSession?.user?.user_metadata?.full_name) {
        setCachedName(currentSession.user.user_metadata.full_name)
        localStorage.setItem('smartfarm_user_name', currentSession.user.user_metadata.full_name)
      }
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signInWithOtp = async (phone: string, name?: string): Promise<{ error: AuthError | Error | null }> => {
    try {
      if (name) {
        setCachedName(name)
        localStorage.setItem('smartfarm_user_name', name)
      }
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: name ? { data: { full_name: name, name: name } } : undefined,
      })
      return { error }
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) }
    }
  }

  const verifyOtp = async (
    phone: string,
    token: string,
    name?: string
  ): Promise<{ session: Session | null; user: User | null; error: AuthError | Error | null }> => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      })
      if (error) {
        return { session: null, user: null, error }
      }

      const activeName = name || cachedName || localStorage.getItem('smartfarm_user_name')
      if (activeName && data.user) {
        // Update user metadata in Supabase
        try {
          const { data: updated } = await supabase.auth.updateUser({
            data: { full_name: activeName, name: activeName },
          })
          if (updated.user) {
            data.user = updated.user
          }
        } catch (updateErr) {
          console.warn('Could not persist full_name to Supabase user metadata:', updateErr)
        }
        setCachedName(activeName)
        localStorage.setItem('smartfarm_user_name', activeName)
      }

      setSession(data.session)
      setUser(data.user)
      return { session: data.session, user: data.user, error: null }
    } catch (err) {
      return { session: null, user: null, error: err instanceof Error ? err : new Error(String(err)) }
    }
  }

  const updateUserName = async (name: string): Promise<void> => {
    setCachedName(name)
    localStorage.setItem('smartfarm_user_name', name)
    try {
      const { data } = await supabase.auth.updateUser({
        data: { full_name: name, name: name },
      })
      if (data.user) {
        setUser(data.user)
      }
    } catch (err) {
      console.error('Error updating user name:', err)
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Error signing out:', err)
    } finally {
      setUser(null)
      setSession(null)
      setCachedName(null)
      localStorage.removeItem('smartfarm_user_name')
    }
  }

  const userPhone = user?.phone || user?.user_metadata?.phone || null
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || cachedName || null

  const value: AuthContextType = {
    user,
    session,
    loading,
    userPhone,
    userName,
    signInWithOtp,
    verifyOtp,
    updateUserName,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
