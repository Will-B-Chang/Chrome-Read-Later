// For chrome.storage functions:
// https://developer.chrome.com/extensions/storage
export function remove(url) {
  chrome.storage.sync.remove(url)
}

export function get() {
  return new Promise(resolve => {
    chrome.storage.sync.get(resolve)
  })
}

// NOTICE: This returns an Array.
export async function sortByReversedDate() {
  const pages = await get()
  return Object.values(pages).sort((a, b) => b.date - a.date)
}

export async function getPosition(url) {
  const pages = await get()
  const page = pages[url]
  return {
    scrollTop: page.scrollTop,
  }
}

// The [key] feature is Computed Property Names.
// https://mdn.io/computed_property_names
export function set(page) {
  chrome.storage.sync.set({[page.url]: page})
}
