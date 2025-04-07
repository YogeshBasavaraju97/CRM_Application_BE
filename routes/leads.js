const express = require('express');
const Lead = require('../models/Lead');
const userAuth = require('../middleware/auth');

const leadRoutes = express.Router();

leadRoutes.post("/create/lead", userAuth, async (req, res) => {


  try {
    const { _id } = req.user;
    const { name, emailId, phoneNumber, address } = req.body;

    const newLead = await new Lead({
      name,
      emailId,
      phoneNumber,
      address,
      telecaller: _id
    });

    await newLead.save();
    res.status(200).json({ message: "lead added successfully" });

  } catch (error) {
    res.status(400).json({ message: "lead did not saved", error: error });
  }

});


leadRoutes.patch("/update/lead/:id", userAuth, async (req, res) => {

  try {
    const { address } = req.body;
    const _id = req.params.id;
    console.log(address);

    console.log(_id);

    const lead = await Lead.findByIdAndUpdate(
      _id,
      { $set: { address: address } },
      { new: true }
    );
    console.log(lead);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.status(200).json({ message: "lead added successfully", lead });

  } catch (error) {
    res.status(400).json({ message: "lead did not saved", error: error });
  }
});

leadRoutes.get("/retrieve/leads", userAuth, async (req, res) => {

  try {
    const leads = await Lead.find();
    res.status(200).json({ message: "lead added successfully", leads });

  } catch (error) {
    res.status(400).json({ error: error });

  }

});


leadRoutes.delete("/delete/:id", userAuth, async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const lead = await Lead.findByIdAndDelete(_id);
    console.log(lead);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.status(200).json({ message: "lead delete successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});


leadRoutes.patch("/update/status/:id", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { status, response } = req.body;
    const leadId = req.params.id;
    console.log(status, response);

    console.log(_id);

    const lead = await Lead.findByIdAndUpdate(
      leadId,
      { $set: { status: status, response: response, telecaller: _id } },
      { new: true }
    );


    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.status(200).json({ message: "status added successfully", lead });

  } catch (error) {
    res.status(400).json({ error: error });
  }
});



module.exports = leadRoutes;
