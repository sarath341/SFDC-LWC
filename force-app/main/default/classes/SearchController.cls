public with sharing class SearchController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getResults(String toSearch){
        toSearch = '%'+toSearch+'%';
            return [SELECT FirstName, LastName, Email 
        FROM Contact WHERE FirstName LIKE :toSearch
        OR LastName LIKE :toSearch
        OR Email LIKE :toSearch];
        }
    }