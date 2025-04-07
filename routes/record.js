const express = require("express");
const User = require("../models/User");
const userAuth = require("../middleware/auth");
const Lead = require("../models/Lead");

const recordRoute = express.Router();



recordRoute.get("/admin/key-metrics", userAuth, async (req, res) => {
  try {
    const totalTeleCallers = await User.countDocuments({ role: "telecaller" });
    const totalCallMade = await Lead.countDocuments({ status: "connected" });
    const totalCustomer = await Lead.countDocuments();
    res.status(200).json({ totalTeleCallers: totalTeleCallers, totalCallMade: totalCallMade, totalCustomer: totalCustomer });

  } catch (error) {
    res.status(400).json(error);

  }
});


recordRoute.get("/admin/call-records", userAuth, async (req, res) => {
  try {
    const callRecords = await Lead.find({ status: "connected" })
      .sort({ updatedAt: -1 })
      .populate('telecaller', 'name');
    res.status(200).json({ callRecords });

  } catch (error) {
    res.status(400).json(error);
  }
});

recordRoute.get("/admin/recent-activity", userAuth, async (req, res) => {
  try {
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const newLeads = await Lead.find({ createdAt: { $gte: lastWeek } }).sort({ createdAt: -1 });

    res.status(200).json({ newLeads });

  } catch (error) {
    res.status(400).json(error);
  }
});

recordRoute.get("/admin/call-trends", userAuth, async (req, res) => {
  try {
    const trends = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({ trends });

  } catch (error) {
    res.status(400).json(error);
  }
});


module.exports = recordRoute;