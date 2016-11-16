/**
 * Created by brycerichards on 11/15/16.
 */
// google map
var markers = [];
var homeMarker;

var map;
// initial map display on page load
function initMap() {

    // retro map style
    var retroMap = new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ],
        {name: 'retro'});

    // create new google map centered on U.S.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.8282, lng: -98.5795},
        zoom: 5,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
        }
    });

    // set style of map
    map.mapTypes.set('styled_map', retroMap);
    map.setMapTypeId('styled_map');

    // allows user to click on map and add to
    map.addListener('click', function (event) {
        addMarker(event.latLng, "backpack.png");
    });


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            homeMarker = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var lodgeIcon = {
                url: 'assets/images/icons/png/lodge.png',
                scaledSize: new google.maps.Size(40, 40)
            };

            var marker = new google.maps.Marker({
                map: map,
                draggable: false,
                position: homeMarker,
                icon: lodgeIcon
            });

            map.setCenter(homeMarker);

        });
    } else {
        // Browser doesn't support Geolocation
        var infoWindow = new google.maps.InfoWindow({map: map});
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

// end of init map function

// error handling function
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
$("#resetBtn").on("click", function() {
    clearMarkers();
    markers = [];
});

function getGeoCoordinates(place) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': place}, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            return {
                lat: latitude,
                lng: longitude
            };
        }
    });
}

var corsProxy = "https://crossorigin.me/";
var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
var searchRequest = [];
var googleKey = "key=AIzaSyB7Jx7LHDrY7xzL20sBAdEYVe57v-Bgq34";
var componentsURL = "components=country:US&";


$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var queryURL = placesURL;
    var textURL = "";
    // queryURL += componentsURL;

    // city input
    var cityInput = $("#citySearch").val().trim();
    if (cityInput) {
        textURL += cityInput;
    }
    // state input
    var stateInput = $("#stateSearch").val();
    if (stateInput) {
        textURL += ", " + stateInput;
    }
    // keyword input
    var keywordInput = $("#keywordSearch").val().trim();
    if (keywordInput) {
        textURL += keywordInput;
    }

    queryURL += jQuery.param({query : textURL}) + "&";
    var type = "";
    // type input
    $("input:radio").each(function () {
        if ($(this).is(":checked")) {
            type = $(this).val();
        }
    });

    queryURL += jQuery.param({type: type}) + "&";

    // search radius input
    var radiusInput = parseInt($("#radiusSearch").val());
    // convert miles to meters
    radiusInput *= 1609.34;

    queryURL += jQuery.param({radius: radiusInput}) + "&";

    // if city is not blank
    // if (cityInput) {
    //     if (stateInput) {
    //         cityInput += ", " + stateInput;
    //     }
    //     // get geo coordinates of city input
    //     var location = getGeoCoordinates(cityInput);
    //     queryURL += jQuery.parse({location: location.lat}) + "," + location.lng + "&";
    // }

    // if there is a keyword, add to query url
    // if (keywordInput) {
    //     queryURL += jQuery.param({keyword: keywordInput}) + "&";
    // }


    // add components for us filtering

    // add radius to url

    // number of search results
    var resultsInput = parseInt($("#resultsSearch").val());

    // queryURL += componentsURL;
    // add key to end of url
    queryURL += googleKey;
    console.log(queryURL);
    debugger;

        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
                if (response.status === "OK") {
                    console.log("Here");
                    debugger;
                    var results = response.results;
                    console.log(results);
                    // limit to top 10 responses
                    for (var i = 0; i < resultsInput; i++) {
                        // push response to array
                        searchRequest.push(results[i]);
                        displayMarkers(searchRequest);
                    }
                } else {
                    // TODO add an alert
                    console.log("No results found.")
                }
            });
});


function markerType(type) {

    if (type === "campground") {
        return "bonfire.png";
    }
    if (type === "rv_park") {
        return "caravan.png";
    }
    if (type === "lodging") {
        return "cabin.png";
    }
    if (type === "park") {
        return "picnic.png";
    }
}

// function to display search results on the map
function displayMarkers(requestArray) {
    console.log("display Markers");
    console.log(requestArray);
    for (var i = 0; i < requestArray.length; i++) {
        console.log(requestArray[i]);
        // var placeID = requestArray[i].place_id;
        var type = requestArray[i].types[0];
        var markerIcon = markerType(type);
        // var rating = requestArray[i].rating;
        // var name = requestArray[i].name;
        // var address = requestArray[i].formatted_address;
        // var photo = requestArray[i].photos["0"].html_attributions["0"];
        var location = {
            lat: requestArray[i].geometry.location.lat,
            lng: requestArray[i].geometry.location.lng
        };
        addMarker(location, markerIcon);
    }

    // set view to fit markers
    var bounds = new google.maps.LatLngBounds();
    for (var j = 0; j < markers.length; j++) {
        bounds.extend(markers[j].getPosition());
    }

    map.fitBounds(bounds);
}


// Adds a marker to the map and push to the array.
function addMarker(location, markerType) {
    var markerURL = "assets/images/icons/png/" + markerType;
    var markerIcon = {
        url: markerURL,
        scaledSize: new google.maps.Size(40, 40)
    };

    var marker = new google.maps.Marker({
        map: map,
        position: location,
        draggable: true,
        icon: markerIcon
    });

    // add marker to markers array
    markers.push(marker);

}

