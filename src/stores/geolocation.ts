import { atom } from "nanostores";

type GeolocationData = GeolocationCoordinates | null;

export const geolocationData = atom<GeolocationData>(null);

export function setGeolocation(geolocation: GeolocationData) {
  geolocationData.set(geolocation);
}

type GeolocationError = { message: string };

export const geolocationError = atom<GeolocationError>();

export function setGeolocationError(error: GeolocationError) {
  geolocationError.set(error);
}
