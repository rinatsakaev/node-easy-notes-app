module.exports = (app) => {
    const guests = require('../controllers/guest.controller.js');

    // Retrieve all Notes
    app.get('/home/:date*?', guests.findAll);

    // Retrieve a single Note with noteId
    app.get('/getTableInfo/:tableId/:date', guests.findOne);

    // Update a Note with noteId
    app.post('/addGuest', guests.addGuest);

    app.post('/addTable', guests.addTable);

    // Delete a Note with noteId
    app.post('/deleteGuest', guests.deleteGuest);
};
