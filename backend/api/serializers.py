from rest_framework import serializers
from .models import Case, Items

class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = '__all__'

class CaseSerializer(serializers.ModelSerializer):
    evidence = ItemsSerializer(many=True, read_only=True)

    class Meta:
        model = Case
        fields = '__all__'
