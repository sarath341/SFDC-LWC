import { LightningElement, wire } from 'lwc';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts'
export default class ConCompWF extends LightningElement {
conList; //Inside initialise as empty array to get new values for each record
@wire(getAllContacts)
loadContacts({data,error}){
    if(data){
        this.conList = [];
        data.forEach((con) => {
            //TODO : currentItem
            //let varName = (con.FirstName).concat(con.LastName);
            const obj = {
                FirstName:con.FirstName,
                LastName: con.LastName,
               
                varName: con.FirstName+' '+con.LastName,
                Email:con.Email,
                LeadSource: con.LeadSource
            };
            this.conList.push(obj);

        });
    }
    else if(error){
    //Error
}
}
}
