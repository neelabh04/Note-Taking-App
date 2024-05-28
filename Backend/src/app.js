// import packages
import express from "express";
import { sequelize } from "./db/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from 'dotenv'


// routes import
import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
import User from "./models/user.model.js";
import Note from "./models/note.model.js";

const app = express();

dotenv.config({
  path: '../../.env'
})

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}))
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));


// synchronize and define associations
sequelize.sync({ force: true }).then(() => {
  console.log("All tables are re(created)");
});

User.hasMany(Note, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "notes",
});

Note.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user",
});

//routes declaration
app.use("/api/v1", userRouter);
app.use("/api/v1/notes", noteRouter);

export { app };
