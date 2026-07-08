# sorting 
dict=[{"name":"Ravi","age":24},{"name":"Priya","age":19},{"name":"Aman","age":27},{"name":"Neha","age":22},{"name":"Kiran","age":20}]
n=len(dict)
for i in range(n):
    for j in range(0,n-i-1):
        if dict[j]["age"]>dict[j+1]["age"]:
            dict[j],dict[j+1]=dict[j+1],dict[j]
for i in dict:
    print(i["name"],end=" -> ")

print()


#BMI
def calculate_bmi(weight,height):
    bmi=weight/height
    print("Your BMI: ",bmi)
    if bmi<18.5:
        print("Category: Underweight")
    if bmi>=18.5 and bmi<=24.9:
        print("Category: Normal Weight")
    if bmi>=25.0 and bmi<=29.9:
        print("Category: Overweight")
    if bmi>30.0:
        print("Category: Obese")

while True:
    try:
        weight=float(input("Enter your weight(in kg): "))
        if weight<=0:
            print("Weight must greater than zero")
            break
        
        height=float(input("Snter your height(in meter): "))
        if height<=0:
            print("Height must greater than zero")
            break
        calculate_bmi(weight,height)
    except ValueError:
        print("Enter numeric value") 

"""
2
3 5
7 11 13
17 19 23 29
"""


#matrix
matrix=[[1,2,3],[4,5,6]]
new_matrix=[]
for i in range(0,len(matrix)+1):
    new=[]
    for j in matrix:
        new+=[j[i]]
    new_matrix+=[new]
print(new_matrix)