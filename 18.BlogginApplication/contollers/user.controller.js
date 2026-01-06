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
    const token = await User.matchPasswordAndGenerateToken(email, password);
    if (!token) {
      return res.status(401).render("signin", {
        error: "Invalid email or password",
      });
    }
    return res
      .cookie("Token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .redirect("/");
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("Token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.redirect("/");
};
