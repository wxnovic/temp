#serializer.py
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        # User 모델에 맞게 조정 (username 쓰면 username 포함)
        fields = ("email", "password", "password2", "first_name", "last_name")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password2": "비밀번호가 일치하지 않습니다."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password")

        # ✅ 가장 안전: create_user()가 있으면 그걸 사용
        user = User.objects.create_user(password=password, **validated_data)
        return user







#####################

# view.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer

class RegisterView(APIView):
    permission_classes = []  # AllowAny 해도 됨(프로젝트 설정에 따라)

    def post(self, request):
        s = RegisterSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        user = s.save()
        return Response(
            {"id": user.id, "email": getattr(user, "email", None)},
            status=status.HTTP_201_CREATED,
        )

      
#########
# url.py
from django.urls import path
from .views import RegisterView

urlpatterns = [
    path("auth/register/", RegisterView.as_view()),
]
###ㄱㄷ햐

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        s = RegisterSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        user = s.save()

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "user": {"id": user.id, "email": getattr(user, "email", None)},
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
        )
