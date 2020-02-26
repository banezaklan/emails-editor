namespace EmailsEditor {
    export class EmailAddress {
        address: string;

        constructor(public email) {
            this.address = email
        }
        validateSingleRawEmail(mail) {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        }
        get valid(): boolean {
            return this.validateSingleRawEmail(this.address);
        }
    }
}



