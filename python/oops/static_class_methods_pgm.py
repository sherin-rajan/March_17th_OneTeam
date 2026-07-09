#static method: like a normal function inside a class, can be directly access without object
class Person:
    def __init__(self, age):
        self.age = age

    @staticmethod
    def is_adult(age):
        return age >= 18

print(Person.is_adult(20))
p = Person(16)
print(p.is_adult(p.age))

#class method: used to display class variables without object
class OneTeam:
    i_name="One Team"
    def __init__(self,name,age):
        self.name=name
        self.age=age
    @classmethod
    def show(cls):
        return OneTeam.i_name
    
print(OneTeam.show())

#class method: used to change class variables without object
class OneTeam:
    i_name="One Team"
    def __init__(self,name,age):
        self.name=name
        self.age=age
    @classmethod
    def change(cls,new):
        cls.i_name=new

OneTeam.change("ABC")
print(OneTeam.i_name)

#class mathod can be used for object creation
from datetime import date

class Person:
    def __init(self,name,age):
        self.name=name
        self.age=age

    @classmethod
    def from_birth_year(cls,name,year):
        return cls(name,date.today().year-year)

p=Person.from_birth_year("Jake",2000)
print(p.name)
print(p.age)

