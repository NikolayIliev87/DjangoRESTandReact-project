from django.urls import path

from backend.web.views import TicketListAndCreateView, CategoryListView, TicketDetailsAndUpdateView

urlpatterns = (
    path('', TicketListAndCreateView.as_view(), name='api list and create tickets'),
    path('categories/', CategoryListView.as_view(), name='api list tickets'),
    path('<int:pk>/', TicketDetailsAndUpdateView.as_view(), name='api details or update ticket'),
)