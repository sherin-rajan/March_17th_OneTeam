n=5
for k in range(1,n+1):
    for h in range(k):
        print('#',end='')
    print()

n=5
for k in range(n,0,-1):
    for h in range(k):
        print("8",end=" ")
    print()

#pyramid
n=5
for i in range(1,n+1):
    print(" " * (n -i),end=" ")
    for j in range(i):
        print('*',end=" ")
    print()

#diamond
for row in range(1,6):
    for st in range(row):
        print("*",end=" ")
    print(" ")
for row in range(4,0,-1):
    for st in range(row):
        print("*",end=" ")
    print(" ")

#right half pyramind
for row in range(1,6):
    for sp in range(5-row):
        print(" ",end=" ")
    for sr in range(row):
        print("*",end=" ")
    print(" ")

#right half diamond
for row in range(1,6):
    for sp in range(5-row):
        print(" ",end=" ")
    for sr in range(row):
        print("*",end=" ")
    print(" ")
for row in range(4,0,-1):
    for sp in range(5-row):
        print(" ",end=" ")
    for sr in range(row):
        print("*",end=" ")
    print(" ")

#full diamond
for row in range(1,6):
    for sp in range(5-row):
        print(" ", end="") #no space in end otherwise extra space will appear
    for sr in range(row):
        print("*", end=" ") #need space in end 
    print("")
for row in range(4,0,-1):
    for sp in range(5-row):
        print(" ", end="")
    for sr in range(row):
        print("*", end=" ")
    print("")

#reverse pyramid
n=5
for i in range(n,0,-1):
    print(" " * (n -i),end=" ")
    for j in range(i):
        print('*',end=" ")
    print()

#numbers 1 12 123 1234 12345
n=5
for i in range(1,n+1):
    for j in range(1,i+1):
        print(j,end=" ")
    print()

#1 23 345 6789 
row=int(input("How many rows you want : "))
num=1
for i in range(row):
    for j in range(i+1):
        print(num,end=" ")
        num+=1
    print()

#1 21 321 4321 54321
row=int(input("How many rows you want : "))
for i in range(row+1):
    for j in range(1,i+1):
        print(j,end=" ")
    print()

#1 2,4 3,6,9 4,8,12,16 5,10,15,20,25
row=int(input("How many rows you want : "))
for i in range(row):
    for j in range(i):
        print(j*i,end=" ")
    print()
#different logic for the same
for row in range(1,5):
    num=row
    for j in range(row):
        print(num,end=" ")
        num+=row
    print()

#1 22 333 4444 55555
n=5
for i in range(1,n+1):
    for j in range(1,i+1):
        print(i,end=" ")
    print()

#A AB ABC ABCD ABCDE
n=5
for i in range(1,n+1):
    for j in range(i):
        print(chr(65+j), end=" ")
    print()

#star pattern in simple step
for k in range(1,6):
    print("*"*k)

#palindrom:1 121 12321 1234321
n=5
for i in range(1,6):
    for j in range(1,i+1):
        print(j,end=" ")
    for j in range(i-1,0,-1):
        print(j,end=" ")
    print('')
 
"""
1
2 6
3 7 10
4 8 11 13
5 9 12 14 15
"""
rows=5
for i in range(1,rows+1):
    m=rows-1
    num=i
    for j in range(i):
        print(num,end=" ")
        num+=m
        m-=1
    print(" ")