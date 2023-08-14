import { LightningElement, api } from 'lwc';
export default class ContactTable extends LightningElement {
    @api conList;
    previousTr; //undefined
    handleClick(event){
        //Checked to see whether previousTr contains something, if so, remove is-selected
        //if will check to see previousTr contains is not undefined or null or zero
        if(this.previousTr){
            this.previousTr.classList.remove("slds-is-selected");
        }
        //Get the reference of tr element
       const trRef = event.currentTarget;

       //Fetch the value of custom attribute data-sid using getAttribute()
       const sid = trRef.getAttribute('data-sid');
       console.log('You have clicked '+sid);

       //Apply CSS on tr
       trRef.classList.add("slds-is-selected")

       //Apply trRef to previousTr
       this.previousTr = trRef;
        
       const eventRef = new CustomEvent('contactclick', {detail:{conId: sid}});
       this.dispatchEvent(eventRef);
    }
}