from django import forms
from jobs.models import Jobs

class JobForm(forms.ModelForm):
    class Meta:
        model=Jobs
        fields='__all__'
