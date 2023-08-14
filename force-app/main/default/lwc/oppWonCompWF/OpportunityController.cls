public class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAllOpportunities(){
        try{
            return [SELECT Name, StageName, CloseDate, Amount
            FROM Opportunity];
        }
        catch(Exception e){
            throw new AuraEnabledException(e.getMessage());
        }
        
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getCwOpportunities(){
        return [SELECT Name, StageName, CloseDate, Amount
                FROM Opportunity
                WHERE StageName ='Closed Won'];
    }
    
}
