class Student:
    def __init__(self,id,f_name,l_name,email,phone,dob,gender,course,address,ad_date,status):
        self.id:id
        self.f_name=f_name
        self.l_name=l_name
        self._email=email
        self.__phone=phone
        self._dob=dob
        self._gender=gender
        self._course=course
        self.__address=address
        self.ad_date=ad_date
        self.status=status

    
