import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateAccountContactForm extends LightningElement {
    @track accountName = '';
    @track contactFirstName = '';
    @track contactLastName = '';
    @track contactEmail = '';
    @track accountWebsite = '';
    @track contactPhoneNumber = '';
    @track file;

    handleAccountNameChange(event) {
        this.accountName = event.target.value;
    }

    handleContactFirstNameChange(event) {
        this.contactFirstName = event.target.value;
    }

    handleContactLastNameChange(event) {
        this.contactLastName = event.target.value;
    }

    handleContactEmailChange(event) {
        this.contactEmail = event.target.value;
    }

    handleAccountWebsiteChange(event) {
        this.accountWebsite = event.target.value;
    }

    handleContactPhoneNumberChange(event) {
        this.contactPhoneNumber = event.target.value;
    }

    handleFileChange(event) {
        this.file = event.target.files[0];
    }

    handleSave() {
        // Perform Save action here and navigate to the newly created contact record page
        const fields = {
            'Name': this.accountName,
            'Website': this.accountWebsite
        };

        createRecord({ apiName: 'Account', fields })
            .then((account) => {
                this.accountId = account.id;
                const fields = {
                    'FirstName': this.contactFirstName,
                    'LastName': this.contactLastName,
                    'Email': this.contactEmail,
                    'Phone': this.contactPhoneNumber,
                    'AccountId': this.accountId
                };
                return createRecord({ apiName: 'Contact', fields });
            })
            .then((contact) => {
                this.showToast('Success', 'Record saved successfully', 'success');
                this.navigateToContactPage(Contact.id);
            })
            .catch((error) => {
                this.showToast('Error creating record', error.body.message, 'error');
            });
    }

    handleSaveAndNew() {
        // Perform Save action here and open a new form for creating another Account and Contact
        const fields = {
            'Name': this.accountName,
            'Website': this.accountWebsite
        };

        createRecord({ apiName: 'Account', fields })
            .then((account) => {
                this.accountId = account.id;
                const fields = {
                    'FirstName': this.contactFirstName,
                    'LastName': this.contactLastName,
                    'Email': this.contactEmail,
                    'Phone': this.contactPhoneNumber,
                    'AccountId': this.accountId
                };
                return createRecord({ apiName: 'Contact', fields });
            })
            .then((contact) => {
                this.showToast('Success', 'Record saved successfully', 'success');
                this.clearFormFields();
            })
            .catch((error) => {
                this.showToast('Error creating record', error.body.message, 'error');
            });
    }

    handleCancel() {
        // Clear input fields on Cancel
        this.clearFormFields();
    }

    navigateToContactPage(contactId) {
        // Example navigation to the newly created contact page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: contactId,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    clearFormFields() {
        this.accountName = '';
        this.contactFirstName = '';
        this.contactLastName = '';
        this.contactEmail = '';
        this.accountWebsite = '';
        this.contactPhoneNumber = '';
        this.file = null;
    }
}



