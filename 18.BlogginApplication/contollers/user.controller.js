import User from "../models/user.model.js";

export const signupController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // basic validation
    if (!fullName || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    // create user (password hashing handled by schema middleware)
    await User.create({
      fullName,
      email,
      password,
    });

    // redirect after successful signup
    return res.redirect("/");
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const user = await User.matchPassword(email, password);
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    return res.redirect("/");
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
