import { LightningElement } from 'lwc';

export default class CalculatorComp extends LightningElement {
    //define properties - global, public, private
    firstNumber = 20; 
    secondNumber = 10;
    result;//default is undefined


    //define methods

    add(){
        this.result = parseInt(this.firstNumber) + parseInt(this.secondNumber);
    }

    sub(){
        this.result = this.firstNumber - this.secondNumber;
    }


    mult(){
        this.result = this.firstNumber * this.secondNumber;
    }

    div(){
        this.result = this.firstNumber / this.secondNumber;
    }


    //define event handlers

    handleBlurFirstNumber(event){
      this.firstNumber = event.target.value;
    }

    handleBlurSecondNumber(event){
        this.secondNumber = event.target.value;
    }

}