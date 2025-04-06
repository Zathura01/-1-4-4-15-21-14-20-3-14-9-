const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    Income: [{ Source: String, Amount: Number, Comments: String }],
    Investment: [{ Type: String, Details: String, Return: Number, CurrentShares: Number, Amount: Number, Comments: String }],
    Saving: [{ Bank: String, Details: String, CurrentSaved: Number, Amount: Number, Comments: String }],
    Expense: [{ Type: String, Details: String, QTY: Number, CostPerUnit: Number, Amount: Number, Comments: String }],
    Misc: [{ Comments: String, Amount: Number }],
    bName: String,
    Comment: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Budget", budgetSchema);
