import json
import sys
from pymongo import MongoClient

import config as cfg

def main(arg):
    client = MongoClient('localhost',27017)
    db = client['dnd_db']
    spells = db['spells']

    if (arg == 'load'):
        with open(cfg.ASSETS+'spells.json') as f:
            data = json.load(f)

        spells.insert_many(data)
        client.close()

    elif (arg == 'drop'):
        client.drop_database('dnd_db')

    else:
        print('invalid input, allowed options:\ndrop\nload')
        sys.exit(1)

if __name__ == "__main__":
    if (len(sys.argv) != 2):
        print('Usage:\n\tdrop\n\tload')
        sys.exit(0)
    
    main(sys.argv[1])

