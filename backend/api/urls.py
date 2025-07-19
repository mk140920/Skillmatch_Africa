from django.urls import path
from .views import SendWhatsAppCodeView, VerifyWhatsAppCodeView, RegisterView, LoginView, ProfileView, UploadPhotoView, AnalyzeImageView, JobOfferListView

urlpatterns = [
    path('send-whatsapp-code/', SendWhatsAppCodeView.as_view()),
    path('verify-whatsapp-code/', VerifyWhatsAppCodeView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/<int:pk>/', ProfileView.as_view()),
    path('profile/<int:pk>/upload_photo/', UploadPhotoView.as_view()),
    path('analyze-image/', AnalyzeImageView.as_view()),
    path('job-offers/', JobOfferListView.as_view()),
] 