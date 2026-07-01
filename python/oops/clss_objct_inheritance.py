#class,object and inheritance
#client management system
class Client:
    def __init__(self,client,company,service):
        self.client=client
        self.company=company
        self.service=service
    def display(self):
        print("Client Name:",self.client)
        print("Company Name:",self.company)
        print("Service:",self.service)

class PremiumClient(Client):
    def __init__(self,client,company,service,p_service):
        super().__init__(client,company,service)
        self.priority=p_service
    def display(self):
        super().display()
        print("Priority Support:",self.priority)

cl1=PremiumClient("Ebin","OneTeam","Resume",False)
cl1.display()

cl2=Client("AAA","ABC","XYZ")
cl2.display()

#Vehicle System
class Vehicle:
    def __init__(self,brand,speed):
        self.brand=brand
        self.speed=speed
    def show(self):
        print("Brand:",self.brand)
        print("Speed:",self.speed)
        
class Car(Vehicle):
    def __init__(self,brand,speed,doors):
        super().__init__(brand,speed)
        self.doors=doors
    def show(self):
        super().show()
        print("Type:Car")
        print("Doors:",self.doors)
class Truck(Vehicle):
        def __init__(self,brand,speed,capacity):
            super().__init__(brand,speed)
            self.capacity=capacity  
        def show(self):
            super().show()
            print("Type:Truck")
            print("Load Capacity:",self.capacity)

v1=Car("Toyota",180,4)
v2=Truck("Tata",100,"10 Tons")
vehicles=[v1,v2]

for i in vehicles:
    print("-------------")
    i.show()

#Online purchase
class Product:
    def __init__(self,name,price):
        self.name=name
        self.price=price
    def show(self):
        print("Product Name:",self.name)
        print("Product Price:",self.price)
class Electronics(Product):
    def __init__(self,name,price,warranty):
        super().__init__(name,price)
        self.warranty=warranty
    def show(self):
        super().show()
        print("Product Warranty:",self.warranty)
class Cloths(Product):
    def __init__(self,name,price,size):
        super().__init__(name,price)
        self.size=size
    def show(self):
        super().show()
        print("Size:",self.size)
class Grocery(Product):
    def __init__(self,name,price,expiry):
        super().__init__(name,price)
        self.expiry=expiry
    def show(self):
        super().show()
        print("Expiry Date:",self.expiry)
    
p1=Electronics("Laptop",50000,"2 Years")
p2=Cloths("Shirt",500,"L")
p3=Grocery("Sugar",80,"20/05/2026")

p=[p1,p2,p3]

for i in p:
    print("----------------")
    i.show()

