async function readMessages(req, res) {
  const { messagesId } = req.body;

  try {
    const updateResult = await Message.updateMany(
      { _id: { $in: messagesId } },
      { $addToSet: { readBy: { $each: messagesId } } },
    );

    if (updateResult.modifiedCount === 0) {
      console.log("No messages found to mark as read");
      return res.status(404).json(new ApiResponse(404, "No messages found"));
    }

    console.log(`${updateResult.modifiedCount} messages marked as read`);
    return res
      .status(200)
      .json(new ApiResponse(200, "Messages marked as read"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, "Internal server error"));
  }
}
