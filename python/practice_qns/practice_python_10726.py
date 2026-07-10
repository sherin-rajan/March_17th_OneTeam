#hollow square of n
n=int(input("How many * in one row: "))
for i in range(1,n+1):
    for j in range(1,n+1):
        if i==1 or i==n or j==1 or j==n:
            print("*",end="")
        else:
            print(" ",end="")
    print()

#first n prime numbers
num=int(input("How many * in one row: "))
count=0
n=2
while True:
    if n>1:
        is_prime=True
        for i in range(2,int(n*.5)+1):
            if n%i==0:
                is_prime=False
                break
        if is_prime:
            print(n,end=" ")
            count+=1
    n+=1
    if count==num:
        break
