from django import forms

class ReviewForm(forms.Form):
    RATING_CHOICES = [(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')]

    rating = forms.ChoiceField(choices=RATING_CHOICES, label='Rating',
                               widget=forms.Select(attrs={'class': 'form-control'}))
    text = forms.CharField(
        label='Your Review',
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
    )