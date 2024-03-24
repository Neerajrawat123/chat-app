import { User } from "../modals/user.modal";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.auth.header["authorization"] || req.body.token;
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
