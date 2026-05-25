#students record management system
import copy
students=[]
names=[]
roll_numbers=[]
marks=[]
try:
    no_of_students=int(input('Number of students you want to enter: '))
    avg=[]
    for k in range(1,no_of_students+1):
        print(f'Enter the details of student {k}')
        name=input("Name: ")
        names.append(name)
        roll_number=int(input("Roll Number: "))
        roll_numbers+=[roll_number]
        try:
            print("Enter marks:")
            subjects_marks=[]
            total_mark=0
            for k in range(1,4):
                mark=int(input(f"Subject {k}: "))
                total_mark+=mark
                subjects_marks.append(mark)
            marks.append(subjects_marks)
            avg_mark=total_mark/3
            avg.append(avg_mark)
            paired_name_mark=dict(zip(names,avg))
        except:
            print("Please Enter Valid Marks")       
except:
    print("Invalid Input!Please Enter Any Number Greater Than Zero")
paired_dict=dict(zip(names,roll_numbers))
print("Names and Roll Numbers:",paired_dict)
len_5=[]
for l in names:
    if len(l)>=5:
        len_5.append(l)
print("Names with more than 5 alphabets:",len_5)
a_name=[]
for a in names:
    if a.upper().startswith('A'):
        a_name.append(a)
print("Names starts with A:",a_name)
#print(avg)
avg_75={}
for k,v in paired_name_mark.items():
    if v>75:
        avg_75[k]=v
print("Average more than 75:",avg_75)
even=[d for d in roll_numbers if d%2==0]
print("Even Roll Numbers:",even)
tuple_first=tuple(marks[0])
print("First student marks in tuple:",tuple_first)
set_marks=set(x for sublist in marks for x in sublist)
print("Unique Marks:",set_marks)
s_cpy=copy.copy(marks)
print("Shallow copy:",s_cpy)
d_cpy=copy.deepcopy(marks)
print("Deep copy:",d_cpy)
try:
    marks[0][0]=int(input("Changed mark of subject 1:"))
except:
    print("Invalid mark!Please Enter Valid One")
print("original:",marks)
print("Shallow:",s_cpy)
print("Deep:",d_cpy)



