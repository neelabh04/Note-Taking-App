import Note from "../models/note.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNewNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if ([title, content].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Title and Content are required");
  }

  if (!title) {
    throw new ApiError(400, "Title is required");
  }
  const currentUser = await User.findByPk(req.user.id);
  if(!currentUser) {
    throw new ApiError(500, "User does not exist.");
  }

  const newNote = await Note.create({
    title: title,
    content: content,
    user_id: req.user.id,
  });

  const createdNote = await Note.findByPk(newNote.id, {
    attributes: { exclude: ["id", "user_id"] },
  });
  if (!createdNote) {
    throw new ApiError(500, "Something went wrong while creating the note");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdNote, "Note created successfully"));
});

const getAllNotes = asyncHandler(async (req, res) => {
  const currentUser = await User.findByPk(req.user.id);
  if(!currentUser) {
    throw new ApiError(500, "User does not exist.");
  }

  const userNotes = await Note.findAll({
    where: {
      user_id: req.user.id,
    },
    attributes: {
      exclude: ["user_id"],
    },
  });

  if (!userNotes) {
    throw new ApiError(500, "Something went wrong while getting all the notes");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userNotes, "Notes showing successfully"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id) {
    throw new ApiError(400, "Note id does not exist");
  }

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const currentUser = await User.findByPk(req.user.id);
  if(!currentUser) {
    throw new ApiError(500, "User does not exist.");
  }

  const updatedNote = await Note.update(
    { title: title, content: content },
    { where: { id: id } }
  );

  if (!updatedNote) {
    throw new ApiError(500, "Something went wrong while updating all the note");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Notes updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const currentUser = await User.findByPk(req.user.id);
  if(!currentUser) {
    throw new ApiError(500, "User does not exist.");
  }

  const targetNote = await Note.findByPk(id);
  if (!targetNote) {
    throw new ApiError(500, "Note does not exist.");
  }

  const deletedNote = await Note.destroy({ where: { id: id } });
  return res
    .status(200)
    .json(new ApiResponse(200, deletedNote, "Note deleted successfully"));
});

export { createNewNote, getAllNotes, updateNote, deleteNote };
