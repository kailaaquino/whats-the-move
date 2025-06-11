import { Schema, model } from "mongoose";
import { Activity } from "../models/activity";

const ActivitySchema = new Schema<Activity>(
  {
    activityName: { type: String, required: true },
    location: { type: String, required: true },
    notes: { type: String, required: false },
  },
  { collection: "activities" }
);

const ActivityModel = model<Activity>("Activity", ActivitySchema);

function index(): Promise<Activity[]> {
  return ActivityModel.find();
}

function get(id: string): Promise<Activity | null> {
  return ActivityModel.findById(id).exec();
}

function create(data: Activity): Promise<Activity> {
  const a = new ActivityModel(data);
  return a.save();
}

function update(id: string, data: Activity): Promise<Activity> {
  return ActivityModel.findByIdAndUpdate(id, data, { new: true })
    .exec()
    .then((updated) => {
      if (!updated) throw new Error(`${id} not updated`);
      return updated;
    });
}

function remove(id: string): Promise<void> {
  return ActivityModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw new Error(`${id} not deleted`);
  });
}

export default { index, get, create, update, remove };
