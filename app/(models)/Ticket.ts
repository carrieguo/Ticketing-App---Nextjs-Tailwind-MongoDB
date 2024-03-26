import { connect } from "http2";
import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGODB_URI||'');
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    // _id: { type: String, required: true },
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  { timestamps: true }
);
const Ticket = mongoose.models.Ticket||mongoose.model("Ticket",ticketSchema)

export default Ticket