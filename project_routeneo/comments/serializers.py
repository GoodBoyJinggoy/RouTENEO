from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            "id",
            "display_name",
            "profile_picture",
            "from_location",
            "to_location",
            "text",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "display_name",
            "profile_picture",
        ]
    def get_display_name(self, obj):
        profile = getattr(obj.user, "profile", None)

        if profile and profile.display_name:
            return profile.display_name

        return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username

    def get_profile_picture(self, obj):
        request = self.context.get("request")

        profile = getattr(obj.user, "profile", None)
        if not profile or not profile.profile_picture:
            return None

        url = profile.profile_picture.url

        # THIS is the key fix
        if request:
            return request.build_absolute_uri(url)

        return url