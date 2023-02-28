import React, { useEffect } from 'react';
import { GoogleMap } from "@react-google-maps/api"

function Map({ setAddress }) {
  useEffect(() => {
    function initMap() {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 30.2672, lng: -97.7431 },
        zoom: 15,
      });
    
      const geocoder = new window.google.maps.Geocoder();
    
      const marker = new window.google.maps.Marker({
        map,
        position: map.getCenter(),
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "red",
          fillOpacity: 1,
          strokeWeight: 1,
        },
        draggable: true,
      });
    
      map.addListener("click", (mapsMouseEvent) => {
        geocoder.geocode({ location: mapsMouseEvent.latLng }, (results, status) => {
          if (status === "OK") {
            setAddress({
              address: results[0].formatted_address,
              location: mapsMouseEvent.latLng,
              placeId: results[0].place_id,
              bounds: results[0].geometry.viewport,
              componentRestrictions: null,
              region: null
            });
            marker.setPosition(mapsMouseEvent.latLng);
            map.panTo(mapsMouseEvent.latLng);
          } else {
            console.log("Geocode was not successful for the following reason: " + status);
          }
        });
        
      });
    }
    
    

    // Load the Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCaPhFZvPvigyx0lR_GZee-vhOID_EzOyQ`
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
    

  }, []);

  return <div id="map" style={{ height: '750px', width: '100%' }}></div>;
}

export default Map;


   
