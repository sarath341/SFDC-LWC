import { LightningElement, wire } from 'lwc';
import getCwOpportunities from '@salesforce/apex/OpportunityController.getCwOpportunities'
export default class OppWonCompWF extends LightningElement {
oppList;
@wire(getCwOpportunities)
loadWonOpportunities({data,error}){

if(data){
//alert('All is Well')
//As a best practice, assign oppList to an empty array
    this.oppList = [];
    data.forEach((opp) => {
    //TODO : currentItem
        const obj = {
            Name: opp.Name,
            Stage: opp.StageName,
            Amount: opp.Amount,
            CloseDate: opp.CloseDate,
            Id: opp.Id,
            Commission: opp.Amount * 0.10
        };
    this.oppList.push(obj);
    console.log(JSON.stringify(obj));
    });
}
else if(error){
    //alert.('Not Well);
}
}
}
