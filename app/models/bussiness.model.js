const mongoose = require('mongoose');

// Define collection and schema for Business
const BusinessSchema = mongoose.Schema({
    person_name: String,
    business_name: String,
    business_gst_number: Number,
    active: Boolean
});

module.exports = mongoose.model('Business', BusinessSchema);