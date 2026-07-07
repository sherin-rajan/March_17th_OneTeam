a=int(input("First number: "))
b=int(input("Second number: "))
c=int(input("Third number: "))
if a>b:
    if a>c:
        print(f"{a} is the largest number")
    else:
        print(f"{c} is the largest number")
else:
    if b>c:
        print(f"{b} is the largest number")
    else:
        print(f"{c} is the largest number")

#largest 
l=[[3,6],[2,45],[7,8],[67,33]]
for i in l:
    mx=i[0]
    for j in i:
        if mx<j:
            mx=j
print("Largest =",mx)

#search a number
l=[[3,6],[2,45],[7,8],[67,33]]
find=int(input("Enter any value: "))
found=False
for i in l:
    for j in i:
        if j==find:
            print("Value found")
            found=True
            break
if found==False:
    print("Not found")

#sum of rows
l=[[3,6,2],[7,8,67],[33,4,9]]
for i in l:
    sum=0
    for j in i:
        sum+=j
    print(f"Sum of row {i}:{sum}")