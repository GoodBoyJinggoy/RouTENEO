from django.contrib import admin
from .models import Profile

class AtenistaAdmin(admin.ModelAdmin):
    model = Profile
    list_display = ('email', 'first_name', 'last_name')

admin.site.register(Profile, AtenistaAdmin)