import csv, folium
from folium.plugins import HeatMap

with open('../../output.csv', 'r') as locationFile:
    csv_reader = list(csv.reader(locationFile))

    # Ensure there's data in the CSV
    if len(csv_reader) > 0:
        last_location = eval(csv_reader[-1][3])  # Get the last recorded location (lat,lng)
        
        # Create a map centered on the last recorded location
        my_map = folium.Map(location=last_location, zoom_start=15)
        
        heatData = [eval(row[3]) for row in csv_reader]
        HeatMap(heatData).add_to(my_map)
        
        # Save the map to an HTML file
        my_map.save("heatMap.html")
        print("Map has been saved as heatMap.html")
    else:
        print("No location data found in the CSV file.")