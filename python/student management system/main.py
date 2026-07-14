from validation import *
from config import *

print("="*30)
print("  STUDENT MANAGEMENT SYSTEM")
print("="*30)
print("\nLOGIN")

def login():
    attempt=0
    while attempt<3:
        user=input("Enter your username: ")
        pw=input("Enter your password: ")
        if validate_username(user) and validate_password(pw) and user==admin_username and pw==admin_password:
            return True
            break
        else:
            print("Wrong username or password! Try again!")
            attempt+=1
    print("Application closed after three failed login attempts!")
        
if login():
    while True:
        print("""\n1. Add Student
    2. View All Students
    3. Search Student
    4. Update Student
    5. Delete Student
    6. Restore Database
    7. View Student Details
    8. Logout""")
        choice=int(input("Enter your choice: "))

        if choice==1:
            print("added")
        elif choice==2:
            print("viewed")
        elif choice==3:
            print("searched")
        elif choice==4:
            print("updated")
        elif choice==5:
            print("deleted")
        elif choice==6:
            print("restored")
        elif choice==7:
            print("View student details")
        elif choice==8:
            print("logout")
            break
        else:
            print("Invalid Choice!")


    

