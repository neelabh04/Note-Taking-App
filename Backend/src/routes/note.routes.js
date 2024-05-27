import { Router } from "express";
import { createNewNote, updateNote, getAllNotes, deleteNote } from "../controllers/note.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// secured routes
router.route("/").post(verifyJWT, createNewNote)
router.route("/").get(verifyJWT, getAllNotes)
router.route("/:id").put(verifyJWT, updateNote)
router.route("/:id").delete(verifyJWT, deleteNote)

export default router;