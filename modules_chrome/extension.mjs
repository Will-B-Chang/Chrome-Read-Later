// https://developer.chrome.com/extensions/commands#event-onCommand
// Promise only fired once, it's not suit able to this kind of listener.
// Unlike tabs.onComplete(), extension.onCommand() is a one-time setup.
export function onCommand(callback) {
  chrome.commands.onCommand.addListener(callback)
}

// https://developer.chrome.com/extensions/runtime#method-sendMessage
export function sendMessage(info) {
  chrome.runtime.sendMessage(info)
}

// https://developer.chrome.com/extensions/runtime#event-onMessage
export function onMessage(callback) {
  chrome.runtime.onMessage.addListener(callback)
}

// https://developer.chrome.com/extensions/contextMenus#event-onClicked
export function onClickedContextMenus(callback) {
  chrome.contextMenus.onClicked.addListener(callback)
}

// https://developer.chrome.com/extensions/contextMenus#method-create
export function createContextMenus(settings) {
  chrome.contextMenus.create(settings)
}

// https://developer.chrome.com/extensions/runtime#event-onInstalled
export function onInstalled(callback) {
  chrome.runtime.onInstalled.addListener(callback)
}