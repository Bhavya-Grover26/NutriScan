import pymongo

client = pymongo.MongoClient('mongodb+srv://pfa2nd:QHJBuTHwoPLOWqVz@cluster0.jg69u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['AppData']
collection1 = db['product_classification']
collection2 = db['product_comparison']