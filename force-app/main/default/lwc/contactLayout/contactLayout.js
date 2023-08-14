import { LightningElement } from 'lwc';

export default class ContactLayout extends LightningElement {
    selectedItem;
    handleNavigation(event){
        this.selectedItem = event.detail;
        console.log('ContactLayout has received '+this.selectedItem);
    }

    get browser(){
        return this.selectedItem === 'browse';
    }

    get reports(){
        return this.selectedItem === 'reports';
    }
    get graphs(){
        return this.selectedItem === 'graphs';
    }
    get deals(){
        return this.selectedItem === 'deals';
    }
}