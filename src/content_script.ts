import { getResponseAzureChat } from "./api/chat";
import { GPT35TURBO16K } from './api/configs';
//content_script.ts

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    const res = await getResponseAzureChat(message.text, GPT35TURBO16K, "Summary this content");
    const dialog = document.createElement('div');
    dialog.innerHTML = res ? res : "Sorry, something went wrong.";
    dialog.style.position = 'fixed';
    dialog.style.width = '400px';
    dialog.style.maxHeight = '400px';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = 'white';
    dialog.style.zIndex = '9999';
    dialog.style.fontSize = '16px';
    dialog.style.borderRadius = '5px';
    dialog.style.padding = '20px';
    dialog.style.boxSizing = 'border-box';
    dialog.style.border = '1px solid #ccc';
    dialog.style.paddingTop = '10px';
    dialog.style.overflowY = 'auto';

    const close = document.createElement('button');
    close.style.position = 'absolute';
    close.style.top = '10px';
    close.style.right = '10px';
    close.style.border = 'none';
    close.style.backgroundColor = 'transparent';
    close.style.cursor = 'pointer';
    close.innerHTML = 'X';
    close.style.fontSize = '16px';
    close.style.color = 'red';


    close.onclick = () => {
        document.body.removeChild(dialog);
    };

    dialog.appendChild(close);

    // Append dialog to body
    document.body.appendChild(dialog);

    // response to popup
    // sendResponse({ farewell: "goodbye" });

});


