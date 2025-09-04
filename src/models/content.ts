import mongoose, { Document, Model } from "mongoose";

export interface Icontent extends Document {
  id: number;
  type: "document" | "tweet" | "youtube" | "link";
  link: string;
  title: string;
  tags: string[];
}

const contentSchema = new mongoose.Schema<Icontent>({
  id: { type: Number, required: true },
  type: {
    type: String,
    enum: ["document", "tweet", "youtube", "link"],
    required: true,
  },
  link: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: [String] },
});

const Content: Model<Icontent> = mongoose.model<Icontent>(
  "Content",
  contentSchema
);
export default Content;
