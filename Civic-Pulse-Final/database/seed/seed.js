require("dotenv").config({
  path: require("path").join(__dirname, "../../backend/.env")
});

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Issue = require("../../backend/src/models/issue");
const User = require("../../backend/src/models/User");
const issuesData = require("./issue.json");

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing.");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  await Issue.deleteMany({});
  await User.deleteMany({});

  await Issue.insertMany(issuesData);

  const [citizenHash, authorityHash] = await Promise.all([
    bcrypt.hash("Citizen@123", 12),
    bcrypt.hash("Authority@123", 12)
  ]);

  await User.create([
    {
      name: "Demo Citizen",
      email: "citizen@civicpulse.local",
      passwordHash: citizenHash,
      role: "citizen"
    },
    {
      name: "Demo Authority",
      email: "authority@civicpulse.local",
      passwordHash: authorityHash,
      role: "authority"
    }
  ]);

  console.log("Database seeded successfully.");
  console.log("Citizen: citizen@civicpulse.local / Citizen@123");
  console.log("Authority: authority@civicpulse.local / Authority@123");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
