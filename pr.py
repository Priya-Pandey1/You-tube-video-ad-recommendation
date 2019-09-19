# -*- coding: utf-8 -*-

from apiclient.discovery import build

import argparse
import csv
import unidecode

DEVELOPER_KEY = "AIzaSyB0zWK5ab0glquZbwACMQ9Smi6fpgmpiRU"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def youtube_search(options):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)
   
    search_response = youtube.search().list(q=options.q, part="id,snippet", maxResults=options.max_results).execute()
    
    videos = []
    channels = []
    playlists = []
    
   
    csvFile = open('video_result.csv','w')
    csvWriter = csv.writer(csvFile)
    csvWriter.writerow(["title","videoId","viewCount","likeCount","dislikeCount","commentCount","favoriteCount"])
    
   
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            
            title = search_result["snippet"]["title"]
            title = unidecode.unidecode(title)  
            videoId = search_result["id"]["videoId"]
            video_response = youtube.videos().list(id=videoId,part="statistics").execute()
            for video_result in video_response.get("items",[]):
                viewCount = video_result["statistics"]["viewCount"]
                if 'likeCount' not in video_result["statistics"]:
                    likeCount = 0
                else:
                    likeCount = video_result["statistics"]["likeCount"]
                if 'dislikeCount' not in video_result["statistics"]:
                    dislikeCount = 0
                else:
                    dislikeCount = video_result["statistics"]["dislikeCount"]
                if 'commentCount' not in video_result["statistics"]:
                    commentCount = 0
                else:
                    commentCount = video_result["statistics"]["commentCount"]
                if 'favoriteCount' not in video_result["statistics"]:
                    favoriteCount = 0
                else:
                    favoriteCount = video_result["statistics"]["favoriteCount"]
                    
            csvWriter.writerow([title,videoId,viewCount,likeCount,dislikeCount,commentCount,favoriteCount])

    csvFile.close()
  
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Search on YouTube')
    parser.add_argument("--q", help="Search term", default="Google")
    parser.add_argument("--max-results", help="Max results", default=50)
    args = parser.parse_args()

    youtube_search(args)
    