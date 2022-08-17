import { makeFailed, makeSuccessful, Optional } from "../types";

export default async function getGeolocation() {
  if (!navigator.geolocation) return makeFailed("Geolocation anavailable");
  return new Promise<Optional<GeolocationCoordinates>>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(makeSuccessful(position.coords)),
      () => resolve(makeFailed("Location access blocked")),
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}
