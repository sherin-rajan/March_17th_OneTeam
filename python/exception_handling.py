#exception handling
a=10
b=20
#b=0
#b="v"
try:
    print("a/b=",a/b)
except ZeroDivisionError:
    print("You can not divide by zero") #if b=0
except TypeError:
    print("Please provide integer value greater than zero") #b="v"
except Exception as e:
    print("Error occured as {}".format(e)) #if no b, it shows as error occured as 'b' is not defined
else:
    print("Program executed successfully in try block")
finally:
    print("program executed")