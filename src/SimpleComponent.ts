namespace EmailsEditor {
    export class SimpleComponent extends HTMLElement {
        constructor() {
            super();
        }

        protected generateUniqueId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        }
    }
}
