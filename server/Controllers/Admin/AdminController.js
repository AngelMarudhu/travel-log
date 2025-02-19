import travelLogSchema from "../../Models/travelLogSchema.js";
import userSchema from "../../Models/UserSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const travelers = await userSchema
      .find({ role: "traveler" })
      .select("-password");
    res.status(200).json(travelers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
