export type Successful<T> = {
  success: true;
  value: T;
};

export type Failed = {
  success: false;
  message: string;
};

export type Optional<T> = Successful<T> | Failed;

export function isSuccessful<T>(option: Optional<T>): option is Successful<T> {
  return option.success;
}

export function makeSuccessful<T>(value: T): Successful<T> {
  return { success: true, value };
}

export function makeFailed(message: string): Failed {
  return { success: false, message };
}

export function handleOption<T>(
  handleSuccess: (value: T) => any,
  handleFail: (message: string) => string | undefined | void | null
) {
  return (option: Optional<T>): Optional<T> =>
    isSuccessful(option)
      ? makeSuccessful(handleSuccess(option.value))
      : makeFailed(handleFail(option.message) ?? "");
}
