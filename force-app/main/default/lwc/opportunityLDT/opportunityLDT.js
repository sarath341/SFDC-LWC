import { LightningElement, wire } from 'lwc';
import getAllOpportunities from '@salesforce/apex/OpportunityController.getAllOpportunities';
import deleteOpportunity from '@salesforce/apex/OpportunityController.deleteOpportunity'
import { refreshApex } from '@salesforce/apex';
import { _showToast } from 'c/util';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Stage', fieldName: 'StageName', type: 'text' },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency' }
]
export default class OpportunityLDT extends LightningElement {
    @wire(getAllOpportunities) oppList;
    columns = COLUMNS;
    opportunityId;

    handleRowSelection(event) {
        const rows = event.detail.selectedRows;
        if (rows.length > 0) { //Good Practice
            this.opportunityId = rows[0].Id;
        }
        console.log(rows[0].Id);
    }
    handleClick() {
        //Call deleteOpportunity imperatively
        deleteOpportunity({ sid: this.opportunityId })
            .then(() => {
                _showToast('SUCCESS',
                    'Opportunity Deleted Successfully',
                    'success',
                    this);
                //Get the reference of lightning-datatable
                const ldtRef = this.template.querySelector('lightning-datatable');
                //Assign an empty array to selectedRows
                ldtRef.selectedRows = [];
                refreshApex(this.oppList);
            })
            .catch(() => {
                _showToast('FAILURE',
                    'Closed Won deals cannot be deleted',
                    'error',
                    this);
            })
    }
}