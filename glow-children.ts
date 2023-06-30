import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('glow-children')
export class GlowChildren extends LitElement {
    render() {
        return html`
            <div class="glow-child">
                <slot></slot>
            </div>
        `
    }

    static styles = css`
        .glow-child {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: transparent;
            color: #ffffff;
            filter: drop-shadow(0px 0px 10px #ffffff);
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'glow-children': GlowChildren
    }
}
