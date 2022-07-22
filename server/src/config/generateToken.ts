import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";
export const generateToken = (id: any) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

// module.exports = generateToken;
