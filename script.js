let map;
let markers = [];
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 22.3511148, lng: 78.6677428 },
        zoom: 6,
    });
}

async function getLatitutdeLongitude(address) {
    fetch(`https://geocode.maps.co/search?q=${address}&api_key=65cfa61cd76d1042646593ceh005290`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    return data[0];
                });
            }
        )
}

function addLocation() {
    const address = document.getElementById("addressInput").value;
    const geocoder = new google.maps.Geocoder();
    fetch(`https://geocode.maps.co/search?q=${address}&api_key=65cfa61cd76d1042646593ceh005290`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    d = data[0];
                    // console.log(d);
                    let lanlon = {
                        lat: parseFloat(d.lat),
                        lng: parseFloat(d.lon)
                    }

                    new google.maps.Marker({
                        position: lanlon,
                        map,
                        title: "Hello World!",
                    });
                });
            }
        )
    var myLatLng = {
        lat: 0,
        lng: 0
    };

    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
    });
}

async function planRoute() {


    // Receive location data from the frontend
    // const locations = req.query.locations;
    // Call a function to calculate the route
    // const r = calculateRoute(locations);
    // res.json(r);
    // console.log(r);
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer);






    // Make a request to the backend to calculate the route
    // const response = await fetch(`/calculate-route?locations=${markers.map(marker => marker.lat() + ',' + marker.lng()).join('|')}`);
    // const data = await response.json();

    // // Decode the polyline and display the route on the map
    // const decodedPolyline = google.maps.geometry.encoding.decodePath(data);
    // const route = new google.maps.Polyline({
    //     path: decodedPolyline,
    //     geodesic: true,
    //     strokeColor: "#FF0000",
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2,
    // });
    // route.setMap(map);
}

function calculateAndDisplayRoute(
    directionsService,
    directionsRenderer
  ) {
    // const directionsService = new google.maps.DirectionsService();
    // const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService
      .route({
        origin: 'Chicago, IL',
        destination: 'Los Angeles, CA',
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }


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