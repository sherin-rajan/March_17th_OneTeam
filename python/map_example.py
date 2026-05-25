numbers=[23,12,5,6]
def multiply(a):
    return a*2

"""
l=[]
for k in numbers:
    l.append(multiply(k))
print(l)"""

#l=list(map(multiply,numbers))    
#print(l)
l=list(map(lambda a:a*2,numbers))
print("Multiply by 2:",l)

num=[23,12,4,5,6,8,57,13,22]
b=list(filter(lambda a:a%2==0,num))
print("Even:",b)

#reduce(): take two values at a time
from functools import reduce
m=[23,12,5,6,13]
n=reduce(lambda a,b:a+b,m)
print("Sum of m:",n)

#factorial
k=int(input("Enter any number:"))
fact=reduce(lambda a,b:a*b,range(1,k+1))
print("FActorial:",fact)

