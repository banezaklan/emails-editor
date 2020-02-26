/// <reference path="SimpleComponent.ts" />

namespace EmailsEditor {
    export class EmailsEditorComponent extends SimpleComponent {
        sharedContentName: string;
        constructor( sharingWhat: string ) {
            super();
            this.id = this.generateUniqueId()+'-email-editor-component';
            this.sharedContentName = sharingWhat;
            this.render();
        }

        render() {
            this.innerHTML = `
<div class="emails-editor-container">
    <div class="header">
        <div class="header-title">
          Share <span style="font-weight: bold;">${this.sharedContentName}</span> with others
        </div>
        <div id="${this.id}" class="editor-wrapper">
          <span id="${this.id}-chip-wrapper"></span>
          <input id="${this.id}-input" type="text" class="email-input-field" placeholder="add more people..."/>
        </div>    
    </div>
    <div class="actions">
      <button class="button" id="${this.id}-editor-add-email-button">Add email</button>
      <button class="button" id="${this.id}-editor-count-emails-button">Get emails count</button>          
    </div>
</div>
`;
        }

        addEmailAddress( elem: HTMLElement ) {
            document.getElementById(this.id+"-chip-wrapper").appendChild(elem);
        }

        removeAllEmailAddresses() {
            document.getElementById(this.id+"-chip-wrapper").innerHTML = '';
        }

        connectedCallback() {
            let inputElem = document.getElementById(this.id+"-input");
            inputElem.addEventListener(
                'keyup',
                (e) => {
                    var newVal = this.getInputValue();
                    if (newVal===',') {
                        newVal = '';
                        this.resetInputValue();
                    }
                    if (newVal!=='' && (e.code.toLowerCase() === 'enter' || e.code.toLowerCase() === 'comma')) {
                        if (e.code.toLowerCase() === 'comma') {
                            newVal = newVal.slice(0, -1);
                        }
                        this.processSubmit(newVal);
                    } else if (newVal==='' && e.code.toLowerCase() === 'backspace') {
                        this.dispatchEvent( new CustomEvent('deleteLastAdded', { detail: '' }));
                    } else if ( e.code.toLowerCase() === 'keyv' && e.ctrlKey ) {
                        if (newVal.indexOf(',')!==-1) {
                            let arr = newVal.split(',');
                            arr.forEach(item=>{
                                item = item.replace(' ','');
                                this.processSubmit(item);
                            })
                        }
                    }
                    console.log(e);
                    // console.log(this.getInputValue());
                },
                false
            );
            inputElem.addEventListener('keypress',e=>{
              if(e.code.toLowerCase()==='space'){
                  e.preventDefault()
              }
            });
            inputElem.addEventListener('keypress',e=>{
                if(e.code.toLowerCase()==='space'){
                    e.preventDefault()
                }
            });
            inputElem.addEventListener('blur', e=>{
                let newVal = this.getInputValue();
                if (newVal!=='') {
                    this.processSubmit(this.getInputValue());
                }

            });
            document.getElementById(this.id+"-editor-add-email-button").addEventListener('click',e=>{
                this.dispatchEvent( new CustomEvent('addEmail', { detail: '' }));
            });
            document.getElementById(this.id+"-editor-count-emails-button").addEventListener('click',e=>{
                this.dispatchEvent( new CustomEvent('getEmailCount', { detail: '' }));
            });
        }

        getInputValue() {
            return (<HTMLInputElement>document.getElementById(this.id+"-input")).value;
        }

        resetInputValue() {
            (<HTMLInputElement>document.getElementById(this.id+"-input")).value = '';
        }

        processSubmit(newRawValue) {
            this.dispatchEvent( new CustomEvent('newRawEmailAdded', { detail: newRawValue }));
            this.resetInputValue();
        }

    }
    customElements.define("emails-editor-component", EmailsEditorComponent);
}

