public class ContactController {
    @AuraEnabled(cacheable = true)
    public static List<Contact> getAllContacts(){
        return [SELECT FirstName, LastName, Email, LeadSource
               FROM Contact];
    }
}
