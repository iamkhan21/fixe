export interface GeolocationService {
  getCurrentPosition: () => Promise<GeolocationCoordinates>;
}
