// google map
var markers = [];
var homeMarker = {
  latitude : 0,
  longitude : 0
};

var map;
// initial map display on page load
function initMap() {
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

  var desertMap = new google.maps.StyledMapType(
      [
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            },
            {
              "color": "#f49f53"
            }
          ]
        },
        {
          "featureType": "landscape",
          "stylers": [
            {
              "color": "#f9ddc5"
            },
            {
              "lightness": -7
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "color": "#813033"
            },
            {
              "lightness": 43
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "color": "#645c20"
            },
            {
              "lightness": 38
            }
          ]
        },
        {
          "featureType": "water",
          "stylers": [
            {
              "color": "#1994bf"
            },
            {
              "saturation": -69
            },
            {
              "gamma": 0.99
            },
            {
              "lightness": 43
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#f19f53"
            },
            {
              "weight": 1.3
            },
            {
              "visibility": "on"
            },
            {
              "lightness": 16
            }
          ]
        },
        {
          "featureType": "poi.business"
        },
        {
          "featureType": "poi.park",
          "stylers": [
            {
              "color": "#645c20"
            },
            {
              "lightness": 39
            }
          ]
        },
        {
          "featureType": "poi.school",
          "stylers": [
            {
              "color": "#a95521"
            },
            {
              "lightness": 35
            }
          ]
        },
        {
          "featureType": "poi.medical",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#813033"
            },
            {
              "lightness": 38
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels"
        },
        {
          "featureType": "poi.sports_complex",
          "stylers": [
            {
              "color": "#9e5916"
            },
            {
              "lightness": 32
            }
          ]
        },
        {
          "featureType": "poi.government",
          "stylers": [
            {
              "color": "#9e5916"
            },
            {
              "lightness": 46
            }
          ]
        },
        {
          "featureType": "transit.station",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "stylers": [
            {
              "color": "#813033"
            },
            {
              "lightness": 22
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "lightness": 38
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#f19f53"
            },
            {
              "lightness": -10
            }
          ]
        }
      ],
      {name: 'desert'});

  var neonMap = new google.maps.StyledMapType(
      [{"stylers": [{"saturation": 100}, {"gamma": 0.6}]}],
      {name: 'neon'});

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.8282, lng: -98.5795},
    zoom: 5,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
  });

  map.mapTypes.set('styled_map', retroMap);
  map.setMapTypeId('styled_map');

  map.addListener('click', function (event) {
    addMarker(event.latLng);
  });
}




// Adds a marker to the map and push to the array.
function addMarker(location) {
  var backpackIcon = {
    url: 'assets/images/icons/png/backpack-1.png',
    scaledSize: new google.maps.Size(40, 40)
  };

  var marker = new google.maps.Marker({
    map: resultsMap,
    position: location,
    draggable: true,
    icon: backpackIcon
  });
  // add marker to markers array
  markers.push(marker);

  google.maps.event.addListener(marker, 'dragend', function(event) {
    currentMarker.latitude = this.getPosition().lat();
    currentMarker.longitude = this.getPosition().lng();
    // replace last marker with new marker location
    markers.pop();
    markers.push(marker);
  });
}

function getLocation(location) {

}
function displayMarkers(requestArray) {

}


function markerType(place) {
  var pngURL = "../images/icons/png/";
  if (place = "campground") {
    return pngURL + "campfire.png";
  }
  if (place = "gas_station") {
    return pngURL +  "gasoline.pmg";
  }
  if (place = "lodging") {
    return pngURL + "lodge.png";
  }
  if (place = "park") {
    return pngURL + "picnic.png";
  }
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
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
var searchRequest;
var geocodeURL = "http://maps.googleapis.com/maps/api/geocode/json?";
var googleKey = "&key=AIzaSyB7Jx7LHDrY7xzL20sBAdEYVe57v-Bgq34";

document.getElementById('searchBtn').on('click', function(event) {
  event.preventDefault();

  var queryURL = placesURL;
  var cityGeoURL;
  var types = [];
  var cityInput = $("#citySearch").val().trim();
  var cityLat;
  var cityLng;
  cityGeoURL = geocodeURL + cityInput + googleKey;

  $.ajax({url: cityGeoURL, method: 'GET'})
    .done(function(response) {
    var results = response.data;
    cityLat = results[0].geometry.location.lat();
    cityLng = results[0].geometry.location.lng();
  });

  if (cityGeoURL) {
    queryURL += "location=" + cityLang + ", " + cityLng + "&";
  }
  var keywordInput = $("#keywordSearch").val().trim();
  if (keywordInput) {
    queryURL += "keyword=" + keywordInput + "&";
  }
  var nameInput = $("#nameSearch").val().trim();
  if (name) {
    queryURL += "name=" + nameInput + "&";
  }
  var campgroundYes = $("#campgroundSearch").is(checked);
  if (campgroundYes) {
    types.push("campground |");
  }
  var rvYes = $("#rvSearch").is(checked);
  if (campgroundYes) {
    types.push("rv_park |");
  }
  var lodgingYes = $("#lodgingSearch").is(checked);
  if (campgroundYes) {
    types.push("lodging |");
  }
  var parkYes = $("#parkSearch").is(checked);
  if (campgroundYes) {
    types.push("park |");
  }
  var airportYes = $("#airportSearch").is(checked);
  if (campgroundYes) {
    types.push("airport |");
  }
  var gasYes = $("#gasSearch").is(checked);
  if (campgroundYes) {
    types.push("gas_station |");
  }
  if (types.length < 1) {
    return false;
  } else {
    queryURL += "types=" + types + "&";
  }
  var radiusInput = $("#radiusSearch").val();

  // convert miles to meters
  radiusInput *= 1609.34;

  queryURL += "radius=" + radiusInput;

  requestURL = placesURL +

  $.ajax({url: requestURL, method: 'GET'})
      .done(function(response) {
        console.log(response);
        for (var i = 0; i < response.length; i++) {
          searchRequest.push(response);
        }

      });

  displayMarkers(searchRequest);
});


// // Google Maps

//
// var googleAddress = results[0].formatted_address;
// var googleLat = results[0].geometry.location.lat();
// var googleLng = results[0].geometry.location.lng();



