// Utils functions

export function arrayToObject(array, key) {
   return array.reduce((obj, item) => {
     obj[item[key]] = item
     return obj
   }, {})
}

// Object.values alternative for flow (cf https://github.com/facebook/flow/issues/2221)
export function objectValues(obj) {
	return Object.keys(obj).map(key => obj[key]);
}

// https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
