import jwt from "jsonwebtoken";

const authMiddlewareuser = (req, res, next) => {
  try {
    // step 1 :-
    const authheader = req.headers.authorization;

    // step 2 :- check token
    if (!authheader) {
      return res.status(401).json({
        success: false,
        message: "Token is not avilable",
      });
    }

    console.log(authheader)

    // step3 :- get token only
    const token = authheader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not avilable",
      });
    }

    // step 5 :- varify token
    const decode = jwt.verify(token, process.env.JWT_SECRETUser);

    // step 6 :- store  user information
    let user = decode;

    // step 7 :- attach user information
    req.user = user;

    // continue
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddlewareuser;
