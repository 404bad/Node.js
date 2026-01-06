import JWT from "jsonwebtoken";

const secret = "iamdon";

export const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImgUrl: user.profileImage,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);

  return token;
};

export const validateToken = (token) => {
  const payload = JWT.verify(token, secret);
  return payload;
};
