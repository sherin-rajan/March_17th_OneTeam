from datetime import date

from django.contrib.auth.models import User
from rest_framework.test import APITestCase

from movies.models import Category, Movies
from .models import ManagerProfile
from .serializers import UserSerializer


class ManagerAccessTests(APITestCase):
    def setUp(self):
        self.member = User.objects.create_user(username='member')
        self.manager = User.objects.create_user(username='manager')
        ManagerProfile.objects.create(user=self.manager)
        self.category = Category.objects.create(category='Drama')

    def test_role_is_serialized_without_exposing_manager_assignment(self):
        self.assertFalse(UserSerializer(self.member).data['is_manager'])
        self.assertTrue(UserSerializer(self.manager).data['is_manager'])

    def test_regular_user_can_read_and_submit_reviews_but_cannot_manage_catalog(self):
        movie = Movies.objects.create(
            movie='Test Movie',
            category=self.category,
            description='A test movie',
            release_date=date(2024, 1, 1),
            poster='',
            trailer_link='https://example.com/trailer',
        )
        self.client.force_authenticate(user=self.member)

        self.assertEqual(self.client.get('/api/movies/categories/').status_code, 200)
        self.assertEqual(
            self.client.post('/api/movies/reviews/', {
                'movie': movie.id,
                'rating': 5,
                'comment': 'Great movie',
            }).status_code,
            201,
        )
        self.assertEqual(
            self.client.post('/api/movies/categories/', {'category': 'Comedy'}).status_code,
            403,
        )
        self.assertEqual(
            self.client.patch(
                f'/api/movies/categories/{self.category.id}/',
                {'category': 'Updated Drama'},
            ).status_code,
            403,
        )
        self.assertEqual(
            self.client.delete(f'/api/movies/categories/{self.category.id}/').status_code,
            403,
        )

    def test_manager_can_post_put_patch_and_delete_catalog_items(self):
        self.client.force_authenticate(user=self.manager)

        created = self.client.post('/api/movies/categories/', {'category': 'Comedy'})
        self.assertEqual(created.status_code, 201)
        category_url = f"/api/movies/categories/{created.data['id']}/"

        replaced = self.client.put(category_url, {'category': 'Thriller'})
        self.assertEqual(replaced.status_code, 200)
        patched = self.client.patch(category_url, {'category': 'Mystery'})
        self.assertEqual(patched.status_code, 200)
        self.assertEqual(self.client.delete(category_url).status_code, 204)
