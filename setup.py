from util.spell_scraper import main as scraperMain
from db import main as dbMain

if __name__ == "__main__":
    dbMain("drop")
    scraperMain("json")
    dbMain("load")