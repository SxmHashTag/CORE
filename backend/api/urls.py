from rest_framework.routers import DefaultRouter
from .views import CaseViewSet, ItemsViewSet
from django .conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'cases', CaseViewSet)
router.register(r'items', ItemsViewSet)

urlpatterns = router.urls + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

