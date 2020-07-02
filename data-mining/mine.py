import sys
import json
from enum import Enum,auto

from parser import Parser
from plotting import plotHist,plotFrequencyBars


def plotDuration(durationGen,bins=100):
    data = [dataPnt for dataPnt in durationGen if dataPnt!=None]
    print("Valid Data Points",len(data))
    plotHist(data,bins,discrete=False,xaxis="Duration",yaxis="Frequency")

def plotPage(pageNumGen,bins=100):
    data = [dataPnt[0] for dataPnt in pageNumGen if dataPnt!=None]
    print(len(data))
    plotHist(data,bins,discrete=False,xaxis="Duration",yaxis="Frequency")

def plotSchool(schoolGen):
    data = [dataPnt for dataPnt in schoolGen]
    print(len(data))
    plotFrequencyBars(data)

def plotLevel(levelGen):
    data = [dataPnt for dataPnt in levelGen]
    print(len(data))
    plotHist(data,discrete=True,xaxis="Level",yaxis="Frequency")


def main(jsonPath="/home/princeofpuppers/coding/python/dnd-spell-system/assets/spells.json"):
    file = open(jsonPath)
    jsonArray=json.load(file)
    
    parse=Parser()

    generatorDict={key:parse.mkGen(jsonArray,key) for key in parse.dataMap.keys()}
    
    
    plotSchool(generatorDict["School"])
    plotPage(generatorDict["Page"])
    plotDuration(generatorDict["Duration"])
    plotLevel(generatorDict["Level"])



if __name__ == "__main__":
    main()