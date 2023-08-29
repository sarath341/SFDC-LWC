import { LightningElement, wire } from 'lwc';
import getSelectedPillsPriority from '@salesforce/apex/CaseController.getSelectedPillsPriority'
import getFilteredRecords from '@salesforce/apex/CaseController.getFilteredRecords'
import deleteCase from '@salesforce/apex/CaseController.deleteCase'
import { subscribe, MessageContext } from 'lightning/messageService';
import IC from '@salesforce/messageChannel/PubChannel__c'
import { NavigationMixin } from 'lightning/navigation'
import { _showToast } from 'c/util';
import { refreshApex } from '@salesforce/apex';
import caseIcon from '@salesforce/resourceUrl/slds_icons';

export default class GCard extends NavigationMixin(LightningElement) {
    @wire(MessageContext) msgContext;
    caseList;
    selectedCaseId;
    selectedAccCaseId;
    getType = [];
    selectedPills;
    getStatus = ['New'];
    parsedPills;
    popOver;
    getIds;
    typeLabels;
    priorityLabels;
    statusLabels;
    connectedCallback() {
        subscribe(this.msgContext, IC,
            (message) => {
                //this.gettext = message.getType;
                this.selectedPills = message.gettext;
                //this.gettext = message.getStatus;
                console.log('From gCard Subscriber: ' + JSON.stringify(this.selectedPills));
                console.log('Type OF: ' + typeof this.selectedPills);

                this.typeLabels = this.selectedPills.filter(item => item.id === 'Type').map(item => item.label);
                this.priorityLabels = this.selectedPills.filter(item => item.id === 'Priority').map(item => item.label);
                this.statusLabels = this.selectedPills.filter(item => item.id === 'Status').map(item => item.label);

                console.log('Extracted Type Labels: ' + this.typeLabels);
                console.log('Extracted Priority Labels: ' + this.priorityLabels);
                console.log('Extracted Status Labels: ' + this.statusLabels);
                console.log('Type OF: ' + typeof this.typeLabels);

                /*
                this.getIds = this.selectedPills.map(item => item['id']);
                for(const ids of this.getIds){
                    console.log('ids: ' + ids);
                    if(ids==='Type'){
                        console.log('The Id is Type: ' + ids);
                        const getLabel = this.selectedPills.map(item => item['label']);
                        console.log('The getTypeArray: ' + getLabel);
                        this.getTypeArray = this.getLabel;
                    }
                    else if(ids==='Priority'){
                        console.log('The Id is Priority: ' + ids);
                        const getPriority = this.selectedPills.map(item => item['label']);
                        console.log('The getPriorityArray: ' + getPriority);
                        this.getPriorityArray = this.getPriority;
                    }
                    else if(ids==='Status'){
                        console.log('The Id is Status: ' + ids);
                        const getStatus = this.selectedPills.map(item => item['label']);
                        console.log('The getStatusArray: ' + getStatus);
                        this.getStatusArray = this.getStatus;
                    }
                }*/

                //this.handleSearch();
                this.handleSearchMultiple();
            })
    }

    //Not Used
    handleSearch() {
        getSelectedPillsPriority({ pillsObject: JSON.stringify(this.selectedPills) })
            .then((result) => {
                this.caseList = result;
                //console.log('casePriority Records: ' + JSON.stringify(this.caseList));
            })
            .catch((error) => {
                this.error = error;
                console.log('Error: ' + JSON.stringify(error));
            });
    }

    handleSearchMultiple() {
        getFilteredRecords({ typeLabels: this.typeLabels, priorityLabels: this.priorityLabels, statusLabels: this.statusLabels })
            .then((result) => {
                this.caseList = result;
                console.log('casePriority Records: ' + JSON.stringify(this.caseList));
            })
            .catch((error) => {
                this.error = error;
                console.log('Error: ' + JSON.stringify(error));
            });
    }

