// google map
var markers = [];
var homeMarker;
var globalInfoWindow;
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
      {name: 'Retro'});

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
  // allows user to click on map and do a search in that area

  globalInfoWindow = new google.maps.InfoWindow();
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
    handleLocationError(false, globalInfoWindow, map.getCenter());
  }
  var timer;
  var circle = new google.maps.Circle();
  map.addListener("mousedown", function(event) {
    circle.setMap(null);
    if($(".ui-24").hasClass("open")){
      $(".ui-24").animate({"left":"-300px"},"300").removeClass("open");
    }
    var location = event.latLng;
    var radius = 16093.4;
    circle.setOptions({
      strokeColor: "#FF0000",
      strokeOpacity: .8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      map: map,
      center: location,
      radius: radius
    });
    timer = setInterval(function() {
      radius += 1609.34;
      circle.setRadius(radius);
    }, 100);
  });
  circle.addListener("mouseup", function() {
    clearInterval(timer);
    var radius = circle.getRadius() / 1609.34;
    var location = circle.getCenter();
    addSearch(radius, location);
  });
}
// end of init map function

// fills and opens search query
function addSearch(radius, center) {
  var geocoder = new google.maps.Geocoder;
  geocoder.geocode({"location" : center}, function(results, status) {
    if (status === "OK") {
      console.log(results);
      var destination = results[0].geometry.location;
      console.log(destination);
      $("#latLngSearch").val(destination);
      var searchRadius = Math.round((radius / 10) * 10);
      $("#radiusSearch").val(searchRadius);
      if (!$(".ui-24").hasClass("open")) {
        $(".ui-24").animate({"left":"0px"},"300").addClass("open");
      }
    }
  });
}

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

// Deletes all markers in the array by removing references to them.
$("#resetBtn").on("click", function() {
  initMap();
  clearMarkers();
  circle.setMap(null);
  markers = [];
});

var corsProxy = "https://crossorigin.me/";
var placesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
var googleKey = "key=AIzaSyB7Jx7LHDrY7xzL20sBAdEYVe57v-Bgq34";
var componentsURL = "components=country:US&";


$("#searchBtn").on("click", function(event) {
  clearMarkers();
  var searchRequest = [];
  event.preventDefault();
  markers = [];

  // slide search area off-screen
  $(".ui-24").animate({"left": "-300px"}, "300").removeClass("open");


  var queryURL = corsProxy + placesURL;

  var coordinatesURL;

  var textURL = "";

  var keywordURL = "";

  var types = "";

  // lat lng input
  var latLngInput = $("#latLngSearch").val().trim().replace(/[()]/g,"").split(" ").join("");
  // destination input
  var destinationInput = $("#destinationSearch").val().trim();
  // state input
  var stateInput = $("#stateSearch").val();
  // keyword input
  var keywordInput = $("#keywordSearch").val().trim();
  // type input
  $("input:checkbox").each(function () {
    if ($(this).is(":checked")) {
      if (types.length) {
        types += "|" + $(this).val();
      } else {
        types += $(this).val();
      }
    }
  });
  // search radius input
  var radiusInput = parseInt($("#radiusSearch").val());
  // convert miles to meters
  radiusInput *= 1609.34;

  // if destination is not blank
  if (destinationInput && !latLngInput) {

    if (stateInput) {
      destinationInput += ", " + stateInput;
    }
    keywordURL += destinationInput;
    // get geo coordinates of destination input
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({"address": destinationInput}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var location = results[0].geometry.location;
        coordinatesURL = jQuery.param({location: location.lat()}) + "," + location.lng() + "&";
        buildQuery();
      } else {
        buildQuery();
      }
    });
    // if no destination input but there is state input
  } else if (!destinationInput && stateInput && !latLngInput) {
    keywordURL += stateInput;
    buildQuery();
  } else if (latLngInput) {
    coordinatesURL = "location=" + latLngInput + "&";
    buildQuery();
  } else {
    buildQuery();
  }

  function buildQuery() {

    // if there is a keyword, add to query url
    if (!destinationInput) {

    }
    if (keywordInput) {
      keywordURL += keywordInput;
    }

    if (keywordURL) {
      keywordURL = keywordURL.split(" ").join("+");
      queryURL += "query=" + keywordURL + "&";
    }

    if (coordinatesURL) {
      queryURL += coordinatesURL;
    }

    queryURL += componentsURL;

    queryURL += "types=" + types+ "&";

    // add components for us filtering

    // add radius to url
    queryURL += jQuery.param({radius: radiusInput}) + "&";

    // search results
    var resultsInput = parseInt($("#resultsSearch").val());

    // add key to end of url
    queryURL += googleKey;
    console.log(queryURL);
    $.ajax({url: queryURL, method: 'GET'})
    .done(function (response) {
      if (response.status === "OK") {
        var results = response.results;
        // limit to top 10 responses
        if (results.length < resultsInput) {
          for (var i = 0; i < results.length; i++) {
            // push response to array
            searchRequest.push(results[i]);
            buildMarkers(searchRequest);
          }
        } else {
          for (var j = 0; j < resultsInput; j++) {
            // push response to array
            searchRequest.push(results[j]);
            buildMarkers(searchRequest);

          }
        }
      } else {
        var infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setPosition(map.getCenter());
        infoWindow.setContent("No Results!");
      }
    });
  }
});


function markerType(types) {
  for (var i = 0; i < types.length; i++) {
    if (types[i] === "campground") {
      return "bonfire.png";
    }
    else if (types[i] === "rv_park") {
      return "caravan.png";
    }
    else if (types[i] === "lodging") {
      return "cabin.png";
    }
    else if (types[i] === "park") {
      return "picnic.png";
    }
  }
}

// function to display search results on the map
function buildMarkers(requestArray) {
  for (var i = 0; i < requestArray.length; i++) {
    console.log(requestArray[i]);
    var placeID = requestArray[i].place_id;

    var types = requestArray[i].types;
    var markerIcon = markerType(types);

    var rating = requestArray[i].rating;
    var name = requestArray[i].name;
    var address = requestArray[i].formatted_address;
    // var photo = requestArray[i].photos["0"].html_attributions["0"];
    var location = {
      lat: requestArray[i].geometry.location.lat,
      lng: requestArray[i].geometry.location.lng
    };
    addMarker(location, markerIcon, name, rating, placeID, address);
  }

  // set view to fit markers
  var bounds = new google.maps.LatLngBounds();
  for (var j = 0; j < markers.length; j++) {
    bounds.extend(markers[j].getPosition());
  }
  map.fitBounds(bounds);
}



// Adds a marker to the map and push to the array.
function addMarker(location, markerType, name, rating, id, address) {
  var markerURL = "assets/images/icons/png/" + markerType;
  var markerIcon = {
    url: markerURL,
    scaledSize: new google.maps.Size(40, 40)
  };

  var marker = new google.maps.Marker({
    map: map,
    position: location,
    icon: markerIcon,
    animation: google.maps.Animation.DROP
  });

  google.maps.event.addListener(marker, "click", function() {
    if (globalInfoWindow) {
      globalInfoWindow.close();
    }
    // map.setCenter(marker.getPosition());
    globalInfoWindow.setContent("<div><h4>" + name + "</h4></div><div><h5>Address: " + address + "</h5></div><div><h6>Rating: " + rating + "</h6></div><div><button id='" + id + "'>Add To List</button></div>");
    globalInfoWindow.open(map, this);
  });
  // add marker to markers array
  markers.push(marker);

}

