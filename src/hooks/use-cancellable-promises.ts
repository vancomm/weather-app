import { useRef } from "react";
import { CancellablePromise } from "../utils/cancelable-promise";

export default function useCancellablePromises() {
  const pending = useRef<CancellablePromise<any>[]>([]);

  const append = (promise: CancellablePromise<any>) => {
    pending.current = [...pending.current, promise];
  };

  const remove = (promise: CancellablePromise<any>) => {
    pending.current = pending.current.filter((p) => p !== promise);
  };

  const clear = () => pending.current.forEach((p) => p.cancel());

  return {
    append,
    remove,
    clear,
  };
}
