#sum of digits until get single digit
n=list(input("Enter any number:"))
while len(n)>1:
    t=sum(int(d) for d in n)
    n=list(str(t))
print("Sum:",int(n[0]))

#fibonacci
n=int(input("Enter any number:"))
first,second=0,1
print(first,second,end=" ")
for i in range(1,n+1):
    third=first+second
    print(third,end=" ")
    first,second=second,third
print()
