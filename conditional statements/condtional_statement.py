"""
if condition:
   statement
else:
   statement


age=int(input("Enter you age : "))
if age>=18:
    print("Eligible to vote")
else:
    print("Not eligible to vote")
"""

"""
num=26
if num%2==0:              #comparison operator ==
   print(num,'is a even number')
else:
   print(num,'is a odd number')
"""
a=int(input('Enter the first number : '))
b=int(input('Enter the second number : '))
print("1.Addition\n2.Substraction\n3.Division\n4.Multiplication")
choice=int(input('Enter your choice : '))
if choice==1:
    print("Sum=",a+b)
elif choice==2:
    print('Difference=',a-b)
elif choice==3:
    print(f'Division={a/b}')
elif choice==4:
    print("Product=",a*b)
else:
    print("Invalid input. Please choose from 1, 2, 3, 4")