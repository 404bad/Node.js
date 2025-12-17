import User from "../models/user.model.js";

export const handleGetAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    if (allUsers.length === 0) {
      return res.status(200).json({ allUsers });
    }
    return res.status(200).json({ allUsers });
  } catch (error) {
    return res.status(500).json({ message: "Failed : Internal server error" });
  }
};

export const handleGetUserById = async (req, res) => {
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
};
export const handleCreateUser = async (req, res) => {
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
};

export const updateUserById = async (req, res) => {
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
};

export const handleDeleteById = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "Success : Deleted " });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
