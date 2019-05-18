import json
import sys
from pymongo import MongoClient

def main():
    client = MongoClient('localhost',27017)
    db = client['dnd_db']
    spells = db['spells']

    if (sys.argv[1] == 'load'):
        with open('spells.json') as f:
            data = json.load(f)

        spells.insert_many(data)
        client.close()

    elif (sys.argv[1] == 'drop'):
        client.drop_database('dnd_db')

    else:
        print('invalid input, allowed options:\ndrop\nload');
        sys.exit(1)

if __name__ == "__main__":
    main()
