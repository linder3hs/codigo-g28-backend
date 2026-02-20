from rest_framework import serializers
from .models import Todo, Category


class CategorySerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'description',
            'created_by',
            'created_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at']


class TodoSerializer(serializers.ModelSerializer):
    """
    Clase que simular ser el to_dict() de Flask
    """
    user = serializers.StringRelatedField(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        source='category',
        queryset=Category.objects.all(),
        write_only=True,
        required=False,
        allow_null=True
    )
    class Meta:
        model = Todo
        fields = [
            'id',
            'title',
            'description',
            'category',
            'category_id',
            'completed',
            'created_at',
            'user'
          ]
        read_only_fields = ['id', 'created_at', 'user']
