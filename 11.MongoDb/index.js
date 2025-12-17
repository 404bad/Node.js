import express, { json } from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

//routes
app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});

    if (allUsers.length === 0) {
      return res.send("<h3>No users found!</h3>");
    }
    const html = `
    <ul>
        ${allUsers
          .map((user) => `<li>${user.firstName} ${user.lastName || ""}</li>`)
          .join(" ")}
    </ul>
  `;
    res.send(html);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await User.find({});

    if (allUsers.length === 0) {
      return res.status(200).json({ allUsers });
    }
    return res.status(200).json({ allUsers });
  } catch (error) {
    return res.status(500).json({ message: "Failed : Internal server error" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;
    if (
      !body ||
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.gender ||
      !body.jobTitle
    ) {
      return res
        .status(400)
        .json({ message: "Bad Request:All fields are required" });
    }
    const userObject = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    });
    return res.status(201).json({ message: "Success", userObject });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates }, // update only the provided fields
      { new: true, runValidators: true } // return updated doc & validate fields
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "Success : Deleted " });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//connection
async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nodelearn");
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection error:", error);
  }
}
startServer();

// mongoose
//   .connect("mongodb://127.0.0.1:27017/nodelearn")
//   .then(() => {
//     console.log("DB connected successfully");
//     app.listen(PORT, () => {
//       console.log(`Server is running at port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("DB error", err);
//   });
