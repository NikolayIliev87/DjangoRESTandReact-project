from django.contrib import admin

from backend.web.models import Category, Ticket


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('title', 'ticket_id', 'status', 'username')

    def username(self, obj):
        return obj.owner.email
