import copy  #to import in-built copy file
             #need to import copy to access it as below

l=[[23,12],[1,6]]
new_l=copy.copy(l) #shallow copy : changes reflect nested items in the original also
print(new_l)
new_l[0][1]=45  #made changes in new_l
print(new_l)
print(l)       #changes reflect in l also, this is shallow copy

newnew_l=copy.deepcopy(l) #deep copy : complete independent clone
print(newnew_l)
newnew_l[0][1]=3  
print(newnew_l)
print(l)         #does not reflect in l, this is deep copy
