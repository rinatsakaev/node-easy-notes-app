const Guest = require('../models/guest.model.js');
const Table = require('../models/table.model.js');

// Create and Save a new Note
exports.addGuest = (req, res) => {
	const guest = new Guest({
		name: req.body.guestName,
		tableId: req.body.tableId,
        date: req.body.date
	});

	// Save Note in the database
	guest.save()
		.then(data => {
			res.redirect(`/home/${req.body.date}`);
		}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Note."
		});
	});
};

exports.addTable = (req, res) => {
	// Create a Note
	const table = new Table({
		capacity: parseInt(req.body.capacity),
	});

	// Save Note in the database
	table.save()
		.then(data => {
			res.redirect('/home');
		}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the table."
		});
	});
};

exports.findAll = (req, res) => {
	Table.find({})
		.then(tables => {
			for (let i = 0; i < tables.length; i++)
				Guest.find(
					{
						tableId: tables[i]._id.toString(),
						date: req.params === undefined?{}:req.params.date
					})
					.then(guests => tables[i].guestCount = guests.length);

			res.render("index.hbs", {tables});
		}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving notes."
		});
	});
};

exports.findOne = (req, res) => {
	Guest.find({
		tableId: req.params.tableId,
		date: req.params.date
	})
		.then(guests => {
			if (!guests) {
				return res.status(404).send({
					message: "Note not found with id " + req.params.tableId
				});
			}
			res.json({guests});
		}).catch(err => {
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Table not found with id " + req.params.tableId
			});
		}
		return res.status(500).send({
			message: "Error retrieving note with id " + req.params.tableId
		});
	});
};

// Delete a note with the specified noteId in the request
exports.deleteGuest = (req, res) => {
	Guest.findByIdAndRemove(req.params.guestId)
		.then(guest => {
			if (!guest) {
				return res.status(404).send({
					message: "Guest not found with id " + req.params.guestId
				});
			}
			res.send({message: "Guest deleted successfully!"});
		}).catch(err => {
		if (err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: "Note not found with id " + req.params.noteId
			});
		}
		return res.status(500).send({
			message: "Could not deleteGuest note with id " + req.params.noteId
		});
	});
};
