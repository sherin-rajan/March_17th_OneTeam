from tkinter import *

window = Tk()
window.title("My First Window")
window.geometry("300x200")

label = Label(window, text="Hello, Tkinter!")
label.pack()

window.mainloop()