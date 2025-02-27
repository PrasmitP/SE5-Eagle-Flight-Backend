const db = require("../../models");
const Redeemable = db.redeemable;
const Op = db.Sequelize.Op;

// Create and Save a new Redeemable
exports.create = (req, res) => {
  console.log("trying to create redeemable");
  console.log(req.body);

  // Validate request: Redeemable requires a name and description
  if (!req.body.name || !req.body.description) {
    return res.status(400).send({
      message: "Redeemable needs a name and description!",
    });
  }

  // Create a Redeemable object
  const redeemable = {
    name: req.body.name,
    description: req.body.description,
  };

  // Save Redeemable in the database
  Redeemable.create(redeemable)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Some error occurred while creating the Redeemable.",
      });
    });
};

// Retrieve all Redeemables from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Redeemable.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving redeemables.",
      });
    });
};

// Find a single Redeemable with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Redeemable.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Redeemable with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Redeemable with id=" + id,
      });
    });
};

// Update a Redeemable by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Redeemable.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Redeemable was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Redeemable with id=${id}. Maybe Redeemable was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Redeemable with id=" + id,
      });
    });
};

// Delete a Redeemable with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Redeemable.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Redeemable was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Redeemable with id=${id}. Maybe Redeemable was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Redeemable with id=" + id,
      });
    });
};

// Delete all Redeemables from the database.
exports.deleteAll = (req, res) => {
  Redeemable.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Redeemables were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all redeemables.",
      });
    });
};