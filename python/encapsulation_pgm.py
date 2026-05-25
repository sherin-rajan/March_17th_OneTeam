#encapsulation: wrapping variables(data) and methods together
#can access using access modifier like public,protect and private(not strick as in java,c++)
#public:can access from anywhere
#protect:can access fromm its class and inherited classes
#private:can acces only in the class (but in python we can access)

class Person:
    def __init__(self,name,age,number):
        self.name=name
        self._age=age
        self.__number=number

p1=Person("Ebin",25,987654)
print(p1.name)
print(p1._age)
#print(p1.__number) error:private
print(p1._Person__number) #this is how we call private


class BankAccount:
    def __init__(self, name, balance, pin):
        self.name = name          # Public
        self._account_type = "Savings"   #Protected
        self.__balance = balance  #Private
        self.__pin = pin          #Private

    # Public method to access private data
    def deposit(self, amount):
        self.__balance += amount
        print("Deposited:", amount)

    def withdraw(self, amount, pin):
        if pin == self.__pin:
            if amount <= self.__balance:
                self.__balance -= amount
                print("Withdrawn:", amount)
            else:
                print("Insufficient balance")
        else:
            print("Invalid PIN")

    def get_balance(self, pin):
        if pin == self.__pin:
            return self.__balance
        else:
            return "Access Denied"
acc = BankAccount("Ebin", 1000, 1234)

print(acc.name)            #Public (accessible)
print(acc._account_type)   #Protected (not recommended but works)

# print(acc.__balance)     #Error (private)
acc.deposit(500)
acc.withdraw(300, 1234)

print("Balance:",acc.get_balance(1234)) #accessing private