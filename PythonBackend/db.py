import pymongo
import os

# Load MongoDB URI from Railway's environment variables
MONGO_URI = os.getenv("MONGO_URI")

client = pymongo.MongoClient(MONGO_URI)
db = client['AppData']
collection1 = db['product_classification']
collection2 = db['product_comparison']