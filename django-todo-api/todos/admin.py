from django.contrib import admin
from .models import Todo

# Register your models here.
# admin.site.register(Todo)
@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'completed', 'user', 'created_at']
    list_filter = ['completed', 'title', 'created_at']
    search_fields = ['title', 'description']
