import uuid
from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


def generate_ticket_id():
    return str(uuid.uuid4()).split("-")[-1]


class Category(models.Model):
    CATEGORY_NAME_MAX_LENGTH = 100

    name = models.CharField(
        max_length=CATEGORY_NAME_MAX_LENGTH,
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.name



class Ticket(models.Model):
    TICKET_NAME_MAX_LENGTH = 100
    DESCRIPTION_NAME_MAX_LENGTH = 500
    TICKET_ID_MAX_LENGTH = 255

    title = models.CharField(
        max_length=TICKET_NAME_MAX_LENGTH,
        null=False,
        blank=False,
    )

    description = models.TextField(
        null=False,
        blank=False,
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        primary_key=False,
    )

    create_date = models.DateTimeField(
        auto_now_add=True,
    )

    modified = models.DateTimeField(
        auto_now_add=True,
    )

    ticket_id = models.CharField(
        max_length=TICKET_ID_MAX_LENGTH,
        blank=True,
    )

    status = models.BooleanField(
        default=False,
    )

    def __str__(self):
        return "{} - {}".format(self.title, self.ticket_id)

    def save(self, *args, **kwargs):
        if len(self.ticket_id.strip()) == 0:
            self.ticket_id = generate_ticket_id()

        super(Ticket, self).save(*args, **kwargs)


