const db = require("../../models");
const event = db.event;
const Op = db.Sequelize.Op;

// Create and Save a new event
exports.create = (req, res) => {
  console.log("trying to create event");
  console.log(req.body);

  // Validate request: event requires a name and description
  if (!req.body.name || !req.body.description) {
    return res.status(400).send({
      message: "event needs a name and description!",
    });
  }

  // Create a event object
  const newEvent = {
    id: req.body.id,
    experienceID: req.body.experienceID,
    date: req.body.date,
    time: req.body.time,
    type: req.body.type,
    location: req.body.location,
    name: req.body.name,
    description: req.body.description
  };

  // Save event in the database
  event.create(newEvent)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Some error occurred while creating the event.",
      });
    });
};

// Retrieve all events from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  event.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Find a single event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  event.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find event with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving event with id=" + id,
      });
    });
};

// Update a event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  event.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "event was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update event with id=${id}. Maybe event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating event with id=" + id,
      });
    });
};

// Delete a event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  event.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete event with id=${id}. Maybe event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete event with id=" + id,
      });
    });
};

// Delete all events from the database.
exports.deleteAll = (req, res) => {
  event.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} events were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all events.",
      });
    });
};