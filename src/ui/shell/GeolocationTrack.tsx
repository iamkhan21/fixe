import React, { useEffect } from "react";
import { initGeolocationTracking } from "@application/geolocation";
import { useStore } from "@nanostores/react";
import { geolocationError } from "@stores/geolocation";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";

const GeolocationTrack = () => {
  const modals = useModals();
  const error = useStore(geolocationError);

  useEffect(() => {
    return initGeolocationTracking();
  }, []);

  useEffect(() => {
    let id: string;

    if (error) {
      id = modals.openModal({
        title: "Geolocation error",
        centered: true,
        children: <Text size="sm">{error.message}</Text>,
      });
    }

    return () => {
      id && modals.closeModal(id);
    };
  }, [error]);

  return null;
};

export default GeolocationTrack;
