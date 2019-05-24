const Business = require('../models/bussiness.model');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Business content can not be empty"
        });
    }

    // Create a Note
    const bussiness = new Business({
        person_name: req.body.person_name || "Unknown Person",
        business_name: req.body.business_name || "Unknown Business",
        business_gst_number: req.body.business_gst_number || 00,
        active: req.body.active || false
    });

    // Save Note in the database
    bussiness.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Business."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Business.find()
        .then(bussiness => {
            res.send(bussiness);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving businesses."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Business.findById(req.params.Id)
        .then(bussiness => {
            if (!bussiness) {
                return res.status(404).send({
                    message: "Bussiness not found with id " + req.params.Id
                });
            }
            res.send(bussiness);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Bussiness not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.Id
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Bussiness content can not be empty"
        });
    }
    // Find note and update it with the request body
    Business.findOneAndUpdate(req.params.Id, {
        person_name: req.body.person_name || "Unknown Person",
        business_name: req.body.business_name || "Unknown Business",
        business_gst_number: req.body.business_gst_number || 00
    }, { upsert: true, setDefaultsOnInsert: true }).then(bussiness => {
        if (!bussiness) {
            return res.status(404).send({
                message: "Bussiness not found with id " + req.params.Id
            });
        }
        res.send(bussiness);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bussiness not found with id " + req.params.Id
            });
        }
        return res.status(500).send({
            message: "Error updating bussiness with id " + req.params.Id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Business.findOneAndDelete({ _id: req.params.Id })
        .then(bussiness => {
            if (!bussiness) {
                return res.status(404).send({
                    message: "Bussiness not found with id " + req.params.Id
                });
            }
            res.send({ message: "Bussiness deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Bussiness not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Could not delete bussiness with id " + req.params.Id
            });
        });
};