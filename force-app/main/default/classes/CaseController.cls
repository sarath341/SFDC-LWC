public with sharing class CaseController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getAllCase() {
        return [SELECT CaseNumber, Status, Priority, Subject, ClosedDate FROM Case];
    }
}