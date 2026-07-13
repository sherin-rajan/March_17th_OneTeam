from validation import *

print("="*30)
print("  STUDENT MANAGEMENT SYSTEM")
print("="*30)
print("\nLOGIN")
user=input("\nEnter your username: ")
if validate_username(user):
    pw=input("\nEnter your password: ")
    if validate_password(pw):
     print("Login Successfuly!")
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
        if choice==2:
            print("viewed")
        if choice==3:
            print("searched")
        if choice==4:
            print("updated")
        if choice==5:
            print("deleted")
        if choice==6:
            print("restored")
        if choice==7:
           print("logout")
else:
    print("Invalid Username!")


    

