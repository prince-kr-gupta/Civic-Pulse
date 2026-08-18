const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    issueId: {
      type: String,
      unique: true,
      index: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2000
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Road",
        "Garbage",
        "Streetlight",
        "Water Supply",
        "Drainage",
        "Electricity",
        "Other"
      ],
      index: true
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
      index: true
    },
    status: {
      type: String,
      enum: [
        "Reported",
        "Pending",
        "Verified",
        "Assigned",
        "In Progress",
        "Resolved",
        "Closed"
      ],
      default: "Reported",
      index: true
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    coordinates: {
      lat: { type: Number, min: -90, max: 90 },
      lng: { type: Number, min: -180, max: 180 }
    },
    reportedBy: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "Citizen"
    },
    assignedTo: {
      type: String,
      trim: true,
      maxlength: 120
    },
    evidence: {
      name: String,
      type: String,
      size: Number
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

issueSchema.pre("validate", function (next) {
  if (!this.issueId) {
    this.issueId = `CIVIC-${Date.now().toString().slice(-6)}-${Math.floor(
      Math.random() * 900 + 100
    )}`;
  }
  next();
});

module.exports = mongoose.model("Issue", issueSchema);
