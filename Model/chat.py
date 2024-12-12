import requests
import folium

def get_route(api_key, waypoints):
    url = "https://api.geoapify.com/v1/routing"
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

def plot_route(route_info, new_location):
    
    start_coords = [28.61014877589099, 77.21207060089318]
    route_map = folium.Map(location=start_coords, zoom_start=15)

    
    coordinates = route_info['features'][0]['geometry']['coordinates']

    
    print("Coordinates from API:", coordinates)

    
    for segment in coordinates:
        folium.PolyLine(locations=[(coord[1], coord[0]) for coord in segment], color='blue', weight=5).add_to(route_map)

   

    folium.Marker(location=new_location, icon=folium.Icon(color='yellowgreen')).add_to(route_map)

   
    route_map.save("routelatest_map.html")

if __name__ == "__main__":
    API_KEY = "f7c2378b067c459693c0cb71bd47869b" 
    waypoints = "28.61014877589099,77.21207060089318|28.604379585009823,77.21212220267887|28.60210489798962,77.21777221555101|28.609970172757542,77.21827166420314|28.61073478765462,77.22673373912687|28.616368380378347,77.2248003083314|28.620448935096704,77.21768363752653|28.62521539997313,77.20966195656183"



    # 28.619619,77.227575
    new_lat = float(input("Enter the new latitude: "))
    new_lon = float(input("Enter the new longitude: "))
    new_location = (new_lat, new_lon)

    
    waypoints += f"|{new_lat},{new_lon}"

    
    route_info = get_route(API_KEY, waypoints)
    
    if isinstance(route_info, dict):
        plot_route(route_info, new_location)
        print("Map has been created and saved as 'routelatest_map.html'.")
    else:
        print(route_info)  