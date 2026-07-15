class Student:
    def __init__(self,id,fname,lname,age,email,phone,dob,gender,course,address,addate,status):
        self.id=id
        self.__fname=fname
        self.__lname=lname
        self.__age=age
        self.__email=email
        self.__phone=phone
        self.__dob=dob
        self.__gender=gender
        self.__course=course
        self.__address=address
        self.__addate=addate
        self.__status=status
    
    @property
    def get_fname(self):
        return self.__fname
    @get_fname.setter
    def get_fname(self,value):
        self.__fname=value
    
    @property
    def get_lname(self):
        return self.__lname
    @get_lname.setter
    def get_lname(self,value):
        self.__lname=value
    
    @property
    def get_age(self):
        return self.__age
    @get_age.setter
    def get_age(self,value):
        if value<17:
            raise ValueError("Age must be greater than 17")
        self.__age=value
    
    @property
    def get_email(self):
        return self.__email
    @get_lname.setter
    def get_email(self,value):
        self.__email=value
    
    @property
    def get_phone(self):
        return self.__phone
    @get_phone.setter
    def get_phone(self,value):
        self.__phone=value
    
    @property
    def get_dob(self):
        return self.__dob
    @get_dob.setter
    def get_dob(self,value):
        self.__dob=value
    
    @property
    def get_gender(self):
        return self.__gender
    @get_gender.setter
    def get_gender(self,value):
        self.__gender=value
    
    @property
    def get_course(self):
        return self.__course
    @get_course.setter
    def get_course(self,value):
        self.__course=value
    
    @property
    def get_address(self):
        return self.__address
    @get_address.setter
    def get_address(self,value):
        self.__address=value
    
    @property
    def get_addate(self):
        return self.__addate
    
    @property
    def get_status(self):
        return self.__status
    @get_status.setter
    def get_status(self,value):
        self.__status=value
    

        

    
