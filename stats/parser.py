from enum import Enum,auto
import re

#generators are plotable as long as they have a __len__ attribute
class GenWithLength:
    def __init__(self,gen,length):
        self.gen=gen
        self.length=length
    
    def __iter__(self):
        return self
    
    def __next__(self):
        self.length-=1
        return next(self.gen)

    def __len__(self):
        return self.length


class Parser:
    def __init__(self):
        #adjust depending on use case
        self.cantripLevel=0


        #multipliers to convert to seconds
        self.timeMultipliers={
            "month": 2.628e+6,
            "week": 604800,
            "day": 86400,
            "hour": 3600,
            "minute": 60,
            "round": 6,
            "second": 1,
        }
        self.timeRe = re.compile(r'[0-9]+ (?:month|week|day|hour|minute|round|second)')

        #used to get subgroups of match for page number and book name (matchObj.groups method)
        self.bookPageRe = re.compile(r'([0-9]+) ([\w\s]+)')

        self.useRangeRe = re.compile(r'[0-9]+(\s|-)(?:foot|feet)')

        self.schoolRe = re.compile(r'(conjuration|necromancy|evocation|abjuration|transmutation|divination|enchantment|illusion)')
        #used instead of a switch
        self.dataMap = {
            "Duration": self.convertDuration,
            "Level": self.convertLevel,
            "Page": self.convertBookPage,
            "Range": self.convertUseRange,
            "School": self.convertSchool,
            }


    def mkGen(self,jsonArray,key):
        length=len(jsonArray)
        gen = (self.convertAny(key,element[key]) if key in element.keys() else None for element in jsonArray)
        return GenWithLength(gen,length)
        
    def convertAny(self,dtype,data):
        data = data.strip()
        data = data.lower()
        return self.dataMap[dtype](data)

    def convertDuration(self,duration):
        if duration=="instantaneous":
            return 0
        
        times = self.timeRe.findall(duration)

        #set to none to not bring down average
        if len(times) == 0:
            return None
        
        totalTime = 0
        for time in times:
            val,unit = time.split()
            totalTime += float(val)*self.timeMultipliers[unit] 
        
        return totalTime

    def convertLevel(self,level):
        if level =="cantrip":
            return self.cantripLevel

        try:
            level = int(level)
        except:
            level = None
        return level

    def convertBookPage(self,bookPage):
        matchObj = self.bookPageRe.search(bookPage)

        try:
            page,book = matchObj.groups()
            page = int(page)
        except:
            page,book = None,None

        return page,book

    def convertUseRange(self,useRange):
        try:
            numFeet = self.useRangeRe.search(useRange).__getitem__(0)
        except:
            return None
        num = float(numFeet[0:-5])
        return num

    def convertSchool(self,school):
        return self.schoolRe.search(school).__getitem__(0)

