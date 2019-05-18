import sys
from pprint import pprint
from pymongo import MongoClient

client = MongoClient('localhost',27017)
db = client['dnd_db']
spells = db['spells']

# find all spells of a class
found = list(spells.find({'Class': {'$regex': sys.argv[1]}}))

# find one
#found = spells.find_one({'Name': {'$regex': sys.argv[1]}})

# all unique 
#found = spells.distinct(sys.argv[1])

for spell in found:
    pprint([spell['Name'],spell['Level'],spell['Text']])

client.close()
