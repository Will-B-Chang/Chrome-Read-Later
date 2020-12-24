import '../../modules/prototypes/Object.mjs'
import '../../modules/prototypes/String.mjs'
import * as request from './request.js'

class PageInfo {
  constructor(tab) {
    this.tab = tab

  get url() {
    return this.tab.pendingUrl || this.tab.url
  }

  get title() {
    return this.tab.title || this.url
  }

  get hasTitle() {
    return this.url !== this.title
      && this.url !== this.tab.pendingUrl
  }

  // https://www.google.com/search?q=test => https://www.google.com
  get favIconUrl() {
    const origin = new URL(this.url).origin
    return `chrome://favicon/size/16@2x/${origin}`
  }

  get date() {
    return Date.now()
  }

  get scrollTop() {
    return 0
  }

  get scrollPercent() {
    return this.percent(0)
  }

  percent(num) {
    return Math.floor(num * 100) + '%'
  }

  get scrollHeight() {
    return 0
  }
}

class PositionInfo extends PageInfo {
  constructor(tab, position) {
    super(tab)
    this.scroll = position.scroll
  }

  get scrollTop() {
    return this.scroll.top
  }

  get scrollHeight() {
    return this.scroll.height
  }

  get scrollPercent() {
    return this.percent(this.scroll.bottom / this.scroll.height)
  }
}

class SelectionInfo extends PageInfo {
  constructor(tab, selection) {
    super(tab)
    this.selection = selection
  }

  get url() {
    return this.selection.linkUrl
  }

  get title() {
    return this.selection.selectionText || this.url
  }

  get hasTitle() {
    return false
  }
}

function createPageInfo(tab, position, selection) {
  return selection.isEmpty()
    ? position.isEmpty()
      ? new PageInfo(tab)
      : new PositionInfo(tab, position)
    : new SelectionInfo(tab, selection)
}

export function initPageInfo({tab, position, selection}) {
  const page = createPageInfo(tab, position, selection)
  return {
    url:           page.url,
    title:         page.title,
    hasTitle:      page.hasTitle,
    favIconUrl:    page.favIconUrl,
    hasFavIconUrl: page.hasFavIconUrl,
    date:          page.date,
    scroll:        {
      top:     page.scrollTop,
      height:  page.scrollHeight,
      percent: page.scrollPercent,
    }
  }
}

export async function completePageInfo(page) {
  if (!page.hasTitle) page.title = await request.getTitle(page.url)

  delete page.hasTitle
  return page
}
