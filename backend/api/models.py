from django.db import models
import uuid
from django.utils import timezone

class Case(models.Model):
    
    CASE_STATUS = [
        ('Open', 'Open'),
        ('Closed', 'Closed'),
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
        ('Archived', 'Archived'),
        ('On Hold', 'On Hold'),
        ('Cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    case_name = models.CharField(max_length=50)
    case_number = models.CharField(max_length=50, unique=True)
    team = models.CharField(max_length=50)
    case_type = models.CharField(max_length=50)
    case_status = models.CharField(max_length=50, choices=CASE_STATUS, default='Open')
    case_description = models.TextField(blank=True, null=True)
    case_start_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.case_name} ({self.case_number})"


class Items(models.Model):
    EVIDENCE_TYPES = [
        ('Laptop', 'Laptop'),
        ('Smartphone', 'Smartphone'),
        ('Tablet', 'Tablet'),
        ('USB Drive', 'USB Drive'),
        ('External HDD', 'External HDD'),
        ('External SSD', 'External SSD'),
        ('Digital Camera', 'Digital Camera'),
        ('Smartwatch', 'Smartwatch'),
        ('Router', 'Router'),
        ('Server', 'Server'),
        ('Network Device', 'Network Device'),
        ('IoT Device', 'IoT Device'),
        ('Cloud Storage', 'Cloud Storage'),
        ('Drone', 'Drone'),
        ('Wearable Device', 'Wearable Device'),
        ('Backup Device', 'Backup Device'),
        ('Smart Home Device', 'Smart Home Device'),
        ('Smart TV', 'Smart TV'),
        ('Game Console', 'Game Console'),
        ('Other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('In Storage', 'In Storage'),
        ('Under Analysis', 'Under Analysis'),
        ('Analyzed', 'Analyzed'),
        ('Returned', 'Returned'),
        ('Destroyed', 'Destroyed'),
        ('Lost', 'Lost'),
        ('Stolen', 'Stolen'),
        ('Other', 'Other'),
        ('Pending', 'Pending'),
        ('Archived', 'Archived'),
        ('In Transit', 'In Transit'),
        ('Awaiting Approval', 'Awaiting Approval'),
        ('Pending Disposal', 'Pending Disposal'),
        ('Pending Return', 'Pending Return'),
        ('Pending Analysis', 'Pending Analysis'),
        ('Pending Review', 'Pending Review'),
        ('Pending Collection', 'Pending Collection'),
        ('Pending Transfer', 'Pending Transfer'),
        ('Pending Destruction', 'Pending Destruction'),
        ('Pending Investigation', 'Pending Investigation'),
        ('Pending Confirmation', 'Pending Confirmation'),
        ('Pending Documentation', 'Pending Documentation'),
        ('Pending Verification', 'Pending Verification'),
        ('Pending Assessment', 'Pending Assessment'),
        ('Pending Approval', 'Pending Approval'),
        ('Pending Closure', 'Pending Closure'),
        ('Pending Release', 'Pending Release'),
        ('Pending Follow-up', 'Pending Follow-up'),
        ('Pending Coordination', 'Pending Coordination'),
        ('Pending Communication', 'Pending Communication'),
        ('Pending Review and Analysis', 'Pending Review and Analysis'),
    ]

    LOCATION_CHOICES = [
        ('Inbeslag', 'Inbeslag'),
        ('Digi', 'Digi'),
        ('Rst', 'Rst'),
        ('See journal', 'See journal'),
        ('other', 'other'),
    ]
    ACUISITION_CHOICES = [
        ('GrayKey', 'Graykey'),
        ('Cellebrite', 'Cellebrite'),
        ('Other', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=50, choices=EVIDENCE_TYPES)  
    evidence_number = models.CharField(max_length=20, unique=True, blank=True)  
    brand = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)
    serial_number = models.CharField(max_length=100, unique=True)
    imei = models.CharField(max_length=16, blank=True, null=True)
    owner = models.CharField(max_length=100, blank=True, null=True)
    book_date = models.DateField(blank=True, null=True)
    storage_location = models.CharField(max_length=200, choices=LOCATION_CHOICES)
    acquisition_method = models.CharField(max_length=50, choices=ACUISITION_CHOICES)
    acquisition_date = models.DateField(blank=True, null=True, default=timezone.now)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    picture = models.ImageField(upload_to='evidence_pictures/', blank=True, null=True)
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='evidence')

    def __str__(self):
        return f"{self.type}  ({self.evidence_number})"
