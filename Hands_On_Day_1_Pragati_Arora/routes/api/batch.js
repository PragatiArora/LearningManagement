const Batch = require('../../connection').Batch
const route = require('express').Router()


route.get('/', (req,res) => {
    Batch.findAll()
        .then( (batch) => {
            res.status(200).send(batch)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Batches"
            })
        })
})


route.get('/:id', (req,res) => {
   Batch.findOne({
    where: {
        id:req.params.id
      }
   })
        .then( (batch) => {
            res.status(200).send(batch)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Batch"
            })
        })
})

route.post('/', (req,res) => {
  Batch.create({
        name:req.body.name,
        courseId:req.body.courseId,
    }).then((batch)=>{
        if (batch) {
            res.status(200).send(batch)
        }
    }).catch(error=>{
        res.status(400).send(error)
    })  
})

route.delete('/:id',(req,res)=>{
    Batch.destroy({
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
    Batch.update(
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