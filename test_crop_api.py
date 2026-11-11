import requests
import json

# Test data
test_input = {
    "state": "Maharashtra",
    "district": "Nashik",
    "village": "Sinnar",
    "farmSize": 5,
    "farmSizeUnit": "acres",
    "waterAvailability": "limited_irrigation",
    "soilType": "loamy_soil",
    "previousCrop": "",
    "season": "Rabi",
    "farmingPreference": "any_suitable",
    "budget": "medium",
    "mainGoal": "higher_profit"
}

print("Testing Crop Recommendation API...")
print(f"URL: http://localhost:8000/api/crop/recommend")
print(f"Input: {json.dumps(test_input, indent=2)}\n")

try:
    response = requests.post(
        "http://localhost:8000/api/crop/recommend",
        json=test_input,
        timeout=10
    )
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("\n✅ SUCCESS!")
        print(f"\nTop 3 Recommendations:")
        for i, crop in enumerate(result['recommendations'], 1):
            print(f"\n{i}. {crop['cropName']} ({crop['cropNameLocal']})")
            print(f"   Score: {crop['suitabilityScore']}%")
            print(f"   Why: {crop['whySuitable'][:100]}...")
        
        print(f"\n\nFarm Layout:")
        for section in result['farmLayout']:
            print(f"  {section['cropName']}: {section['area']} {result['unit']} ({section['areaPercentage']}%)")
    else:
        print(f"\n❌ ERROR: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"\n❌ FAILED: {e}")
