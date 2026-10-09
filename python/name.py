"""
name="Liam"
age=1
place="Pathanamthitta"
print("My name is Liam and I am 1 years old")
print("My name is",name,"and I am ",age,"years old")
print(f"My name is {name} and I am {age} years old. I am from {place}")"""

"""string="abracadabra"
l=list(string)
print(l)
l[5]='k'
string=''.join(l)
print(string)"""

"""
def mutate_string(string,position,character):
    l=list(string)
    l[position]=character
    string=''.join(l)
    return string

print(mutate_string("abracadabra",5,'k'))"""

"""
def count_substring(string, sub_string):
    count=0
    if len(string) <= 200:
        for i in range((len(string)-len(sub_string))+1):
            if string[i:i+len(sub_string)] == sub_string:
                count+=1
        return count
    else:
        print("Length of string must be 200 or less")

if __name__ == '__main__':
    string = input().strip()
    sub_string = input().strip()
    count = count_substring(string, sub_string)
    print(count)"""

import textwrap

text = "Python is a powerful programming language that is easy to learn and great for text manipulation tasks."
# Format to a maximum line length of 30 characters
formatted_text = textwrap.fill(text, width=30)
print(formatted_text)

lines_list = textwrap.wrap(text, width=30)
print(lines_list)
# Output: ['Python is a powerful', 'programming language that is', ...]

def my_function():
    indented_str = """
    This is line one.
    This is line two.
    """
    print("Before dedent:" + indented_str)
    print("After dedent:\n" + textwrap.dedent(indented_str))

my_function()





