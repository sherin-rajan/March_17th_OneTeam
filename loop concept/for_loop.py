# print each letter until iteration ends
for i in "EBIN":
    print(i)

for value in [10,11,12,13,14,15]:
    print(value)

for items in ('python','aws','asp.net','c++'):
    print(items)

for x in {'a','b','c','d','e','f'}:
    print(x)

    
for a in {1:'abc',2:'bcd',3:'cde',4:'def',5:'eeg'}:  # print only the keys
    print(a)
 
student={'name':'sherin','age':23,'place':'kochi'}
for key in student:
    print(key,student[key])
 
# printing only product of 5(divisible by 5) from the range    
for k in range(1,51):
    if k%5==0:
        print(k,end=" ")

# printing values divisible by 5 & 7
numbers=list(range(1,101))
for k in numbers:
    if k%5==0 and k%7==0:
        print(k,end=" ")

# sum of values in the list
numbers=[23,7,19,4,8,13]  #taking one by one fron list and added and stored to result
result=0                  #ie, 0+23,23+7,30+19...
for n in numbers:
    result=n+result
print(f'Sum of values in {numbers} = ',result)

# product of values in the list
number=[1,2,3,4,5]
result=1
for n in number:
    result=n*result
print(result)

for h in range(1,11):
    if h==5:
        h+=1
        break
    print(h,end=" ")
    h+=1

number=int(input('Enter any number : '))
result=1
for n in range(1,number+1):
    result=n*result
print(f'Factorial of {number} : ',result)

#reverse counting
for n in range(10,0,-1):
    print(n,end=" ")

for n in range(50,0,-5):
    print(n,end=" ")

# even numbers
for n in range(1,51):
    if n%2==0:
       print(n,end=" ")

# odd numbers
for n in range(1,51):
    if n%2!=0:
        print(n,end=" ")

# multiplication of any number
number=int(input('Enter any number '))
n=1
for n in range(1,11):
    result=number*n
    print(result,end=' ')


n = 5
for i in range(1, n+1):
    for j in range(i):
        print("*", end="")
    print() 

    
size=int(input("How many number do you want to enter : "))
total=0
for i in range(size):
    num=int(input('Enter the value : '))
    total+=num
print("Sum=",total)

size=int(input("How many number do you want to enter : "))
total=0
for i in range(1,size+1):
    num=int(input(f'{i}. Enter the value : '))
    total+=num
print("Sum=",total)

size=int(input("How many number do you want to enter : "))
product=1
for i in range(1,size+1):
    num=int(input(f"{i}. Enter the value : "))
    product*=num
print('Product = ',product)
 