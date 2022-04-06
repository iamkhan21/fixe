import React, { useEffect, useRef } from "react";
import { Map } from "mapbox-gl";

const Mapbox = () => {
  const alive = useRef(true);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    alive.current = true;

    (async () => {
      await import("mapbox-gl/dist/mapbox-gl.css");
      const mapboxgl = (await import("mapbox-gl")).default;

      if (!alive.current) return;

      // @ts-ignore
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

      // @ts-ignore
      map.current = new mapboxgl.Map({
        container: "mapbox",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-122.667569, 45.523825], // starting position
        zoom: 15,
      });

      // @ts-ignore
      map.current.on("load", () => {});
    })();

    // @ts-ignore
    return () => {
      alive.current = false;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <section id="mapbox" style={{ height: "100%", backgroundColor: "#f2f2f2" }}>
      <p>Loading map...</p>
    </section>
  );
};

export default Mapbox;
