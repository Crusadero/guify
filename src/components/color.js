import EventEmitter from 'wolfy87-eventemitter';
import ColorPicker from 'simple-color-picker';
import css from 'dom-css';
import tinycolor from 'tinycolor2';

import styles from '../scss/components/color.scss';

export default class Color extends EventEmitter {
    constructor (root, opts, theme, uuid) {
        super();
        this.opts = opts;

        opts.format = opts.format || 'rgb'
        opts.initial = opts.initial || '#123456'

        var container = require('./partials/container')(root, opts.label)
        require('./partials/label')(container, opts.label, theme)

        var icon = container.appendChild(document.createElement('span'))
        icon.className = 'guify-color-' + uuid

        var value = require('./partials/value')(container, '', theme, '46%')

        icon.onmouseover = () => {
            this.picker.$el.style.display = ''
        }

        var initial = opts.initial
        switch (opts.format) {
            case 'rgb':
                initial = tinycolor(initial).toHexString()
                break
            case 'hex':
                initial = tinycolor(initial).toHexString()
                break
            case 'array':
                initial = tinycolor.fromRatio({r: initial[0], g: initial[1], b: initial[2]}).toHexString()
                break
            default:
                break
        }

        this.picker = new ColorPicker({
            el: icon,
            color: initial,
            background: theme.background1,
            width: 125,
            height: 100
        })

        css(this.picker.$el, {
            marginTop: '20px',
            display: 'none',
            position: 'absolute'
        })

        css(icon, {
            position: 'relative',
            display: 'inline-block',
            width: '12.5%',
            height: '20px',
            backgroundColor: this.picker.getHexString()
        })

        icon.onmouseout = (e) => {
            this.picker.$el.style.display = 'none'
        }

        setTimeout(() => {
            this.emit('initialized', initial)
        })

        this.picker.onChange((hex) => {
            value.innerHTML = this.Format(hex)
            css(icon, {backgroundColor: hex})
            this.emit('input', this.Format(hex))
        })
    }

    Format(hex) {
        switch (this.opts.format) {
            case 'rgb':
                return tinycolor(hex).toRgbString()
            case 'hex':
                return tinycolor(hex).toHexString()
            case 'array':
                var rgb = tinycolor(hex).toRgb()
                return [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((x) => {
                    return x.toFixed(2)
                })
            default:
                return hex
        }
    }

    SetValue(value) {
        this.picker.setColor(value);
    }

    GetValue() {
        return this.Format(this.picker.getColor());
    }
}
