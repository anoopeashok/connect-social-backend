const Profile = require('../models/profile_model')

const findMutualContacts = async (user) => {
      const pipeline = [
        {
          $match: {
            phone: user.phone,
          },
        },
        {
          $project: {
            contacts: 1,
          },
        },
        {
          $lookup: {
            from: "profiles", // Replace with the actual collection name
            localField: "contacts",
            foreignField: "phone",
            as: "matchedUsers",
          },
        },
        {
          $addFields: {
            matchedUsersWithYourPhoneNumber: {
              $filter: {
                input: "$matchedUsers",
                as: "user",
                cond: { $in: [user.phone, "$$user.contacts"] },
              },
            },
          },
        },
        {
          $project: {
            "matchedUsersWithYourPhoneNumber._id": 1,
            "matchedUsersWithYourPhoneNumber.name": 1,
            "matchedUsersWithYourPhoneNumber.phone": 1,
            "matchedUsersWithYourPhoneNumber.picture": 1,
          },
        },
      ];

    const profiles = await Profile.aggregate(pipeline).exec();
    return profiles[0]["matchedUsersWithYourPhoneNumber"];
}

module.exports = findMutualContacts