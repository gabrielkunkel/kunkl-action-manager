import mongoose from "mongoose"

const Schema = new mongoose.Schema({
  user: { type: String, ref: "User", required: true },
  text: String,
  complete: { type: Boolean, default: false },
  parents: [{ type: String, ref: "Action"}],
  children: [{ type: String, ref: "Action"}],
  twins:[{ type: String, ref: "Action"}]
}, {
  timestamps: true,
})

export default mongoose.model("Action", Schema)
