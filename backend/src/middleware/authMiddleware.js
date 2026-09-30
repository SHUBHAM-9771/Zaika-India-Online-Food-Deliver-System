import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  try {
    console.log("========== AUTH MIDDLEWARE ==========");
    console.log("1️⃣ Middleware Started");
    // step 1 get token from frontend
    const authheader = req.headers.authorization;

    console.log("2️⃣ Authorization Header:", authheader);

    // Step 2: Check token exists
    if (!authheader) {
      console.log("❌ Authorization header missing");

      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    // step 3 : get only token
    const token = authheader.split(" ")[1];

    console.log("3️⃣ Token Received:", token);

    // step 4 : verify token and secret key
    console.log("4️⃣ Verifying Token...");

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("5️⃣ Token Verified");
    console.log("6️⃣ Decoded Token:", decode);

    // step 5 : store decode infomation
    let user = decode;

    // step 6 : controller and middleware
    req.user = user;
    console.log("7️⃣ req.user:", req.user);
    console.log("8️⃣ User ID:", req.user.id);
    console.log("9️⃣ User Email:", req.user.email);
    console.log("🔟 User Role:", req.user.role);

    // step 7 : once verify then execute controller and middleware
    console.log("✅ Auth Middleware Passed");
    console.log("====================================");

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default AuthMiddleware;
