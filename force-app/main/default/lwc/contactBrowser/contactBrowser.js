import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts'
//1.2 Imports
import { publish, MessageContext } from 'lightning/messageService';
import IC from '@salesforce/messageChannel/InfoChannel__c';
export default class ContactBrowser extends LightningElement {
    //2. Wire MessageContext to a property
    @wire(MessageContext) msgContext;
    conList;
    selectedContactId ='';
    selectedAccountId = '';
    @wire(getContacts, {accId: '$selectedAccountId'})
    loadContacts({data}){
        if(data){
            this.conList=[];
            data.forEach((con) => {
                const obj ={
                    Name: con.FirstName+ ' '+con.LastName,
                    Phone: con.Phone,
                    Email: con.Email,
                    Title: con.Title,
                    Id: con.Id,
                    PhotoUrl: '/services/images/photo/00380FakePictId'
                };
                this.conList.push(obj);
            });
            console.log(JSON.stringify(this.conList));
        }
    }

    handleSelectAccount(event){
        this.selectedAccountId = event.detail.accId;
    }

    handleContactClick(event){
        this.selectedContactId = event.detail.conId;
        console.log('Browser has Received'+this.selectedContactId);
        publish(this.msgContext,IC,{conId : this.selectedContactId});
    }
}