#loop until condtion false
count=1
while count<=10:
    print(count,end=" ")
    count+=1 


count=1
while count<=10:
    if count==5:
        count+=1
        continue
    print(count,end=" ")
    count+=1


count=1
while count<=10:
    if count==5:
        count+=1
        break
    print(count,end=" ")
    count+=1

# reverse counting
count=11
while count>=1:
    count=count-1
    print(count,end=" ")

count=10
while count>=0:
    print(count,end=" ")
    count=count-1

# even numbers
count=0
while count<=20:
    count=count+1
    if count%2==0:
        print(count,end=" ")

# odd numbers
count=0
while count<=20:
    count=count+1
    if count%2!=0:
        print(count,end=" ")  
 

