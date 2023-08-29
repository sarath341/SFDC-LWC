import { LightningElement, wire } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import Type from "@salesforce/schema/Case.Type";
import Priority from "@salesforce/schema/Case.Priority";
import Status from "@salesforce/schema/Case.Status";
import { publish, MessageContext } from 'lightning/messageService';
import IC from '@salesforce/messageChannel/PubChannel__c';

export default class GFilter extends LightningElement {
    @wire(MessageContext) msgContext;
    caseTypeList;
    casePriorityList;
    caseStatusList;

    selectedOptionType = ''; //To Store Picklist value selected
    selectedOptionPriority; //To Store Picklist value selected
    selectedOptionStatus = ''; //To Store Picklist value selected

    selectedPills = []; //Selected Pills to Close
    @wire(getPicklistValues, {
        fieldApiName: Type,
        recordTypeId: "0125i000000RTiiAAG",
    })
    caseTypeWired({ data, error }) {
        if (data) {
            console.log(JSON.stringify(data));
            this.caseTypeList = [];
            data.values.forEach((cas) => {
                const obj = {
                    label: cas.label,
                    value: cas.value
                }
                this.caseTypeList.push(obj);
                console.log('caseType OBJ: ' + JSON.stringify(obj))
            });
        }
    }

    @wire(getPicklistValues, {
        fieldApiName: Priority,
        recordTypeId: "0125i000000RTiiAAG",
    })
    casePriorityWired({ data, error }) {
        if (data) {
            console.log(JSON.stringify(data));
            this.casePriorityList = [];
            data.values.forEach((cas) => {
                const obj = {
                    label: cas.label,
                    value: cas.value
                }
                this.casePriorityList.push(obj);
            });
        }
    }

    @wire(getPicklistValues, {
        fieldApiName: Status,
        recordTypeId: "0125i000000RTiiAAG",
    })
    caseStatusWired({ data, error }) {
        if (data) {
            console.log(JSON.stringify(data));
            this.caseStatusList = [];
            data.values.forEach((cas) => {
                const obj = {
                    label: cas.label,
                    value: cas.value
                }
                this.caseStatusList.push(obj);
            });
        }
    }


    handleChangeType(event) {
        this.selectedOptionType = event.target.value;
        console.log(this.selectedOptionType);

        //Add Type to selectedPills
        if (this.selectedOptionType) {
            this.selectedPills.push({
                //id: this.selectedOptionType,
                id: 'Type',
                label: this.caseTypeList.find(opt => opt.value === this.selectedOptionType).label
            });
            console.log('From selectedOptionPriority: ' + JSON.stringify(this.selectedPills));
            this.publishData();
        }
    }

    handleChangePriority(event) {
        this.selectedOptionPriority = event.target.value;
        console.log('From gFilter: ' + this.selectedOptionPriority);

        //Add Priority to selectedPills
        if (this.selectedOptionPriority) {
            this.selectedPills.push({
                //id: this.selectedOptionPriority,
                id: 'Priority',
                label: this.casePriorityList.find(opt => opt.value === this.selectedOptionPriority).label
            });
            console.log('From selectedOptionPriority: ' + JSON.stringify(this.selectedPills));
            this.publishData();
        }        
    }

    handleChangeStatus(event) {
        this.selectedOptionStatus = event.target.value;
        console.log(this.selectedOptionStatus);

        //Add Status to selectedPills
        if (this.selectedOptionStatus) {
            this.selectedPills.push({
                //id: this.selectedOptionStatus,
                id: 'Status',
                label: this.caseStatusList.find(opt => opt.value === this.selectedOptionStatus).label
            });
            console.log('From selectedOptionStatus: ' + JSON.stringify(this.selectedPills));
            this.publishData();
        }
    }

    publishData(){
        publish(this.msgContext, IC, { gettext: this.selectedPills});
    }

    handleRemove(index) {
        this.selectedPills.splice(index, 1);
        this.selectedPills = [...this.selectedPills]; // This triggers reactivity
        console.log(this.selectedPills);
        this.publishData();
    }

    handleClear(event){
        if(event.target.label){
            this.selectedPills = [];
            this.selectedPills = [...this.selectedPills]; // This triggers reactivity
            console.log('After Clear All: '+this.selectedPills);
            this.publishData();
        }
    }

    get pillIsEmpty(){
        
    }
}