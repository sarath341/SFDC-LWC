import { LightningElement, wire } from 'lwc';
import getAllLeads from '@salesforce/apex/leadController.getAllLeads'
export default class LeadWP extends LightningElement {
    @wire(getAllLeads) leadList;
}