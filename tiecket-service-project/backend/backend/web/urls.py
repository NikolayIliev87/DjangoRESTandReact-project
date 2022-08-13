from django.urls import path

from backend.web.views import TicketListAndCreateView, CategoryListView, TicketDetailsAndUpdateView, \
    CommentsListAndCreateView

urlpatterns = (
    path('', TicketListAndCreateView.as_view(), name='api list and create tickets'),
    path('categories/', CategoryListView.as_view(), name='api list tickets'),
    path('comments/', CommentsListAndCreateView.as_view(), name='api list and create comments'),
    # path('comments/<int:pk>/', TicketCommentsListView.as_view(), name='api list of ticket comments'),
    path('<int:pk>/', TicketDetailsAndUpdateView.as_view(), name='api details or update ticket'),
)