import { getCdnPath } from '@/helpers';

import type { Args } from '../slack-notify';

type ReaderScreenReader = {
    url: string;
    message: string;
    imageName: string;
}

export default function readerScreenErrorMessage({ imageName, url, message }: ReaderScreenReader): Args {
    return {
        blocks: [
            {
                'type': 'header',
                'text': {
                    'type': 'plain_text',
                    'text': 'Crawler error',
                    'emoji': true,
                },
            },
            {
                'type': 'section',
                'text': {
                    'type': 'mrkdwn',
                    'text': 'Não foi possível obter as informações do produto',
                },
            },
            {
                'type': 'divider',
            },
            {
                'type': 'context',
                'elements': [
                    {
                        'type': 'mrkdwn',
                        'text': url,
                    },
                    {
                        'type': 'image',
                        'image_url': getCdnPath(imageName, 'small'),
                        'alt_text': 'Shopee',
                    },
                    {
                        'type': 'plain_text',
                        'text': 'Shopee',
                        'emoji': true,
                    },
                ],
            },
            {
                'type': 'rich_text',
                'elements': [
                    {
                        'type': 'rich_text_preformatted',
                        'elements': [
                            {
                                'type': 'text',
                                'text': message,
                            },
                        ],
                    },
                ],
            },
        ],
    };
}
