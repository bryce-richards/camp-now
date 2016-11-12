// google map styling



// google map

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
  {name: 'Retro'});
  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.8282, lng: -98.5795},
    zoom: 5,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
  });

  map.mapTypes.set('styled_map', retroMap);
  map.setMapTypeId('styled_map');

  var geocoder = new google.maps.Geocoder();
  
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
  
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };


      var lodgeIcon = {
        url: 'assets/images/icons/png/lodge.png',
        scaledSize: new google.maps.Size(40, 40)
      };

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        // draggable: true,
        icon: lodgeIcon
      });

      map.setCenter(pos);

    }, function() {
      var infoWindow = new google.maps.InfoWindow({map: map});
      handleLocationError(true, infoWindow, map.getCenter());

    });

  } else {
    // Browser doesn't support Geolocation
    var infoWindow = new google.maps.InfoWindow({map: map});
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    console.log(results);
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      
      var backpackIcon = {
        url: 'assets/images/icons/png/backpack.png',
        scaledSize: new google.maps.Size(40, 40)
      };
      
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        draggable: true,
        icon: backpackIcon
      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// // Airbnb
// var airbnbSearchURL = "https://api.airbnb.com/v2/search_results";
// var airbnbReviewsURL = "https://api.airbnb.com/v2/reviews";
// var airbnbListingURL = "https://api.airbnb.com/v2/listings/" + airbnbListingID;
// var airbnbKey;
//
// // Google Maps
// var geocodeQueryURL = "http://maps.googleapis.com/maps/api/geocode/json?";
// var googleKey = "AIzaSyB7Jx7LHDrY7xzL20sBAdEYVe57v-Bgq34";
// var googleAddress = results[0].formatted_address;
// var googleLat = results[0].geometry.location.lat();
// var googleLng = results[0].geometry.location.lng();
//
// // airbnb user input
// var airbnbMinBathrooms;
// var airbnbMinBedrooms;
// var airbnbMinBeds;
// var airbnbCity;
// var airbnbMinPrice;
// var airbnbMaxPrice;
// var airbnbLat;
// var airbnbLng;
//
// var airbnbLocationSearch = "&user_lat=" + airbnbLat + "&user_lng=" + airbnbLng;
//
// // airbnb get response
// var airbnbReviewLimit;
//
// // aribnb listing info
// var airbnbListingID;
// var airbnbNumGuests;

// airbnb ajax call
// $.ajax({url: queryURL, method: "GET"}).done(function(response) {
//
// })
