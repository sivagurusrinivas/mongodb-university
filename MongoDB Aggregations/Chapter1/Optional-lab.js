//mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc

var pipeline = [
  {
    $match: {
      writers: {
        $elemMatch: { $exists: true },
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

  {
    $project: {
      labor_of_love: { $setIntersection: ["$writers", "$cast", "$directors"] },
    },
  },
  {
    $match: {
      $expr: { $isArray: "$labor_of_love" },
    },
  },
  {
    $match: {
      $expr: {
        $gt: [{ $size: "$labor_of_love" }, 0],
      },
    },
  }
];
