var pipeline = [{
    $match:{
        "imdb.rating":{
            $gte:7
        },
        "genres":{
            $nin:['Crime','Horror']
        },
        "rated": {$in:['PG','G']},
        "languages": { $all: ['English','Japanese']} 
    }
}]

//https://university.mongodb.com/mercury/M121/2021_June_29/chapter/Chapter_1_Basic_Aggregation_-_match_and_project/lesson/5970d8b78cf2c5580eef7d8b/lecture