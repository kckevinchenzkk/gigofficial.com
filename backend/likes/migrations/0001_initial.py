# Generated by Django 5.0.3 on 2024-03-26 01:42

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("store", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Likes",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "customer",
                    models.OneToOneField(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="store.customer",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="LikedItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="store.product"
                    ),
                ),
                (
                    "likes",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="items",
                        to="likes.likes",
                    ),
                ),
            ],
            options={
                "unique_together": {("likes", "product")},
            },
        ),
    ]
