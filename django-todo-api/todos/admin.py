from django.contrib import admin
from .models import Todo, Category

# Register your models here.
# admin.site.register(Todo)
@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'category', 'completed', 'user', 'created_at']
    list_filter = ['completed', 'title', 'created_at']
    search_fields = ['title', 'description']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_by', 'created_at']
