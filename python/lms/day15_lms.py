def pyramid(n):
    for k in range(1,n+1):
        for sp in range(n-k,0,-1):
            print(" ",end="")
        for st in range(k):
            print("*",end=" ")
        print()

def inverted_number(n):
    for k in range(n,0,-1):
        for i in range(1,k+1):
            print(i,end="")
        print()

def sum(n):
    if n==1:
        return 1
    else:
        return n+sum(n-1)

while True:
    print("""
1. Print Pyramid Star Pattern
2. Print Inverted Number Pattern
3. Calculate Sum of First N Natural Numbers
4. Calculate Power of a Number
5. Exit""")
    
    choice=int(input("Your choice: "))

    if choice==1:
        num=int(input("Number of rows: "))
        if num>=1:
            pyramid(num)
        else:
            print("Enter valid integer!")
        
    if choice==2:
        num=int(input("Number of rows: "))
        if num>=1:
            inverted_number(num)
        else:
            print("Enter valid integer!")

    if choice==3:
        num=int(input("Number: "))
        if num>=1:
            print(f"Sum of {num} natural numbers: {sum(num)}")
        else:
            print("Enter valid integer!")

    if choice==4:
        num=int(input("Number: "))
        power=lambda num:num*num
        print(f"Power of {num}: {power(num)}")

    if choice==5:
        break
