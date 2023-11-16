const express = require("express");
const router = express.Router();
const {
    getAllJobs,
  getSpecificUserJob,
  createNewJob,
  updateJob,
  deleteJob,
} = require('../controller/job');

router.use(express.json());

// router.get("/", );

// router.get("/specificUserJob", );

// router.post("/", );

// router.patch("/:id", );


// router.delete("/:id", );

router.route('/').get(getAllJobs).post(createNewJob);
router.route('/:id').patch(updateJob).delete(deleteJob);
router.route('/specificUserJob').get(getSpecificUserJob);

module.exports = router;