    handleClick(event) {
        //Checked to see whether previousTr contains something, if so, remove is-selected
        //if will check to see previousTr contains is not undefined or null or zero
        if (this.previousTr) {
            this.previousTr.classList.remove("slds-is-selected");
        }

        //Get the reference of tr element
        const trRef = event.currentTarget;

        //Fetch the value of custom attribute data-sid using getAttribute()
        this.selectedCaseId = trRef.getAttribute('data-sid');
        console.log('The Selected Id is ' + this.selectedCaseId);

        //Apply CSS on tr
        trRef.classList.add("slds-is-selected");

        //Apply trRef to previousTr
        this.previousTr = trRef;
    }

    handleAccInfo(event) {
        //Get the reference of tr element
        const trRef = event.currentTarget;

        //Fetch the value of custom attribute data-sid using getAttribute()
        this.selectedAccCaseId = trRef.getAttribute('data-accsid');
        console.log('The Selected Acc Id is ' + this.selectedAccCaseId);

/*
        const rows = event.detail.selectedRows;
        if (rows.length > 0) {
            this.selectedCaseId = rows[0].Id;
            console.log('Row Selection');
        }
*/

        if (this.popOver != true) {
            this.popOver = true;
        }
        else {
            this.popOver = false;
        }

    }

    handleRowSelection(event) {
        const rows = event.detail.selectedRows;
        if (rows.length > 0) {
            this.selectedCaseId = rows[0].Id;
            console.log('Row Selection');
        }
    }

    viewRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Case',
                recordId: this.selectedCaseId,
                actionName: 'view'
            }
        });
    }
    editRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Case',
                recordId: this.selectedCaseId,
                actionName: 'edit'
            }
        });
    }

    handleDelete() {
        deleteCase({ sid: this.selectedCaseId })
            .then(() => {
                _showToast('SUCCESS',
                    'Case Deleted Successfully',
                    'success',
                    this);
                //Get the reference of lightning-datatable
                const ldtRef = this.template.querySelector('lightning-card');
                //Assign an empty array to selectedRows
                ldtRef.selectedRows = [];
                refreshApex(this.caseList);
            })
            .catch(() => {
                _showToast('FAILURE',
                    'Error occured while deleting',
                    'error',
                    this);
            })
    }
    /* Not Used
        targetRecord() {
            return this.caseList.find(record => record.Id === this.targetRecordId);
        }
    
        targetFieldValue() {
            this.picklistValue = this.targetRecord ? this.targetRecord.Status : null; // Replace Field__c with your actual field API name
            console.log('tfv: ' + this.picklistValue);
            if (picklistValue === 'New') {
                this.currentStep = 'step1';
            } else if (picklistValue === 'Working') {
                this.currentStep = 'step2';
            } else if (picklistValue === 'Escalated') {
                this.currentStep = 'step3';
            } else if (picklistValue === 'Closed') {
                this.currentStep = 'step4';
            }
            return currentStep;
        }
    
        setProgressStatus() {
            console.log('Inside setProgressStatus');
            if (picklistValue === 'New') {
                this.currentStep = 'step1';
            } else if (picklistValue === 'Working') {
                this.currentStep = 'step2';
            } else if (picklistValue === 'Escalated') {
                this.currentStep = 'step3';
            } else if (picklistValue === 'Closed') {
                this.currentStep = 'step4';
            }
    
            this.currentStep = 'step2'; //Hard Coded
            return this.currentStep;
        }*/
}
        /*
@wire(getSelectedPillsPriority, {getPriority: this.getPriority})
loadCaseList({ data, error }) {
if (data) {
this.caseList = [];
data.forEach(cas => {
const obj = {
CaseNumber: cas.CaseNumber,
Type: cas.Type,
Priority: cas.Priority,
Status: cas.Status,
Subject: cas.Subject,
ClosedDate: cas.ClosedDate
}
this.caseList.push(obj);
});
console.log(JSON.stringify(this.caseList));
}
}
*/