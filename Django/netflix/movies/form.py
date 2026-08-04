from django import forms
from movies.models import Cast,Review

class CastForm(forms.ModelForm):
    class Meta:
        model=Cast
        fields="__all__"

class ReviewForm(forms.ModelForm):
    class Meta:
        model=Review
        fields=['username','rating','comment']