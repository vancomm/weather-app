const geoDbErrorCodes = [
  "ACCESS_DENIED",
  "ENTITY_NOT_FOUND",
  "INCOMPATIBLE",
  "PARAM_INVALID",
  "PARAMS_MUTUALLY_EXCLUSIVE",
  "REQUEST_UNPROCESSABLE",
] as const;

export type GeoDbErrorCode = typeof geoDbErrorCodes[number];

export interface GeoDbError {
  code: string;
  message: string;
}

export interface GeoDbErrorResponse {
  errors: GeoDbError[] | undefined;
}
