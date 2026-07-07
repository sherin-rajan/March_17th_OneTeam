"""r=0
for i in range(6):
    for j in range(i):
        print(chr(65+r),end=" ")
        r+=1
    print()

"""
"""
A
B A
C B A
D C B A
"""
"""
print("-------------------")
for i in range(5,0,-1):
    for j in range(5-i,0,-1):
        print(chr(64+j),end=" ")
    print()

print("--------------")
n=int(input("How many words you wish to enter: "))
words=[]
for i in range(n):
    word=input(f"Enter word{i+1}: ")
    words+=[word]
for j in words:
    if j[-1] in "AEIOUaeiou":
        print(j)

print("-----------------")
matrix=[[1,2,3],
        [4,5,6]]
new=[x for sublist in matrix for x in sublist]
print(new)"""

#data=["eat","tea","tan","ate","nat","bat"]
#show=[["eat","tea","ate"],["tan","nat"],["bat"]]
"""
1
2 6
3 7 10
4 8 11 13
5 9 12 14 15

n=5
for i in range(1,n+1):
    r=i
    a=n-1
    for j in range(1,i+1):
        print(r,end=" ")
        r+=a
        a-=1
    print()"""

#perfect numbers=sum of factors = number itself eg:1+2+3=6
"""
n=1
count=0
while True:
    sum=0
    for i in range(1,n):
        if n%i==0:
            sum+=i
    if sum==n:
        count+=1
        print(n)
    if count==3:
        break
    n+=1"""

#stock=[{"keyboard":13},{"laptop":2},{"mouse":11}] in ascending order of stock

employee=[]
class Employee:
    def __init__(self,id,name,depart,basic):
        self.id=id
        self.name=name
        self.depart=depart
        self.basic=basic
    def cal_sal(self):
        return self.basic

class Manager(Employee):
    def __init__(self,id,name,depart,basic,bonus):
        super().__init__(id,name,depart,basic)
        self.bonus=bonus
    def cal_sal(self):
        salary=self.basic+self.bonus
        return salary

class Developer(Employee):
    def __init__(self,id,name,depart,basic,oth):
        super().__init__(id,name,depart,basic)
        self.oth=oth
        self.hr=500
    def cal_sal(self):
        salary=self.basic+(self.oth*self.hr)
        return salary

class Intern(Employee):
    def __init__(self,id,name,depart,stipend):
        super().__init__(id,name,depart,0)
        self.stipend=stipend
    def cal_sal(self):
        salary=self.stipend
        return salary

#add employee
def Add():
    print("1.Manager\n2.Developer\n3.Intern")
    choice=int(input("Your choice: "))
    id=int(input("Enter your ID: "))
    name=input("Enter your name: ")
    depart=input("Enter your department: ")
    try:
        if choice==1:   
            basic=int(input("Your basic salary: "))
            bonus=int(input("Your bonus: "))
            emp=Manager(id,name,depart,basic,bonus)
        elif choice==2:
            basic=int(input("Your basic salary: "))
            oth=int(input("Your Overtime hour: "))
            emp=Developer(id,name,depart,basic,oth)
        elif choice==3:
            stipend=int(input("Enter your stipend: "))
            emp=Intern(id,name,depart,stipend)
        employee.append(emp)
    except:
        print("Invalid input")


Add()
for emp in employee:
    print(emp.id, emp.name, emp.depart, emp.cal_sal())



        









    


        

        
        



    