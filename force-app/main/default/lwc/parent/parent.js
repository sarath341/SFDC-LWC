import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
    message; //to store info coming from the child
    divMessage;
    
    handleDemoDiv(event){
        this.divMessage = event.detail;
    }

    handleDemo(event){
        this.message = event.detail;
    }
}