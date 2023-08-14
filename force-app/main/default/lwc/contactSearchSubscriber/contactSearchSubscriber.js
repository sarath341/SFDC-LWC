import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import IC from '@salesforce/messageChannel/PubChannel__c'
import getContacts from '@salesforce/apex/PubSubController.getContacts'

export default class ContactSearchSubscriber extends LightningElement {
    @wire(MessageContext) msgContext;
    toSearch='';
    conList;
    connectedCallback(){
        subscribe(this.msgContext, IC, 
            (message)=>{
                this.toSearch = message.searchText;
                console.log('From conSearch Subscriber: '+this.toSearch);
                this.handleSearch();
            })
    }

    //Then Catch

    handleSearch() {
        getContacts({ toText: this.toSearch })
            .then((result) => {
                this.conList = result;
                console.log('con Records: ' + JSON.stringify(this.conList));
            })
            .catch((error) => {
                this.error = error;
                console.log('Error: ' + JSON.stringify(error));
            });
    }

    get isListEmpty() {
        return !this.conList || this.conList.length === 0;
    }
}