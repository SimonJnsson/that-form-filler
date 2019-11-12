function setupContextMenu() {
    chrome.contextMenus.create({
        id: 'fill-current-form',
        title: "Fill current form",
        contexts: ["all"],
    });

    chrome.contextMenus.onClicked.addListener(() => onContextMenuClick());
}

function onContextMenuClick() {
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            functionToInvoke: "fillFocusedForm"
        });
    });
}

setupContextMenu();
