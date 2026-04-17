from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Comment
from .serializers import CommentSerializer

class CommentsView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        from_loc = request.query_params.get('from')
        to_loc = request.query_params.get('to')

        if not from_loc or not to_loc:
            return Response({'error': 'from and to required'}, status=400)

        comments = Comment.objects.filter(
            from_location__iexact=from_loc,
            to_location__iexact=to_loc,
        )

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)