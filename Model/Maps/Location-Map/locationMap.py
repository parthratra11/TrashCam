import csv, folium

with open('../../output.csv', 'r') as locationFile:
    csv_reader = list(csv.reader(locationFile))

    # Ensure there's data in the CSV
    if len(csv_reader) > 0:
        last_location = csv_reader[-1][3]  # Get the last recorded location (lat,lng)
        last_location = eval(last_location)  # Convert string to list
        
        # Create a map centered on the last recorded location
        my_map = folium.Map(location=last_location, zoom_start=15)
        
        # Add markers for all recorded locations
        for row in csv_reader:
            location = eval(row[3])  # Convert string to list
            folium.Marker(location, popup="Detected Location").add_to(my_map)
        
        # Save the map to an HTML file
        my_map.save("locationMap.html")
        print("Map has been saved as locationMap.html")
    else:
        print("No location data found in the CSV file.")