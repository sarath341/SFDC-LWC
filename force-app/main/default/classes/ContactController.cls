public class ContactController {
    @AuraEnabled(cacheable = true)
    public static List<Contact> getAllContacts(){
        return [SELECT Name, Title, FirstName, LastName, Email, Phone, LeadSource
               FROM Contact
               WITH SECURITY_ENFORCED];
    }

    @AuraEnabled (cacheable = true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT Id, Name FROM Account];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<Contact> getContacts(String accId){

        String query;
        if(accId==''){
            query = 'SELECT Id, FirstName, LastName, Email, Phone, Title FROM Contact';
        }
        else{
            query = 'SELECT Id, FirstName, LastName, Email, Phone, Title FROM Contact WHERE AccountId = :accId';
        }
        
        try{
            return Database.query(query);
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}