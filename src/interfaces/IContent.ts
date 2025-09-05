export interface Icontent extends Document {
  id: number;
  type: "document" | "tweet" | "youtube" | "link";
  link: string;
  title: string;
  tags: string[];
}
