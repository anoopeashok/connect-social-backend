const Invitation = require("../models/invitation_model");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const acceptInvitation = async (req, res) => {
  const { user, params } = req;
  const invitation = await Invitation.findById(params.id);
  if (invitation) {
    throw new CustomError.BadRequest("Invitation not found");
  }
  if (invitation.profile != user.profile) {
    throw new CustomError.Forbidden("Operation not allowed");
  }
  invitation.requestAccepted = "accepted";
  await invitation.save();

  res.status(StatusCodes.OK).json({ msg: "success", invitation });
};

const rejectInvitation = async (req, res) => {
  const { user, params } = req;
  const invitation = await Invitation.findById(params.id);
  if (invitation) {
    throw new CustomError.BadRequest("Invitation not found");
  }
  if (invitation.profile != user.profile) {
    throw new CustomError.Forbidden("Operation not allowed");
  }
  invitation.requestAccepted = "rejected";
  await invitation.save();

  res.status(StatusCodes.OK).json({ msg: "success", invitation });
}

const deleteInvitation = async (req, res) => {
  const { user, params } = req;
  const invitation = await Invitation.findOneAndDelete({
    _id: params.id,
    sentBy: user.profile,
  });
  if (!invitation) {
    throw new CustomError.NotFound("Invitation not found");
  }
  res.status(StatusCodes.OK).json({ msg: "success" });
}

const myInvitations = async (req, res) => {
    const { sort } = req.query;
    const { user } = req.body;
    const queryObject = { profile: user.profile };
    const query = Invitation.find(queryObject);
    if (sort == "oldest") {
      query = query.sort("createdAt");
    } else {
      query = query.sort("-createdAt");
    }
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const invitations = await query;
    const totalInvitations = await Invitation.countDocuments(queryObject);
    const numPage = Math.ceil(totalInvitations / limit);

    res.status(StatusCodes.OK).json({ msg: "success", invitations, numPage });
}

module.exports = { acceptInvitation, rejectInvitation, deleteInvitation,myInvitations };
