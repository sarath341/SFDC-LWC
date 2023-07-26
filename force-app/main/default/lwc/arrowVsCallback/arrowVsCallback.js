import { LightningElement } from 'lwc';

export default class ArrowVsCallback extends LightningElement {
    todaysTime = new Date();
     
    updateDateTimeUsingCallback(){
        //Declare a local variable and assign this to it.
        //Local variable will have scope inside the function
        let that = this;
       setInterval(function(){
        //Nested or callback function(s) will not have access to this context
        that.todaysTime = new Date();
        console.log(that.todaysTime);
       },1000);
       //Todo: You try with using bind() method approach 
    }

    updateDateTimeUsingArrow(){
         setInterval(()=>{
            this.todaysTime = new Date();
         });
    }
}