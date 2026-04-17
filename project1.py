#Student result and analytics system
students=[]
no_of_students=int(input('Number of students you want to enter: '))
for k in range(1,no_of_students+1):
    print(f'Enter the details of student {k}')
    name=input("Name: ")
    roll_number=int(input("Roll Number: "))

    #no_of_subjects=int(input("Number of subjects you want to enter: "))
    marks=[]
    print("Enter marks:")
    for h in range(1,4):
        mark=int(input(f"Subject {h}: "))
        marks+=[mark]

    def recursive_sum(marks):
        if len(marks)==0:
            return 0
        else:
            return marks[0]+recursive_sum(marks[1:])
 
    total=recursive_sum(marks)

    average=total/3

    fail_count=0
    if average>=90:
        grade="A"
    elif average>=75:
        grade="B"
    elif average>=50:
        grade="C"
    else:
        grade='Fail'
        fail_count+=1
    
    student={
        "Name":name,
        "Roll Number":roll_number,
        "Total Marks":total,
        "Average":average,
        "Grade":grade
    }
    students+=[student]

n=len(students)
for i in range(n):
    for j in range(0,n-i-1):
        if students[j]['Total Marks']>students[j+1]['Total Marks']:
            students[j],students[j+1]=students[j+1],students[j]


print("---STUDENTS DETAILS---")
for student in students:
    print("Name: ",student['Name'])
    print("Roll Number: ",student['Roll Number'])
    print("Total Marks: ",student['Total Marks'])
    print("Average: ",student['Average'])
    print("Grade: ",student['Grade'])
    print("-------------------")

print("---CLASS ANALYTICS---")
print('Class Topper is', students[0]['Name'])
class_total=students[0]['Total Marks']+students[1]['Total Marks']
class_avg=class_total/no_of_students
print('Class average: ',class_avg)
print('Failed Students: ',fail_count)



        


