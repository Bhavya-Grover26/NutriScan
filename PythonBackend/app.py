from flask import Flask, jsonify, request
from flask_cors import CORS
from scanner import scan_barcode_from_image
from db import collection1
import logging
import tempfile
import os
from werkzeug.utils import secure_filename

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

@app.route("/check_barcode", methods=['GET'])
def check_barcode():
    try:
        barcode = request.args.get("barcode")
        print(f"Received request: /check_barcode?barcode={barcode}")
        if not barcode:
            return jsonify({"error": "Barcode is required"}), 400

        product = collection1.find_one({"_id": barcode})
        return jsonify({"exists": bool(product)})

    except Exception as e:
        print(f"Error in /check_barcode: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


@app.route("/scan", methods=['GET'])
def scan():
    barcode = request.args.get('barcode')
    if not barcode:
        return jsonify({"error": "No barcode provided"}), 400

    product = collection1.find_one({"_id": barcode})
    if not product:
        return jsonify({"message": "Product not found"}), 404

    return jsonify({
        "barcode": barcode,
        "product_name": product.get("product_name", "N/A"),
        "brand": product.get("brands", "N/A"),
        "classification": product.get("classification", "N/A"),
    })


@app.route("/upload_image", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files["image"]
    if image_file.filename == "":
        return jsonify({"error": "Empty file name"}), 400

    filename = secure_filename(image_file.filename)
    temp_path = os.path.join(tempfile.gettempdir(), filename)
    image_file.save(temp_path)

    barcode = scan_barcode_from_image(temp_path)
    if barcode:
        return jsonify({"barcode": barcode})
    else:
        return jsonify({"error": "No barcode detected"}), 404


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
