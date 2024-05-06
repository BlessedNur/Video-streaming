import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    adult: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    original_language: {
      type: String,
      required: true,
    },
    original_title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    vote_average: {
      type: String,
      required: true,
    },
    vote_count: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
