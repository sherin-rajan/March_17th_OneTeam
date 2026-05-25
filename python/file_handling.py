"""file=open("abc.txt","w+")
file.write("Hello, Developers.\n")
file.write("File handling")
file.close()
file=open("abc.txt","r")
print(file.read())
#print(file.readline(2))"""
with open("abc.txt", "w") as file:
    file.write("Hello, Python!\n")
    file.write("File handling")

file=open("abc.txt","r")
print(file.read())