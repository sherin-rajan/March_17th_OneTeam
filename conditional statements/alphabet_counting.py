y_string=input("Enter your string : ")
word_count=dict()

for k in my_string:
    if k in word_count:
        word_count[k]=word_count[k]+1 #value updated for key
    else:
        word_count[k]=1  # new key is created
for v in word_count:
    print(f"{v} = {word_count[v]}")

string=input("Enter your string : ")
count=dict()
for k in string:
    if k in count:
        count[k]=count[k]+1
    else:
        count[k]=1
print(count)


string=input("Enter your string : ")
count=dict()
for k in string:
    if k in count:
        count[k]=count[k]+1
    else:
        count[k]=1
print(count)

#vowels count
string=input("Enter your string : ")
count=dict()
for k in string:
    if k in "AEIOUaeiou":
        if k in count:
            count[k]=count[k]+1
        else:
            count[k]=1
for v in count:
    print(f"{v}={count[v]}")
