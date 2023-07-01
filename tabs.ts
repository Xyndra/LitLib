import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('tab-holder')
export class TabHolder extends LitElement {
    @property({ type: Number })
    activeTab = 0;

    slot_holder: NodeListOf<Tab> | undefined;


    async firstUpdated() {
        await this.updateComplete;
        this.slot_holder = this.querySelectorAll('tab-')!;
        console.log(this.slot_holder);
        // Now that child nodes have been assigned to slots, you can safely access them.
        this.slot_holder.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.activeTab = index;
                console.log(this.activeTab);
            });
            tab.active = index === this.activeTab;
        });
    }

    async disconnectedCallback() {
        await this.updateComplete;
        super.disconnectedCallback();
        this.slot_holder!.forEach((tab, index) => {
            tab.removeEventListener('click', () => {
                this.activeTab = index;
            });
        });
    }

    render() {
        this.slot_holder?.forEach((tab, index) => {
            tab.active = index === this.activeTab;
        });

        return html`
            <slot></slot>
        `;
    }
}

@customElement('tab-')
export class Tab extends LitElement {
    @property({ type: Boolean })
    active = false;

    render() {
        console.log(this.active);
        return html`
            <slot name="activator"></slot>
            <slot style="visibility: ${this.active ? 'visible' : 'hidden'}"></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'tab-holder': TabHolder;
        'tab-': Tab;
    }
}
