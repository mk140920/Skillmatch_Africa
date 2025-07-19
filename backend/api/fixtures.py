from .models import User, Profile, JobOffer
import random

def run():
    # Nettoyage (optionnel pour éviter les doublons)
    User.objects.all().delete()
    Profile.objects.all().delete()
    JobOffer.objects.all().delete()

    # Utilisateurs et profils
    u1 = User.objects.create(email="artisan1@mail.com", phone="770000001")
    p1 = Profile.objects.create(user=u1, first_name="Alioune", latitude=14.7, longitude=-17.45, skills=["menuiserie", "soudure", "peinture"])
    u2 = User.objects.create(email="artisan2@mail.com", phone="770000002")
    p2 = Profile.objects.create(user=u2, first_name="Fatou", latitude=14.71, longitude=-17.44, skills=["cuisine", "plomberie", "réparation"])
    u3 = User.objects.create(email="employeur1@mail.com", phone="770000003")
    p3 = Profile.objects.create(user=u3, first_name="Mamadou", latitude=14.69, longitude=-17.46, skills=["gestion", "vente"])

    # Offres d'emploi
    JobOffer.objects.create(
        title="Recherche menuisier",
        description="Besoin d'un menuisier pour meubles sur mesure.",
        latitude=14.7, longitude=-17.45,
        tags=["menuiserie", "artisanat"],
        image_url="https://images.unsplash.com/photo-woodwork"
    )
    JobOffer.objects.create(
        title="Plombier urgent",
        description="Fuite d'eau à réparer rapidement.",
        latitude=14.71, longitude=-17.44,
        tags=["plomberie", "réparation"],
        image_url="https://images.unsplash.com/photo-plumbing"
    )
    JobOffer.objects.create(
        title="Cuisinier pour événement",
        description="Préparation de plats sénégalais pour mariage.",
        latitude=14.69, longitude=-17.46,
        tags=["cuisine", "événement"],
        image_url="https://images.unsplash.com/photo-cooking"
    )
    print("Données de démonstration insérées !") 