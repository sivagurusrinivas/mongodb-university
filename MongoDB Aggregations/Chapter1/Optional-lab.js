//mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc

var pipeline = [
  {
    $match: {
      writers: {
        $exists: true,
        $type:"array"
      },
    },
  },
  {
    $project: {
      title: 1,
      cast: 1,
      directors: 1,
      writers: {
        $map: {
          input: "$writers",
          as: "writer",
          in: {
            $arrayElemAt: [{ $split: ["$$writer", " ("] }, 0],
          },
        },
      },
    },
  },
  // {
  //   $match: {
  //     "writers": { $type: "string" },
  //   },
  // },
    {
  $project:{
    "labor of love":{ $setIntersection:["writers", "cast", "directors"]},
  }
    },

  //   {
  //       $match:{
  //           $expr:{
  //               $gt:[{$size:["labor of love"]},1]
  //           }
  //       }
  //   }
];

db.movies.find({ cast: { type: "string" } });
db.movies.find({ writers: { type: "string" } });
db.movies.find({ directors: { type: "string" } });

D.W.Griffith;
db.movies
  .find({ directors: { $in: ["D.W. Griffith"] } }, { directors: 1, writers: 1 })
  .pretty();
