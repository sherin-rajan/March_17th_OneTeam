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
