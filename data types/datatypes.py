"""
numbers
  int  2,3 4
  float 3.14
  complex 2j

string  "Sherin" index position, immutable
list[] index position, mutable
tuple() index postion, immutable
set{} unordred, no reptition
dictionary{} key:value, can add new key:value
boolean True or False
"""
age=27
p=3.14
c=2j
print(type(age))
print(type(p))
print(type(c))


name="Sherin"
print(name[3])  #[] used to access index position ie, S=0 


my_list=["sherin",27,23.6,7j] #list is declared in []
my_list[2]=[9,'ebin','kochi'] #adding list to it at particular position
print(my_list)
print(my_list[2][2])
print(my_list[2][-2])

t=("Sherin",12,9,10,'python') #declared in (), index position, immutable

s={12,'78',12, 78.23,'python'} # unordered, no repetition ie, only shows one 12
print(s)

student={'name':'sherin','age':27,12:19,'hobbies':['travel','reading','coding']}
print(student)
print(student['name'])
print(student['hobbies'])
print(student['hobbies'][1])
student['name']='akhil'
print(student)
student['place']='kochi'
print(student)