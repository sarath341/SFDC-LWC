public with sharing class ConController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String toSearch){
        toSearch = '%'+toSearch+'%';
        if(toSearch != null){
            return [SELECT FirstName, LastName, Email 
        FROM Contact WHERE FirstName LIKE :toSearch
        OR LastName LIKE :toSearch
        OR Email LIKE :toSearch];
        }
        else{
            return null;
        }
    }
}