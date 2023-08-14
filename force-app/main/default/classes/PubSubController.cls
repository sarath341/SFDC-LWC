public with sharing class PubSubController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String toText){
        toText = '%'+toText+'%';
            return [SELECT Name, Phone, AnnualRevenue 
        FROM Account WHERE Name LIKE :toText];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String toText){
        toText = '%'+toText+'%';
            return [SELECT FirstName, LastName, Email 
        FROM Contact WHERE LastName LIKE :toText];
        }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpps(String toText){
            toText = '%'+toText+'%';
                return [SELECT Name, StageName, Amount, Account.Name
            FROM Opportunity WHERE Name LIKE :toText];
            }
}