from rest_framework import serializers

from backend.web.models import Category, Ticket



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'title')


class TicketForCreateAndDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'title', 'description', 'category', 'ticket_id', 'status')

    # add user in validate data ( even if it's not in meta-fields ( for creation of new ticket with user)
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
