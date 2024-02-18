# Generated by Django 5.0.2 on 2024-02-17 22:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0022_alter_customer_options_product_total_sells_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="customer",
            options={
                "ordering": ["user__first_name", "user__last_name"],
                "permissions": [("view_history", "Can view history")],
            },
        ),
        migrations.AlterModelOptions(
            name="productimage",
            options={
                "permissions": [
                    ("view_history", "Can view history"),
                    ("upload_productimage", "Can upload product image"),
                ]
            },
        ),
    ]