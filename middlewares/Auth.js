const User = require("../models/userModel");
const { promisify } = require("util");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");

//Authentication middlewares
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  //get Authorization key from the header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler("Please Login to access this page", 401));
  }
  //Will give error if either the token is invalid or it is expired
  const decodedData = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  let currentUser = await User.findById(decodedData.id);
  if (!currentUser) {
    return next(
      new ErrorHandler(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
