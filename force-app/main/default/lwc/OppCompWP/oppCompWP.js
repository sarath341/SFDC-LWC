import { LightningElement, wire } from 'lwc';
import getAllOpportunities from '@salesforce/apex/OpportunityController.getAllOpportunities';
export default class OppCompWP extends LightningElement {
//Wire the Apex Method to a Property
@wire(getAllOpportunities) oppList;
//oppList contains 2 Server Injected Properties
//1. Data - upon successfull call, Contains the data coming from the apex method
//2. error -  If any Exception is there the info will get stored
//access data and/or error using oppList.data and oppList.error

}
