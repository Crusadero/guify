import css from 'dom-css';

export default class Title {
    constructor (root, opts, theme) {
        this.opts = opts;

        var container = require('./partials/container')(root, opts.label)
        css(container, {
            //'font-size': '13px'
        });

        var background = container.appendChild(document.createElement('div'));
        css(background, {
            'box-sizing': 'border-box',
            width: '100%',
            display: 'inline-block',
            height: '20px',
            verticalAlign: 'top',
        });

        var label = background.appendChild(document.createElement('div'));
        label.innerHTML = `&#9632; ${opts.label} &#9632;`;
        css(label, {
            //color: theme.text1,
            display: 'inline-block',
            verticalAlign: 'sub',
            height: '20px',
            'line-height': '20px',
            //'box-shadow': `inset 0 0 0 1px ${theme.background2}`,
            'padding-left': '5px',
            'padding-right': '5px',
            //"font-weight": "bold",
            'background-color': theme.text2,
            'color': theme.background1
        });
    }
}
