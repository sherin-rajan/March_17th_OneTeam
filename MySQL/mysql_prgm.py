import pymysql

connection=pymysql.connect(user="root",password="Caleb@2499",host="localhost",database="MyPOrtalDB")
track=connection.cursor() #cursor is to execute sgq queries and transactions

def addUser():
    name=input("Enter your name : ")
    email=input("Enter your email : ")
    date=input("Enter your date of birth(YYYY-MM-DD) : ")
    track.execute(f"INSERT INTO users (full_name,email,DOB) VALUES('{name}','{email}','{date}')")
    connection.commit() #to save on the DB

while True:
    print("1.Add users\n5.Exit")
    choice=int(input("Enter your choice : "))
    if choice==1:
        addUser()
    elif choice==5:
        print("Exiting...")
        break
    else:
        print("Enter valid input")
