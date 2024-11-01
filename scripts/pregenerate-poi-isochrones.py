import requests
from tqdm import tqdm

# Define the POI types and transport types
poi_values = ["ptv-stations", "woolworths", "coles", "aldi"]
transport_types = ["foot-walking", "driving-car"]

# Define the time increments in minutes and convert to seconds
time_increments = [i * 5 * 60 for i in range(1, 25)]

# Function to fetch isochrones for a location
def fetch_isochrones_for_location(poi, transport_type, method, value):
    url = "http://209.38.31.138:3000/api/query"
    body = {
        "commuteFilters": [{
            "poi": poi,
            "type": transport_type,
            "method": method,
            "value": value
        }],
        "minPrice": 0,
        "maxPrice": 1000000,
        "minBedrooms": 1,
        "propertyTypes": ["house", "unit"]
    }
    response = requests.post(url, json=body)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to query with {poi} {transport_type} {method} {value}")
        return None


# Iterate through all POI types, transport types, and time increments
for poi in poi_values:
    for transport_type in transport_types:
        for value in tqdm(time_increments, desc=f"Fetching isochrones for {poi} with {transport_type}"):
            isochrone = fetch_isochrones_for_location(poi, transport_type, "time", value)
            # Process the isochrone data as needed