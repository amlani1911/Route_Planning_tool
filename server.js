const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Route calculation endpoint
app.get('/calculate-route', (req, res) => {
    // Receive location data from the frontend
    const locations = req.query.locations;
    // Call a function to calculate the route
    const route = calculateRoute(locations);
    res.json(route);
    console.log(route)
});

app.get('/', (req, res)=>{
    res.status(200).send("HI")
})

// Function to calculate the route using Google Maps Directions API
function calculateRoute(locations) {
    // Construct the request URL for Google Maps Directions API
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${locations[0]}&destination=${locations[locations.length - 1]}&waypoints=optimize:true|${locations.slice(1, -1).join('|')}&key=AIzaSyAYkgZ7-P6Kkv6c6kaf-l1wCnjC17iJfYA`;

    // Make a request to the Directions API
    // In a real-world scenario, you'd use a library like 'axios' to make the HTTP request
    // For simplicity, we'll use 'node-fetch'
    return fetch(directionsUrl)
        .then(response => response.json())
        .then(data => {
            // Extract and return the optimized route from the response
            return data.routes[0].overview_polyline.points;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
