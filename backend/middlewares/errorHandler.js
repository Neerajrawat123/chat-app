import { ApiError } from "../utils/customError.js";

export function errorHandling(err, req, res, next) {
  console.log("this is a error", err);
  if (!(err instanceof ApiError)) {
    res
      .status(500)
      .json({ message: "internal server error please try again letter" });
  } else {
    const customError = err;
    res.status(customError.statusCode).json({ msg: customError.message });
  }
}
