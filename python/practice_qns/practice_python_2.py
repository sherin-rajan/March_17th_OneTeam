#ATM
"""
balance=10000
pin=1234
entered_pin=int(input('Enter your pin : '))
if entered_pin==pin:
    print("1.Withdraw\n2.Deposit\n3.Balance Check")
    choice=int(input('Enter your choice : '))
    if choice==1:
        amount=int(input("Amount you want to withdraw : "))
        print('Transaction is processing, Please wait...')
        print('Take your cash')
        print('Take your card')
        print('Transaction complete. Thank you for using this ATM.')
    if choice==2:
        print('Insert cash')
        print('Counting...')
        entered_confirm=input('Confirm your ammount(y/n): ')
        if entered_confirm=='y':
            print("Transaction complete. Thank you for using this ATM")
        else:
            print("Something went wrong")
    if choice==3:
        print(f"Your balance is {balance}")
else:
    print('Invalid Pin')
"""
"""
pin=1234
balance=10000
entered_pin=int(input('Enter your PIN : '))
if entered_pin==pin:
    while True:
        print('1.Withdraw\n2.Balance Check\n3.Exit')
        choice=int(input('Choose : '
    for sp in range(5-row):
        print(" ",end=" ")
    for sr in range(row):
        print("*",end=" ")
    print(" ")
"""

"""
1
2 6
3 7 10
4 8 11 13
5 9 12 14 15
""" 
""" 
#bubble sorting
numbers=[2,8,4,29,47,24,7]
length=len(numbers)          #for length of list
for k in range(length):
    for j in range(0,length-k-1):
        if numbers[j]>numbers[j+1]:      #comparing adjacent elements
           numbers[j],numbers[j+1]=numbers[j+1],numbers[j]
print(numbers)

size=int(input("How many number do you want to enter : "))
numbers=[]
for i in range(1,size+1):
    num=list(input(f'{i}. Enter the value : '))
    numbers=numbers+num
print(numbers)

rows=5
for i in range(1,rows+1):
    m=rows-1
    num=i
    for j in range(i):
        print(num,end=" ")
        num+=m
        m-=1
    print(" ")
"""

"""marks=[]
print("Enter marks:")
for h in range(1,4):
    mark=int(input(f"Subject {h}: "))
    marks+=[mark]

    def recursive_sum(marks):
        if len(marks)==0:
            return 0
        else:
            return marks[0]+recursive_sum(marks[1:])
print(recursive_sum(marks))"""

"""students=[{'Name': 'Athul', 'Roll Number': 56, 'Total Marks': 219, 'Average': 73.0, 'Grade': 'C'}, 
 {'Name': 'Arun', 'Roll Number': 100, 'Total Marks': 249, 'Average': 83.0, 'Grade': 'B'}]
print("---Stundents Details---")
for student in students:
    print("Name: ",student['Name'])
    print("Roll Number: ",student['Roll Number'])
    print("Total Marks: ",student['Total Marks'])
    print("Average: ",student['Average'])
    print("Grade: ",student['Grade'])"""

"""accounts=[]
transactions=[]
ac_set=set()

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
print(accounts)"""

#adding digits of any number until get single digits
"""n=list(input("Enter any number:"))
while len(n)>1:
    t=sum(int(d) for d in n)
    n=list(str(t))
print(n)"""

candidates=[]
class Candidates:
    def __init__(self,name,age,experience,skills):
        self.name=name
        self.age=age
        self.experience=experience
        self.skills=skills
    def display(self):
        print("------Candidates Details------")
        print("Name:",self.name)
        print("Age:",self.age)
        print("Experience:",self.experience)
        print("Skills:",self.skills)
    def shortlisting(self):
        if self.experience>=2 and self.skills>=5:
            return "Shortlisted"
        elif self.experience>=2 or self.skills>=5:
            return "In waiting list"
        else:
            return "Not eligible"

    
def add_candidate():
    name=input("Enter your name:")
    age=int(input("Enter your age:"))
    experience=float(input("Enter your experience in years:"))
    skills=float(input("Rate your skill out of 10:"))

    can=Candidates(name,age,experience,skills)
    candidates.append(can)

def view_candidates():
    if not candidates:
        print("Candidates not found")
    else:
        for i in candidates:
            i.display()

def status_of_candidates():
    short_list=[]
    waiting_list=[]
    not_eligible=[]
    for i in candidates:
        status=i.shortlisting()
        if status=="Shortlisted":
            short_list.append(i.name)
        elif status=="In waiting list":
            waiting_list.append(i.name)
        else:
            not_eligible.append(i.name)
    print("\n------Shortlisted------")
    if short_list:
        for i in short_list:
            print(i)
    else:
        print("No shortlisted candidates")
    print("\n------Candidates in waiting list------")
    if waiting_list:
        for i in waiting_list:
            print(i)
    else:
        print("No Candidates in waiting list")
    if not_eligible:
        for i in not_eligible:
            print(i)
    else:
        print("No rejected candidates")

while True:
    print("\n1.Add Candidates")
    print("2.View Candidates")
    print("3.Shortlisted Candidates")
    print("4.Exit")
    try:
        choice=int(input("Please choose:"))
        if choice==1:
            add_candidate()
        elif choice==2:
            view_candidates()
        elif choice==3:
            status_of_candidates()
        elif choice==4:
            break
        else:
            print("Invalid input! Try again")
    except:
        print("Invalid choice! Try again")
        