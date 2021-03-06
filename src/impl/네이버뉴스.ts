import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    document.querySelectorAll('#tooltipLayer_english, .u_cbox_layer_wrap').forEach((v) => {
        v.remove();
    });
}

export function parse(): Article {
    return {
        title: $('#articleTitle').text(),
        content: (() => {
            const content = document.querySelector('#articleBodyContents')!;
            const iframes = content.querySelectorAll('.vod_area iframe[_src]');
            if (iframes.length > 0) {
                iframes.forEach((v) => {
                    v.setAttribute('src', v.getAttribute('_src')!);
                });
            }
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: (() => {
                let created = $('.article_info .sponsor .t11').text();
                return new Date(created.replace(' ', 'T') + '+09:00'); // ISO 8601
            })(),
            lastModified: undefined
        },
    };
}
