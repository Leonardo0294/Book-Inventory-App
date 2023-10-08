import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    biography: String,
  },
  {
    timestamps: true, 
    versionKey: false, 
  }
);

const author = mongoose.model("Author", authorSchema);

export default author;
