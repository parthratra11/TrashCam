
    

# import requests

# def get_route(api_key):
#     url = "https://api.geoapify.com/v1/routing"
#     waypoints = "28.610210018585022,77.21823029889129|28.609677440764628,77.22475649552177|28.611098166637092,77.22732350201522|28.614821357065182,77.22788154690534"
#     params = {
#         'waypoints': waypoints,
#         'mode': 'truck',
#         'apiKey': api_key
#     }

#     response = requests.get(url, params=params)

#     if response.status_code == 200:
#         return response.json()  # Return the JSON response if the request was successful
#     else:
#         return f"Error: {response.status_code}, {response.text}"  # Handle errors

# if __name__ == "__main__":
#     API_KEY = "f7c2378b067c459693c0cb71bd47869b"# Replace with your actual API key
#     route_info = get_route(API_KEY)
    
#     # print(route_info)

#     for i in route_info['features'][0]['geometry']['coordinates']:
#         print('---' * 30)
#         print(i)
#         for j in i:
#             print(j[0], j[1])


import requests
import folium

def get_route(api_key):
    url = "https://api.geoapify.com/v1/routing"
    waypoints = "28.61014877589099,77.21207060089318|28.604379585009823,77.21212220267887|28.60210489798962,77.21777221555101|28.609970172757542,77.21827166420314|28.61073478765462,77.22673373912687|28.616368380378347,77.2248003083314|28.620448935096704,77.21768363752653|28.62521539997313,77.20966195656183"
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

def plot_route(route_info, coord_string=None):
    
    start_coords = [28.61014877589099, 77.21207060089318]
    route_map = folium.Map(location=start_coords, zoom_start=15)

    
    coordinates = route_info['features'][0]['geometry']['coordinates']

    
    print("Coordinates from API:", coordinates)

    for segment in coordinates:
        folium.PolyLine(locations=[(coord[1], coord[0]) for coord in segment], color='blue', weight=5).add_to(route_map)

    
    if coord_string:
       
        coord_pairs = [tuple(map(float, coord.split(','))) for coord in coord_string.split('|')]

      
        print("Coordinates from string:", coord_pairs)

        
        for lat, lon in coord_pairs:
            folium.Marker(location=(lat, lon), icon=folium.Icon(color='blue')).add_to(route_map)

    
    route_map.save("route_map.html")

if __name__ == "__main__":
    API_KEY = "f7c2378b067c459693c0cb71bd47869b"  
    route_info = get_route(API_KEY)
    
    if isinstance(route_info, dict):
        coord_string = "28.61014877589099,77.21207060089318|28.604379585009823,77.21212220267887|28.60210489798962,77.21777221555101|28.609970172757542,77.21827166420314|28.61073478765462,77.22673373912687|28.616368380378347,77.2248003083314|28.620448935096704,77.21768363752653|28.62521539997313,77.20966195656183"
        plot_route(route_info, coord_string)
        print("Map has been created and saved as 'route_map.html'.")
    else:
        print(route_info)  