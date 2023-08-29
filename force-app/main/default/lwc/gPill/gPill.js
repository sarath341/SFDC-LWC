import { LightningElement, api } from 'lwc';

export default class GPill extends LightningElement {
    @api selectedType;
    pillItems = [];
}