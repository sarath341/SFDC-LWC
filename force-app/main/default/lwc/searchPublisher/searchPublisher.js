import { LightningElement, wire } from 'lwc';
import { publish,MessageContext } from 'lightning/messageService';
import IC from '@salesforce/messageChannel/PubChannel__c';
export default class SearchPublisher extends LightningElement {
    @wire(MessageContext) msgContext;
    toSearch;

    handleValue(event){
        this.toSearch = event.target.value;
    }

    handleClick(){
        publish(this.msgContext, IC, {searchText : this.toSearch});
    }
}