import { setGeolocation, setGeolocationError } from "@stores/geolocation";
import { throttle } from "@utils/helpers";
import { geolocationAdapter } from "@services/geolocationAdapter";

function convertGeolocationErrorToHR(error: GeolocationPositionError): string {
  switch (error.code) {
    case 1:
      return "App can't get location info. The acquisition of the geolocation information failed because the page didn't have the permission to do it.";
    case 2:
      return "App can't get location info. The acquisition of the geolocation failed because at least one internal source of position returned an internal error.";
    case 3:
      return "App can't get location info. The time allowed to acquire the geolocation was reached before the information was obtained.";
    default:
      return "App can't get location info. Unknown error.";
  }
}

const setLocation = throttle((pos: GeolocationCoordinates) => {
  setGeolocation(pos);
}, 15_000);

const setLocationError = throttle((error: GeolocationPositionError) => {
  const message = convertGeolocationErrorToHR(error);
  setGeolocationError({ message });
}, 60_000);

async function requestCurrentGeolocation() {
  geolocationAdapter()
    .getCurrentPosition()
    .then(setLocation)
    .catch(setLocationError);
}

export function initGeolocationTracking() {
  requestCurrentGeolocation();
  const interval = setInterval(requestCurrentGeolocation, 20_000);
  return () => {
    clearInterval(interval);
  };
}
