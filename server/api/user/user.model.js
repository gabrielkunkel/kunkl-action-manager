import mongoose from "mongoose"
import config from "../../config"

const roles = config.userRoles

const UserSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  picture: String,
  master_action: { type: String, ref: "Action" },
  role: { type: String, default: "guest", enum: roles },
}, {
  timestamps: true,
})

export default mongoose.model("User", UserSchema)
