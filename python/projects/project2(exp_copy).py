#Mini banking system
"""
Create and manage bank accounts
Perform transactions (deposit, withdraw, transfer)
Maintain transaction history
Perform banking analytics
Demonstrate advanced Python concepts like copying, zip, and exception handling
"""
#list,loop,if-else,function,exception handling,copy

import copy

accounts=[]
transactions=[]
ac_set=set()

#Account creation
try:
    n=int(input("Enter Number of Accounts:"))
except:
    print("Invalid Input! Setting Number of Accounts to One!")
    n=1

for i in range(1,n+1):
    print(f"Enter Details for Account {i}")
    name=input("Name:")
    
    try:
        ac_no=int(input("Account Number:"))
        if ac_no in ac_set:
            print("Account Number Already Exist! Try Again!")
        else:
            ac_set.add(ac_no)
    except:
        print("Invalid Account Number!")
    
    try:
        balance=float(input("Initial Balance:"))
    except:
        print("Invalid Amount! Setting balance to zero")
        balance=0

    account={
        "name":name,
        "ac_no":ac_no,
        "balance":balance
    }
    accounts.append(account)

#Functions

# find_ac(ac_no)
# deposit()
# withdraw()
# transfer()
# check_balance()
# Total bank balance
# show_all_accounts()
# show_transactions()
# analytics()
# copy_demo()

def find_ac(ac_no):
    for ac in accounts:
        if ac["ac_no"]==ac_no:
            return ac
    return None

          
def deposit():
    try:
        ac_no=int(input("Enter Account No: "))
        amount=float(input("Enter amount: "))
        
        if amount<=0:
            print("Amount must be positive!")
            return
        
        ac=find_ac(ac_no)
        if ac:
            ac["balance"]+=amount
            transactions.append((ac["name"], "deposit", amount))
            print(f"Amount Deposited Successfully! New Balance:{ac['balance']}")
        else:
            print("Account not found!")
    except:
        print("Invalid input!")
            
def withdraw():
    try:
        ac_no=int(input("Enter Account No:"))
        amount=float(input("Enter amount:"))
        
        ac=find_ac(ac_no)
        if ac:
            if amount>ac["balance"]:
                print("Insufficient Balance")
            else:
                ac["balance"]-=amount
                transactions.append((ac["name"],"withdraw",amount))
                print(f"Withdrawal Successful! New Balance:{ac["balance"]}")
        else:
            print("Accounr Not Found")
    except:
        print("Invalid Input!")

def transfer():
    try:
        from_ac=int(input("From Account:"))
        to_ac=int(input("To Account:"))
        amount=float(input("Amount:"))

        sender=find_ac(from_ac)
        receiver=find_ac(to_ac)

        if sender and receiver:
            if sender["balance"]>=amount:
                sender["balance"]-=amount
                receiver["balance"]+=amount
                transactions.append((sender["name"],"transfer",amount))
                print("Transfered Successfuly!")
                print(f"Sender Balance:{sender["balance"]},Receiver Balance:{receiver["balance"]}")
            else:
                print("Insufficient Balance!")
        else:
            print("Invalid Account Number!")
    except:
        print("Invalid Input!")

def check_balance():
    try:
        ac_no=int(input("Enter Account Number:"))
        ac=find_ac(ac_no)
        if ac:
            print(f"Name:{ac["name"]},Balance:{ac["balance"]}")
        else:
            print("Account Not Found!")
    except:
        print("Invalid Input!")

def total_balance_recursive(ac_list,index=0):
    if index==len(ac_list):
        return 0
    return ac_list[index]["balance"] + total_balance_recursive(ac_list, index+1)

def show_all_accounts():
    print("-----Accounts Details-----")

    names=[ac["name"] for ac in accounts]
    ac_nos=[ac["ac_no"] for ac in accounts]
    balance=[ac["balance"] for ac in accounts]

    for name,ac_no,bal in zip(names,ac_nos,balance):
        print(f"Name:{name} | Account Number:{ac_no} | Balance:{bal}")

def show_transactions():
    print("-----Transaction Details-----")

    if not transactions:
        print("No Transactions Yet!")
    for t in transactions:
        print(t)

def analytics():
    print("-----Analytics-----")

    #highest balance acount
    top=max(accounts,key=lambda x:x["balance"]) 
    print(f"Top Account:{top["name"]} {top["balance"]}")
    """
    top = accounts[0]  # assume first account is highest
    for ac in accounts:
        if ac["balance"] > top["balance"]:
            top = ac
    print(f"Top Account: Name:{top['name']} Balance:{top['balance']}")"""

    #total ammount
    total=total_balance_recursive(accounts)
    print("Total Bank Balance is ",total)

    #low balance accounts
    low=[ac["name"] for ac in accounts if ac["balance"]<1000]
    print("Low Balance Accounts:",low if low else "None")

def copy_demo():
    print("-----Copy Demo-----")

    shallow=copy.copy(accounts)
    deep=copy.deepcopy(accounts)

    if accounts:
        accounts[0]["balance"]+=100
        print('original:',accounts[0]["balance"])
        print("Shallow:",accounts[0]["balance"])
        print("Deep:",accounts[0]["balance"])

    
while True:
    print("""1. Deposit
2. Withdraw
3. Transfer
4. Check Balance
5. Show All Accounts
6. Show Transactions
7. Analytics
8. Copy Demo
9. Exit""")

    choice = input("Enter choice: ")

    if choice == "1":
        deposit()
    elif choice == "2":
        withdraw()
    elif choice == "3":
        transfer()
    elif choice == "4":
        check_balance()
    elif choice == "5":
        show_all_accounts()
    elif choice == "6":
        show_transactions()
    elif choice == "7":
        analytics()
    elif choice == "8":
        copy_demo()
    elif choice == "9":
        print("Exiting... Thank you!")
        break
    else:
        print("Invalid choice!")



        




    