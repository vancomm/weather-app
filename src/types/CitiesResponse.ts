export interface CitiesErrorResponse {
  message: string;
}

const ErrorCodes = [
  "ACCESS_DENIED",
  "ENTITY_NOT_FOUND",
  "INCOMPATIBLE",
  "PARAM_INVALID",
  "PARAMS_MUTUALLY_EXCLUSIVE",
  "REQUEST_UNPROCESSABLE",
] as const;

export type ErrorCode = typeof ErrorCodes[number];

interface Error {
  code: ErrorCode;
  message: string;
}

interface BaseResponse {
  errors: Error[] | undefined;
}

interface Link {
  href: string;
  rel: string;
}

interface Metadata {
  currentOffset: number;
  totalOffset: number;
}

interface BaseCollectionResponse extends BaseResponse {
  links: Link[];
  metadata: Metadata;
}

const populatedPlaceTypes = ["ADM2", "CITY"];

type PopulatedPlaceType = typeof populatedPlaceTypes[number];

export interface PopulatedPlaceSummary {
  country: string;
  countryCode: string;
  distance: number;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  type: PopulatedPlaceType;
  wikiDataId: string;
}

export interface PopulatedPlacesResponse extends BaseCollectionResponse {
  data: PopulatedPlaceSummary[];
}
