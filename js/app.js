/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080


$(document).ready(function() {
    function createMap(center, zoom) {
        var mapElem = document.getElementById('map');

        var map = new google.maps.Map(mapElem, {
            center: center,
            zoom: zoom
        });

        var marker = new google.maps.Marker({
            position: center,
            map: map,
            animation: google.maps.Animation.DROP
        });

       var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent('<p>Here I am!</p>');

        google.maps.event.addListener(marker, 'click', function() {
            //console.log('marker clicked!');
            infoWindow.open(map, marker);
            map.panTo(marker.getPosition());
        });
    }

    function onGeoSuccess(position) {
        var center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        createMap(center, 14);
    } //onGeosuccess()

    function onGeoError(error) {
        console.log(error);
    }//onGeoError

    var uwCoords = {
        lat: 20.8,
        lng: -156.333
    };

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
            enableHighAccuracy: true
        });
    }
    else {
        createMap(uwCoords, 10);
    }

}); //on Doc Ready