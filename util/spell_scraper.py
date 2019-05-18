import json
import requests
import sys
from bs4 import BeautifulSoup
from multiprocessing import Pool
from pprint import pprint

def main():
    result = [] 
    spells = getSpellList()

    if (sys.argv[1] == 'list'):
        for spell in spells:
            print(spell)
    elif(sys.argv[1] == 'json'):
        p = Pool()
        result = p.map(parseSpell, spells)
        p.close()
        p.join()
        with open("spells.json", "w+") as out:
            out.write(json.dumps(result, indent=4, sort_keys=True))
    else:
        print("invalid input, allowed options:\nlist\njson")
        sys.exit(1)
        


def getSpellList():
    data = requests.get('https://www.dnd-spells.com/spells')
    soup = BeautifulSoup(data.text, 'html.parser')

    spells = []
    names = []

    for tr in soup.find_all('tr'):
        spell = [" ".join(td.text.split()) for td in tr.find_all('td') if td.text.split() != '']
        if(spell):
            spell = spell[1]
            spell = spell[:-21]
            spell = spell.replace(u'\u2019', "").replace(u'\u2013', "").replace(' ', '-').replace("'", '').replace('/', '')
        
            if ("(Ritual)" in spell):
                spell = spell.replace("(Ritual)","ritual")
            spells.append(spell.lower())
    return spells

def parseSpell(name):
    print(name)
    url = 'https://www.dnd-spells.com/spell/'+ name.strip()
    data = requests.get(url)

    # parse html for text, split into lines, remove irrelevant lines
    soup = BeautifulSoup(data.text, 'html.parser')
    text = soup.text.split('\n')
    # remove extra text
    index = text.index(' Create and save your own spellbooks, sign up now!')
    text = text[280:index-5]
    # parse
    text = [" ".join(line.split()) for line in text]
    spell = {}
    spell['Name'] = text[0].replace(u'\u2019', "'")
    spell['School'] = text[1]
    spell['Level'] = text[3].split(":")[1][1:]
    spell['Casting time'] = text[4].split(":")[1][1:]
    spell['Range'] = text[5].split(":")[1][1:]
    spell['Components'] = text[6].split(":")[1][1:].replace(u'\u2019', "'").replace(u'\u2013', "'").replace(u'\u2014', "-")
    spell['Duration'] = text[7].split(":")[1][1:]
    spell['Class'] = []
    for i, e in enumerate(text[::-1]):
        if e == "A":
            break
        spell['Class'].append(e[:-1])
    text = text[11:-i-3]
    spell['Page'] = text[-1].split(":")[1]
    text = text[:-4]
    # TODO: cleanup replace
    text = [line.replace(u'\u2019', "'")
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
    spell['Text'] = text
    return spell

if __name__ == "__main__":
    main()
