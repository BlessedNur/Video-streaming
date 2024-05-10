import mongoose, { Schema } from "mongoose";

const seriesSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    first_air_date: {
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
    networkLogos: {
      type: [String],
      required: true,
    },
    Logo: {
      type: [String],
      required: true,
    },
    seasonDetails: {
      type: String,
      required: true,
    },

    number_of_seasons: {
      type: String,
      required: true,
    },
    number_of_episodes: {
      type: String,
      required: true,
    },
    episode_run_time: {
      type: [String],
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
    creator: {
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

export default mongoose.models.Series || mongoose.model("Series", seriesSchema);
