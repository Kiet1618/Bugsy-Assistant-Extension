import { GPT35TURBO16K } from './api/configs';
import { apiKey } from "./api/configs";
//content_script.ts
import Markdown from 'react-markdown'



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    (async () => {
        const apiUrl = "https://sunhackathon5.openai.azure.com/openai/deployments/GPT35TURBO16K/chat/completions?api-version=2023-12-01-preview";
        const azurePrompt = {
            messages: [
                { role: 'system', content: "Summary of content" },
                { role: 'user', content: "Summary of " + message.text }
            ]
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(azurePrompt),
        };

        try {
            const response = await fetch(apiUrl, requestOptions);

            if (!response.ok) {
                throw new Error("Request failed with status: " + response.status);
            }

            const data = await response.json();
            const res = data.choices[0].message?.content || "Sorry, something went wrong.";

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
            dialog.style.borderRadius = '10px';
            dialog.style.padding = '40px 30px';
            dialog.style.boxSizing = 'border-box';
            dialog.style.border = '1px solid #ccc';
            dialog.style.paddingTop = '50px';
            dialog.style.overflowY = 'auto';

            const title = document.createElement('div');
            title.style.position = 'fixed';
            title.innerHTML = 'Bugsy Summary';
            title.style.textAlign = 'center';
            title.style.top = '5px';
            title.style.fontSize = '20px';
            title.style.fontWeight = 'bold';
            title.style.padding = '10px 0px';
            title.style.textAlign = 'center';

            const close = document.createElement('button');
            close.style.position = 'fixed';
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
            dialog.appendChild(title);

            // Append dialog to body
            document.body.appendChild(dialog);

            // response to popup
            // sendResponse({ farewell: "goodbye" });

        } catch (error) {

            // Handle the error as needed
        }
    })();
    return true;
});

