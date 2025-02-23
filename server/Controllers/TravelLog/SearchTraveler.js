import travelLogSchema from "../../Models/travelLogSchema.js";

export const searchByLocation = async (req, res) => {
  try {
    const location = req.query;
    // console.log(location);
    const searchLogs = await travelLogSchema.find(location);
    if (searchLogs.length === 0) {
      return res.status(400).json({ message: "No logs found" });
    }
    res.status(200).json({ searchLogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
