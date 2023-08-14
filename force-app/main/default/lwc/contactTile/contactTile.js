import { api, LightningElement} from 'lwc';

export default class ContactTile extends LightningElement {
    @api contact; //public property which gets one contact information
    //From contactTiles
    @api selectedContactId = '';
    cssStyle='tile';
    
    handleClick(){
        console.log(this.contact.Id);
        //Create a CustomEvent instance, populate detail with
        //the contact id and dispatch the event
        const eventRef = new CustomEvent('contactclick',{detail:{conId:this.contact.Id},
        bubbles:true,
        composed:true});
        this.dispatchEvent(eventRef);
    }

    //Define a getter method to check whether selectedContactId matches with this.contact:Id,
    //if so, apply both tile-selected css selectors
    //Otherwise apply only tile css selector

    get applyCss(){
        //use ternary operator
        return this.selectedContactId === this.contact.Id ? 'tile tile-selected' : 'tile';
    }
}