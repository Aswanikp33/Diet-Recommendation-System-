// import React, { useEffect, useState } from 'react'
// import './bmi.css'
// import { useAuth } from '../context';
// import { Navigate } from 'react-router-dom';
// import diet from '../assets/img.svg'
// import Select from 'react-select'
// import Diseases from '../assets/final_diseases.csv';
// import Papa from 'papaparse';
// import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'
// pdfMake.vfs = pdfFonts.pdfMake.vfs


// const Home = () => {
//     const [height, setHeight] = useState('');
//     const [weight, setWeight] = useState('');
//     const [bmi, setBMI] = useState(null);
//     const [gender, setGender] = useState('');
//     const [healthStatus, setHealthStatus] = useState('');
//     const [age, setAge] = useState('');
//     const [calories, setCalories] = useState();
//     const [activityLevel, setActivityLevel] = useState('');
//     const [mealPlan, setMealPlan] = useState([]);
//     const [url, setUrl] = useState(null)
//     const [diseaseNames, setDiseaseNames] = useState([]);
//     const [data, setData] = useState([]);

//     const { userLoggedIn } = useAuth()

//     const papaConfig = {
//         complete: (results, file) => {
//             const dataWithoutHeader = results.data.slice(1);
//             setData(dataWithoutHeader);
//             const options = dataWithoutHeader.map(row => ({
//                 label: row[0],
//                 value: row[0],
//             }));
//             console.log(options);
//             setDiseaseNames(options);
//         },
//         download: true,
//         error: (error, file) => {
//             console.log('Error while parsing:', error, file);
//         },
//     };


//     useEffect(() => {
//         Papa.parse(Diseases, papaConfig);
//     }, []);


//     const documentContent = {
//         content: [
//             { text: mealPlan[0], style: 'header' },
//             { text: mealPlan[1], style: 'header' },
//             { text: mealPlan[2], style: 'snack' },
//             { text: mealPlan[3], style: 'header' },
//             { text: mealPlan[4], style: 'snack' },
//         ],
//         styles: {
//             header: {
//                 fontSize: 22,
//                 bold: true,
//             },
//             snack: {
//                 italics: true,
//             }
//         }



//     }

//     const createPDF = () => {
//         const pdfGenerator = pdfMake.createPdf(documentContent)
//         pdfGenerator.getBlob((blob) => {
//             const url = URL.createObjectURL(blob)
//             setUrl(url)
//         })
//         pdfGenerator.download()
//     }
//     const calculateBMI = () => {
//         const protein = ['Yogurt(1 cup)', 'Cooked meat(3 Oz)', 'Cooked fish(4 Oz)', '1 whole egg + 4 egg whites', 'Tofu(5 Oz)', 'Coffee', 'Milk', 'Dosa', 'Idli', 'Chappati']
//         const fruit = ['Berries(80 Oz)', 'Apple', 'Orange', 'Banana', 'Dried Fruits(Handfull)', 'Fruit Juice(125ml)']
//         const vegetable = ['Any vegetable(80g)']
//         const grains = ['Cooked Grain(150g)', 'Whole Grain Bread(1 slice)', 'Half Large Potato(75g)', 'Oats(250g)', '2 corn tortillas', 'Asparagus Cooked', 'Bagels made in wheat', 'Brocolli', 'Brown Rice', 'Cauliflower', 'American cheese', 'Beef sticks', 'Rice Pudding']
//         const ps = ['Soy nuts(i Oz)', 'Low fat milk(250ml)', 'Hummus(4 Tbsp)', 'Cottage cheese (125g)', 'Flavored yogurt(125g)']
//         const taste_en = ['2 TSP (10 ml) olive oil', '2 TBSP (30g) reduced-caloriesorie salad dressin', '1/4 medium avocado', 'Small handful of nuts', '1/2 ounce  grated Parmesan cheese', '1 TBSP (20g) jam, jelly, honey, syrup, sugar', 'Berries', 'Dark chocolates', 'Milk', 'Pasta canned with tomato sauce', 'Tuna Salad', 'Tuna Fish', 'French Fries', 'Chocolate Doughnuts', 'Chappati', 'Bhaji Pav', 'Dal Makhani', 'Sweet Potatoes cooked', 'Boiled Potatoes', 'Goat meat', 'Steak Fries', 'Pork cooked', 'Bacon cooked', 'Chicken Popcorn', 'Turkey cooked', 'Vanilla Ice cream']

