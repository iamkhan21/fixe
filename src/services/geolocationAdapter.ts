import { GeolocationService } from "@services/ports";

export function geolocationAdapter(): GeolocationService {
  return {
    getCurrentPosition(): Promise<GeolocationCoordinates> {
      if (!("geolocation" in navigator))
        throw new Error("Geolocation is not supported");

      const options = {
        enableHighAccuracy: true,
        timeout: 5_000,
      };

      return new Promise((resolve, reject) => {
        function success(pos: GeolocationPosition) {
          resolve(pos.coords);
        }

        function error(err: GeolocationPositionError) {
          reject(err);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      });
    },
  };
}
