import "../modules/tab.prototype.js"
import * as storage from "../modules/storage.js"
import * as tabs from "../modules/tabs.js"
import * as page from "../modules/page.js"
import * as event from "../modules/event.js"

event.setContextMenus()

event.onCommand(() => {
  tabs.current(tab => {
    if (tab.isEmpty()) return
    storage.setUnique(tab.getInfo())
    tab.setEmptyOrRemove()
  })
})

event.onClicked((info, tab) => {
  storage.setUnique(page.get(info, tab))
})