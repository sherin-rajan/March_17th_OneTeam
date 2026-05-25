#package for GUIs
from tkinter import *

window=Tk()
window.geometry()
def SignUp():
    print(f"Hi,{f_name.get()} {l_name.get()}")
Label(text="First Name").grid(row=0,column=0)
f_name=Entry()
f_name.grid(row=0,column=1)

Label(text="Last Name").grid(row=1,column=0)
l_name=Entry()
l_name.grid(row=1,column=1)

Button(text="Register",command=SignUp).grid(row=2,column=0,columnspan=2)
window.mainloop()

