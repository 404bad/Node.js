import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
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
export default router;
