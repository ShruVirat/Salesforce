public with sharing class AccountContactController {
    @AuraEnabled
    public static void createAccountAndContact(String accountName, String contactFirstName, String contactLastName, String contactEmail, String accountWebsite, String contactPhoneNumber) {
        // Create Account record
        Account newAccount = new Account(Name = accountName, Website = accountWebsite);
        insert newAccount;

        // Create Contact record related to the Account
        Contact newContact = new Contact(FirstName = contactFirstName, LastName = contactLastName, Email = contactEmail, Phone = contactPhoneNumber, AccountId = newAccount.Id);
        insert newContact;
    }
}
