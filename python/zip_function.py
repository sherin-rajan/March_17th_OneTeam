"""zip function:aggregates elements from multiple iterables (like lists, tuples, or strings) 
   into a single iterator of tuples""" 

names=["Aswin","Ronald","Joyal"]
marks=[23,25,30]
paired_list=list(zip(names,marks))  #as list of tuples
print(paired_list)

names=["Aswin","Ronald","Joyal"]
marks=[23,25,30]
paired_dict=dict(zip(names,marks)) #as dictionary
print(paired_dict)

#unzipping
names=["Aswin","Ronald","Joyal"]
marks=[23,25,30]
zipped=zip(names,marks)
names_tuple,marks_tuple=zip(*zipped)
print(names_tuple,marks_tuple)

#looping using zip
names=["Aswin","Ronald","Joyal"]
marks=[23,25,30]
for k,m in zip(names,marks):
    print(f"{k}={m}")

names=["Aswin","Ronald","Joyal","Ebin"]
marks=[23,25,30]
for k,m in zip(names,marks):   #extras didn't take
    print(f"{k}={m}")

names=["Aswin","Ronald","Joyal","Ebin"] #can do in any iterables
marks={23,25,30}
for k,m in zip(names,marks):
    print(f"{k}={m}")

#adding 
elements=[20,30,40]
marks=[23,25,30]
compined=zip(elements,marks)
sum_of_two=[x+y for x,y in compined] #20+23,30+25,30+40
print(sum_of_two)