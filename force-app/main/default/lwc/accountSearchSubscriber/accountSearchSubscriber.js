import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import IC from '@salesforce/messageChannel/PubChannel__c'
import getAccounts from '@salesforce/apex/PubSubController.getAccounts'
export default class AccountSearchSubscriber extends LightningElement {
    @wire(MessageContext) msgContext;
    toSearch = '';
    accList;
    connectedCallback() {
        subscribe(this.msgContext, IC,
            (message) => {
                this.toSearch = message.searchText;
                console.log('From accSearch Subscriber: ' + this.toSearch);
                this.handleSearch();
            })
    }
    /* //Wire with property
        @wire(getAccounts, {this.toSearch})
        accList;
    */

    //Then Catch

    handleSearch() {
        getAccounts({ toText: this.toSearch })
            .then((result) => {
                this.accList = result;
                console.log('Acc Records: ' + JSON.stringify(this.accList));
            })
            .catch((error) => {
                this.error = error;
                console.log('Error: ' + JSON.stringify(error));
            });
    }
    get isListEmpty() {
        return !this.accList || this.accList.length === 0;
    }
}