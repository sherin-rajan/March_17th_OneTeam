#static method
class Person:
    def __init__(self, age):
        self.age = age

    @staticmethod
    def is_adult(age):
        return age >= 18

print(Person.is_adult(20))
p = Person(16)
print(p.is_adult(p.age))

#class mathod
"""from datetime import date

class Person:
    def __init(self,name,age):
        self.name=name
        self.age=age

    @classmethod
    def from_birth_year(cls,name,year):
        return cls(name,date.today().year-year)

p=Person.from_birth_year("Jake",2000)
print(p.name)
print(p.age)"""

