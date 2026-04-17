a=[1,2,3,4,5,6,7,8,9]
"""
evens=[]
for k in a:
    if k%2==0:
        evens+=[k]
print(evens)"""

evens=[k for k in a if k%2==0]
print(evens)

odd=[k for k in a if k%2!=0]
print(odd)

evens=[k for k in range(1,13) if k%2==0]
print(evens)

vowels=[k for k in ["kochi",'apple','orange','kiwi'] if k[0] in 'AEIOUaeiou']
print(vowels)

