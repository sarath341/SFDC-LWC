import { LightningElement } from 'lwc';

export default class ContactSearchChild extends LightningElement {
    searchText;

    handleSearchText(event){
        this.searchText = event.target.value;
    }

    searchButton(){
        const eventRef = new CustomEvent('contactclick',{detail:{toSearch:this.searchText}});
        this.dispatchEvent(eventRef);
    }
}