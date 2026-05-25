#ask for how many elements in an array
#ask each one
#sort
#print most repeated element
n=int(input("How many elements do you want to enter:"))
"""a=[]
for i in range(1,n):
    v=input(f"Enter value {i}:")
    a+=[v]"""
a=[0]*n
for k in range(n):
    a[k]=int(input("Enter the Number:"))
a=sorted(a)
frq={}
for i in a:
    if i in frq:
        frq[i]+=1
    else:
        frq[i]=1
max_count=0
for h in frq:
    if frq[h]>max_count:
        max_count=frq[h]
        key=h
if max_count==1:
    print("Elements and its count:",frq)
else:
    print("Value:",key,"Count:",max_count)

#rearangement
l=[91,95,92,96,92,97,94]
l=l[: :2]+l[1: :2]
print(l)

