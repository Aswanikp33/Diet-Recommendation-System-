import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import warnings
import pickle
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from io import StringIO


warnings.filterwarnings("ignore")
app = Flask(__name__)
CORS(app)


csv_data = """
food_item,allergen
Brown Rices,Gluten
Basmati Rices,No
Baby Corn,No
Wild Rices,No
Sweet Corns,No
Rolled Oatss,Gluten
Quick Oatss,Gluten
Instant Oatss,Gluten
Steel-cut Oatss,Gluten
Oat Groatss,Gluten
Whole Barleys,Gluten
Barley Flakess,Gluten
Barley Gritss,Gluten
Whole Ryes,Gluten
Whole Grain Wheat,Gluten
Sprouts,No
Whole Grain Quinoa,No
Foxtail Millets,No
Barnyard Millets,No
Little Millets,No
Kodo Millets,No
Pearl Millets,No
White Sorghums,No
Sorghum Flakes,No
Whole grain Sorghum,No
food_item,allergen
Brown Rices,Gluten
Basmati Rices,No
Baby Corn,No
Wild Rices,No
Sweet Corns,No
Rolled Oatss,Gluten
Quick Oatss,Gluten
Instant Oatss,Gluten
Steel-cut Oatss,Gluten
Oat Groatss,Gluten
Whole Barleys,Gluten
Barley Flakess,Gluten
Barley Gritss,Gluten
Whole Ryes,Gluten
Whole Grain Wheat,Gluten
Sprouts,No
Whole Grain Quinoa,No
Foxtail Millets,No
Barnyard Millets,No
Little Millets,No
Kodo Millets,No
Pearl Millets,No
White Sorghums,No
Sorghum Flakes,No
Whole grain Sorghum,No
Harrd Red Wheat,Gluten
Soft Red Wheat,Gluten
Hard White Wheat,Gluten
Soft White Wheat,Gluten
Durum Wheat,Gluten
Einkorn Wheat,Gluten
Spelt Wheat,Gluten
Emmer Wheat,Gluten
White Rice,No
Brown Rice,No
Basmati Rice,No
Jasmine Rice,No
Arborio Rice,No
Black Rice,No
Red Rice,No
Wild RIce,No
Dent Corn,No
Sweet Corn,No
Popcorn,No
Flint Corn,No
Flour Corn,No
Waxy Corn,No
Rolled Oats,Gluten
Steel-cut Oats,Gluten
Quick Oats,Gluten
Instant Oats,Gluten
Oat Groats,Gluten
Hulled Barley,Gluten
Pearled Barley,Gluten
Scotch Barley,Gluten
Barley Flakes,Gluten
Barley Grits,Gluten
Barley Flour,Gluten
Purple Barley,Gluten
Black Barley,Gluten
Sprouted Barley,Gluten
Whole Rye,Gluten
Rye Flakes,Gluten
Rye Flour,Gluten
Pumpernickel,Gluten
Rye Bread,Gluten
White Quinoa,No
Red Quinoa,No
Black Quinoa,No
Tri-color Quinoa,No
Purple Quinoa,No
High-altitude Quinoa,No
Golden Quinoa,No
Pearl Millet,No
Foxtail Millet,No
Finger Millet,No
Proso Millet,No
Barnyard Millet,No
Kodo Millet,No
Little Millet,No
Grain Sorghum,No
Sweet Sorghum,No
Broomcorn Sorghum,No
Black Sorghum,No
White Sorghum,No
Red Sorghum,No
Common Buckwheat,No
Tartary Buckwheat,No
Silverhull Buckwheat,No
Buckwheat Groats,No
Kasha,No
Amaranth (Ramdana),No
Ivory Teff,No
Brown Teff,No
Mixed Teff,No
Spelt,Gluten
Kamut,Gluten
Emmer Farro,Gluten
Spelt Farro,Gluten
Bulgur( Dalia),Gluten
Apple,birch pollen
Apricot,OAS (birch pollen)
Avocado,No
Banana,No
Black Chokeberry,OAS (birch pollen)
Blackberries,No
Blueberries,OAS (ragweed pollen)
Cantaloupe,OAS (birch pollen)
Cherry,No
Cranberry,No
Date Palm,sulfites
Durian,No
Elderberry,OAS (birch pollen)
Golden berries,nightshade
Gooseberries,OAS (birch pollen)
Grapefruit,medication interaction
Grapes,sulfites
Guava,latex
Jackfruit,birch pollen
Jujube,No
Juniper Berries,stomach upset
Kiwi,kiwi
Longan Fruit,lychee
Lychee,allergic reaction (some)
Mango,cashew
Melon,OAS (birch pollen)
Mulberry,No
Nectarines,stone fruits
Orange,OAS (birch pollen)
Papaya,No
Passion Fruit,latex
Pear,birch pollen
Persimmon,latex
Pineapple,No
Plum,stone fruits
Pomegranate,No
Pomelo,citrus
Rambutan,lychee
Raspberry,No
Redberries,No
Rhubarb,No
Starfruit,neurological problems
Strawberry,strawberry
Tangerine,citrus
Uglifruit,citrus
Watermelon,No
Fruit Juice,No
Aloe Vera Juice,No
Cold-pressed Juice,No
Watermelon Juice,No
Pineapple Juice,No
Orange Juice,OAS (birch pollen)
Cranberry Juice,No
Grapefruit Juice,medication interaction
Pomegranate Juice,No
Strawberry Juice,strawberry (possible)
Honeydew Juice,OAS (birch pollen)
Cantaloupe Juice,OAS (birch pollen)
Papaya Juice,No
Carrot Juice,No
Apple Juice,birch pollen
Mango Juice,cashew
Beetroot Juice,No
"""

data = pd.read_csv(StringIO(csv_data))


vectorizer = CountVectorizer()

X = vectorizer.fit_transform(data['food_item'])
model = pickle.load(open('safe_food_model.pkl', 'rb'))


def get_foods_with_allergens(allergens):
    allergen_features = vectorizer.transform(allergens)
    predictions = model.predict(X)
    predictions_df = pd.DataFrame(predictions, columns=['allergens_predicted'])
    foods_with_allergens = data[predictions_df['allergens_predicted'].isin(allergens)]['food_item']
    return foods_with_allergens


foods_with_allergens = get_foods_with_allergens(['OAS (birch pollen)', "soy"])
print("Foods containing allergens:", list(foods_with_allergens))
