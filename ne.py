print('Welcome to OneTeam')
name=input('Enter your name : ')
age=int(input('Enter your age : '))
place=input('Enter your place : ')
courses=['Python','AWS3','Devops','Software Testing']
selected_course=input('Course you need : ')
if selected_course in courses:
    print('Your course is availabe')
else:
    print('The course you selected is not available')
decision=input('Are you ready to join?')
if decision=='yes':
    print('Thank you for selection OneTeam. Our team will call you. Please provide your phone number.')
phone_number=input('Please enter your number : ')
print('Thank you')
    


    


