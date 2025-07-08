const Document = require("../models/documentModel.js");

//create document

const createDoc = async (req, res) => {
  const document = new Document({
    user: req.user._id,
    jobTitle: req.body.jobTitle,
    education: [
      {
        degree: req.body.degree,
        institution: req.body.institution,
        year: req.body.year,
      },
    ],
    skills: [
      {
        skillname: req.body.skillname,
        experience: req.body.experience,
      },
    ],
    projects: req.body.projects,
    finalContent: req.body.finalContent,
  });

  try {
    const newDoc = await document.save();
    res.status(201).json({ message: "Document created successfully", newDoc });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error while saving to db", error });
  }
};

//fetch docs

const fetchDoc = async (req, res) => {
  try {
    const fetchDocs = await Document.find({ user: req.user._id });
    res.status(201).json({ message: "Docs fetched successfully", fetchDocs });
  } catch (error) {
    res.status(400).json({ message: "error while fetching to db", error });
  }
};

//update

const updateDoc = async (req, res) => {
  try {
    const updateDocs = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateDocs) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(201).json({ message: "Docs updated successfully", updateDocs });
  } catch (error) {
    res.status(400).json({ message: "error while updating data to db", error });
  }
};

//delete

const deleteDoc = async (req, res) => {
  try {
    const deleted = await Document.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(201).json({ message: "Document deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error while deleting document to db", error });
  }
};

module.exports = { createDoc, fetchDoc, updateDoc, deleteDoc };
