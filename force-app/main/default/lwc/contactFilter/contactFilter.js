import getAccounts from '@salesforce/apex/ContactController.getAccounts'
import { LightningElement, wire } from 'lwc';

export default class ContactFilter extends LightningElement {
    selectedAccountId = '';
    accountComboList=[];

    //define the event Handlers
    handleOnChange(event){
        this.selectedAccountId = event.target.value;
        console.log('You have selected '+this.selectedAccountId);
        const eventRef = new CustomEvent ('selectaccount',
        {
            detail: {accId: this.selectedAccountId}
        });
        this.dispatchEvent(eventRef);
    }

    @wire(getAccounts)
    wiredGetAccounts({data,error}){
        if(data){
            this.accountComboList = []; //as a best practice
            data.forEach((acc)=>{
                const obj = {
                    label: acc.Name,
                    value: acc.Id
                }
                this.accountComboList.push(obj);
            });
        }
    }
}