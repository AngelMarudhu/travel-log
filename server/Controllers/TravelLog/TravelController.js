import travelLogSchema from "../../Models/travelLogSchema.js";
import userSchema from "../../Models/UserSchema.js";

export const createTravelLog = async (req, res) => {
  try {
    const { title, description, location, cost, date, placesToVisit, images } =
      req.body;

    // console.log(req.body, "controller");
    /// we got array of places to visit so we need to parse it to array
    const parsedPlacesToVisit = JSON.parse(placesToVisit);
    const userId = req.user._id;

    // console.log(req.files.length);
    const newTravelLog = await travelLogSchema.create({
      title,
      description,
      location,
      cost,
      date,
      placesToVisit: parsedPlacesToVisit,
      images,
      user: userId,
    });

    res
      .status(201)
      .json({ message: "Travel log created successfully", newTravelLog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTravelLog = async (req, res) => {
  try {
    const page = parseInt(req.params.id) || 1;

    const limit = 10;

    //// skip is used to skip the last 10 items and get the next 10 items
    const skip = (page - 1) * limit;

    const travelLogs = await travelLogSchema
      .find()
      .skip(skip)
      .limit(10)
      .populate("user", "name");

    const totalCount = await travelLogSchema.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      travelLogs,
      currentPage: page,
      totalPages,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTravelLog = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, location, cost, date, placesToVisit } =
      req.body;

    // console.log(req.body);

    const userId = req.user._id.toString();
    const travelLog = await travelLogSchema.findById(id);

    if (!travelLog) {
      return res.status(404).json({ message: "travel log not found" });
    }

    if (travelLog.user.toString() !== userId) {
      return res
        .status(402)
        .json({ message: "you are not the owner of this travel log" });
    }

    const updatedTravelLog = await travelLogSchema.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        cost,
        date,
        placesToVisit,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "travel log updated successfully", updatedTravelLog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTravelLog = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user._id.toString();
    const travelLog = await travelLogSchema.findById(id);

    if (!travelLog) {
      return res.status(404).json({ message: "travel log not found" });
    }

    if (travelLog.user.toString() !== userId) {
      return res
        .status(402)
        .json({ message: "you are not the owner of this travel log" });
    }

    await travelLogSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "travel log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTravelLogById = async (req, res) => {
  try {
    const id = req.user._id.toString();

    // console.log(id);

    const yourTravelLogs = await travelLogSchema.find({ user: id });

    if (!yourTravelLogs) {
      return res.status(404).json({ message: "travel log not found" });
    }

    res.status(200).json({ yourTravelLogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
