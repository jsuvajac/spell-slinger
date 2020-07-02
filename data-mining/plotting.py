




import numpy as np
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt
from collections import Counter



def plotFrequencyBars(data,xaxis="",yaxis="",title=None ):
    if not title:
        title = f"{yaxis} vs {xaxis}"
    
    occurances = Counter(data)
    labels=[]
    heights=[]
    for item in occurances.items():
        labels.append(item[0])
        heights.append(item[1])
    
    fig, ax = plt.subplots()
    rects1 = ax.bar(labels,heights)
    plt.xticks(rotation='vertical')
    plt.show()
    


def plotHist(data,bins=100, discrete = False,xaxis="",yaxis="",title=None):
    if not title:
        title = f"{yaxis} vs {xaxis}"
        
    if discrete:
        d = np.diff(np.unique(data)).min()
        
        left_of_first_bin = min(data) - float(d)/2
        right_of_last_bin = max(data) + float(d)/2
        bins=np.arange(left_of_first_bin, right_of_last_bin + d, d)
    

    # the histogram of the data
    n, bins, patches = plt.hist(data,bins, facecolor='green', alpha=0.75,)

    plt.xlabel(xaxis)
    plt.ylabel(yaxis)
    plt.title(title)

    plt.grid(True)

    plt.show()