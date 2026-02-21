import django_filters
from .models import Todo

class TodoFilter(django_filters.FilterSet):
    # Filtro por estado
    completed = django_filters.BooleanFilter()
    # Filtrar por categoria (id)
    category = django_filters.NumberFilter(field_name='category__id')
    # Filtro por nombre de categoria
    category_name = django_filters.CharFilter(
        field_name='category__name',
        lookup_expr='icontains' # case insensitive istartswith
    )
    # Rango de fechas
    created_after = django_filters.DateFilter(field_name='created_at', lookup_expr='gte')
    created_before = django_filters.DateFilter(field_name='created_at', lookup_expr='lte')

    class Meta:
        model = Todo
        fields = ['completed', 'category', 'category_name']
