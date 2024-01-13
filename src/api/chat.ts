import { OpenAIClient, AzureKeyCredential, ChatRequestMessage } from "@azure/openai";
import { apiUrl, apiKey, GPT35TURBO, GPT35TURBO16K, ADA } from './configs';
const azureEndpoint = apiUrl;
const azureApiKey = apiKey;

const azureClient = new OpenAIClient(azureEndpoint, new AzureKeyCredential(azureApiKey));

export const getResponseAzureChat = async (prompt: string, model: string, fineTuring?: string): Promise<string> => {
    const azurePrompt: any =
        [{ role: 'system', content: fineTuring ? "Reply with markdown format: " + fineTuring : "Reply with markdown format: You are assistant, your name is Bugsy" }, { role: 'user', content: prompt }];
    if (!prompt) {
        return "Please enter a prompt.";
    }
    try {
        const result = await azureClient.getChatCompletions(model, azurePrompt);
        return result.choices[0].message?.content || "Sorry, something went wrong.";
    } catch (error) {
        console.error("Azure error:", error);
        return "Sorry, something went wrong.";
    }
};