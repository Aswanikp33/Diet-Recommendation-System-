import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import foodData from '../assets/food_data.json';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

function DietPlan(props) {
    const location = useLocation();

    const data = location.state;
    const [maxBreakfast, setMaxBreakfast] = useState(data.maxB);
    const [maxLunch, setMaxLunch] = useState(data.maxL);
    const [maxDinner, setMaxDinner] = useState(data.maxD);
    const [maxSnack, setMaxSnack] = useState(data.maxS);
    const [isveg, setIsVeg] = useState(data.isveg);
    const [url, setUrl] = useState(null)

    const [foods, setFoods] = useState(data.allergies['data']['foods']);
    const { userLoggedIn } = useAuth()
    const [breakfastGrainsData, setBreakfastGrainsData] = useState([]);
    const [randomFoods, setRandomFoods] = useState({});
    const maxdata = {
        'maxB': data.maxB,
        'maxL': data.maxL,
        'maxS': data.maxS,
        'maxD': data.maxD,
    }

    console.log("maxdata")
    console.log(maxdata)
    console.log("maxdata")

    // const documentContent = 

    const createPDF = () => {
        console.log('randomFoods["Dinner"]')
        console.log(randomFoods["Breakfast"])
        console.log(randomFoods["Dinner"])
        console.log(randomFoods["Lunch"])
        console.log(randomFoods["Snacks"])
        // console.log(randomFoods["Breakfast"][0]["food_items"])
        // console.log(randomFoods["Lunch"][0]["food_items"])
        // console.log(randomFoods["Snacks"][0]["food_items"])
        // console.log(randomFoods["Dinner"][0]["food_items"])
        console.log('randomFoods["Dinner"]')
        console.log("data.maxB")
        console.log(data.maxB)
        console.log("data.maxB")
        const pdfGenerator = pdfMake.createPdf({


            content: [
                { text: `Breakfast`, style: 'header' },
                { text: `You need ${data.maxB['Protein']}g Protein`, style: 'snack' },
                { text: `You need ${data.maxB['Carbs']}g Carbs`, style: 'snack' },
                { text: `You need ${data.maxB['Fats']}g Fat`, style: 'snack' },
                { text: `You need ${data.maxB['Calories']}g Calories`, style: 'snack' },
                { text: randomFoods["Breakfast"][0]["food_items"], style: 'snack' },
                { text: `Lunch`, style: 'header' },
                { text: `You need ${data.maxL['Protein']}g Protein`, style: 'snack' },
                { text: `You need ${data.maxL['Carbs']}g Carbs`, style: 'snack' },
                { text: `You need ${data.maxL['Fats']}g Fat`, style: 'snack' },
                { text: `You need ${data.maxL['Calories']}g Calories`, style: 'snack' },
                { text: randomFoods["Lunch"][0]["food_items"], style: 'snack' },
                { text: `Snacks`, style: 'header' },
                { text: `You need ${data.maxS['Protein']}g Protein`, style: 'snack' },
                { text: `You need ${data.maxS['Carbs']}g Carbs`, style: 'snack' },
                { text: `You need ${data.maxS['Fats']}g Fat`, style: 'snack' },
                { text: `You need ${data.maxS['Calories']}g Calories`, style: 'snack' },
                { text: randomFoods["Snacks"][0]["food_items"], style: 'snack' },
                { text: `Dinner`, style: 'header' },
                { text: `You need ${data.maxD['Protein']}g Protein`, style: 'snack' },
                { text: `You need ${data.maxD['Carbs']}g Carbs`, style: 'snack' },
                { text: `You need ${data.maxD['Fats']}g Fat`, style: 'snack' },
                { text: `You need ${data.maxD['Calories']}g Calories`, style: 'snack' },
                { text: randomFoods["Dinner"][0]["food_items"], style: 'snack' },

            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                },
                snack: {
                    italics: true,
                }
            }



        })
        pdfGenerator.getBlob((blob) => {
            const url = URL.createObjectURL(blob)
            setUrl(url)
        })
        pdfGenerator.download()
    }


    const categories = {
        Breakfast: [
            "Breakfast grains",
        ],
        Lunch: [
            "Grains",

        ],
        Snacks: [
            "Fruits",
            "Juice",
        ],
        Dinner: [
            "Grains",
        ],
    };
    const categoriesNonVeg = {
        Breakfast: [
            "Breakfast grains",

        ],
        Lunch: [
            "Grains",

        ],
        Snacks: [
            "Tea & Coffee",

            "Fruits",
        ],
        Dinner: [
            "Grains",

            "Soup",

        ],
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const randomFoodsObj = {};
                if (isveg == "veg") {
                    for (const category in categories) {
                        let totalCalories = 0;
                        let totalCarbs = 0;
                        let totalFats = 0;
                        let totalProtein = 0;
                        const maxValues = maxdata[`max${category.charAt(0)}`];


                        const categoryFoods = foodData.filter(item => categories[category].includes(item.Category));

                        while (
                            totalCalories < maxValues.Calories &&
                            totalCarbs < maxValues.Carbs &&
                            totalFats < maxValues.Fats &&
                            totalProtein < maxValues.Protein
                        ) {
                            const randomIndex = Math.floor(Math.random() * categoryFoods.length);
                            const randomFood = categoryFoods[randomIndex];
                            if (!randomFood.food_items.includes(foods)) {
                                console.log("randomFood")
                                console.log(randomFood)
                                console.log("randomFood")

                                totalCalories += randomFood.Calories;
                                totalCarbs += randomFood.Carbs;
                                totalFats += randomFood.Fats;
                                totalProtein += randomFood.Protein;

                                if (totalCalories > maxValues.Calories) totalCalories -= randomFood.Calories;
                                if (totalCarbs > maxValues.Carbs) totalCarbs -= randomFood.Carbs;
                                if (totalFats > maxValues.Fats) totalFats -= randomFood.Fats;
                                if (totalProtein > maxValues.Protein) totalProtein -= randomFood.Protein;

                                randomFoodsObj[category] = randomFoodsObj[category] || [];
                                console.log("pushing randomFood")
                                console.log(randomFood)
                                console.log("pushing randomFood")
                                randomFoodsObj[category].push(randomFood);
                            }

                        }
                    }
                } else {
                    for (const category in categoriesNonVeg) {
                        let totalCalories = 0;
                        let totalCarbs = 0;
                        let totalFats = 0;
                        let totalProtein = 0;
                        const maxValues = maxdata[`max${category.charAt(0)}`];
                        console.log("maxValues")
                        console.log(maxValues.Calories)
                        console.log("maxValues")

                        const categoryFoods = foodData.filter(item => categories[category].includes(item.Category));

                        while (
                            totalCalories < maxValues.Calories &&
                            totalCarbs < maxValues.Carbs &&
                            totalFats < maxValues.Fats &&
                            totalProtein < maxValues.Protein
                        ) {
                            const randomIndex = Math.floor(Math.random() * categoryFoods.length);
                            const randomFood = categoryFoods[randomIndex];

                            if (!randomFood.food_items.includes(foods)) {
                                console.log("randomFood")
                                console.log(randomFood)
                                console.log("randomFood")
                                totalCalories += randomFood.Calories;
                                totalCarbs += randomFood.Carbs;
                                totalFats += randomFood.Fats;
                                totalProtein += randomFood.Protein;

                                if (totalCalories > maxValues.Calories) totalCalories -= randomFood.Calories;
                                if (totalCarbs > maxValues.Carbs) totalCarbs -= randomFood.Carbs;
                                if (totalFats > maxValues.Fats) totalFats -= randomFood.Fats;
                                if (totalProtein > maxValues.Protein) totalProtein -= randomFood.Protein;

                                randomFoodsObj[category] = randomFoodsObj[category] || [];
                                console.log("pushing randomFood")
                                console.log(randomFood)
                                console.log("pushing randomFood")
                                randomFoodsObj[category].push(randomFood);
                            }

                        }
                    }
                }
                setRandomFoods(randomFoodsObj);
                console.log("randomFoodsObj")
                console.log(randomFoodsObj)
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>DietPlan</h1>
            <div>
                {Object.keys(randomFoods).map(category => (
                    <div key={category}>
                        <h2>{category}</h2>
                        {randomFoods[category].map((food, index) => (
                            <div key={index}>
                                <p>Random Food: {food.food_items}</p>
                                <p>Calories: {food.Calories}</p>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={createPDF}>Download as PDF</button>

            </div>
        </div>
    );
}

export default DietPlan;