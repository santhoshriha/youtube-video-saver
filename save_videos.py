import json
import xml.etree.ElementTree as ET

# Parse the XML file fetched from YouTube RSS feed
tree = ET.parse('videos.xml')
root = tree.getroot()

# Extract video data
videos = []
for entry in root.findall('{http://www.w3.org/2005/Atom}entry'):
    title = entry.find('{http://www.w3.org/2005/Atom}title').text
    link = entry.find('{http://www.w3.org/2005/Atom}link').get('href')
    thumbnail = entry.find('{http://search.yahoo.com/mrss/}thumbnail').get('url')

    video = {
        'title': title,
        'url': link,
        'thumbnail': thumbnail
    }
    videos.append(video)

# Save to JSON file
with open('videos.json', 'w') as f:
    json.dump(videos, f, indent=4)
