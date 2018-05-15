const Student = require('../../connection').Student
const route = require('express').Router()


route.get('/', (req,res) => {
    Student.findAll()
        .then( (stu) => {
            res.status(200).send(stu)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Students"
            })
        })
})


route.get('/:id', (req,res) => {
   Student.findOne({
    where: {
        id:req.params.id
      }
   })
        .then( (stu) => {
            res.status(200).send(stu)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Students"
            })
        })
})

route.get("/:id/batches", (req, res) => {
    Batch.findAll({
      where: {
        
      },
      include: [{ model: Student }]
    }).then(studentBatches => {
      res.status(200).send(studentBatches);
    });
  }
);

route.post('/', (req,res) => {
   Student.create({
        name:req.body.name,
    }).then((stu)=>{
        if (stu) {
            res.status(200).send(stu)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})

route.delete('/:id',(req,res)=>{
    Student.destroy({
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
    Student.update(
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