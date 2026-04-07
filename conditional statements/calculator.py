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

    

while True:
    a = int(input('Enter the first number : '))
    b = int(input('Enter the second number : '))
    
    print("1.Addition\n2.Subtraction\n3.Division\n4.Multiplication")
    choice = int(input('Enter your choice : '))

    match choice:
        case 1:
            print("Sum =", a + b)
        case 2:
            print("Difference =", a - b)
        case 3:
            print(f"Division = {a / b}")
        case 4:
            print("Product =", a * b)
        case _:
            print("Invalid input. Please choose from 1, 2, 3, 4")

    d = input("Do you wish to continue (y/n)? ")
    if d != "y":
        break



