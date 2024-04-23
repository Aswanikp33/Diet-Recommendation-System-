import React, { useState } from 'react';
import finalDiseases from '../assets/final_diseases.json';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { useAuth } from '../context';
import diet from '../assets/img.svg'
import { Navigate } from 'react-router-dom';

function calculateBmr(weight, height, age, gender) {
    let bmr;
    if (gender === 'Male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return bmr;
}

function getDiseases(selectedDiseases) {
    return finalDiseases.filter((disease) =>
        selectedDiseases.includes(disease.Disease)
    );
}

function calculateCalories(bmr, activityLevel) {
    let pal;
    const exercise = [
        "Little or no exercise",
        "Exercise 1-3 times/week",
        "Exercise or Intense Exercise 3-4 times/week",
        "Exercise 4-5 times/week",
        "Intense Exercise 6-7 times/week",
        "Intense Exercise daily",
    ];

    switch (activityLevel) {
        case exercise[0]:
            pal = 1.2;
            break;
        case exercise[1]:
            pal = 1.375;
            break;
        case exercise[2]:
            pal = 1.55;
            break;
        case exercise[3]:
            pal = 1.725;
            break;
        case exercise[4]:
            pal = 1.9;
            break;
        case exercise[5]:
            pal = 2.1;
            break;
        default:
            console.log('Invalid activity level');
            return null;
    }

    const calories = bmr * pal;
    return calories;
}

function getNutrition(diseases) {
    let protein = 100;
    let carbs = 250;
    let fat = 100;

    diseases.forEach((disease) => {
        if (disease.Protein < protein) {
            protein = disease.Protein;
        }
        if (disease.Carbs < carbs) {
            carbs = disease.Carbs;
        }
        if (disease.Total_Fat < fat) {
            fat = disease.Total_Fat;
        }
    });

    return { protein, carbs, fat };
}

function isNumber(input) {
    return /^-?\d+(\.\d+)?$/.test(input);
}

function isInteger(input) {
    return /^\d+$/.test(input);
}

function DietCalculator() {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('Male');
    const [exerciseLevel, setExerciseLevel] = useState('Little or no exercise');
    const [dietType, setDietType] = useState('veg');
    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth()

    function validateAndStore() {
        if (age && height && weight && gender && exerciseLevel && dietType) {
            const weightF = parseFloat(weight);
            const heightF = parseFloat(height);
            const ageF = parseInt(age);

            if (!isNumber(weight) || !isNumber(height) || !isInteger(age)) {
                alert('Please enter valid data');
            } else {
                const bmr = calculateBmr(weightF, heightF, ageF, gender);
                const calories = calculateCalories(bmr, exerciseLevel);

                const selectedDiseasesData = getDiseases(selectedDiseases);

                const nutrition = getNutrition(selectedDiseasesData);

                const multiplier = calories / 2200;

                console.log('Calories:', calories);
                console.log('Multiplier:', multiplier);
                console.log('Nutrition:', nutrition);
                const maxBreakfast = {
                    Protein: 0.37 * nutrition.protein,
                    Carbs: 0.37 * nutrition.carbs,
                    Fats: 0.3 * nutrition.fat,
                    Calories: 0.3 * nutrition.fat * 8 + 0.37 * nutrition.carbs * 4 + 0.37 * nutrition.protein * 4,
                };

                const maxLunch = {
                    Protein: 0.3 * nutrition.protein,
                    Carbs: 0.35 * nutrition.carbs,
                    Fats: 0.35 * nutrition.fat,
                    Calories: 0.35 * nutrition.fat * 8 + 0.35 * nutrition.carbs * 4 + 0.3 * nutrition.protein * 4,
                };

                const maxSnacks = {
                    Protein: 0.05 * nutrition.protein,
                    Carbs: 0.1 * nutrition.carbs,
                    Fats: 0.1 * nutrition.fat,
                    Calories: 0.1 * nutrition.fat * 8 + 0.1 * nutrition.carbs * 4 + 0.05 * nutrition.protein * 4,
                };

                const maxDinner = {
                    Protein: 0.28 * nutrition.protein,
                    Carbs: 0.25 * nutrition.carbs,
                    Fats: 0.25 * nutrition.fat,
                    Calories: 0.25 * nutrition.fat * 8 + 0.25 * nutrition.carbs * 4 + 0.28 * nutrition.protein * 4,
                };

                const formData = {
                    selectedAllergies
                };
                fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network error');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Prediction result:', data);
                        navigate('/dietplan', { state: { maxB: maxBreakfast, maxL: maxLunch, maxD: maxDinner, maxS: maxSnacks, isveg: dietType, allergies: data } })

                    })


            }
        } else {
            console.log(age)
            console.log(height)
            console.log(weight)
            console.log(gender)
            console.log(exerciseLevel)
            console.log(dietType)
            alert('Please fill all the fields');
        }
    }

    const options = [
        { value: 'No', label: 'No' },
        { value: 'Gluten', label: 'Gluten' },
        { value: 'OAS (birch pollen)', label: 'OAS (birch pollen)' },
        { value: 'birch pollen', label: 'birch pollen' },
        { value: 'citrus', label: 'citrus' },
        { value: 'latex', label: 'latex' },
        { value: 'cashew', label: 'cashew' },
        { value: 'sulfites', label: 'sulfites' },
        { value: 'medication interaction', label: 'medication interaction' },
        { value: 'stone fruits', label: 'stone fruits' },
        { value: 'lychee', label: 'lychee' },
        { value: 'strawberry', label: 'strawberry' },
        { value: 'neurological problems', label: 'neurological problems' },
        { value: 'stomach upset', label: 'stomach upset' },
        { value: 'allergic reaction (some)', label: 'allergic reaction (some)' },
        { value: 'kiwi', label: 'kiwi' },
        { value: 'nightshade', label: 'nightshade' },
        { value: 'OAS (ragweed pollen)', label: 'OAS (ragweed pollen)' },
        { value: 'allergen', label: 'allergen' },
        { value: 'strawberry (possible)', label: 'strawberry (possible)' }
    ];


    return (
        <div class="parent">
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}
            <div className="child">
                <div class="heading">
                    <img src={diet} alt="" />
                </div>
                <div className="white">
                    <div >
                        <div>
                            <label>Age:</label>
                            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div>
                            <label>Height (cm):</label>
                            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
                        </div>
                        <div>
                            <label>Weight (kg):</label>
                            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label>How much you exercise?</label>
                        <select value={exerciseLevel} onChange={(e) => setExerciseLevel(e.target.value)}>
                            <option value="Little or no exercise">Little or no exercise</option>
                            <option value="Exercise 1-3 times/week">Exercise 1-3 times/week</option>
                            <option value="Exercise or Intense Exercise 3-4 times/week">Exercise or Intense Exercise 3-4 times/week</option>
                            <option value="Exercise 4-5 times/week">Exercise 4-5 times/week</option>
                            <option value="Intense Exercise 6-7 times/week">Intense Exercise 6-7 times/week</option>
                            <option value="Intense Exercise daily">Intense Exercise daily</option>
                        </select>
                    </div>
                    <div>
                        <label>Veg/Nonveg:</label>
                        <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
                            <option value="veg">Vegetarian</option>
                            <option value="nonveg">Non-Vegetarian</option>
                        </select>
                    </div>
                    <div>
                        <label>Any Allergies:</label>
                        <Select
                            options={options}
                            onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions.map(option => option.value);
                                console.log(selectedValues)
                                setSelectedAllergies(selectedValues)
                            }}
                            isMulti={true}
                        />
                    </div>
                    <button onClick={validateAndStore}>Create Diet Plan</button>
                </div>
            </div>
        </div>
    );
}


export default DietCalculator;
