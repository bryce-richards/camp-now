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
    navigator.geolocation.getCurrentPosition(function(position) {
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
  // if user clicks on a new marker, display that info
  var service = new google.maps.places.PlacesService(map);

  // need to either update or remove
  service.getDetails({
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: ' + place.place_id + '<br>' +
            place.formatted_address + '</div>');
        infoWindow.open(map, this);
      });
    }
  });
}
// end of init map function

// error handling function
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
}


// Adds a marker to the map and push to the array.
function addMarker(location, marker) {
  var markerURL = "assets/images/icons/png/" + marker;
  var backpackIcon = {
    url: 'assets/images/icons/png/backpack.png',
    scaledSize: new google.maps.Size(40, 40)
  };

  var marker = new google.maps.Marker({
    map: map,
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

var corsProxy = "https://crossorigin.me/";
var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
var searchRequest;
var googleKey = "key=AIzaSyB7Jx7LHDrY7xzL20sBAdEYVe57v-Bgq34";
var componentsURL = "components=country:US&";

$("#searchBtn").on('click', function(event) {
  event.preventDefault();

  var queryURL = corsProxy + placesURL;
  var type;

  // name
  var nameInput = $("#nameSearch").val().trim();
  // if there is a name, add to query url
  if (nameInput) {
    queryURL += jQuery.param({name : nameInput}) + "&";
  }

  // keyword
  var keywordInput = $("#keywordSearch").val().trim();
  // if there is a keyword, add to query url
  if (keywordInput) {
    queryURL += jQuery.param({keyword : keywordInput}) + "&";
  }

  $("input:radio").each(function() {
    if ($(this).is(":checked")) {
      type = $(this).val();
    }
  });

  queryURL += jQuery.param({type : type}) + "&";

  // add components for us filtering
  queryURL += componentsURL;

  // search radius
  var radiusInput = parseInt($("#radiusSearch").val());
  // convert miles to meters
  radiusInput *= 1609.34;
  // add radius to url
  queryURL += jQuery.param({radius : radiusInput}) + "&";

  // search results
  var resultsInput = parseInt($("#resultsSearch").val());

  // add key to end of url
  queryURL += googleKey;

  console.log(queryURL);

  // ajax call to google places
  $.ajax({url: queryURL, method: 'GET'})
  .done(function(response) {
    var results = response.results;
    console.log(results);
    // limit to top 10 responses
    for (var i = 0; i < resultsInput; i++) {
      // push response to array
      searchRequest.push(results[i]);
    }
  });

  // display all results
  displayMarkers(searchRequest);
});


// function to display search results on the map
function displayMarkers(requestArray) {
  for (var i = 0; i < requestArray.length; i++) {
    var type = requestArray[i].types[0];
    var markerIcon = marketType(type);
    var rating = requestArray[i].rating;
    var name = requestArray.[i].name;
    var address = requestArray[i].formatted_address;
    var location = {
      lat : requestArray[i].geometry.location.lat,
      lng : requestArray[i].geometry.location.lng
    }

  }
}

// function that returns a specific icon based on the place type
function markerType(place) {

  var pngURL = "../images/icons/png/";
  if (place === "campground") {
    return pngURL + "bonfire.png";
  }
  if (place === "rv_park") {
    // TODO: need to add icon for RV
    return pngURL + "caravan.png";
  }
  if (place === "lodging") {
    return pngURL + "cabin.png";
  }
  if (place === "park") {
    return pngURL + "picnic.png";
  }
}
// // Google Maps

//
// var googleAddress = results[0].formatted_address;
// var googleLat = results[0].geometry.location.lat();
// var googleLng = results[0].geometry.location.lng();


// hiking api
// var hikingURL = "https://trailapi-trailapi.p.mashape.com/";