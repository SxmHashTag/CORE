from rest_framework import viewsets, status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Case, Items
from .serializers import CaseSerializer, ItemsSerializer

class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all().order_by('-created_at')
    serializer_class = CaseSerializer

    def list(self, request):
        """
        List all cases.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Retrieve a specific case by its primary key.
        """
        queryset = self.get_queryset()
        case = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(case)
        return Response(serializer.data)

    def create(self, request):
        """
        Create a new case.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """
        Update an existing case.
        """
        case = self.get_object()
        serializer = self.get_serializer(case, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        """
        Delete a case.
        """
        case = self.get_object()
        case.delete()
        return Response({"detail": "Case deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class ItemsViewSet(viewsets.ModelViewSet):
    queryset = Items.objects.all().order_by('-book_date')
    serializer_class = ItemsSerializer
    parser_classes = (MultiPartParser, FormParser)

    def list(self, request):
        """
        List all items.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        """
        Retrieve a specific item by its primary key.
        """
        queryset = self.get_queryset()
        item = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(item)
        return Response(serializer.data)
    
    def create(self, request):
        """
        Create a new item.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        """
        Update an existing item.
        """
        item = self.get_object()
        serializer = self.get_serializer(item, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, pk=None):
        """
        Delete an item.
        """
        item = self.get_object()
        item.delete()
        return Response({"detail": "Item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
