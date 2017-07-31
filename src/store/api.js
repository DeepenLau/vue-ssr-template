export function fetchItem (id) {
  return Promise.resolve('item:' + id * 2)
}
export function fetchTitle (title) {
  return Promise.resolve(title)
}
