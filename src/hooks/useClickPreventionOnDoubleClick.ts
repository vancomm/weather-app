import React from "react";
import delay from "../utils/delay";
import cancellablePromise from "../utils/cancellablePromise";
import useCancellablePromises from "./useCancellablePromises";

export default function useClickPreventionOnDoubleClick(
  onClick: (e: React.MouseEvent) => any,
  onDoubleClick: (e: React.MouseEvent) => any,
  delayMs = 300
) {
  const { append, remove, clear } = useCancellablePromises();

  const handleClick = (e: React.MouseEvent) => {
    clear();
    const waitForClick = cancellablePromise(delay(delayMs));
    append(waitForClick);

    return waitForClick.promise
      .then(() => {
        remove(waitForClick);
        onClick(e);
      })
      .catch((error) => {
        remove(waitForClick);
        if (!error.isCanceled) {
          throw error.error;
        }
      });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    clear();
    onDoubleClick(e);
  };

  return [handleClick, handleDoubleClick];
}
