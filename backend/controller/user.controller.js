import { Message } from "../modals/message.modal.js";
import { User } from "../modals/user.modal.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/customError.js";
import bcryptjs from "bcryptjs";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};

async function register(req, res) {
  const { name, email, password } = req.body;

  const isAnyEmpty = [name, email, password].some(
    (field) => field?.trim() === "",
  );

  if (isAnyEmpty) {
    res.status(301).json({ msg: "all field should be filled" });
  }
  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    email,
    password,
    name: name.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        "User logged In Successfully",
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
      ),
    );
};

const getUsers = async (req, res) => {
  const {id} = req.params
  let users = await User.find({_id:{$ne:id}});
  if (!users) {
    throw new ApiError(401, "cannot find users");
  }
  return res.status(200).json(new ApiResponse(200, "all users", users));
};


const getMessages = async (req, res) => {
  const {id} = req.params
  // let messages = await Message.find({$or: [{
  //   reciever:id
  // },{sender: id}]});
  let messages = await Message.find({$or:[
    {sender:id},
    {reciever: id}
  ]})
  if (!messages) {
    throw new ApiError(401, "cannot find users");
  }
  return res.status(200).json(new ApiResponse(200, "all messages", messages));
};

export { register, loginUser, getUsers , getMessages};
