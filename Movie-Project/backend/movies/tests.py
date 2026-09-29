from datetime import date, timedelta

from rest_framework.test import APITestCase

from .models import Category, Movies


class MoviePaginationTests(APITestCase):
	def setUp(self):
		self.category = Category.objects.create(category='Drama')
		for index in range(13):
			Movies.objects.create(
				movie=f'Movie {index:02d}',
				category=self.category,
				description=f'Description for movie {index:02d}',
				release_date=date(2020, 1, 1) + timedelta(days=index),
				poster='',
				trailer_link='https://example.com/trailer',
			)

	def test_movie_list_returns_paginated_results(self):
		response = self.client.get('/api/movies/movies/')

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data['count'], 13)
		self.assertEqual(len(response.data['results']), 12)
		self.assertIsNotNone(response.data['next'])
		self.assertIsNone(response.data['previous'])

		second_page = self.client.get('/api/movies/movies/?page=2')
		self.assertEqual(second_page.status_code, 200)
		self.assertEqual(len(second_page.data['results']), 1)
		self.assertIsNone(second_page.data['next'])
		self.assertIsNotNone(second_page.data['previous'])

	def test_movie_list_filters_and_sorts_before_pagination(self):
		response = self.client.get(
			f'/api/movies/movies/?category={self.category.id}&search=Description&sort=title'
		)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data['count'], 13)
		self.assertEqual(
			[movie['movie'] for movie in response.data['results'][:2]],
			['Movie 00', 'Movie 01'],
		)
