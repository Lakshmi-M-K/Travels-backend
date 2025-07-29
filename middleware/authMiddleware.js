import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user; // ✅ This makes req.user.username available in controller
    next();
  } catch (error) {
    console.error("JWT error occurred:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

const verifyUser = (req, res, next) => {
  const userId = req.user?._id?.toString();
  const paramsId = req.params.id;
  const role = req.user?.role;

  if (paramsId === userId || role === "admin") {
    next();
  } else {
    res.status(401).json({ success: false, message: "You're not Authorized" });
  }
};

const verifyAdmin = (req, res, next) => {
  const role = req.user?.role;
  if (role === "admin") {
    next();
  } else {
    res.status(401).json({ success: false, message: "You're not Authorized" });
  }
};

export { verifyToken, verifyAdmin, verifyUser };
