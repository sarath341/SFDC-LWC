public class AccountController {
@AuraEnabled(cacheable=true)
public static List<Account> getAllAccounts(){
    return [SELECT Name, AnnualRevenue, Rating
            FROM Account];
}
}
