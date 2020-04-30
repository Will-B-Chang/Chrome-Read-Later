// jQuery is conflict with prototype, this way works.
// Check empty object: https://stackoverflow.com/a/32108184/9984029
Object.defineProperty(Object.prototype, 'isEmpty', {
  value: function () {
    return Object.entries(this).length === 0 && this.constructor === Object
  },
  enumerable: false
})

Object.defineProperty(String.prototype, 'isHttp', {
  value: function () {
    return this.slice(0, 4) === 'http'
  },
  enumerable: false
})

Object.getPrototypeOf(localStorage).getArray = function (key) {
  return JSON.parse(localStorage.getItem(key) || '[]')
}

Object.getPrototypeOf(localStorage).setArray = function (key, item) {
  const items = this.getArray(key)
  items.push(item)
  this.setItem(key, JSON.stringify(items))
}

Object.getPrototypeOf(localStorage).popArray = function (key) {
  const items = this.getArray(key)
  const item = items.pop()
  this.setItem(key, JSON.stringify(items))
  return item
}
