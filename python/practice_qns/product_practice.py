inventory_list=[
    (1,"Laptop",10),
    (2,"Mouse",50),
    (3,"Keyboards",30)
]

ordered_list=[(101,"Laptop",2),
              (102,"Mouse",5),
              (103,"Laptop",1),
              (104,"Keyboards",3),
              (105,"Mouse",5)]

#1.unique Product names
unique_name=[]
for i in inventory_list:
        n=i[1]
        unique_name.append(n)
print("Unique Product Name :",unique_name)

#2.total order
l=0
m=0
k=0
for j in ordered_list:
        if 'Laptop' in j:
                print(j)
                l+=j[2]
        if 'Mouse' in j:
                m+=j[2]
        if 'Keyboards' in j:
                k+=j[2]

total_order={"Laptop":l,"Mouse":m,"Keyboard":k}
print("Total Quantity Ordered:",total_order)

#3.updated inventory
for c in inventory_list:
    if "Laptop" in c:
            l_new=c[2]-l
    if "Mouse" in c:
            m_new=c[2]-m
    if "Keyboards" in c:
            k_new=c[2]-k
            
inventory_list[0]=(1,"Laptop",l_new)
inventory_list[1]=(2,"Mouse",m_new)
inventory_list[2]=(3,"Keyboards",k_new)

print("Updated Inventory:",inventory_list)

#4.products ordered more than once
count={}
for t in ordered_list:
    product=t[1]      #Laptop,Mouse,Keyboards
    if product in count:
        count[product]+=1  #Laptop:2
    else:
        count[product]=1  #Laptop=1

more=[]
for product in count:
    if count[product]>1:  #if laptop's value is more than one
        more+=[product]
print("Products Ordered More Than Once:",more)


#5.Sorted Inventory
print("Sorted Inventory:",inventory_list)

#6.Product with lowest stock
low=min(inventory_list, key=lambda x:x[2])
print("Product with lowest stock:",low) 