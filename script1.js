document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    
    const location = `${city}, ${state}, ${pincode}`;
    const service = new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div')));
    
    const request = {
        location: { lat: 0, lng: 0 }, // Placeholder, will be updated
        radius: '5000', // 5 km radius
        type: ['gym']
    };

    // Geocode the location to get latitude and longitude
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': location }, function(results, status) {
        if (status === 'OK') {
            request.location = results[0].geometry.location;
            service.nearbySearch(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    displayResults(results);
                } else {
                    document.getElementById('results').innerHTML = 'No gyms found.';
                }
            });
        } else {
            document.getElementById('results').innerHTML = 'Geocode was not successful for the following reason: ' + status;
        }
    });
});

function displayResults(places) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    places.forEach(place => {
        const placeDiv = document.createElement('div');
        placeDiv.innerHTML = `<strong>${place.name}</strong><br>${place.vicinity}`;
        resultsDiv.appendChild(placeDiv);
    });
}