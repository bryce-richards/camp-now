var corsProxy = "https://crossorigin.me/";
var placesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
var googleKey = "key=AIzaSyCdoBhJmWHEJOiiQdnUZLTGsHblPpbYvr0";
var componentsURL = "components=country:US&";
var ridbURL = "https://ridb.recreation.gov/api/v1/facilities.json";
var trailsURL = "https://ridb.recreation.gov/api/v1/trails/USFS.json";
var ridbKey = "?apikey=A54C72EE122C4515B11636C8FE9F234C&";

// save home marker for future directions feature
var homeMarker;

// single info window object for the whole document to use
var globalInfoWindow;

// markers array
var markers = [];

// map object
var map;

// global circle object
var circle;

// global map moved boolean
var mapMoved = false;

// INITIAL MAP DISPLAY
function initMap() {
  $("#resultsBtn").fadeOut(500);
  $("#results").hide();
  $("#resultsTableBody").empty();

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
      {name: "Retro"});

  // create new google map centered on U.S.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.8282, lng: -98.5795},
    zoom: 7,
    clickableIcons: false,
    disableDoubleClickZoom: true,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
  });

  // set style of map
  map.mapTypes.set("styled_map", retroMap);
  map.setMapTypeId("styled_map");

  globalInfoWindow = new google.maps.InfoWindow();
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      homeMarker = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var lodgeIcon = {
        url: "assets/images/icons/png/lodge.png",
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
    handleLocationError(false, globalInfoWindow, map.getCenter());
  }
  var timer;
  circle = new google.maps.Circle();
  map.addListener("mousedown", function(event) {
    setTimeout(function() {
      if (!mapMoved) {
        circle.setMap(null);
        if ($(".ui-24").hasClass("open")) {
          $(".ui-24").animate({"left": "-300px"}, "300").removeClass("open");
        }
        var location = event.latLng;
        var radius = 8046.7;
        circle.setOptions({
          strokeColor: "#FF0000",
          strokeOpacity: .8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          map: map,
          center: location,
          radius: radius
        });
        timer = setInterval(function () {
          radius += 1609.3;
          circle.setRadius(radius);
        }, 100);
      }
    }, 200);
  });
  map.addListener("dragstart", function() {
    mapMoved = true;
  });
  map.addListener("dragend", function() {
    mapMoved = false;
  });
  circle.addListener("mouseup", function() {
    clearInterval(timer);
    var radius = circle.getRadius() / 1609.34;
    var location = circle.getCenter();
    addSearch(radius, location);
  });
}
// END OF INITIAL MAP DISPLAY

// SIDEBAR BUTTON CLICK EVENT
$(".ui-24 .ui-button button").click(function(event) {
  event.preventDefault();
  if($(".ui-24").hasClass("open")) {
    $(".ui-24").animate({"left":"-300px"},"300").removeClass("open");
  } else {
    $(".ui-24").animate({"left":"0px"},"300").addClass("open");
  }
});
// END OF SIDEBAR BUTTON CLICK EVENT

// fills and opens search query
function addSearch(radius, center) {
  var geocoder = new google.maps.Geocoder;
  geocoder.geocode({"location" : center}, function(results, status) {
    if (status === "OK") {
      var destination = results[0].geometry.location;
      $("#latLngSearch").val(destination);
      var searchRadius = Math.round(radius);
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
  markers = [];

}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
$("#resetBtn").on("click", function() {
  $(".ui-24").animate({"left": "-300px"}, "300").removeClass("open");
  if ($(".ui-24").hasClass("open")) {
    $(".ui-24").animate({"left":"-300px"},"300").removeClass("open");
  }
  $("#resultsBtn").fadeOut(500);
  initMap();
  $("#resultsSearch").val(20);
  clearMarkers();
  if (circle) {
    circle.setMap(null);
  }
});


$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  $("#results").hide();
  $("#resultsTableBody").empty();
  clearMarkers();
  var searchRequest = [];

  if ($(".ui-24").hasClass("open")) {
    $(".ui-24").animate({"left":"-300px"},"300").removeClass("open");
  }

  var queryURL = corsProxy + placesURL;

  var coordinatesURL;

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
    keywordURL += destinationInput + " ";

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
  } else if (!destinationInput && stateInput) {
    keywordURL += stateInput + " ";
      if (latLngInput) {
        coordinatesURL = "location=" + latLngInput + "&";
        buildQuery();

      }
  } else if (!destinationInput && !stateInput && latLngInput) {
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
      keywordURL += keywordInput + " ";
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
    $.ajax({url: queryURL, method: 'GET'})
    .done(function (response) {
      if (response.status === "OK") {
        var results = response.results;
        // limit to top 10 responses
        if (results.length < resultsInput) {
          for (var i = 0; i < results.length; i++) {
            // push response to array
            searchRequest.push(results[i]);
          }
          buildMarkers(searchRequest);
        } else {
          for (var j = 0; j < resultsInput; j++) {
            // push response to array
            searchRequest.push(results[j]);

          }
          buildMarkers(searchRequest);
        }
      } else {
        globalInfoWindow = new google.maps.InfoWindow({map: map});
        globalInfoWindow.setPosition(homeMarker);
        globalInfoWindow.setContent("No Results!");
      }
    });
  }
});

