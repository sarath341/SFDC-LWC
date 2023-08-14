import {ShowToastEvent} from 'lightning/platformShowToastEvent';

//function or arrow function
const _showToast = function(title, message, variant, thisArg){
    const eventRef = new ShowToastEvent({title, message, variant});
    thisArg.dispatchEvent(eventRef);
}

export {
    _showToast
}