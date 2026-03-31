name=input('Enter your name : ')
age=int(input("Enter your age : "))
if age>=18:
    print(f"{name} is adult")
    has_licence=input("Do you have licence? ")
    if has_licence=='yes':
        print('You can drive')
    else:
        print('You need a licence to drive')
else:
    print('You are not eligible to drive')