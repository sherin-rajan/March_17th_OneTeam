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

for row in range(1,6):
    for sp in range(5-row):
        print(" ", end="")
    for sr in range(row):
        print("*", end=" ")
    print("")
for row in range(4,0,-1):
    for sp in range(5-row):
        print(" ", end="")
    for sr in range(row):
        print("*", end=" ")
    print("")