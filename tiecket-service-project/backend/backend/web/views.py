from django.core import exceptions
from rest_framework import generics as api_views, permissions

from backend.web.models import Ticket, Category, Comment
from backend.web.serializers import TicketSerializer, CategorySerializer, TicketForCreateAndDetailsSerializer, \
    CommentsListAndCreateSerializer


class TicketListAndCreateView(api_views.ListCreateAPIView):
    queryset = Ticket.objects.all()
    permission_classes = (
        permissions.IsAuthenticated,
    )

    # if one serializer used by view use serializer_class=/ if view use more serializer use as below
    list_serializer_class = TicketSerializer
    create_serializer_class = TicketForCreateAndDetailsSerializer

    def get_serializer_class(self):
        if self.request.method.lower() == 'post':
            return self.create_serializer_class
        return self.list_serializer_class

    query_filter_names = ('category',)

    def __apply_query_filters(self, queryset):
        filter_options = {}
        for filter_name in self.query_filter_names:
            value_id = self.request.query_params.get(filter_name, None)
            if value_id:
                filter_options[f"{filter_name}_id"] = value_id

        return queryset.filter(**filter_options)

    def get_queryset(self):
        queryset = super().get_queryset()

        queryset = queryset.filter(user=self.request.user)

        queryset = self.__apply_query_filters(queryset)

        return queryset


class TicketDetailsAndUpdateView(api_views.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = TicketForCreateAndDetailsSerializer

    # def get_object(self):
    #     the_object = super().get_object()
    #     if the_object.user != self.request.user:
    #         raise exceptions.PermissionDenied
    #     return object


class CommentsListAndCreateView(api_views.ListCreateAPIView):
    queryset = Comment.objects.all()
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = CommentsListAndCreateSerializer


# class TicketCommentsListView(api_views.ListCreateAPIView):
#     queryset = Comment.objects.all()
#     permission_classes = (
#         permissions.IsAuthenticated,
#     )
#     serializer_class = CommentSerializer


class CategoryListView(api_views.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    # For filter of categories ( where user has tickets )
    # def get_queryset(self):
    #     queryset = super().get_queryset()
    #     queryset = queryset.filter(ticket__user=self.request.user)
    #
    #     return queryset

# Create your views here.