//         if (height && weight) {
//             const heightInMeters = height / 100;
//             const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
//             setBMI(bmiValue);
//             if (bmiValue < 16.0) {
//                 setHealthStatus("Severely underweight");
//             } else if (bmiValue < 17.0) {
//                 setHealthStatus("Underweight");
//             } else if (bmiValue < 18.5) {
//                 setHealthStatus("Normal underweight");
//             } else if (bmiValue < 24.9) {
//                 setHealthStatus("Healthy weight");
//             } else if (bmiValue < 29.9) {
//                 setHealthStatus("Overweight");
//             } else if (bmiValue < 34.9) {
//                 setHealthStatus("Obesity (Class 1)");
//             } else if (bmiValue < 39.9) {
//                 setHealthStatus("Obesity (Class 2)");
//             } else {
//                 setHealthStatus("Severe Obesity (Class 3)");
//             }
//         } else {
//             alert('Please enter both height and weight.');
//         }

//         let bmr;
//         let cal;

//         if (gender === 'Male') {
//             console.log('male')
//             bmr = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
//             setCalories(bmr);
//             cal = bmr;
//         } else if (gender === 'Female') {
//             bmr = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
//             setCalories(bmr);
//             cal = bmr;
//         }


//         if (activityLevel === 'Super Light (little or no exercise)') {
//             bmr *= 1.2;
//         } else if (activityLevel === 'Lightly active (1-3 days/week)') {
//             bmr *= 1.375;
//         } else if (activityLevel === 'Moderately active (3-5 days/week)') {
//             bmr *= 1.55;
//         } else if (activityLevel === 'Very active (6-7 days/week)') {
//             bmr *= 1.725;
//         } else if (activityLevel === 'Super active (twice/day)') {
//             bmr *= 1.9;
//         }

//         if (cal) {
//             let l6, l8, l9, l10, l11;

//             if (cal < 1500) {
//                 l6 = `Breakfast: ${protein[Math.floor(Math.random() * protein.length)]}, ${fruit[Math.floor(Math.random() * fruit.length)]}`;
//                 l8 = `Lunch: ${protein[Math.floor(Math.random() * protein.length)]}, ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
//                 l9 = `Snack: ${ps[Math.floor(Math.random() * ps.length)]}, ${vegetable[0]}`;
//                 l10 = `Dinner: ${protein[Math.floor(Math.random() * protein.length)]}, 2 ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
//                 l11 = `Snack: ${fruit[Math.floor(Math.random() * fruit.length)]}`;
//             } else if (cal < 1800) {
//                 l6 = `Breakfast: ${protein[Math.floor(Math.random() * protein.length)]}, ${fruit[Math.floor(Math.random() * fruit.length)]}`;
//                 l8 = `Lunch: ${protein[Math.floor(Math.random() * protein.length)]}, ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
//                 l9 = `Snack: ${ps[Math.floor(Math.random() * ps.length)]}, ${vegetable[0]}`;
//                 l10 = `Dinner: ${protein[Math.floor(Math.random() * protein.length)]}, 2 ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
//                 l11 = `Snack: ${fruit[Math.floor(Math.random() * fruit.length)]}`;
//             } else if (cal < 2200) {
//                 l6 = `Breakfast: ${protein[Math.floor(Math.random() * protein.length)]}, ${fruit[Math.floor(Math.random() * fruit.length)]}`;
//                 l8 = `Lunch: ${protein[Math.floor(Math.random() * protein.length)]}, ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
//                 l9 = `Snack: ${ps[Math.floor(Math.random() * ps.length)]}, ${vegetable[0]}`;
//                 l10 = `Dinner: ${protein[Math.floor(Math.random() * protein.length)]}, 2 ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
//                 l11 = `Snack: ${fruit[Math.floor(Math.random() * fruit.length)]}`;
//             } else if (cal >= 2200) {
//                 l6 = `Breakfast: ${protein[Math.floor(Math.random() * protein.length)]}, ${fruit[Math.floor(Math.random() * fruit.length)]}`;
//                 l8 = `Lunch: ${protein[Math.floor(Math.random() * protein.length)]}, ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
//                 l9 = `Snack: ${ps[Math.floor(Math.random() * ps.length)]}, ${vegetable[0]}`;
//                 l10 = `Dinner: ${protein[Math.floor(Math.random() * protein.length)]}, 2 ${vegetable[0]}, Leafy Greens ${grains[Math.floor(Math.random() * grains.length)]}, ${taste_en[Math.floor(Math.random() * taste_en.length)]}`;
//                 l11 = `Snack: ${fruit[Math.floor(Math.random() * fruit.length)]}`;
//             }
//             setMealPlan([l6, l8, l9, l10, l11]);
//         }

