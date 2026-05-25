"""class Cars:  #good to make first letter capital
    wheels=4  #class variable
    def __init__(self,brand,model):  #__init__ for giving datas when creating the objets
        self.company=brand
        self.edition=model

    def display(self):
        print("Brand:",self.company)
        print("Model:",self.edition)
        print("------------------------")

#car1=Cars() #object
#car2=Cars() #object
car1=Cars("Mahindra","Thar") #using init
car2=Cars("Marutu Suzuki","Swift")
print(car1.wheels)
print(car2.wheels)

#car1.data("Mahindra","Thar")
#car2.data("Maruti Suzuki","Swift")

#print(car1.company,car1.edition)
#print(car2.edition)
car1.display()
car2.display()"""

class Employee:
    def __init__(self,name,id,salary):
        self.name=name
        self.id=id
        self.salary=salary
    def display(self):
        print('Name:',self.name,"ID:",self.id,'Salary:',self.salary)

emp1=Employee("Akash",1,10000)
emp2=Employee("Kiran",2,15000)

emp1.display()
emp2.display()