// FUNCTION TO PREPARE DATA FOR MARKER AND RESULTS DISPLAY
function buildMarkers(requestArray) {
  for (var i = 0; i < requestArray.length; i++) {

    var types = requestArray[i].types;
    var markerIcon = markerType(types);
    var rating = requestArray[i].rating;
    var name = requestArray[i].name;
    var vicinity = requestArray[i].vicinity;
    var location = {
      lat: requestArray[i].geometry.location.lat,
      lng: requestArray[i].geometry.location.lng
    };
    addMarker(location, markerIcon, name, vicinity);
    displayResults(name, rating, location.lat, location.lng);
  }
  setTimeout(function() {
    $("#resultsBtn").fadeIn(500);
  }, 5000);

    // set view to fit markers
  var bounds = new google.maps.LatLngBounds();
  for (var j = 0; j < markers.length; j++) {
    bounds.extend(markers[j].getPosition());
  }
  if (circle) {
    circle.setMap(null);
  }
  map.fitBounds(bounds);

}

// FUNCTION TO ADD A MARKER TO THE MAP
function addMarker(location, markerType, name, vicinity) {
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
  console.log(marker);
  google.maps.event.addListener(marker, "click", function() {
    if (globalInfoWindow) {
      globalInfoWindow.close();
    }
    globalInfoWindow.setContent("<div><h5>" + name + "</h5></div><div><h6>Vicinity: " + vicinity + "</h6></div>");
    globalInfoWindow.open(map, this);
  });
  markers.push(marker);
}
// END OF ADD MARKER FUNCTION

// FUNCTION TO RETURN ICON IMAGE
function markerType(types) {
  for (var i = 0; i < types.length; i++) {
    if (types[i] === "campground") {
      return "bonfire.png";
    } else if (types[i] === "rv_park") {
      return "caravan.png";
    } else if (types[i] === "lodging") {
      return "cabin.png";
    } else if (types[i] === "park") {
      return "picnic.png";
    }
  }
}
// END OF FUNCTION TO RETURN ICON IMAGE

// FUNCTION TO DISPLAY SEARCH RESULTS IN TABLE
function displayResults(name, rate, lat, lng) {
  $("#results").show();
  var queryURL = ridbURL + ridbKey;
  var nameURL = jQuery.param({query : name}) + "&";
  queryURL += nameURL.split(" ").join("+");
  var description = "Not Available";
  var url = "Not Available";
  var phone = "Not Available";
  var rating = rate;
  queryURL += jQuery.param({coordinates : lat}) + "," + lng + "&";
  $.ajax({url: queryURL, method: 'GET'})
  .done(function (response) {
    var results = response.RECDATA;
    if (results) {
      for (var i = 0; i < results.length; i++) {
        var facilityName = results[i].FacilityName;
        var facilityDescription = results[i].FacilityDescription;
        var facilityURL = results[i].FacilityReservationURL;
        var facilityPhone = results[i].FacilityPhone;
        if (facilityName == name) {
          if (facilityDescription) {
            description = facilityDescription;
          } else {
            description = "Not Available";
          }
          if (facilityURL) {
            url = facilityURL;
          } else {
            url = "Not Available"
          }
          if (facilityPhone) {
            phone = facilityPhone;
          } else {
            phone = "Not Available";
          }
        }
      }
      finishQuery();
    } else {
      description = "Not Available";
      url = "Not Available";
      phone = "Not Available";
      finishQuery();
    }
  });
  function finishQuery() {
    var tableRow = $("<tr>");
    tableRow.attr("lat", lat);
    tableRow.attr("lng", lng);
    tableRow.attr("name", name);
    var rowName = $("<td>");
    rowName.html("<h3>" + name + "</h3>");
    var rowRating = $("<td>");
    if (!rating) {
      rating = "Not Available";
    }
    rowRating.html("<h3>" + rating + "</h3>");
    var rowDescription = $("<td>");
    rowDescription.html(description);
    var rowPhone = $("<td>");
    rowPhone.html("<h3>" + phone + "</h3>");
    var rowURL = $("<td>");
    rowURL.html("<h3>" + url + "</h3>");
    var rowTrails = $("<td>");
    var trailsButton = $("<button>").addClass("trailBtn").text("Find Trails");
    rowTrails.append(trailsButton);
    var rowSave = $("<td>");
    var saveButton = $("<button>").addClass("saveBtn").text("Save");
    rowSave.append(saveButton);
    tableRow.append(rowName).append(rowRating).append(rowDescription).append(rowPhone).append(rowURL).append(rowTrails).append(rowSave);
    $("#resultsTableBody").append(tableRow);
  }
}
// END OF FUNCTION TO DISPLAY RESULTS

