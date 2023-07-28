public class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAllOpportunities(){
        return [SELECT Name, StageName, CloseDate, Amount
                FROM Opportunity];
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getCwOpportunities(){
        return [SELECT Name, StageName, CloseDate, Amount
                FROM Opportunity
                WHERE StageName ='Closed Won'];
    }
    
}
