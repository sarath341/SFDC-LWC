import { api, LightningElement } from 'lwc';

export default class CustomLightningRecordForm extends LightningElement {
    @api objectApiName;
    @api recordId;
}