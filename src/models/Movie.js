import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    trailers: {
      type: [String],
      required: true,
    },
    companyLogos: {
      type: [String],
      required: true,
    },
    movieLogo: {
      type: String,
      required: true,
    },
    Logo: {
      type: [String],
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    genreNames: {
      type: [String],
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
