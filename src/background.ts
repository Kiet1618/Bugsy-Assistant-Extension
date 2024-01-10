chrome.contextMenus.create({
    id: "summary",
    title: "Summary Context",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "summary") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
            if (tabs && tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { text: info.selectionText }, (response) => {
                    console.log(response);
                });
            }
        }
        );
    }
});
