public class leadController {
    @AuraEnabled(cacheable=true)
    public static List<Lead> getAllLeads(){
        return [SELECT Id, Name, Status FROM Lead];
    }
}