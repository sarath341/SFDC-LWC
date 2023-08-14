import { LightningElement } from 'lwc';

export default class GrandParent extends LightningElement {
    message; //to store info coming from the parent
    handleDemo(event){
        this.message = event.detail;
    }
}