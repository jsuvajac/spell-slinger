import json
import sys
import os
from multiprocessing import Pool
from pprint import pprint

import requests
from bs4 import BeautifulSoup

import config as cfg

#in spell list but the spell page is broken
bad_spells = ['trap-the-soul']

def main(args):
    spells = getSpellList()
    
    if (args[0] == 'list'):
        for spell in spells:
            print(spell)

    elif(args[0] == 'json'):
        pool = Pool(processes=cfg.NUM_PROC)
        result = pool.map(parseSpell, spells)
        pool.close()
        pool.join()

        with open(cfg.ASSETS+"spells.json", "w+") as out:
            out.write(json.dumps(result, indent=4, sort_keys=True))

    elif(args[0] == "spell" and len(args) == 2):
        if args[1] in spells:
            pprint(parseSpell(args[1]))

    else:
        print(f"Usage: \n\tlist \n\tjson \n\tspell [name-of-spell]")
        sys.exit(0)


def getSpellList():
    # general rule:
    # 'Name of Spell' -> 'name-of-spell'

    spells = []

    # cached spell list
    if os.path.exists(cfg.SPELL_LIST_PATH):
        with open(cfg.SPELL_LIST_PATH, "r") as spell_file:
            for line in spell_file:
                spells.append(line.rstrip())
        return spells

    data = requests.get('https://www.dnd-spells.com/spells')
    soup = BeautifulSoup(data.text, 'html.parser')

    for tr in soup.find_all('tr'):
        spell = [" ".join(td.text.split()) for td in tr.find_all('td') if td.text.split() != '']
        if(spell):
            # isolate spell name
            spell = spell[1]
            spell = spell.replace(' (Open in new window)','')
            # replace spaces with - and remove ignored characters
            spell = spell.replace(u'\u2019', "") \
                         .replace(u'\u2013', "") \
                         .replace(' ', '-') \
                         .replace("'", '') \
                         .replace('/', '')

            if ("(Ritual)" in spell):
                spell = spell.replace("(Ritual)","ritual")

            spell = spell.lower()
            
            # for some reason this spell does not follow the ritual api rule
            if ("detect-poison" in spell):
                spell = spell.replace("-ritual","")

            if (spell not in bad_spells):
                spells.append(spell)

    return spells

def parseSpell(name):
    url = 'https://www.dnd-spells.com/spell/'+ name.strip()
    data = requests.get(url)

    # parse html for text, split into lines, remove irrelevant lines
    soup = BeautifulSoup(data.text, 'html.parser')
    text = soup.text.split('\n')

    # remove extra text
    start = text.index('Remove the adds')
    end = text.index(' Create and save your own spellbooks, sign up now!')
    text = text[start + 1:end]

    # parse
    text = [" ".join(line.split()) for line in text] # remove whitespace
    text = [line for line in text if line != ''] # remove empyt lines
    
    spell = {}

    spell['Name'] = text.pop(0).replace(u'\u2019', "'")
    spell['School'] = text.pop(0)
    spell['Level'] = text.pop(0).split(": ")[1]
    spell['Casting time'] = text.pop(0).split(": ")[1]
    spell['Range'] = text.pop(0).split(": ")[1]
    spell['Components'] = text.pop(0).split(": ")[1] \
                                     .replace(u'\u2019', "'") \
                                     .replace(u'\u2013', "'") \
                                     .replace(u'\u2014', "-")
    spell['Duration'] = text.pop(0).split(": ")[1]

    spell['Class'] = []
    # format: A Class1, Clas2, ... spell
    while True:
        line = text.pop()
        if line == "A":
            break
        if line != 'spell':
            spell['Class'].append(line[:-1]) # ommit ,

    spell['Page'] = text.pop().split(": ")[1]

    # The leftover lines are the spell blurb
    # Join and replace unwanted unicode
    spell['Text'] = [line.replace(u'\u2019', "'")
                         .replace(u'\u2018', "'")
                         .replace(u'\u2022', "'")
                         .replace(u'\u2014', "-")
                         .replace(u'\ufffc', "")
                         .replace(u'\u00d7', "*")
                         .replace(u'\u201c', "\"")
                         .replace(u'\u201d', "\"")
                         .replace(u'\u0093', "\"")
                         .replace(u'\u0094', "\"")
                         .replace(u'\u2013 \u0097', "-")
                         .replace(u'\u0097', "-")
                         .replace(u'\u2013', "-")
                         for line in text]

    return spell

if __name__ == "__main__":
    if (len(sys.argv) not in  [2, 3]):
        print(f"Usage: \n\tlist \n\tjson \n\tspell [name-of-spell]")
        sys.exit(0)
    
    main(sys.argv[1:])
