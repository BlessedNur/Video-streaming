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

// Define sub-schema for company logos
const CompanyLogoSchema = new Schema({
  name: String,
  logo_path: String
});

// Define sub-schema for director
const DirectorSchema = new Schema({
  adult: Boolean,
  gender: Number,
  id: Number,
  known_for_department: String,
  name: String,
  original_name: String,
  popularity: Number,
  profile_path: String,
  credit_id: String,
  department: String,
  job: String
});


const watchlistSchema = new Schema(
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
      type: [CastSchema],
      required: true,
    },
    trailers: {
      type: [TrailerSchema],
      required: true,
    },
    companyLogos: {
      type: [CompanyLogoSchema],
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
      type: DirectorSchema,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.WatchList || mongoose.model("WatchList", watchlistSchema);
