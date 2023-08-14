public class CertificationAttemptHandler {
    public static void certHeldonInsert(List<Certification_Attempt__c> certAttmptList){
        
        List<Certification_Attempt__c> passList = new List<Certification_Attempt__c>();
        for(Certification_Attempt__c certAttmpt : certAttmptList){
            passList.add(certAttmpt);
        }
        
        
        Map<id,Course_Attendee__c> certAttemtMap = new Map<id,Course_Attendee__c>();
        
        List<Course_Attendee__c> cAttendeeList = [SELECT Id, No_of_Passed_Attempts__c, Name FROM Course_Attendee__c];
        List<Certification__c> certList = [Select id, No_of_Certification_Elements__c From Certification__c];
        for(Course_Attendee__c cAttendee  : cAttendeeList){
            for(Certification__c cert : certList){
                if(cAttendee.No_of_Passed_Attempts__c == cert.No_of_Certification_Elements__c) {
                    certAttemtMap.put(cAttendee.Id, cAttendee);
                }
            }
        }
        
        List<Certification_Held__c> certHeldList = new List<Certification_Held__c>();
        for(Certification_Attempt__c certAttmpt : certAttmptList){
            for(Course_Attendee__c cAttempt1 : certAttemtMap.values()){
                //Result__c is PickList
                if(certAttmpt.Result__c=='Pass' ){
                    //Certification -> No_of_Certification_Elements__c,	CourseAttendee -> No_of_Passed_Attempts__c
                    Certification_Held__c certHeldInstance = new Certification_Held__c();
                    certHeldInstance.Certification__c = certAttmpt.Certification__c;
                    certHeldInstance.Course_Attendee__c = certAttmpt.Course_Attendee__c;
                    certHeldInstance.Certification_Status__c = 'Completed';
                    certHeldList.add(certHeldInstance);
                }
          	}            
            //Insert the certHeldList
            try{
                //In reality, an empty list will not consume a DML - but we
                //keep this check as a best practice
                if(certHeldList.size()>0){
                    insert certHeldList;
                }
            }
            catch(DmlException ex){
                System.debug(ex.getMessage());
                //System.debug(ex.getStackTraceString());
            }
        }
    }
}