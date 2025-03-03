import express from "express";

import {
  createTravelLog,
  deleteTravelLog,
  getCommentTravelLog,
  getTravelLog,
  getTravelLogById,
  getTrendingPlaces,
  updateTravelLog,
} from "../Controllers/TravelLog/TravelController.js";
import { searchByLocation } from "../Controllers/TravelLog/SearchTraveler.js";

export const travelerRouter = express.Router();

travelerRouter.post("/log", createTravelLog);

travelerRouter.get("/get-travel-logs/:id", getTravelLog);

travelerRouter.put("/update-travel-log/:id", updateTravelLog);

travelerRouter.delete("/delete-travel-log/:id", deleteTravelLog);

travelerRouter.get("/get-user-travel-logs", getTravelLogById);

travelerRouter.get("/search-log-by-location", searchByLocation);

travelerRouter.get("/get-trending-logs", getTrendingPlaces);

travelerRouter.get("/get-comment-travel-log/:id", getCommentTravelLog);
