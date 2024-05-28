#! /usr/bin/env node

import inquirer from "inquirer"

// bank amount interface
 interface  BankAccount{
    accountnumber: number ;
    balance: number ;
    withdraw(amount : number):void //it only perform operation
    deposit(amount : number):void
    checkBalance() : void
 }
//   Bank Account  CLass
class BankAccount implements BankAccount{
    accountnumber: number;
    balance: number;

    constructor(accountnumber: number , balance: number ){
        this.accountnumber = accountnumber;
        this.balance = balance
    }
    // debit money
    withdraw(amount: number):void{
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withdrawl of $${amount} successfull. Remaining balance : $${this.balance}`);

            
        } else {
            console.log("Insufficient Balance");
            
        }

    }

    // Credit MOney
    deposit(amount: number): void {
        if(amount > 100){
            amount - 1; //$1 fee charged if more than $100 is deposited

        }this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
        
    }

    // Check Balance
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
        
    }

}

// Customers Class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;  

    }

    }


// create bank accounts

const accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
]

// Create customers
const customers : Customer[] = [
    new Customer("Tarfeeha","Hussain","Female", 18 ,3163332674, accounts[0]),
    new Customer("Neha","Naz","Female", 20 ,3453332674, accounts[1]),
    new Customer("Esha","Naz","Female", 19 ,3003332674, accounts[2]),
]

// //  Function to Interect with bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type: "number",
            message: "Enter Your Account Number:"
        })

        const customer = customers.find(customer => customer.account.accountnumber === accountNumberInput.accountNumber);
        if(customer){
          console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
          const ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            message: "Select an Operation",
            choices: ["Deposit","Withdraw","CheckBalance","Exit"]
          }]);
          switch (ans.select){
            case "Deposit" : 
            const depositAmount = await inquirer.prompt({

                name: "amount",
                type: "number",
                message: "Enter the amount to deposit:"

            })
            customer.account.deposit(depositAmount.amount);
            break;
            case "Withdraw" : 
            const withdrawAmount = await inquirer.prompt({

                name: "amount",
                type: "number",
                message: "Enter the amount to Withdraw:"

            })
            customer.account.withdraw(withdrawAmount.amount);
            break;
            case "CheckBalance":
                customer.account.checkBalance();
                break;
                case "Exit":
                    console.log("Exiting Bank Program ....");
                    console.log("\n ThankYouu For Using Our Services. Have A Good Day :)!");
                    return;
                    
                    

        }
            

          
            
        }else {
           console.log("invalid account number.Please try again.");
            
        }
        
    } while(true)
}
service();





















