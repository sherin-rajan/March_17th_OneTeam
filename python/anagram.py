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


