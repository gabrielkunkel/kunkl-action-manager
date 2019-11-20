import mongoose from "mongoose"

const Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: String,
  complete: { type: Boolean, default: false },
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Action"}],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Action"}],
  twins:[{ type: mongoose.Schema.Types.ObjectId, ref: "Action"}]
}, {
  timestamps: true,
})

export default mongoose.model("Action", Schema)
