import { LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/ConController.getContacts';
export default class ContactSearchParent extends LightningElement {
    toSearch='';
    conList;
    emptyList;
    error;
    handleContactClick(event) {
        this.toSearch = event.detail.toSearch;
        console.log('Receieved event from Child: ' + this.toSearch);
        if(this.toSearch != null){
            this.emptyList = null;
            this.handleSearch();
        }
        else{
            this.emptyList = 'Empty';
        } 
    }
    handleSearch() {
        getContacts({ toSearch: this.toSearch })
            .then((result) => {
                this.conList = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.conList = undefined;
                
            });
    }
}