export interface CancellablePromise<T> {
  promise: Promise<T>;
  cancel: () => void;
}

function cancellablePromise<T>(promise: Promise<T>): CancellablePromise<T> {
  let isCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error) => reject({ isCanceled, error })
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCanceled = true;
    },
  };
}

export default cancellablePromise;
