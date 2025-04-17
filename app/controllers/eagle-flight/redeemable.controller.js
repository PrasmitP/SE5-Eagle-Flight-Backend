const db = require("../../models");
const Redeemable = db.redeemable;
const Op = db.Sequelize.Op;

// Create and Save a new Redeemable
exports.create = (req, res) => {

  if (!req.body.name || !req.body.points) {
    return res.status(400).send({
      message: "Redeemable must have a name and point value.",
    });
  }

  const redeemable = {
    name: req.body.name,
    description: req.body.description || "",
    points: req.body.points,
  };

  Redeemable.create(redeemable)
    .then(data => res.status(201).send(data))
    .catch(err =>
      res.status(500).send({ message: err.message || "Error creating Redeemable." })
    );
};

// Retrieve all Redeemables
exports.getAll = (req, res) => {
  // Use findAll() to fetch all Redeemables from the database
  Redeemable.findAll()  // Corrected method call
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({ message: err.message || "Error retrieving Redeemables." })
    );
};

// Retrieve a single Redeemable by id
exports.getOne = (req, res) => {
  const id = req.params.id;

  Redeemable.findByPk(id)  // Corrected method call
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Redeemable not found with id=${id}` });
    })
    .catch(err =>
      res.status(500).send({ message: "Error retrieving Redeemable with id=" + id })
    );
};

// Update a Redeemable by the id
exports.update = (req, res) => {
  const id = req.params.id;

  Redeemable.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Redeemable updated successfully." });
      else res.send({ message: `Cannot update Redeemable with id=${id}` });
    })
    .catch(err =>
      res.status(500).send({ message: "Error updating Redeemable with id=" + id })
    );
};

// Delete a Redeemable by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Redeemable.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Redeemable deleted successfully!" });
      else res.send({ message: `Cannot delete Redeemable with id=${id}` });
    })
    .catch(err =>
      res.status(500).send({ message: "Could not delete Redeemable with id=" + id })
    );
};

// Delete all Redeemables
exports.deleteAll = (req, res) => {
  Redeemable.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Redeemables deleted successfully!` }))
    .catch(err =>
      res.status(500).send({ message: err.message || "Error deleting all Redeemables." })
    );
};