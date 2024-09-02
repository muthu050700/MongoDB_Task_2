//1) Find all the topics and tasks which are thought in the month of October

// To find topics thought in the month of October

db.topics.find({ date: { $regex: "2023-10" } });

// To find tasks thought in the month of October

db.tasks.find({ date: { $regex: "2023-10" } });

//2)Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find({ date: { $gt: "2020-10-15", $lt: "2020-10-31" } });

//3) Find all the company drives and students who are appeared for the placement.

db.company_drives.aggregate([
  {
    $project: {
      company: 1,
      present: 1,
    },
  },
]);

//4) Find the number of problems solved by the user in codekata

db.codecata
  .aggregate([
    {
      $group: {
        _id: "$name",
        totalProblemsSolved: {
          $sum: {
            $add: [
              "$array",
              "$mathematics",
              "$strings",
              "$looping",
              "$numbers",
            ],
          },
        },
      },
    },
    {
      $project: {
        name: "$_id",
        totalProblemsSolved: 1,
        _id: 0,
      },
    },
  ])
  .sort({ name: 1 });

//5)Find all the mentors with who has the mentee's count more than 15

db.mentors.find({ students: { $gt: 15 } });

//6)Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

//users absent
db.users.find({
  absent: false,
});

//not submitted between 15 oct-2020 and 31-oct-2020
db.tasks.find({
  isSubmitted: false,
  date: { $gt: "2023-10-15", $lt: "2023-10-31" },
});
