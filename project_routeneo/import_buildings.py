import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import os
import django
import time
from geopy.geocoders import Nominatim

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project_routeneo.settings')

django.setup()

from map.models import Building

locator = Nominatim(user_agent="myGeocoder")


buildings = [
    "Gate 1, Loyola Heights, Quezon City",
    "Gate 2, Loyola Heights, Quezon City",
    "Gate 3.5, Loyola Heights, Quezon City",
    "Ateneo Grade School, Loyola Heights, Quezon City",
    "Blue Eagle Gym, Loyola Heights, Quezon City",
    "Arete, Loyola Heights, Quezon City",
    "Covered Courts, Loyola Heights, Quezon City",
    "Bellarmine Hall, Loyola Heights, Quezon City",
    "Manila Observatory, Loyola Heights, Quezon City",
    "Leong Hall, Loyola Heights, Quezon City",
    "Xavier Hall, Loyola Heights, Quezon City",
    "Faber Hall, Loyola Heights, Quezon City",
    "Rizal Library, Loyola Heights, Quezon City",
    "Social Sciences Building, Loyola Heights, Quezon City",
    "Kostka Hall, Loyola Heights, Quezon City",
    "Manuel V. Pangilinan Student Leadership Center, Loyola Heights, Quezon City",
    "Dela Costa Hall, Loyola Heights, Quezon City",
    "New Rizal Library, Loyola Heights, Quezon City",
    "Berchmans Hall, Loyola Heights, Quezon City",
    "Faura Hall, Loyola Heights, Quezon City",
    "Schmitt Hall, Loyola Heights, Quezon City",
    "Gonzaga Hall, Loyola Heights, Quezon City",
    "PIPAC, Loyola Heights, Quezon City",
    "SEC A, Loyola Heights, Quezon City",
    "SEC B, Loyola Heights, Quezon City",
    "SEC C, Loyola Heights, Quezon City",
    "PLDT-CTC, Loyola Heights, Quezon City",
    "JG School of Management Building, Loyola Heights, Quezon City",
    "JSEC, Loyola Heights, Quezon City",
    "Matteo Ricci Hall, Loyola Heights, Quezon City",
]



for address in buildings:
    location = locator.geocode(address)
    if location:
        Building.objects.get_or_create(
            name = address.split(',')[0],
            latitude = location.latitude,
            longitude = location.longitude,
        )
        print(f"Created: {address.split(',')[0]}")
    else:
        print(f"Could not find: {address}")
    time.sleep(1.1)