
namespace EmailsEditor {

    export class Main {
        emailAddresses: EmailAddress[];
        parentContainer:HTMLElement;
        editorComponent: EmailsEditorComponent;
        sharedContentName: string;
        private _onChangeCB;
        constructor(public container:HTMLElement, public options) {
            this.emailAddresses = [];
            this.parentContainer = container;
            this.sharedContentName = options.sharedContentName;
            this.render();
        }
        render() {
            if (!this.editorComponent) {
                this.editorComponent = new EmailsEditorComponent(this.sharedContentName);
                this.parentContainer.appendChild(this.editorComponent);

                this.editorComponent.addEventListener('newRawEmailAdded', e => {
                    this.emailAddresses.push(new EmailAddress((<CustomEvent>e).detail));
                    this.fireChangeCb();
                    this.render();
                }, false);
                this.editorComponent.addEventListener('addEmail', e => {
                    this.emailAddresses.push(new EmailAddress(this.getRandomEmail()));
                    this.fireChangeCb();
                    this.render();
                });
                this.editorComponent.addEventListener('getEmailCount', e => {
                    alert('There are '+this.getEmailsCount()+' valid emails.')
                });
                this.editorComponent.addEventListener('deleteLastAdded', e => {
                    this.deleteLastAddedAddress();
                    this.fireChangeCb();
                    this.render();
                });
            } else {
                this.editorComponent.removeAllEmailAddresses();
            }
            this.emailAddresses.forEach((item, i) => {
                var newChip = new EmailAddressChipComponent(item);
                newChip.addEventListener('emailChipDelete',e => {
                    console.log((<EmailAddressChipComponent>(<CustomEvent>e).detail).componentValue);
                    this.removeEmailFromList((<EmailAddressChipComponent>(<CustomEvent>e).detail).componentValue.address);
                    this.render();
                });
                this.editorComponent.addEmailAddress(newChip);
            });
        }

        removeEmailFromList(addressToRemove) {
            this.emailAddresses = this.emailAddresses.filter(function( obj ) {
                return obj.address !== addressToRemove;
            });
            this.fireChangeCb();
        }

        getRandomEmail() {
            const strValues="abcdefg12345";
            let strEmail = "";
            let strTmp;
            for (let i=0;i<10;i++) {
                strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
                strEmail = strEmail + strTmp;
            }
            strTmp = "";
            strEmail = strEmail + "@";
            for (let j=0;j<8;j++) {
                strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
                strEmail = strEmail + strTmp;
            }
            strEmail = strEmail + ".com";
            return strEmail;
        }

        getEmailsCount() {
            let validEmails = this.emailAddresses.filter(function( obj ) {
                return obj.valid;
            });
            return validEmails.length;
        }

        deleteLastAddedAddress() {
            if (this.emailAddresses.length>0) {
                this.emailAddresses.pop();
                this.fireChangeCb();
            }
        }

        getEmails(): EmailAddress[] {
            return this.emailAddresses;
        }
        addEmails(items: EmailAddress[]) {
            items.forEach(item=>{
                this.emailAddresses.push(item);
            });
            this.fireChangeCb();
        }
        setEmails(items: EmailAddress[]) {
            this.emailAddresses = [];
            if (items.length>0) {
                this.addEmails(items);
            }
            this.fireChangeCb();
        }
        fireChangeCb() {
            if (this._onChangeCB instanceof  Function) {
                this._onChangeCB(this.emailAddresses);
            }
        }
        subscribeToChanges(cb) {
            if (cb instanceof Function) {
                this._onChangeCB = cb;
            }
        }
    }
}

