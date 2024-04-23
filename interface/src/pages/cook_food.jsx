import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Papa from 'papaparse';
import Foods from '../assets/input.csv';
import FoodItems from '../assets/final_food_items.csv';
import Select from 'react-select'

ChartJS.register(ArcElement, Tooltip, Legend);

function CookFood() {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totals, setTotals] = useState({
        Carbs: 0,
        TotalFat: 0,
        SaturatedFat: 0,
        Protein: 0,
        Fiber: 0,
        Sodium: 0,
        Cholesterol: 0,
        Sodium: 0,
        Sugar: 0,
        Potassium: 0,
        Magnesium: 0,
        Phosphorus: 0,
        VitaminC: 0,
        VitaminA: 0,
        Calcium: 0,
        Iron: 0,
        Zinc: 0,
        VitaminE: 0,
        VitaminK: 0,
    });
    const [foodNames, setFoodNames] = useState([]);
    const [foodList, setFoodList] = useState([]);


    const papaConfig = {
        complete: (results, file) => {
            const dataWithoutHeader = results.data.slice(1);
            setData(dataWithoutHeader);
            const options = dataWithoutHeader.map(row => ({
                label: row[0],
                value: row[0],
            }));
            console.log(options);
            setFoodNames(options);
        },
        download: true,
        error: (error, file) => {
            console.log('Error while parsing:', error, file);
        },
    };


    useEffect(() => {
        Papa.parse(FoodItems, papaConfig);
    }, []);


    const handleItemSelect = (foodItem) => {


        foodItem.forEach(food => {
            const selectedItem = data.find(item => item[0] === food.label);
            // if (!selectedItems.some(item => item[0] === selectedItem[0])) {
            setSelectedItems(prevItems => [...prevItems, selectedItem]);
            // }
        });

        // setSelectedItems([])

    };

    // const updateSelectedItems = (selectedOptions) => {

    //     console.log("selectedItems")
    //     console.log(selectedItems)
    //     console.log("selectedItems")

    //     selectedOptions.forEach(item => {
    //         const [_, ...values] = item;
    //         setTotals(prevTotals => ({
    //             ...prevTotals,
    //             Carbs: prevTotals.Carbs + parseInt(values[0]),
    //             TotalFat: prevTotals.TotalFat + parseInt(values[1]),
    //             SaturatedFat: prevTotals.SaturatedFat + parseInt(values[2]),
    //             Protein: prevTotals.Protein + parseInt(values[3]),
    //             Fiber: prevTotals.Fiber + parseInt(values[4]),
    //             Sodium: prevTotals.Sodium + parseInt(values[5]),
    //             Cholesterol: prevTotals.Cholesterol + parseInt(values[6]),
    //             Sugar: prevTotals.Sugar + parseInt(values[7]),
    //             Potassium: prevTotals.Potassium + parseInt(values[8]),
    //             Magnesium: prevTotals.Magnesium + parseInt(values[9]),
    //             Phosphorus: prevTotals.Phosphorus + parseInt(values[10]),
    //             VitaminC: prevTotals.VitaminC + parseInt(values[11]),
    //             VitaminA: prevTotals.VitaminA + parseInt(values[12]),
    //             Calcium: prevTotals.Calcium + parseInt(values[13]),
    //             Iron: prevTotals.Iron + parseInt(values[14]),
    //             Zinc: prevTotals.Zinc + parseInt(values[15]),
    //             VitaminE: prevTotals.VitaminE + parseInt(values[16]),
    //             VitaminK: prevTotals.VitaminK + parseInt(values[17]),
    //         }));
    //     });
    // }


    useEffect(() => {
        const updateTotalsFromSelectedItems = () => {
            const newTotals = selectedItems.reduce((accumulator, item) => {
                return {
                    Carbs: accumulator.Carbs + parseInt(item[1]),
                    TotalFat: accumulator.TotalFat + parseInt(item[2]),
                    SaturatedFat: accumulator.SaturatedFat + parseInt(item[3]),
                    Protein: accumulator.Protein + parseInt(item[4]),
                    Fiber: accumulator.Fiber + parseInt(item[5]),
                    Sodium: accumulator.Sodium + parseInt(item[6]),
                    Cholesterol: accumulator.Cholesterol + parseInt(item[7]),
                    Sugar: accumulator.Sugar + parseInt(item[8]),
                    Potassium: accumulator.Potassium + parseInt(item[9]),
                    Magnesium: accumulator.Magnesium + parseInt(item[10]),
                    Phosphorus: accumulator.Phosphorus + parseInt(item[11]),
                    VitaminC: accumulator.VitaminC + parseInt(item[12]),
                    VitaminA: accumulator.VitaminA + parseInt(item[13]),
                    Calcium: accumulator.Calcium + parseInt(item[14]),
                    Iron: accumulator.Iron + parseInt(item[15]),
                    Zinc: accumulator.Zinc + parseInt(item[16]),
                    VitaminE: accumulator.VitaminE + parseInt(item[17]),
                    VitaminK: accumulator.VitaminK + parseInt(item[18]),
                };
            }, {
                Carbs: 0,
                TotalFat: 0,
                SaturatedFat: 0,
                Protein: 0,
                Fiber: 0,
                Sodium: 0,
                Cholesterol: 0,
                Sodium: 0,
                Sugar: 0,
                Potassium: 0,
                Magnesium: 0,
                Phosphorus: 0,
                VitaminC: 0,
                VitaminA: 0,
                Calcium: 0,
                Iron: 0,
                Zinc: 0,
                VitaminE: 0,
                VitaminK: 0,
            });
            setTotals(newTotals);
        };

        updateTotalsFromSelectedItems();
    }, [selectedItems]);



    useEffect(() => {
        console.log('updated')
        console.log(selectedItems)
        console.log('updated')
    }, [selectedItems]);


    const locationdata = {
        labels: Object.keys(totals),
        datasets: [
            {
                data: Object.values(totals),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 199, 122)',
                    'rgb(54, 12, 235)',
                    'rgb(255, 106, 86)',
                    'rgb(155, 192, 192)',
                    'rgb(153, 102, 205)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 199, 12, 1)',
                    'rgba(54, 12, 235, 1)',
                    'rgba(255, 106, 86, 1)',
                    'rgba(155, 192, 192, 1)',
                    'rgba(153, 102, 205, 1)',

                ],
                borderWidth: 1,
            },
        ],
    }


    return (
        <div>

            <div>
                <h1>Select Ingredients</h1>
                <Select
                    options={foodNames}
                    onChange={(selectedOptions) => {
                        setTotals({
                            Carbs: 0,
                            TotalFat: 0,
                            SaturatedFat: 0,
                            Protein: 0,
                            Fiber: 0,
                            Sodium: 0,
                            Cholesterol: 0,
                            Sodium: 0,
                            Sugar: 0,
                            Potassium: 0,
                            Magnesium: 0,
                            Phosphorus: 0,
                            VitaminC: 0,
                            VitaminA: 0,
                            Calcium: 0,
                            Iron: 0,
                            Zinc: 0,
                            VitaminE: 0,
                            VitaminK: 0,
                        })
                        const selectedValues = selectedOptions.map(option => option);
                        console.log(selectedValues)

                        selectedOptions.forEach(option => handleItemSelect(selectedValues));
                    }}
                    // cha
                    isMulti={true}
                />
            </div>
            <div className="contain">
                <div>
                    <h2>Total Nutritional Values</h2>
                    <p>Carbs: {totals.Carbs} grams</p>
                    <p>TotalFat: {totals.TotalFat} grams</p>
                    <p>SaturatedFat: {totals.SaturatedFat} grams</p>
                    <p>Protein: {totals.Protein} grams</p>
                    <p>Fiber: {totals.Fiber} grams</p>
                    <p>Sodium: {totals.Sodium} milligrams</p>
                    <p>Cholesterol: {totals.Cholesterol} milligrams</p>
                    <p>Sodium: {totals.Sodium} milligrams</p>
                    <p>Sugar: {totals.Sugar} grams</p>
                    <p>Potassium: {totals.Potassium} milligrams</p>
                    <p>Magnesium: {totals.Magnesium} milligrams</p>
                    <p>Phosphorus: {totals.Phosphorus} milligrams</p>
                    <p>VitaminC: {totals.VitaminC} milligrams</p>
                    <p>VitaminA: {totals.VitaminA} IU</p>
                    <p>Calcium: {totals.Calcium} milligrams</p>
                    <p>Iron: {totals.Iron} milligrams</p>
                    <p>Zinc: {totals.Zinc} milligrams</p>
                    <p>VitaminE: {totals.VitaminE} milligrams</p>
                    <p>VitaminK: {totals.VitaminK} micrograms</p>

                </div>
                <div className="pie-container">
                    <h2>Nutritional Values Pie Chart</h2>
                    <Pie data={locationdata} width={200} height={200} />
                </div>
            </div>
        </div>
    );
}

export default CookFood;
