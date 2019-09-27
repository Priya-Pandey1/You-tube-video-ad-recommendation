from pymongo import MongoClient
import csv

client = MongoClient()
db = client.csvtomongo

with open('report.csv', 'rb') as csvfile:
	csvreader = csv.reader(csvfile, delimiter = ',' ,  quotechar = '|')
	for row in csvreader:
		db.sample.insert({'title':row[0],'videoId':row[1],'ViewCount':row[2],'likeCount':row[3],'dislikeCount':row[4],'commentCount':row[5],'favCount':row[6],'thumbnaillink':"https://img.youtube.com/vi/"+row[1]+"/hqdefault.jpg",'defaultthumbnail':"youtube.jpg"})
