var pipeline = [{
    $project:{
        "movieNameArray":{
            $split:["$title"," "]
        }
    }
},
    {$match:{
   "movieNameArray":{ $size:1}
}}]


//Official Answers involves a type check which I didn't do, answers were correct but it is always good to type check.

db.movies.aggregate([
    {
      $match: {
        title: {
          $type: "string"
        }
      }
    },
    {
      $project: {
        title: { $split: ["$title", " "] },
        _id: 0
      }
    },
    {
      $match: {
        title: { $size: 1 }
      }
    }
  ]).itcount()