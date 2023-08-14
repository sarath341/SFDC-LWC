import { LightningElement } from 'lwc';

export default class ContactNavigation extends LightningElement {
    selectedItem;
    handleSelect(event){
        this.selectedItem = event.detail.name;
        console.log('You have selected '+ this.selectedItem);
        this.notifyParent();
    }

    notifyParent(){
        const eventRef = new CustomEvent("navigation", {detail: this.selectedItem});
        this.dispatchEvent(eventRef);
    }

}