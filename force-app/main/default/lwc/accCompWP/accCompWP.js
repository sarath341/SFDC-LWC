import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountController.getAllAccounts'
export default class AccCompWP extends LightningElement {
@wire(getAllAccounts) accList;
}
