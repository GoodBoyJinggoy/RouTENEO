from django.contrib import admin
from .models import Profile

class AtenistaAdmin(admin.ModelAdmin):
    list_display = ["get_email", "get_first_name", "get_last_name", "display_name"]

    def get_email(self, obj):
        return obj.user.email

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

admin.site.register(Profile, AtenistaAdmin)