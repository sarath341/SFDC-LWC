import MailingCity from '@salesforce/schema/Contact.MailingCity';
import MailingCountry from '@salesforce/schema/Contact.MailingCountry';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { LightningElement, api, wire } from 'lwc';
const fields = [MailingCity, MailingCountry];
export default class ContactMap extends LightningElement {
    @api selectedContactId;
    contactMapMarkers = [];//assign this as an empty array

    connectedCallback() {
        console.log();
    }

    //We cannot declare variables or constant inside the class
    //they can only appear inside methods(functions)
    @wire(getRecord, { recordId: '$selectedContactId', fields })
    loadContactMap({ data, error }) {
        if (data) {
            console.log('data ' + JSON.stringify(data));
            const City = getFieldValue(data, MailingCity);
            const Country = getFieldValue(data, MailingCountry);

            this.contactMapMarkers = [{
                location: { City, Country },
                title: 'Contact Details',
                description: `You are currently looking into ${City} whick is in ${Country}`
            }
            ];
        }
    }
}