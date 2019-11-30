import mongoose from "mongoose"

const Schema = new mongoose.Schema({
  _id: String,
  user: { type: String, ref: "User", required: true },
  text: String,
  complete: { type: Boolean, default: false },
  parent_actions: [{ type: String, ref: "Action", default: [] }],
  child_actions: [{ type: String, ref: "Action", default: [] }],
  twin_actions:[{ type: String, ref: "Action", default: [] }]
}, {
  timestamps: true,
})

export default mongoose.model("Action", Schema);
