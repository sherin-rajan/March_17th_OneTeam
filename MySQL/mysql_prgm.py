import pymysql

connection=pymysql.connect(user="root",
                           password="Caleb@2499",
                           host="localhost",
                           database="MyPortalDB",
                           cursorclass=pymysql.cursors.DictCursor  # Sets return type to dictionary
                           )
track=connection.cursor() #cursor is to execute sql queries and transactions

def addUser():
    name=input("Enter your name : ")
    email=input("Enter your email : ")
    date=input("Enter your date of birth(YYYY-MM-DD) : ")
    track.execute(f"INSERT INTO users (full_name,email,DOB) VALUES('{name}','{email}','{date}')")
    connection.commit() #to save on the DB

def viewUsers():
    track.execute("SELECT * FROM users")
    data=track.fetchall()
    for user in data:
        print(f"{user['id']}  {user['full_name']}  {user['email']}  {user['DOB']}")
    connection.commit()

def deleteUser():
    id=int(input("Enter id : "))
    track.execute(f"DELETE FROM users WHERE id={id}")
    print("Person with id",id,'delected')
    connection.commit()

def viewById():
    id=int(input("Enter id : "))
    track.execute(f"SELECT * FROM users WHERE id={id}")
    person=track.fetchone()
    print(person)
    connection.commit()
    

while True:
    print("1.Add users\n2.View Users\n3.Delete User\n4.View By ID\n5.Exit")
    choice=int(input("Enter your choice : "))
    if choice==1:
        addUser()
    elif choice==2:
        viewUsers()
    elif choice==3:
        deleteUser()
    elif choice==4:
        viewById()
    elif choice==5:
        print("Exiting...")
        break
    else:
        print("Enter valid input")
