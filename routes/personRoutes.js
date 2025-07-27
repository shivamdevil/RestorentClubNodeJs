const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST: Add new person
router.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

// GET: Fetch all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

// GET: Fetch person by workType (chef, waiter, manager)
router.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase(); // optional: make it case-insensitive
        const allowedTypes = ['chef', 'waiter', 'manager'];

        if (allowedTypes.includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log("Response fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ err: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

// PUT: Update person by ID
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(
            personId,
            updatePersonData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!response) {
            return res.status(404).json({ err: "Person not found" });
        }

        console.log("Data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        //Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ err: "Person not found" });
        }
        console.log("Data Deleted");
        res.status(200).json({ messase: 'Person Deleted Successful' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });

    }
})

module.exports = router;