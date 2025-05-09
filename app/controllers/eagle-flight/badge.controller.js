const db = require("../../models");
const Badge = db.badge;
const Op = db.Sequelize.Op;

// Create and Save a new Badge
exports.create = (req, res) => {
  console.log("Trying to create badge");
  console.log("Request body:", req.body);

  if (!req.body.name || !req.body.description) {
    return res.status(400).send({ message: "Badge needs a name and description!" });
  }

  const imagePath = req.file ? `${req.protocol}://${req.get('host')}/uploads/badge-images/${req.file.filename}` : null;

  const badge = {
    name: req.body.name,
    description: req.body.description,
    imagePath: imagePath
  };

  Badge.create(badge)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Some error occurred while creating the Badge." });
    });
};

// Retrieve all Badges from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Badge.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving badges."
      });
    });
};

// Find a single Badge with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Badge.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Badge with id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Badge with id=" + id });
    });
};

// Update a Badge by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  const imagePath = req.file ? `${req.protocol}://${req.get('host')}/uploads/badge-images/${req.file.filename}` : null;

  try {
    const badge = await Badge.findByPk(id);
    if (!badge) {
      return res.status(404).send({ message: `Cannot find Badge with id=${id}.` });
    }

    const updatedData = {
      name: req.body.name || badge.name,
      description: req.body.description || badge.description,
      imagePath: imagePath || badge.imagePath
    };

    const [num] = await Badge.update(updatedData, { where: { id: id } });

    if (num === 1) {
      res.send({ message: "Badge was updated successfully." });
    } else {
      res.send({ message: `Cannot update Badge with id=${id}.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating Badge with id=" + id });
  }
};

// Delete a Badge with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Badge.destroy({ where: { id: id } })
    .then(num => {
      if (num === 1) {
        res.send({ message: "Badge was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Badge with id=${id}. Maybe Badge was not found!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Badge with id=" + id });
    });
};

// Delete all Badges from the database.
exports.deleteAll = (req, res) => {
  Badge.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} Badges were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while removing all badges." });
    });
};