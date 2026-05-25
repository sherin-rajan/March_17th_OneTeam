#list,loop,if-else,function,exception handling,copy,class-object

import copy

print("Welcome to ABC Consultants")
print(" ABC Employee System")
#adding candidates details
employee=[]
class Employee:
    def __init__(self,name,age,salary):
        self.name=name
        self.age=age
        self.salary=salary
    def calculate_salary(self):
        return self.salary
    def get_role(self):
        return "Employee"
    def display(self):
        print("\n-----------------")
        print("Role:",self.get_role())
        print("Employee Name:",self.name)
        print("Age:",self.age)
        print("Salary:",self.calculate_salary())

class Manager(Employee):
    def __init__(self,name,age,salary,bonus):
        super().__init__(name,age,salary)
        self.bonus=bonus
    def calculate_salary(self):   #return self.salary+self.bonus  easy way
        cal_total=lambda salary,bonus:salary+bonus
        total=cal_total(self.salary,self.bonus)
        return total
    def get_role(self):
        return "Manager"

class Recruiter(Employee):
    def __init__(self,name,age,salary,allowance):
        super().__init__(name,age,salary)
        self.allowance=allowance
    def calculate_salary(self):
        return self.salary+self.allowance
    def get_role(self):
        return "Recruiter"
    
def add_employee():
    print("\n1.Employee\n2.Manager\n3.Recruiter")
    choice=int(input("Select Type:"))
    name=input("Enter Name:")
    age=int(input("Enter Age:"))
    salary=float(input("Enter Salary:"))

    if choice==1:
        emp=Employee(name,age,salary)
    elif choice==2:
        bonus=float(input("Enter Bonus:"))
        emp=Manager(name,age,salary,bonus)
    elif choice==3:
        allowance=float(input("Enter Allowance:"))
        emp=Recruiter(name,age,salary,allowance)
    else:
        print("Invalid Input")
        return
    employee.append(emp)
    print("Employee added successfuly")

def view_employee():
    if not employee:
        print("No Employee is found!")
        return
    for emp in employee:
        emp.display()

def search_employee():
    name=input("Enter the name to search:")
    is_there=False
    for emp in employee:
        if emp.name.lower()==name.lower():
            print("Employee Found")
            emp.display()
            is_there=True
    if not is_there:
        print("Employee not Found!")

def delete_employee():
    name=input("Enter the name to delete:")
    for emp in employee:
        if emp.name.lower()==name.lower():
            employee.remove(emp)
            print("Employee deleted successfuly!")
            return
    print("Employee not Found!")

def update_employee():
    name=input("Enter employee name to update:")
    for emp in employee:
        if emp.name.lower()==name.lower():
            print("Employee Found! Please enter the details")
            print("Role:",emp.get_role())
            try:
                emp.age=int(input("Enter the new age:"))
                emp.salary-float(input("Enter the new salary:"))
            except:
                print("Invalid Input!Update Cancelled")
                return
            if isinstance(emp,Manager):
                emp.bonus=float(input("Enter the new bonus:"))
            elif isinstance(emp,Recruiter):
                emp.allowance=float(input("Enter the new allowance:"))
            print("Details updated successfuly!")
            return
    print("Employee not Found!")

def count_employee():
    print("Total Employees:",len(employee))

def copy_employee():
    shallow=copy.copy(employee)
    deep=copy.deepcopy(employee)
    print("\nShallow Copy:",shallow)
    print("\nDeep Copy:",deep)


while True:
    print("\n----------------------")
    print("1.Add Employee")
    print("2.View Employee")
    print("3.Search by Name")
    print("4.Delete Employee")
    print("5.Update Employee")
    print("6.Total Employees")
    print("7.Copy of Employees")
    print("8.Exit")
    print("-----------------------")

    try:
        choice = int(input("Enter your choice:"))
        
        if choice==1:
            add_employee()
        elif choice==2:
            view_employee()
        elif choice ==3:
            search_employee()
        elif choice==4:
            delete_employee()
        elif choice==5:
            update_employee()
        elif choice==6:
            count_employee()
        elif choice==7:
            copy_employee()
        elif choice==8:
            break 
        else:
            print("Invalid choice")
    except:
        print("Please enter a valid number")






  
        




        

