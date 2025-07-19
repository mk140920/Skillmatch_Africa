from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from .models import Profile, JobOffer
from .serializers import UserSerializer, ProfileSerializer, JobOfferSerializer
import random
from django.db.models import Q

User = get_user_model()

# --- AUTH WHATSAPP SIMULÉE ---

class SendWhatsAppCodeView(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        if not phone:
            return Response({'error': 'Numéro de téléphone requis.'}, status=400)
        # Ici, on simule l'envoi du code (toujours 123456 pour la démo)
        return Response({'message': f'Code envoyé à {phone} (toujours 123456 pour la démo)'})

class VerifyWhatsAppCodeView(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        code = request.data.get('code')
        if not phone or not code:
            return Response({'error': 'Téléphone et code requis.'}, status=400)
        if code != '123456':
            return Response({'error': 'Code incorrect.'}, status=400)
        # Connecte ou inscrit l'utilisateur
        user, created = User.objects.get_or_create(phone=phone)
        return Response({'user_id': user.id, 'phone': user.phone})

# Register (inscription stricte)
class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        phone = request.data.get('phone')
        if not email and not phone:
            return Response({'error': 'Email ou téléphone requis.'}, status=400)
        if User.objects.filter(email=email).exists() or User.objects.filter(phone=phone).exists():
            return Response({'error': 'Utilisateur déjà existant.'}, status=400)
        user = User.objects.create(email=email, phone=phone)
        return Response({'user_id': user.id, 'email': user.email, 'phone': user.phone}, status=201)

# Login (connexion stricte)
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        phone = request.data.get('phone')
        user = None
        if email:
            user = User.objects.filter(email=email).first()
        elif phone:
            user = User.objects.filter(phone=phone).first()
        if not user:
            return Response({'error': 'Utilisateur non trouvé.'}, status=404)
        return Response({'user_id': user.id, 'email': user.email, 'phone': user.phone})

# CRUD Profil
class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]

# Upload photo + analyse skills fake
class UploadPhotoView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, pk):
        profile = Profile.objects.get(pk=pk)
        profile.photo = request.FILES['photo']
        profile.skills = random.sample(
            ["menuiserie", "soudure", "réparation", "plomberie", "peinture", "cuisine"], 3
        )
        profile.save()
        return Response(ProfileSerializer(profile).data)

# Endpoint analyse image (fake)
class AnalyzeImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        skills = random.sample(
            ["menuiserie", "soudure", "réparation", "plomberie", "peinture", "cuisine"], 3
        )
        return Response({"skills": skills})

# Liste offres filtrées par distance
class JobOfferListView(generics.ListAPIView):
    serializer_class = JobOfferSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        lat = float(self.request.query_params.get('lat', 14.6928))
        lon = float(self.request.query_params.get('lon', -17.4467))
        radius = float(self.request.query_params.get('radius', 10))
        # Filtrage simple (distance euclidienne, pour la démo)
        return JobOffer.objects.filter(
            (Q(latitude__gte=lat-radius/100) & Q(latitude__lte=lat+radius/100)) &
            (Q(longitude__gte=lon-radius/100) & Q(longitude__lte=lon+radius/100))
        )