// RESULTS BUTTON EVENT
$("#resultsBtn").on("click", function() {
  if ($(".ui-24").hasClass("open")) {
    $(".ui-24").animate({"left": "-300px"}, "300").removeClass("open");
  }
  var offset = $("#results").offset();
  $("html, body").animate({scrollTop : offset.top - 50}, 500);
  setTimeout(function() {
    $("#resultsBtn").fadeOut(500);
  }, 500);
});
// END OF RESULTS BUTTON EVENT


$("#resultsTableBody").on("click", "button", function(event) {
  event.preventDefault();

  if ($(".ui-24").hasClass("open")) {
    $(".ui-24").animate({"left":"-300px"},"300").removeClass("open");
  }
  var lat = $(this).closest("tr").attr("lat");
  var lng = $(this).closest("tr").attr("lng");
  trailFinder(lat, lng, 10);
});


function trailFinder(lat, lng, radius) {
  var queryURL = corsProxy + trailsURL + ridbKey;
  queryURL += jQuery.param({coordinates : lat}) + "," + lng + "&";
  if (radius) {
    queryURL += jQuery.param({radius : radius});
  }
  console.log(queryURL);
  $.ajax({url: queryURL, method: 'GET'})
  .done(function (response) {
    var results = response.RECDATA;
    if (results) {
      var searchResults = 10;
      if (results.length < searchResults) {
        searchResults = results.length;
      }
      for (var i = 0; i < searchResults; i++) {
        var name = results[i].TrailName;
        var geo = results[i].GEOM;
        console.log(results[i]);
        if (geo) {
          geo = geo.substring(11).replace(/[()]/g, "").replace(/"/g, "").split(" ");
          var lng = parseFloat(geo[0].replace(/,/g, ''));
          var lat = parseFloat(geo[1].replace(/,/g, ''));
          latLng = {
            lat: lat,
            lng: lng
          };
        }
        if (name && geo) {
          addTrailMarker(latLng, name);
        }
      }

      var offset = $("#mapDiv").offset();
      $("html, body").animate({scrollTop : offset.top - 50}, 500);
    }
    else {
      var offset = $("#mapDiv").offset();
      $("html, body").animate({scrollTop : offset.top - 50}, 500);
      if (globalInfoWindow) {
        globalInfoWindow.close();
      }
      globalInfoWindow.setPosition(homeMarker);
      globalInfoWindow.setContent("No Nearby Trails!");
      globalInfoWindow.open();

    }

  });
}

function addTrailMarker(location, name) {
  var markerURL = "assets/images/icons/png/panel.png";
  var markerIcon = {
    url: markerURL,
    scaledSize: new google.maps.Size(40, 40)
  };
  var latLng = new google.maps.LatLng(location);
  var marker = new google.maps.Marker({
    map: map,
    position: latLng,
    icon: markerIcon,
    animation: google.maps.Animation.DROP
  });
  console.log(marker);

  google.maps.event.addListener(marker, "click", function() {
    if (globalInfoWindow) {
      globalInfoWindow.close();
    }
    globalInfoWindow.setContent("<div><h5>" + name + "</h5>");
    globalInfoWindow.open(map, this);
  });
  markers.push(marker);

}