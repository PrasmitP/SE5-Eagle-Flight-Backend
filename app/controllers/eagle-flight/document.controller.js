const db = require("../../models");
const Document = db.document;
const Op = db.Sequelize.Op;

// Create and Save a new Document
exports.create = (req, res) => {
  if (!req.body.title || !req.body.filePath || !req.body.uploadedBy) {
    return res.status(400).send({
      message: "Document must have a title, filePath, and uploadedBy field!",
    });
  }

  const document = {
    title: req.body.title,
    description: req.body.description || "",
    filePath: req.body.filePath,
    uploadedBy: req.body.uploadedBy,
  };

  Document.create(document)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating the Document.",
      });
    });
};

// Retrieve all Documents from the database
exports.findAll = (req, res) => {
  Document.findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while retrieving documents.",
      });
    });
};

// Find a single Document with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Document.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Document with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Document with id=" + id,
      });
    });
};

// Update a Document by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Document.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Document was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Document with id=" + id,
      });
    });
};

// Delete a Document with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Document.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Document was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Document with id=${id}. Maybe Document was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Document with id=" + id,
      });
    });
};

// Delete all Documents from the database
exports.deleteAll = (req, res) => {
  Document.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Documents were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all documents.",
      });
    });
};