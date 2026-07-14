class Student:
    def __init__(self,id,f_name,l_name,age,email,phone,dob,gender,course,address,ad_date,status):
        self.id:id
        self.f_name=f_name
        self.l_name=l_name
        self._age=age
        self._email=email
        self.__phone=phone
        self._dob=dob
        self._gender=gender
        self._course=course
        self.__address=address
        self.ad_date=ad_date
        self.status=status
    
    @property
    def get_fname(self):
        return self.f_name
    
    @property
    def get_lname(self):
        return self.l_name
    
    @property
    def get_age(self):
        return self._age
    @get_age.setter

    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self.__age = value
    
    @property
    def get_phone(self):
        return self.__phone
    
    @property
    def get_dob(self):
        return self._dob
    
    @property
    def get_gender(self):
        return self._gender
    
    @property
    def get_course(self):
        return self._course
    
    @property
    def get_address(self):
        return self.__address
    
    @property
    def get_addate(self):
        return self.ad_date
    
    @property
    def get_status(self):
        return self.status
    

        

    
