import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

//middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Gets the token

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); //validates the token and return the associated payload

    const user = await User.findById(decodedToken.userId).select("-password"); //find the user based on that payload

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    req.user = user; //attaches the authenticated user's data to req.user so that the controllers/routes can use them
    next(); //passes the control to next middleare(if any)
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
