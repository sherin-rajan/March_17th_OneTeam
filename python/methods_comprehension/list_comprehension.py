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

matrix=[[x for x in range(1,4)] for y in range(3)]  #3x3 matrix
print(matrix)

#flatening
nested=[[1,2],[3,4],[5,6]]
flat=[n for sublist in nested for n in sublist]
print(flat)

vowel=[char for char in "Hello World" if char in "AEIOUaeiou"]
print(vowel)

def square(x):
    return x*x
squares=[square(x) for x in range(1,6)]
print(squares)