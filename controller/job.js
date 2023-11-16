const JobListing = require("../models/jobs");


const getAllJobs = async (req, res) => {
  try {
    const job = await JobListing.find({});
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecificUserJob = async (req, res) => {
  try {
    // const { params: {id: AllJobscreatedByAUser} } = req;
    // // console.log(AllJobscreatedByAUser);
    console.log(req.user);
    const job = await JobListing.find({ createdBy: req.user.userId });
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNewJob = async (req, res) => {
  try {
    const job = await JobListing.create(req.body);
    // res.json({ msg: "New job created", job });
    res.status(200).json({ msg: "New job created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const {
      body: {
        Title,
        Description,
        Company,
        Location,
        Salary,
        Requirements,
        Responsibilities,
      },
      params: { id: jobId },
    } = req;

    const job = await JobListing.findByIdAndUpdate(
      { _id: jobId, createdBy: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
        return res.status(400).json({error: `Job with this id: ${jobId} does not exist`});
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const {
      params: { id: jobId },
    } = req;

    const job = await JobListing.findByIdAndDelete({
      _id: jobId,
      createdBy: req.user.userId,
    });
    console.log(job);
     if (!job) {
        return res.status(400).json({error: `Job with this id: ${jobId} does not exist`});
     }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllJobs,
  getSpecificUserJob,
  createNewJob,
  updateJob,
  deleteJob,
};
