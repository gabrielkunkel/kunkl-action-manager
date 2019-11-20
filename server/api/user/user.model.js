import mongoose from "mongoose"
import config from "../config"

const roles = config.userRoles

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: String,
  role: { type: String, default: "guest", enum: roles, },
}, {
  timestamps: true,
})

export default mongoose.model("User", UserSchema)
