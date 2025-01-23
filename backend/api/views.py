from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views import View
from pathlib import Path
from rest_framework.views import APIView
from rest_framework.response import Response

# Get path to data files
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / 'src' / 'data'

class TopicsView(APIView):
    def get(self, request):
        with open(DATA_DIR / 'topics.json') as f:
            data = json.load(f)
        return Response({'topics': data['topics']})

class LessonPreviewView(APIView):
    def post(self, request):

        selected_topics = request.data.get('selectedTopics', [])
        
        with open(DATA_DIR / 'concepts.json') as f:
            concepts_data = json.load(f)

        total_minutes = sum(
            sum(concept['duration'] for concept in concepts_data.get(topic.lower(), []))
            for topic in selected_topics
        )

        preview_content = {
            'title': 'Your Custom Learning Path',
            'duration': f'Estimated time {total_minutes // 60} hours {total_minutes % 60} minutes',
            'topics': [
                {
                    'name': topic,
                    'concepts': [
                        f"{c['title']} ({c['duration']} min)"
                        for c in concepts_data.get(topic.lower(), [])
                    ]
                }
                for topic in selected_topics
            ]
        }
        return Response(preview_content)
