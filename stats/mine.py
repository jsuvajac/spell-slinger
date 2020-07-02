import sys
import json
import pathlib
import os
from enum import Enum, auto

from stats.parser import Parser
from stats.plotting import plotHist, plotFrequencyBars
import config as cfg


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


def main():

    dirname = os.path.abspath(os.path.dirname(__file__))
    jsonPath = os.path.join(dirname, '../assets/spells.json')

    file = open(jsonPath)
    jsonArray=json.load(file)
    
    parse=Parser()

    generatorDict={key:parse.mkGen(jsonArray,key) for key in parse.dataMap.keys()}
    
    
    plotSchool(generatorDict["School"])
    plotPage(generatorDict["Page"])
    plotDuration(generatorDict["Duration"])
    plotLevel(generatorDict["Level"])



if __name__ == "__main__":
    if len(sys.argv) != 1:
        sys.exit(0)

    main()
