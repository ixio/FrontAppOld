// Utils functions

export function arrayToObject(array, key) {
   return array.reduce((obj, item) => {
     obj[item[key]] = item
     return obj
   }, {})
}
