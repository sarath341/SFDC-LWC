trigger CertificationAttemptTrigger on Certification_Attempt__c (after insert) {
    List<Certification_Attempt__c> cAttList = new List<Certification_Attempt__c>();
    if(Trigger.isAfter && Trigger.isInsert){
        for(Certification_Attempt__c cAtt : Trigger.new){
            if(cAtt.Result__c == 'Pass'){
                cAttList.add(cAtt);
            }//If
        }//for
        CertificationAttemptHandler.certHeldonInsert(cAttList);
    }
}