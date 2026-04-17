#list methods
ml=["a",'b','c','d','e','f','g','h']
ml.append(13)    #adding to end
ml.extend('ABCD')   #only iterable, added one by one
ml.extend(['key','kochi'])
print(ml)
ml.insert(1,34)       #adding to index position
ml.remove(12)         #remove specific element
ml.pop(1)     #removing by index position
ml.clear()    #clear all elements
count=ml.count('Kochi')   #counting specific elements
count=ml.index('kochi')   ##reverse the order
ml.sort()    #sorting in ascending order

#list slicing
print(ml[:])
print(ml[1:5])
print(ml[:4])
print(ml[2:])
print(ml[: :-1])
print(ml[6:2:-1])
print(ml[1:6:2])
print(ml[-6:-3:1])
