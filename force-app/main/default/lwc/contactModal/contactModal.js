import { LightningElement } from 'lwc';

export default class ContactModal extends LightningElement {
    handleClick(){
        const divRef = this.template.querySelector('div');
        divRef.classList.add('slds-hide');

        //Dispatch a Custom Event to the parent component
        const eventRef = new CustomEvent('modalclose');
        this.dispatchEvent(eventRef);
    }
}