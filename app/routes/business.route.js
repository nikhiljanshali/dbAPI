module.exports = (app) => {
    //const notes = require('../controllers/note.controller.js');
    const businessCtrl = require('../controller/business.controller');

    // Create a new Note
    app.post('/new-business', businessCtrl.create);

    // Retrieve all Notes
    app.get('/all-business', businessCtrl.findAll);

    // Retrieve a single Note with noteId
    app.get('/business/:Id', businessCtrl.findOne);

    // Update a Note with noteId
    app.put('/update-business/:Id', businessCtrl.update);

    // Delete a Note with noteId
    app.delete('/delete-business/:Id', businessCtrl.delete);
}