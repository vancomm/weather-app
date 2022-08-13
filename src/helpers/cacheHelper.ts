import * as idb from "idb-keyval";
import { IDBCache } from "../types/IDBCache";
import { version, hoursUntilStale } from "../app/config";
import {
  ForecastData,
  LocationData,
  makeFailed,
  makeSuccessful,
  Optional,
  WeatherData,
} from "../types";
import addHours from "../utils/addHours";

export interface CacheKeyMap {
  counter: number;
  weather: WeatherData;
  forecast: ForecastData[];
  location: LocationData;
  geolocation: GeolocationCoordinates;
}

export type CacheKey = keyof CacheKeyMap;

async function get<K extends keyof CacheKeyMap, T extends CacheKeyMap[K]>(
  key: K
): Promise<Optional<T>> {
  const value: IDBCache<T> | undefined = await idb.get(key);

  if (!value) return makeFailed("No cached data");

  if (value.version !== version) {
    await del(key);
    return makeFailed("Cache version outdated");
  }

  const now = new Date();
  const staleTime = addHours(value.date, hoursUntilStale);

  if (now > staleTime) {
    await del(key);
    return makeFailed("Data stale");
  }

  return makeSuccessful(value.data);
}

async function set<K extends keyof CacheKeyMap, T extends CacheKeyMap[K]>(
  key: K,
  value: T
) {
  const cacheValue: IDBCache<T> = {
    date: new Date(),
    version,
    data: value,
  };
  return idb.set(key, cacheValue);
}

async function del<K extends keyof CacheKeyMap>(key: K) {
  return idb.del(key);
}

export { get, set, del };
