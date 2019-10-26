import "./prototype.js";
import * as storage from "./storage.js";
import * as tabs from "./tabs.js";
import * as page from "./page.js";
import * as event from "./event.js";

event.onInstalled(() => {
  chrome.contextMenus.create({
    title: 'Read later',
    contexts: ['link'],
    id: 'read-later',
  });
});

chrome.commands.onCommand.addListener(command => {
  if (command === 'read-later') {
    tabs.current(aTab => {
      if (aTab.isEmpty()) return;
      storage.uniqueSet(tabs.get(aTab));
      tabs.set(aTab.id)
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== 'read-later') return;
  storage.uniqueSet(page.get(info, tab));
});
