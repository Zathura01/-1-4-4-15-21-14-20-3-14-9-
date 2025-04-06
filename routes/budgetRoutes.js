const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

// Save budget
router.post("/saveBudget", async (req, res) => {
    try {
        const newBudget = new Budget(req.body);
        await newBudget.save();
        res.status(201).json({ success: true, message: "Budget saved!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Failed to save data" });
    }
});

// Get all budgets
router.get("/getBudgetList", async (req, res) => {
    try {
        const budgetData = await Budget.find();
        res.status(200).json(budgetData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ success: false, message: "Error fetching data" });
    }
});

// Delete by ID
router.post("/deleteBudget", async (req, res) => {
    const { id } = req.body;
  
    try {
      const deleted = await Budget.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Budget not found" });
      }
      res.json({ success: true, message: "Budget deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });


  router.post("/getBudget", async (req, res) => {
    const { id } = req.body;
    const budget = await Budget.findById(id);
    console.log(budget)
    res.json(budget);
  });

module.exports = router;
