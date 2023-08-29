import { LightningElement, wire } from 'lwc';
//1.2 Imports
import { subscribe, MessageContext } from 'lightning/messageService';
import IC from '@salesforce/messageChannel/InfoChannel__c';
import { NavigationMixin } from 'lightning/navigation'
export default class ContactDetails extends NavigationMixin(LightningElement) {
    //2. Wire the MessageContext to a property
    @wire(MessageContext) msgContext;
    //Property to Show or Hide the modal comp
    showModal = false;

    //Define a property to store salesforce ID
    selectedContactId;

    //3. Define 
    connectedCallback() {
        subscribe(this.msgContext, IC,
            (message) => {
                this.selectedContactId = message.conId;
                console.log('contact detail::' + this.selectedContactId);
            });
    }

    sendEmail() {
        this.showModal = true;
    }

    handleModalClose() {
        this.showModal = false;
    }

    viewRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Contact',
                recordId: this.selectedContactId,
                actionName: 'view'
            }
        });
    }
    editRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Contact',
                recordId: this.selectedContactId,
                actionName: 'edit'
            }
        });
    }
}


/*
    //3.Define connectedCallback and subscribe to the channel
    //callback hooks -> Lifecycle Hooks

    constructor(){
        //super call must be the first statement
        super();
        //Assign values to private properties
    }

    //2. public properties will get assigned (after constructor execution)
    //3. connectedCallback --> component gets added to the DOM
        //1. perform operations on public properties
        //2. Register for events
    //4. render -> LWC Framework specific but not a web standard
    //is to return an html file -> view

    //5. renderedCallback() -> load 3rd party js or css and apply css dynamically
    //this is called everytime there is some change in the property and it is getting
    //displayed on the UI

    //6. disconnectedCallback -> comp is getting removed from the DOM
    //unregister events

    //7. errorCallback -> LWC Framework specific but not a web standard
    //To deal with the errors that have occured in the child components
    */