import mongoose, { Schema } from "mongoose";

// Define sub-schema for cast
const CastSchema = new Schema({
  name: String,
  character: String,
  profile_path: String
});

// Define sub-schema for trailers
const TrailerSchema = new Schema({
  iso_639_1: String,
  iso_3166_1: String,
  name: String,
  key: String,
  site: String,
  size: Number,
  type: String,
  official: Boolean,
  published_at: Date,
  id: String
});

// Define sub-schema for network logos
const NetworkLogoSchema = new Schema({
  name: String,
  logo_path: String
});

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
      type: [CastSchema],
      required: true,
    },
    trailers: {
      type: [TrailerSchema],
      required: true,
    },
    networkLogos: {
      type: [NetworkLogoSchema],
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
