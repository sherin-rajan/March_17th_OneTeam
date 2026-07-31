from django import forms
from movies.models import Cast

class CastForm(forms.ModelForm):
    class Meta:
        model=Cast
        fields="__all__"