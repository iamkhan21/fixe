import React, { useEffect, useRef, useState } from "react";
import { Map } from "mapbox-gl";
import { useStore } from "@nanostores/react";
import { geolocationData } from "@stores/geolocation";
import { drawMarker } from "@utils/map-helpers";
import { Coordinates } from "@application/geolocation/types";
import {
  convertCoordinatesObjectToArray,
  getCoordinates,
} from "@utils/geolocation";

function drawUserMarker(map: Map, coordinates: Coordinates) {
  drawMarker(map, convertCoordinatesObjectToArray(coordinates), "user", {
    size: 5,
  });
}

const Mapbox = () => {
  const alive = useRef(true);
  const map = useRef<Map | null>(null);
  const isCentered = useRef(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const location = useStore(geolocationData);

  useEffect(() => {
    alive.current = true;

    (async () => {
      await import("mapbox-gl/dist/mapbox-gl.css");
      const mapboxgl = (await import("mapbox-gl")).default;

      if (!alive.current) return;

      // @ts-ignore
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

      const coordinates = getCoordinates(location);

      // @ts-ignore
      map.current = new mapboxgl.Map({
        container: "mapbox",
        style: "mapbox://styles/onexel/cl1ruw4st002h14o0ioafsexk",
        center: coordinates || {
          lng: 27.564026252621716,
          lat: 53.90270773894483,
        }, // starting position
        zoom: 15,
      });

      map.current.addControl(new mapboxgl.FullscreenControl());

      // @ts-ignore
      map.current.on("load", () => {
        setIsMapLoaded(true);

        if (coordinates) {
          drawUserMarker(map.current!, coordinates);
          isCentered.current = true;
        }
      });
    })();

    // @ts-ignore
    return () => {
      alive.current = false;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const coordinates = getCoordinates(location);

    if (coordinates && map.current && isMapLoaded) {
      drawUserMarker(map.current!, coordinates);

      if (isCentered.current) {
        map.current!.flyTo({ center: coordinates });
      } else {
        map.current!.jumpTo({ center: coordinates });
        isCentered.current = true;
      }
    }
  }, [location?.latitude, location?.longitude, isMapLoaded]);

  return (
    <section id="mapbox" style={{ height: "100%", backgroundColor: "#f2f2f2" }}>
      <p>Loading map...</p>
    </section>
  );
};

export default Mapbox;
