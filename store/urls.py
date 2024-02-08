from django.urls import include, path
from . import views
from rest_framework.routers import SimpleRouter, DefaultRouter
from pprint import pprint
from rest_framework_nested import routers


router = routers.DefaultRouter()
# router = DefaultRouter()
router.register('products', views.ProductViewSet, basename='product')
router.register('collections', views.CollectionViewSet)

products_router = routers.NestedDefaultRouter(
    router, 'products', lookup='product')
products_router.register('reviews', views.ReviewViewSet,
                         basename='product-reviews')

pprint(router.urls)

urlpatterns = router.urls + products_router.urls

# URLConfiguration
'''
# urlpatterns = router.urls
# urlpatterns = [
#     path('', include(router.urls))
#     # path("products/", views.product_list),
#     path("products/", views.ProductList.as_view()),
#     path("products/<int:pk>/", views.ProductDetail.as_view()),
#     path("collections/", views.CollectionList.as_view()),
#     path("collections/<int:pk>/", views.CollectionDetail.as_view(), name = 'collection-detail')
# ]
'''
