#@property: used to access protecteed/private data directly
#@property.setter:used to change the data in protected/private

class Circle:
    def __init__(self,radius):
        self._radius=radius  #protected
    
    @property     #accessing
    def radius(self):    
        return self._radius
    
    #setter
    @radius.setter    #to change
    def radius(self,value):
        self._radius=value
    
c=Circle(5)
print(c.radius)

c.radius=10
print(c.radius)


class Person:
    def __init__(self,name,age):
        self._name=name  #protected
        self.__age=age   #private
    
    @property
    def details(self):
        return self._name,self.__age
    
#for more than one data to change there few options w/o error
    @details.setter       
    def details(self,data):
        self._name,self.__age=data
"""
#2nd: passing dictionary  
 
    @details.setter       
    def details(self,data):
        self._name=data.get("Name")
        self.__age=data.get("Age")"""

#3rd:separate setter methods ie,separate @property and @setter
    
p=Person("Ebin",25)
print(p.details)

p.details=("Abin",34)
#p.details={"Name":"Abin","Age":34}
#p.details="Abin"
#p.details=34
print(p.details)


