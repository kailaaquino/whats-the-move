"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var activity_svc_exports = {};
__export(activity_svc_exports, {
  default: () => activity_svc_default
});
module.exports = __toCommonJS(activity_svc_exports);
var import_mongoose = require("mongoose");
const ActivitySchema = new import_mongoose.Schema(
  {
    activityName: { type: String, required: true },
    location: { type: String, required: true },
    notes: { type: String, required: false }
  },
  { collection: "activities" }
);
const ActivityModel = (0, import_mongoose.model)("Activity", ActivitySchema);
function index() {
  return ActivityModel.find();
}
function get(id) {
  return ActivityModel.findById(id).exec();
}
function create(data) {
  const a = new ActivityModel(data);
  return a.save();
}
function update(id, data) {
  return ActivityModel.findByIdAndUpdate(id, data, { new: true }).exec().then((updated) => {
    if (!updated) throw new Error(`${id} not updated`);
    return updated;
  });
}
function remove(id) {
  return ActivityModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw new Error(`${id} not deleted`);
  });
}
var activity_svc_default = { index, get, create, update, remove };
