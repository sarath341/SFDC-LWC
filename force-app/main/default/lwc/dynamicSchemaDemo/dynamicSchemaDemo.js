import { LightningElement, api } from 'lwc';

export default class DynamicSchemaDemo extends LightningElement {
    @api objectApiName;
    @api recordId;
    fname="FirstName";//dynamic schema - it is not metadata aware
}