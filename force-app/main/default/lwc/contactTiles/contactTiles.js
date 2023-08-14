import { LightningElement,api} from 'lwc';

export default class ContactTiles extends LightningElement {
    @api conList;
    selectedContactId = '';

    handleContactClick(event){
        this.selectedContactId = event.detail.conId;
        console.log('contactTiles has received info from tile '+this.selectedContactId);
    }
}