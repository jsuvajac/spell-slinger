#!/bin/bash

python db.py drop
python util/spell_scraper.py json
python db.py load
rm *.json