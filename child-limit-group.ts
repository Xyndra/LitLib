import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("child-limit-group")
export class ChildLimitGroup extends LitElement {

    /**
     *  The maximum number of children allowed in the group.
     *  If 0, there is no limit.
    */
    @property({ type: Number })
    max = 0;

    shown: number[] = [];

    @property({ type: Boolean })
    default_hidden = true;

    slot_holder: NodeListOf<HTMLElement> | undefined;

    show_child(index: number) {
        if (this.shown.includes(index)) return;
        this.shown.push(index);
        if (this.max > 0 && this.shown.length > this.max) {
            this.slot_holder![this.shown.shift()!].style.display = 'none';
        }
        this.slot_holder![index].style.display = '';
    }

    mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            this.slot_holder!.forEach((child, index) => {
                if (child.isEqualNode(mutation.target) && child.style.display !== 'none') {
                    this.show_child(index);
                }
            });
        });
    });

    async firstUpdated() {
        await this.updateComplete;
        this.slot_holder = this.childNodes as NodeListOf<HTMLElement>;
        console.log(this.slot_holder);
        this.slot_holder.forEach((child, index) => {
            if (!child || !child.style) return;
            this.show_child(index);
            this.mutationObserver.observe(child, { attributes: true, attributeFilter: ['style'] });
        });
    }

    render() {
        return html`
            <slot></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "child-limit-group": ChildLimitGroup;
    }
}