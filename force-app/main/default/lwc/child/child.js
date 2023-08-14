import { LightningElement } from 'lwc';

export default class Child extends LightningElement {
    handleClick(){
        const eventRef = new CustomEvent('demo', 
        {detail:'I am coming from the child',
         bubbles: true,
         composed: false},
         );
         this.dispatchEvent(eventRef);
    }
}