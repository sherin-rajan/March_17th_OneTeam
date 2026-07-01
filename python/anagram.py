#two strings(diff meaning) which has same alphabets and count 
s1=list(input("Enter the first string:").lower())
s2=list(input("Enter the second string:").lower())
l1=len(s1)
l2=len(s2)
is_anagram=True
if l1==l2:
    for i in s1:
        if i in s2:
            s2.remove(i)
        else:
            is_anagram=False
            print("Words are not anagram")
            break
    if is_anagram:
        print("Words are anagram")
else:
    print("Words are not anagram")     

#easy way
"""s1=input("Enter the first string:")
s2=input("Enter the second string:")
s1=s1.lower()
s2=s2.lower()

if sorted(s1)==sorted(s2):
    print("Words are anagram")
else:
    print("Words are not anagram")"""
s1="silent"
s2="liste"

if len(s1)==len(s2):

    count=0

    for i in s1:
        c1=0
        c2=0
        for k in s1:
            if k==i:
                c1+=1
        for j in s2:
            if j==i:
                c2+=1
        if c1!=c2:
            count+=1
            break
        
    if count==0:
        print("Anagram")
    else:
        print("Not anagram")
else:
    print("Not anagram")


