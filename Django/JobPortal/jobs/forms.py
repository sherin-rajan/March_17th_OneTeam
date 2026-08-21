from django import forms
from jobs.models import Jobs,Profile

class JobForm(forms.ModelForm):
    class Meta:
        model=Jobs
        fields='__all__'
        exclude=['slug']

class ProfileForm(forms.ModelForm):
    class Meta:
        model=Profile
        fields=['dob','phone','place','qualification','headline']

        
