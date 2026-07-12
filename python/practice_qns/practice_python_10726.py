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

#factorial using function
def factorial(n):
    fact=1
    for i in range(1, n+1):
        fact=fact*i
    return fact

num=int(input("Enter any number: "))
print(factorial(num))

#factorial using recursion
def factorial(n):
    if n==0 or n==1:
        return 1
    return n*factorial(n-1)

num=int(input("Enter any number: "))
print(factorial(num))

#frequency of alphabets
s=input("Enter a string: ")
freq={}
for ch in s.lower():
    if ch in freq:
        freq[ch] += 1
    else:
        freq[ch] = 1
for ch in freq:
    print(ch, ":", freq[ch])

#anagram function
def is_anagram(s1,s2):
    l1=len(s1)
    l2=len(s2)
    is_anagram=True
    if l1==l2:
        for i in s1:
            if i in s2:
                s2.remove(i)
            else:
                is_anagram=False
                print("Words are not anagram")
                break
        if is_anagram:
            print("Words are anagram")
    else:
        print("Words are not anagram")

str1=list(input("Enter the first string:").lower())
str2=list(input("Enter the second string:").lower()) 
is_anagram(str1,str2)  

#is perfect number
num=int(input("Enter any number: "))
sum=0
for i in range(1,num):
    if num%i==0:
        sum+=i
if sum==num:
    print("Perfect Number")
else:
    print("Not a Perfect Number")

#perfect numbers between 1 and 10000
print("Perfect numbers between 1 and 10000:")
for num in range(1,10001):
    sum=0
    for i in range(1,num):
        if num%i==0:
            sum+=i
    if sum==num:
        print(num)
