import requests
import folium

def get_route(api_key):
    """
    Retrieve the route information from the Geoapify Routing API.

    Args:
        api_key (str): Your Geoapify API key.

    Returns:
        dict or str: The JSON response if the request is successful, or an error message if there is an error.
    """
    url = "https://api.geoapify.com/v1/routing"
    waypoints = "28.610210018585022,77.21823029889129|28.609677440764628,77.22475649552177|28.611098166637092,77.22732350201522|28.614821357065182,77.22788154690534"
    params = {
        'waypoints': waypoints,
        'mode': 'truck',
        'apiKey': api_key
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json() 
    else:
        return f"Error: {response.status_code}, {response.text}" 

def plot_route(route_info):
    """
    Plot the route on a Folium map and save it to an HTML file.

    Args:
        route_info (dict): The route information obtained from the Geoapify Routing API.
    """
    # CREATE A MAP CENTERED AROUND THE FIRST WAYPOINT
    start_coords = [28.610210018585022, 77.21823029889129]
    route_map = folium.Map(location=start_coords, zoom_start=15)

    # EXTRACT COORDINATES FROM THE ROUTE INFO
    coordinates = route_info['features'][0]['geometry']['coordinates']

    # ROUTE TO THE MAP
    folium.PolyLine(locations=[(coord[1], coord[0]) for coord in coordinates[0]], color='blue', weight=5).add_to(route_map)

    # MARKERS
    for coord in coordinates[0]:
        folium.Marker(location=(coord[1], coord[0]), icon=folium.Icon(color='red')).add_to(route_map)

    # MAP HTML FILE
    route_map.save("route_map.html")

if __name__ == "_main_":
    API_KEY = ""  # API KEY
    route_info = get_route(API_KEY)
    
    if isinstance(route_info, dict):
        plot_route(route_info)
        print("MAP HAS BEEN CREATED AND SAVED AS 'ROUTE_MAP.HTML'.")
    else:
        print(route_info)  # ERROR MESSAGE