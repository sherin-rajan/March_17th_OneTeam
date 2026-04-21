# zip function : looping two or more different iterable together
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