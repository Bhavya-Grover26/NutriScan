const mongoose = require('mongoose');

// Model for product_classification collection
const BarcodeInfoSchema = new mongoose.Schema({
    _id: { type: String },
    product_name: { type: String },
    image_url: { type: String },
    ingredients_text: { type: String },
    brands: { type: String },
    nutriscore_tags: { type: [String], default: [] },
    nutrient_levels_tags: { type: [String], default: [] },
    nova_group: { type: Number },
    additives_tags: { type: [String], default: [] },
    allergens_tags: { type: [String], default: [] },
    classification: { type: [String], default: [] }
});

mongoose.model("BarcodeInfo", BarcodeInfoSchema, "product_classification");

// Model for product_comparison collection
const ProductComparisonSchema = new mongoose.Schema({
    cluster_name: { type: String },
    cluster_id: { type: String },
    products: [{
        _id: { type: String },
        product_name: { type: String },
        image_url: { type: String },
        ingredients_text: { type: String },
        brands: { type: String },
        nutriscore_tags: { type: [String], default: [] },
        nutrient_levels_tags: { type: [String], default: [] },
        nova_group: { type: Number },
        additives_tags: { type: [String], default: [] },
        allergens_tags: { type: [String], default: [] },
        Assigned_Clusters_New: { type: [String], default: [] },
        Rank: { type: Number },
        classification: {type: [String]}
    }]
});

mongoose.model("ProductComparison", ProductComparisonSchema, "product_comparison");
