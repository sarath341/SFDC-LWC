public with sharing class CaseController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getAllCase() {
        return [SELECT CaseNumber, Status, Priority, Subject, ClosedDate FROM Case];
    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getSelectedPills(String[] getType, String[] getPriority, String[] getStatus){
        return [SELECT CaseNumber, Type, Priority, Status, Subject, ClosedDate FROM Case
        WHERE Type IN :getType OR Priority IN :getPriority OR Status IN :getStatus];
    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getSelectedPillsPriority(String pillsObject){
        System.debug(pillsObject);
        /* Test
        List<Map<String, String>> data = (List<Map<String, String>>) JSON.deserializeUntyped(pillsObject);
        System.debug(data);
        
        for (Map<String, String> item : data) {
            String id = item.get('id');
            String label = item.get('label');
            System.debug('ID: ' + id + ', Label: ' + label);
        }
        */
        //Map<String,Object> pillObj = (Map<String, Object>) JSON.deserializeUntyped(pillsObject);

        //System.debug('deser: '+pillObj.get('id'));
        /*
        from pillsObject = [{"id":"Type","label":"Mechanical"},{"id":"Priority","label":"High"}];
        {"animals":["majestic badger","fluffy bunny","scary bear","chicken"]}
        */
        //The values should be extracted into these
        List<String> typeList = new List<String>();
        List<String> priorityList = new List<String>();
        List<String> statusList = new List<String>();

        List<Case> result = [SELECT CaseNumber, Type, Priority, Status, Subject, ClosedDate, AccountId FROM Case];

        return result;
    }


    @AuraEnabled(cacheable=true)
    public static List<Case> getFilteredRecords(List<String> typeLabels, List<String> priorityLabels, List<String> statusLabels){
        System.debug(typeLabels);
        System.debug(priorityLabels);
        System.debug(statusLabels);
        for(String item:typeLabels){
            System.debug(item);
        }
        //System.debug('Converted: '+typeList);
       // System.debug('Converted: '+priorityLabels);
        //System.debug('Converted: '+statusLabels);
        String query;
        if (typeLabels.isEmpty() && priorityLabels.isEmpty() && statusLabels.isEmpty()) {
            query = 'SELECT CaseNumber, Type, Priority, Status, Subject, ClosedDate, AccountId FROM Case';
        }else{
            query = 'SELECT CaseNumber, Type, Priority, Status, Subject, ClosedDate, AccountId FROM Case WHERE Type IN :typeLabels OR Priority IN :priorityLabels OR Status IN :statusLabels';
        }
        
        try{
            return Database.query(query);
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled //No Caching when performing DML Operation
    public static void deleteCase(String sid){
        try {
            Case casetoDelete = [SELECT Id, CaseNumber
                                        FROM Case
                                        WHERE Id = :sid
                                        WITH SECURITY_ENFORCED];
            delete casetoDelete;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}