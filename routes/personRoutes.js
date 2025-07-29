const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // Person Model Import

// ===========================
// POST: Add new person
// ===========================
router.post('/person', async (req, res) => {
    try {
        const data = req.body;               // Request Body
        const newPerson = new Person(data);  // Create New Person
        const response = await newPerson.save(); // Save to DB
        console.log("Data saved:", response);
        res.status(201).json(response);      // 201 Created
    } catch (err) {
        console.error("Error Saving Person:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ===========================
// GET: Fetch all persons
// ===========================
router.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("All Persons fetched:", data.length);
        res.status(200).json(data);
    } catch (err) {
        console.error("Error Fetching Persons:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ===========================
// GET: Fetch person by workType (chef, waiter, manager)
// ===========================
router.get('/person/work/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase();
        const allowedTypes = ['chef', 'waiter', 'manager'];

        if (!allowedTypes.includes(workType)) {
            return res.status(400).json({ error: "Invalid work type" });
        }

        const response = await Person.find({ work: workType });
        console.log(`Persons with work '${workType}':`, response.length);
        res.status(200).json(response);
    } catch (err) {
        console.error("Error Fetching by Work Type:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ===========================
// PUT: Update person by ID
// ===========================
router.put('/person/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = req.body;

        const response = await Person.findByIdAndUpdate(
            personId,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Person updated:", response);
        res.status(200).json(response);
    } catch (err) {
        console.error("Error Updating Person:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ===========================
// DELETE: Delete person by ID
// ===========================
router.delete('/person/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Person Deleted:", response);
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (err) {
        console.error("Error Deleting Person:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;