from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Comment
from .serializers import CommentSerializer


class CommentsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        from_loc = request.query_params.get("from")
        to_loc = request.query_params.get("to")

        if not from_loc or not to_loc:
            return Response(
                {"error": "from and to required"},
                status=400
            )

        comments = Comment.objects.filter(
            from_location__iexact=from_loc,
            to_location__iexact=to_loc,
        ).order_by("-created_at")

        serializer = CommentSerializer(
            comments,
            many=True,
            context={"request": request}
        )
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"error": "Login required to post comments"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = CommentSerializer(
            data=request.data,
            context={"request": request}  
        )

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )