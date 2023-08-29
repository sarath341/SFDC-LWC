import getAccOpportunities from '@salesforce/apex/OpportunityController.getAccOpportunities'
import getAllAccounts from '@salesforce/apex/AccountController.getAllAccounts'

import { LightningElement, wire } from 'lwc';

export default class AccFilter extends LightningElement {
    selectedAccountId='';
    accountComboList=[];
    oppList;
    handleChange(event){
        this.selectedAccountId = event.target.value;
        //this.handleSelectedAccount();
    }

    @wire(getAllAccounts)
    wiredGetAccounts({data,error}){
        if(data){
            this.accountComboList = []; //as a best practice
            data.forEach((acc)=>{
                const obj = {
                    label: acc.Name,
                    value: acc.Id
                }
                this.accountComboList.push(obj);
            });
        }
    }

    @wire(getAccOpportunities, {accId : '$selectedAccountId'})
    wiredGetOpps({data}){
        if(data){
            this.oppList=[];
            data.forEach((opp)=>{
                const obj ={
                    AccountName : opp.Account.Name,
                    StageName: opp.StageName,
                    Amount: opp.Amount,  
                    CloseDate: opp.CloseDate
                }
                this.oppList.push(obj);
            })
        }
    }
    

/*
    handleSelectedAccount(){
        getAccOpportunities({accId: this.selectedAccountId})
        .then((result)=>{
            this.oppList = result;
            console.log('acc opp Records: ' + JSON.stringify(this.oppList));
        })
        .catch((issue)=>{
            console.log('Error: ' + JSON.stringify(issue));
        })
    }
*/
    get isListEmpty(){
        return !this.oppList || this.oppList.length === 0;
    }
}