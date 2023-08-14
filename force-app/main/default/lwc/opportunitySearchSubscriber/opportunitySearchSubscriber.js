import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import IC from '@salesforce/messageChannel/PubChannel__c' 
import getOpps from '@salesforce/apex/PubSubController.getOpps'

export default class OpportunitySearchSubscriber extends LightningElement {
    @wire(MessageContext) msgContext;
    toSearch;
    oppList;
    connectedCallback(){
        subscribe(this.msgContext, IC,
            (message)=>{
                this.toSearch = message.searchText;
                console.log('From oppSearch Subscriber: '+this.toSearch);
                this.handleSearch();
            })
    }

    //Then Catch
    handleSearch() {
        getOpps({ toText: this.toSearch })
            .then((result) => {
                this.oppList = result;
                console.log('con Records: ' + JSON.stringify(this.oppList));
            })
            .catch((error) => {
                this.error = error;
                console.log('Error: ' + JSON.stringify(error));
            });
    }

    get isListEmpty() {
        return this.oppList || this.oppList.length === 0;
    }
}