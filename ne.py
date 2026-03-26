print('Welcome to OneTeam')
name=input('Enter your name : ')
age=int(input('Enter your age : '))
place=input('Enter your place : ')
courses=['Python','AWS','Devops','Software Testing']
selected_course=input('Course you need : ')
if selected_course in courses:
    print('Your course is availabe')
else:
    print('Selected course is not available')
if selected_course in courses:
    print('Course fees is 5000rs.')
    print(input('Are you ready to join? '))
else:
    print('Thank for visiting')


