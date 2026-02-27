from django.http import JsonResponse

# Create your views here.
def home(request):
    data={
        'message':'Welcome to ROUTENEO!'
    }
    return JsonResponse(data)