const Course = require('../../connection').Course
const Batch = require('../../connection').Batch
const Lecture = require('../../connection').Lecture
const Teacher = require('../../connection').Teacher
const Student = require('../../connection').Student
const route = require('express').Router()


route.get('/', (req,res) => {
    Course.findAll()
        .then((course) => {
            res.status(200).send(course)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Courses"
            })
        })
})


route.get('/:id', (req,res) => {
   Course.findOne({
    where: {
        id:req.params.id
      }
   })
        .then((course) => {
            res.status(200).send(course)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Course"
            })
        })
})

route.get('/:id/batches', (req,res) => {
    Batch.findAll({
     where: {
         courseId:req.params.id
       }
    })
         .then((batch) => {
             res.status(200).send(batch)
         })
         .catch( (err) => {
             res.status(500).send({
                 error: "Could not retrive Batches corresponding to courses"
             })
         })
 })

 route.get('/:id/batches/:bid', (req,res) => {
    Batch.findAll({
     where: {
         courseId:req.params.id,
         id:req.params.bid
       }
    })
         .then((batch) => {
             res.status(200).send(batch)
         })
         .catch( (err) => {
             res.status(500).send({
                 error: "Could not retrive Batches corresponding to courses"
             })
         })
 })

 route.get("/:courseId/batches/:batchId/students", (req, res) => {
      let courseId = parseInt(req.params.courseId);
      let batchId = parseInt(req.params.batchId);
  
      if (isNaN(courseId)) {
        return res.status(403).send({
          error: "Course Id is not a valid number"
        });
      }
  
      if (isNaN(batchId)) {
        return res.status(403).send({
          error: "Batch Id is not a valid number"
        });
      }
  
      Batch.findAll({
        where: {
          id: batchId,
          courseId: courseId
        },
  
        include: [{ model: Student }]
      }).then(studentBatches => {
        res.status(200).send(studentBatches);
      });
    }
  );
  

  route.get("/:courseId/batches/:batchId/teachers", (req, res) => {
    let courseId = parseInt(req.params.courseId);
    let batchId = parseInt(req.params.batchId);

    if (isNaN(courseId)) {
      return res.status(403).send({
        error: "Course Id is not a valid number"
      });
    }

    if (isNaN(batchId)) {
      return res.status(403).send({
        error: "Batch Id is not a valid number"
      });
    }

    Batch.findAll({
      where: {
        id: batchId,
        courseId: courseId
      },

      include: [{ model: Teacher }]
    }).then(teacherBatches => {
      res.status(200).send(teacherBatches);
    });
  }
);

 route.get('/:id/batches/:bid/lectures', (req,res) => {
     Batch.findAll({
         where:{
            courseId:req.params.id,
            batchId:req.params.bid,  
         }
     }).then((batch) => {
                            console.log("Batch Found")
                        })
                        .catch( (err) => {
                            res.status(500).send({
                                error: "Could not retrive  Batches"
                            })
                        })


            Lecture.findAll({
                where:{
                    batchId:req.params.bid
                }
            }).then((lecture)=>{
                res.status(200).send(lecture)
            }).catch((err)=>{
                res.status(500).send({
                    error: "Could not retrive Lecture"
                }) 
            })

 })


route.post('/', (req,res) => {
   Course.create({
        name:req.body.name,
    }).then((course)=>{
        if (course) {
            res.status(200).send(course)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})

route.delete('/:id',(req,res)=>{
   Course.destroy({
     where: {
         id:req.params.id
       }
    }) .then(() => {
          res.sendStatus(200)
      }).catch(error=>{
        res.sendStatus(400)
         
     })  
})

route.put('/:id',(req,res)=>{
   Course.update(
         {name:req.body.name},
        {
            where:{
                id:req.params.id
                  }
        }) .then(() => {
        res.sendStatus(201)
    }).catch(error=>{
      res.sendStatus(400)   
   })   
})

exports = module.exports = route 