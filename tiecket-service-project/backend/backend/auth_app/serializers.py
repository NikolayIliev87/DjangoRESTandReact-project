from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from backend.auth_app.models import Profile, TicketServiceUser
import django.contrib.auth.password_validation as validators
from django.core import exceptions

UserModel = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('full_name', 'first_name', 'last_name', 'phone', 'photo_url', 'user')
        read_only_fields = ('user',)


class UserCreateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = UserModel
        fields = ('email', 'password', 'profile', )

    def create(self, validated_data):
        # fix1 issue with password in plain text
        user = TicketServiceUser.objects.create(
            email=validated_data['email'],
            password=make_password(validated_data['password']),
        )

        profile_data = validated_data.pop('profile')

        profile = Profile.objects.create(
            first_name=profile_data['first_name'],
            last_name=profile_data['last_name'],
            phone=profile_data['phone'],
            photo_url=profile_data['photo_url'],
            user=user,
        )

        return user

    def validate(self, data):
        user = self.context['request'].user

        password = data.get('password')

        errors = dict()
        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

            if errors:
                raise serializers.ValidationError(errors)

        return super(UserCreateSerializer, self).validate(data)

    # fix2 issue with password in plain text
    def to_representation(self, instance):
        result = super().to_representation(instance)
        result.pop('password')
        return result


class ProfileForUpdateAndDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'phone', 'photo_url', 'user', 'is_deleted')

    # add user in validate data ( even if it's not in meta-fields ( for creation of new ticket with user)
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
