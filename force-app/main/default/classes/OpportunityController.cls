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

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAccOpportunities(String accId){
        String query;
        if(accId == ''){
            query = 'SELECT Name, StageName, Account.Name, CloseDate, Amount FROM Opportunity';
        }
        else{
            query = 'SELECT Name, StageName,Account.Name, CloseDate, Amount FROM Opportunity WHERE AccountId=:accId';
        }
        try{
            return Database.query(query);
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled //No Caching when performing DML Operation
    public static void deleteOpportunity(String sid){
        try {
            Opportunity opp = [SELECT Id, Name
                                        FROM Opportunity
                                        WHERE Id = :sid
                                        WITH SECURITY_ENFORCED];
            delete opp;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}