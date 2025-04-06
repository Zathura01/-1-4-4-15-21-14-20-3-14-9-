import React, { useState } from "react";
import "./Style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import Summary from './Summary';

function Grid({bName, edit, setGrid, setEdit}) {
    const [ name, setName] = useState("");

    const [budgetTerms] = useState({
        Income: ["Source", "Amount", "Comments"],
        Investment: ["Type", "Details", "Return %", "Current shares", "Amount", "Comments"],
        Saving: ["Bank", "Details", "Current saved", "Amount", "Comments"],
        Expense: ["Type", "Details", "QTY", "Cost per Unit", "Amount", "Comments"],
        Misc: ["Comments", "Amount"]
    });

    const [selects] = useState([
        ["Salary", "Other", "Add new"],
        ["MF", "GOLD", "STOCKS", "LAND", "BOND", "FD", "Other", "Add new"],
        ["SBI", "IDBI", "AXIS", "OTHER", "Add new"],
        ["Food", "Rent", "Gas", "Smoke", "Tobacco", "Luxury", "Amazon", "Bike", "Books", "Clothes", "Other", "Add new"]
    ]);

    // Track table data
    const [formData, setFormData] = useState({
        Income: [{ Source: "Salary", Amount: "", Comments: "" }],
        Investment: [{ Type: "MF", Details: "", "Return %": "", "Current shares": "", Amount: "", Comments: "" }],
        Saving: [{ Bank: "SBI", Details: "", "Current saved": "", Amount: "", Comments: "" }],
        Expense: [{ Type: "Food", Details: "", QTY: "", "Cost per Unit": "", Amount: "", Comments: "" }],
        Misc: [{ Comments: "", Amount: "" }]
    });

    const termList = Object.keys(budgetTerms);

    // Function to Add a Row
    const addRow = (category) => {
        setFormData(prev => ({
            ...prev,
            [category]: [
                ...prev[category],
                budgetTerms[category].reduce((acc, key, index) => ({
                    ...acc,
                    [key]: index === 0 && selects[termList.indexOf(category)]
                        ? selects[termList.indexOf(category)][0] // Default dropdown value
                        : "" // Empty for other fields
                }), {})
            ]
        }));
    };

    // Function to Delete a Row
    const deleteRow = (category) => {
        setFormData(prev => ({
            ...prev,
            [category]: prev[category].length > 1 ? prev[category].slice(0, -1) : prev[category]
        }));
    };

    // Function to handle input change
    const handleInputChange = (category, rowIndex, field, value) => {
        setFormData(prev => {
            const newCategoryData = [...prev[category]];
            newCategoryData[rowIndex] = { ...newCategoryData[rowIndex], [field]: value };
            return { ...prev, [category]: newCategoryData };
        });
    };

    // Function to send data to the backend
    const sendDataToBackend = async () => {
        console.log(formData);
        let sendingData = {
            ...formData,
            bName: bName,
            Comment: name // Ensure `name` is correctly sent
        };
    
        try {
            const response = await fetch("http://localhost:5000/api/saveBudget", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sendingData),
            });
    
            const data = await response.json();
            if (data.success) {
                alert("Data saved successfully!");
                setGrid(false);
                setEdit(edit+1);
            } else {
                alert("Failed to save data!");
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };
    

    return (
        <div className="grid-container">
            {termList.map((list) => (
                <div key={list} className="table-wrapper">
                    <h3 className="listNames">{list}</h3>
                    <table className="table-container">
                        <thead>
                            <tr>
                                {budgetTerms[list].map((term, i) => (
                                    <th className="th-container" key={i}>{term}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {formData[list].map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {budgetTerms[list].map((field, i) => {
                                        let dropdownIndex = null;
                                        if (list === "Income" && i === 0) dropdownIndex = 0;
                                        if (list === "Investment" && i === 0) dropdownIndex = 1;
                                        if (list === "Saving" && i === 0) dropdownIndex = 2;
                                        if (list === "Expense" && i === 0) dropdownIndex = 3;

                                        return (
                                            <td className="td-container" key={i}>
                                                {dropdownIndex !== null ? (
                                                    <select
                                                        value={row[field] || selects[dropdownIndex][0]} // Default first option
                                                        onChange={(e) => handleInputChange(list, rowIndex, field, e.target.value)}
                                                    >
                                                        {selects[dropdownIndex].map((option, i) => (
                                                            <option key={i} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={row[field]}
                                                        onChange={(e) => handleInputChange(list, rowIndex, field, e.target.value)}
                                                    />
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={budgetTerms[list].length} className="td-container">
                                    <FontAwesomeIcon 
                                        onClick={() => deleteRow(list)} 
                                        className="removeButton" 
                                        icon={faSquareMinus} 
                                        size="xl"
                                        title="Remove Last Row"
                                    />
                                    <FontAwesomeIcon 
                                        onClick={() => addRow(list)} 
                                        className="addButton" 
                                        icon={faSquarePlus} 
                                        size="xl"
                                        title="Add New Row"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
            <input onChange={(e)=>setName(e.target.value)} placeholder="Enter Comments"/>
            <button onClick={sendDataToBackend} className="submit-button">Save Data</button>
            <Summary formData={formData} />
            </div>
    );
}

export default Grid;
