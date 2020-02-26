/// <reference path="SimpleComponent.ts" />

namespace EmailsEditor {
    export class EmailAddressChipComponent extends SimpleComponent {
        componentValue: EmailAddress;

        constructor(public fieldValue: EmailAddress) {
            super();
            this.componentValue = fieldValue;
            this.id = this.generateUniqueId() + '-email-address-chip-component';
            this.render()
        }

        render() {
            this.innerHTML =
                `<div class="chip" id="${this.id}">
              <span id="${this.id}-email-address-text">${this.componentValue.address}</span>
              <span class="closebtn" id="${this.id}-delete-email-chip">&times;</span>
            </div>`;
        }

        connectedCallback() {
            var elem = document.getElementById(this.id + "-email-address-text");
            var self = this;
            if (!this.componentValue.valid) {
                elem.classList.add('bad-email')
            }
            document.getElementById(this.id + "-delete-email-chip").addEventListener('click', (e) => {
                console.log(e);
                self.dispatchEvent(new CustomEvent('emailChipDelete', {detail: self}));
            })
        }

    }
    customElements.define("email-address-chip", EmailAddressChipComponent);
}
