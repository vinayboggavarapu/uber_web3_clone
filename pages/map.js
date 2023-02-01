import React, { useContext, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../styles/map.module.css";
import { UberContext } from "../context/uberContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

const Map = () => {
  const { pickupcoordinates, dropcoordinates } = useContext(UberContext);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/vinayb/cld8hqhty001801ocs5rx9n7m",
      center: [-280, 20],
      zoom: 5,
    });
    if (pickupcoordinates) {
      addToMap(map, pickupcoordinates);
    }
    if (dropcoordinates) {
      addToMap(map, dropcoordinates);
    }

    if (pickupcoordinates && dropcoordinates) {
      map.fitBounds([dropcoordinates, pickupcoordinates], {
        padding: 40,
      });
    }
  }, [pickupcoordinates, dropcoordinates]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };
  return <div id="map" className={styles.map}></div>;
};

export default Map;
