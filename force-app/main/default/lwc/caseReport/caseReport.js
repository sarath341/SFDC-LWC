import { LightningElement, wire } from 'lwc';
import getAllCase from '@salesforce/apex/CaseController.getAllCase'
export default class CaseReport extends LightningElement {
    selectedCaseId;
    @wire(getAllCase) caseList;

    handleClick(event) {
        //Checked to see whether previousTr contains something, if so, remove is-selected
        //if will check to see previousTr contains is not undefined or null or zero
        if(this.previousTr){
            this.previousTr.classList.remove("slds-is-selected");
        }

        //Get the reference of tr element
        const trRef = event.currentTarget;

        //Fetch the value of custom attribute data-sid using getAttribute()
        this.selectedCaseId = trRef.getAttribute('data-sid');
        console.log('The Selected Id is ' + this.selectedCaseId);

        //Apply CSS on tr
       trRef.classList.add("slds-is-selected");

       //Apply trRef to previousTr
       this.previousTr = trRef;
    }
}