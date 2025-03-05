import { definePlugin } from '@/core';
import {
    type ChatPostMessageArguments,
    WebClient,
} from '@slack/web-api';

export type Args = Partial<ChatPostMessageArguments>;

export default definePlugin(() => {
    const webClient = new WebClient('xoxb-8424122085878-8525032594642-ElhJVL6kJzM54LaMHljTAiEK');

    async function send(args: Args) {
        webClient.chat.postMessage({
            ...args as ChatPostMessageArguments,
            channel: 'C08FEJVDZGB',
        });
    }

    return { send };
});