//     };

//     return (
//         <div class="parent">
//             {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}

//             <div class="child">
//                 <div class="heading">
//                     <img src={diet} alt="" />
//                 </div>
//                 <div class="white">
//                     {healthStatus != '' && <h4>{healthStatus}</h4>}
//                     <br />
//                     {calories && <h4>You need atleast {parseInt(calories)} calories daily.</h4>}
//                     <br />

//                     {mealPlan && <h3>{mealPlan[0]}</h3>}

//                     {mealPlan && <h3>{mealPlan[1]}</h3>}

//                     {mealPlan && <h3>{mealPlan[2]}</h3>}

//                     {mealPlan && <h3>{mealPlan[3]}</h3>}
//                     {mealPlan && <br />}

//                     {mealPlan && <h3>{mealPlan[4]}</h3>}
//                     {mealPlan && <br />}
//                     {healthStatus != '' && <div class="row1">
//                         <button onClick={createPDF}>Download as PDF</button>
//                     </div>}




//                     {healthStatus === '' && <>
//                         <div class="row1">
//                             <input placeholder='Age' onChange={(e) => setAge(e.target.value)} />
//                             <input placeholder='Height (cm)' onChange={(e) => setHeight(e.target.value)} />
//                         </div>
//                         <div class="row1">
//                             <input placeholder='Weight (kg)' onChange={(e) => setWeight(e.target.value)} />
//                             <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
//                                 <option value="" disabled selected>Gender</option>
//                                 <option value="Male">Male</option>
//                                 <option value="Female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </div>
//                         <div class="row1">
//                             <select name="exercise" id="exercise" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
//                                 <option value="" disabled selected>How much you exercise?</option>
//                                 <option value="Super Light (little or no exercise)">Super Light (little or no exercise)</option>
//                                 <option value="Lightly active (1-3 days/week)">Lightly active (1-3 days/week)</option>
//                                 <option value="Moderately active (3-5 days/week)">Moderately active (3-5 days/week)</option>
//                                 <option value="Very active (6-7 days/week)">Very active (6-7 days/week)</option>
//                                 <option value="Super active (twice/day)">Super active (twice/day)</option>
//                             </select>


//                         </div>

//                         {/* <div class="row1">

//                         <select name="Veg/Nonveg" id="Veg/Nonveg">
//                             <option value="" disabled selected>Veg/Nonveg</option>
//                             <option value="veg">Veg</option>
//                             <option value="nonveg">Non Veg</option>
//                         </select>


//                     </div> */}

//                         <div class="row1">

//                             <Select className='diseases'
//                                 options={diseaseNames}
//                                 onChange={(selectedOptions) => {
//                                     // selectedOptions.forEach(option => handleItemSelect(option.value));
//                                 }}
//                                 cha
//                                 isMulti={true}
//                             />



//                         </div>



//                         <div class="row1">
//                             <button onClick={calculateBMI}>Plan My Diet 🥗</button>


//                         </div>
//                     </>}



//                 </div>

//             </div>

//         </div>
//     )
// }

// export default Home