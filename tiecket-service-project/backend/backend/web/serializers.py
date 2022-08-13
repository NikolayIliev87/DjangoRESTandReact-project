from rest_framework import serializers

from backend.web.models import Category, Ticket, Comment



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class TicketForCreateAndDetailsSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'description', 'user', 'category', 'category_name', 'ticket_id', 'status', "create_date", 'modified')

    # add user in validate data ( even if it's not in meta-fields ( for creation of new ticket with user)
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CommentsListAndCreateSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Comment
        fields = ('id', 'description', 'user', 'ticket_id', 'user_email')

    # add user in validate data ( even if it's not in meta-fields ( for creation of new ticket with user)
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class TicketSerializer(serializers.ModelSerializer):
    comment_set = CommentsListAndCreateSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'status', 'comment_set')


class CommentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('description', 'user', 'ticket_id')