import FirstName from '@salesforce/schema/Contact.FirstName'; //Static Schema
import LastName from '@salesforce/schema/Contact.LastName';//This is meta data aware
import { LightningElement , api} from 'lwc';

export default class StaticSchemaDemo extends LightningElement {
    @api objectApiName;
    @api recordId;
    
    fname = FirstName;
    lname = LastName;
}