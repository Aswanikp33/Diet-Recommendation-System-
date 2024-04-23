import React, { useEffect, useState } from 'react'
import './bmi.css'
import { useAuth } from '../context';
import { Navigate } from 'react-router-dom';
import diet from '../assets/img.svg'


const Diet = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [gender, setGender] = useState('');
    const [healthStatus, setHealthStatus] = useState('');
    const [age, setAge] = useState('');
    const [calories, setCalories] = useState(null);
    const [activityLevel, setActivityLevel] = useState('');
    const [mealPlan, setMealPlan] = useState([]);

    const { userLoggedIn } = useAuth()


    const calculateBMI = () => {
        console.log('start')

        const protein = ['Yogurt(1 cup)', 'Cooked meat(3 Oz)', 'Cooked fish(4 Oz)', '1 whole egg + 4 egg whites', 'Tofu(5 Oz)', 'Coffee', 'Milk', 'Dosa', 'Idli', 'Chappati']
        const fruit = ['Berries(80 Oz)', 'Apple', 'Orange', 'Banana', 'Dried Fruits(Handfull)', 'Fruit Juice(125ml)']
        const vegetable = ['Any vegetable(80g)']
        const grains = ['Cooked Grain(150g)', 'Whole Grain Bread(1 slice)', 'Half Large Potato(75g)', 'Oats(250g)', '2 corn tortillas', 'Asparagus Cooked', 'Bagels made in wheat', 'Brocolli', 'Brown Rice', 'Cauliflower', 'American cheese', 'Beef sticks', 'Rice Pudding']
        const ps = ['Soy nuts(i Oz)', 'Low fat milk(250ml)', 'Hummus(4 Tbsp)', 'Cottage cheese (125g)', 'Flavored yogurt(125g)']
        const taste_en = ['2 TSP (10 ml) olive oil', '2 TBSP (30g) reduced-caloriesorie salad dressin', '1/4 medium avocado', 'Small handful of nuts', '1/2 ounce  grated Parmesan cheese', '1 TBSP (20g) jam, jelly, honey, syrup, sugar', 'Berries', 'Dark chocolates', 'Milk', 'Pasta canned with tomato sauce', 'Tuna Salad', 'Tuna Fish', 'French Fries', 'Chocolate Doughnuts', 'Chappati', 'Bhaji Pav', 'Dal Makhani', 'Sweet Potatoes cooked', 'Boiled Potatoes', 'Goat meat', 'Steak Fries', 'Pork cooked', 'Bacon cooked', 'Chicken Popcorn', 'Turkey cooked', 'Vanilla Ice cream']

        console.log('start')
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBMI(bmiValue);
            console.log(bmiValue)
            if (bmiValue < 16.0) {
                setHealthStatus("Severely underweight");
            } else if (bmiValue < 17.0) {
                setHealthStatus("Underweight");
            } else if (bmiValue < 18.5) {
                setHealthStatus("Normal underweight");
            } else if (bmiValue < 24.9) {
                setHealthStatus("Healthy weight");
            } else if (bmiValue < 29.9) {
                setHealthStatus("Overweight");
            } else if (bmiValue < 34.9) {
                setHealthStatus("Obesity (Class 1)");
            } else if (bmiValue < 39.9) {
                setHealthStatus("Obesity (Class 2)");
            } else {
                setHealthStatus("Severe Obesity (Class 3)");
            }
        } else {
            alert('Please enter both height and weight.');
        }

        let bmr;


        if (gender === 'Male') {
            bmr = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
            setCalories(bmr);
        } else if (gender === 'Female') {
            bmr = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
            setCalories(bmr);
        }


        if (activityLevel === 'Super Light (little or no exercise)') {
            bmr *= 1.2;
        } else if (activityLevel === 'Lightly active (1-3 days/week)') {
            bmr *= 1.375;
        } else if (activityLevel === 'Moderately active (3-5 days/week)') {
            bmr *= 1.55;
        } else if (activityLevel === 'Very active (6-7 days/week)') {
            bmr *= 1.725;
        } else if (activityLevel === 'Super active (twice/day)') {
            bmr *= 1.9;
        }

        setCalories(bmr);


        if (calories) {
            let l6, l8, l9, l10, l11;

            if (calories < 1500) {
                l6 = `Breakfast: ${protein[Math.floor(Math.random() * protein.length)]}, ${fruit[Math.floor(Math.random() * fruit.length)]}`;
                l8 = `Lunch: ${protein[Math.floor(Math.random() * protein.length)]}, ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
                l9 = `Snack: ${ps[Math.floor(Math.random() * ps.length)]}, ${vegetable[0]}`;
                l10 = `Dinner: ${protein[Math.floor(Math.random() * protein.length)]}, 2 ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
                l11 = `Snack: ${fruit[Math.floor(Math.random() * fruit.length)]}`;
            } else if (calories < 1800) {
                l6 = `Breakfast: ${protein[Math.floor(Math.random() * protein.length)]}, ${fruit[Math.floor(Math.random() * fruit.length)]}`;
                l8 = `Lunch: ${protein[Math.floor(Math.random() * protein.length)]}, ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
                l9 = `Snack: ${ps[Math.floor(Math.random() * ps.length)]}, ${vegetable[0]}`;
                l10 = `Dinner: ${protein[Math.floor(Math.random() * protein.length)]}, 2 ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
                l11 = `Snack: ${fruit[Math.floor(Math.random() * fruit.length)]}`;
            } else if (calories < 2200) {
                l6 = `Breakfast: ${protein[Math.floor(Math.random() * protein.length)]}, ${fruit[Math.floor(Math.random() * fruit.length)]}`;
                l8 = `Lunch: ${protein[Math.floor(Math.random() * protein.length)]}, ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
                l9 = `Snack: ${ps[Math.floor(Math.random() * ps.length)]}, ${vegetable[0]}`;
                l10 = `Dinner: ${protein[Math.floor(Math.random() * protein.length)]}, 2 ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
                l11 = `Snack: ${fruit[Math.floor(Math.random() * fruit.length)]}`;
            } else if (calories >= 2200) {
                l6 = `Breakfast: ${protein[Math.floor(Math.random() * protein.length)]}, ${fruit[Math.floor(Math.random() * fruit.length)]}`;
                l8 = `Lunch: ${protein[Math.floor(Math.random() * protein.length)]}, ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
                l9 = `Snack: ${ps[Math.floor(Math.random() * ps.length)]}, ${vegetable[0]}`;
                l10 = `Dinner: ${protein[Math.floor(Math.random() * protein.length)]}, 2 ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
                l11 = `Snack: ${fruit[Math.floor(Math.random() * fruit.length)]}`;
            }

            setMealPlan([l6, l8, l9, l10, l11]);
        }

    };

    return (
        <div class="parent">
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}

            <div class="child">
                <div class="heading">
                    <img src={diet} alt="" />
                </div>
                {mealPlan.length != 0 && <h4>{setMealPlan}</h4>}
                {healthStatus != '' && <h4>{healthStatus}</h4>}

                {mealPlan.length != 0 && <div class="white">
                    <div class="row1">
                        <input placeholder='Age' />
                        <input placeholder='Height (cm)' onChange={(e) => setHeight(e.target.value)} />
                    </div>
                    <div class="row1">
                        <input placeholder='Weight (kg)' onChange={(e) => setWeight(e.target.value)} />
                        <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="" disabled selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="row1">
                        <select name="exercise" id="exercise" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                            <option value="" disabled selected>How much you exercise?</option>
                            <option value="Super Light (little or no exercise)">Super Light (little or no exercise)</option>
                            <option value="Lightly active (1-3 days/week)">Lightly active (1-3 days/week)</option>
                            <option value="Moderately active (3-5 days/week)">Moderately active (3-5 days/week)</option>
                            <option value="Very active (6-7 days/week)">Very active (6-7 days/week)</option>
                            <option value="Super active (twice/day)">Super active (twice/day)</option>
                        </select>


                    </div>





                    <div class="row1">
                        <h2 onClick={() => {
                            calculateBMI();
                        }}>Plan My Diet 🥗</h2>


                    </div>
                </div>}



            </div>

        </div>
    )
}

export default Diet