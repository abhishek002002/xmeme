const express = require('express');
const Meme = require('../models/meme');


const router = express.Router();

router.get('/memes',async (req,res)=>{
    Meme.find().sort({createdAt: -1})
     .then((result)=>{
        // res.json({ article: result.toJSON() })
        res.render('index',{ title: 'All memes', memes: result })
     })
     .catch((err)=>{
         console.log(err);
     })
    // try {
    //   const memers = await Meme.find().sort({createdAt: -1})
    //   // res.json(memers)
    //   // res.redirect('/memes')
    //   res.render('index',{ title: 'All memes' })
    // } catch(err){
    //   res.status(500).json({ message:err.message })
    // }
    
});





// router.post('/memes', (req,res)=>{
//     const meme = new Meme(req.body);
//     // console.log(meme);
//     meme.save()
//       .then((result)=>{
//           res.redirect('/memes');
//       })
//       .catch((err)=>{
//           console.log(err);
//       })
//  })

router.get('/memes/create',(req,res)=>{
    res.render('create',{ title: 'Create a new meme' });
});
router.get('/memes/edit/:title/:id',(req,res)=>{
  const tokan = req.params.id;
  const tokan1 = req.params.title;3
  res.render('editt',{ title: 'Edit a new meme', id : tokan ,title : tokan1});
});
router.post('/memes', (req, res, next) => {
    const { body } = req;
  
    if(!body.title) {
      return res.status(422).json({
        errors: {
          title: 'is required',
        },
      });
    }
  
    if(!body.snippet) {
      return res.status(422).json({
        errors: {
          author: 'is required',
        },
      });
    }
  
  
    if(!body.body) {
      return res.status(422).json({
        errors: {
          body: 'is required',
        },
      });
    }
    console.log(body);
    const finalMeme = new Meme(body);
    return finalMeme.save()
      .then(() =>{
        res.json({ article: finalMeme.toJSON() })
        res.redirect('/memes');
      })
      .catch(next);
  });

 router.get('/memes/:id', (req,res)=>{
    const id = req.params.id;
    // console.log(id);
    Meme.findById(id)
     .then((result)=>{
         res.render('details', { title: 'Meme Details', meme: result });
        //  console.log('lll');
     })
     .catch((err)=>{
        //  console.log('bhkk bsdk');
         console.log(err);
     });
});
// router.delete('/memes/:id', (req,res)=>{
//     const id = req.params.id;

//     Meme.findByIdAndDelete(id)
//      .then((result)=>{
//          res.json({ redirect: '/memes' }); 
//          console.log('lllll');
//       })
//       .catch((err)=>{
//           console.log(err);
//       });

// });
// router.delete('/memes/:id', (req, res, next) => {
//     return Meme.findByIdAndRemove(id)
//       .then(() => res.sendStatus(200))
//       .catch(next);
//});
router.post('/memes/edit/:id', (req, res, next) => {
  const { body } = req;
  Meme.findByIdAndUpdate(req.params.id)
   .then((result)=>{
     console.log('start');
     if(body.title) {
      console.log(body.title);
      result.title = body.title;
     }
  
     if(body.snippet) {
      console.log(body.snippet);
      result.snippet = body.snippet;
     }
  
     if(body.body) {
      console.log(body.body);
      result.body = body.body;
     }
     console.log(result);
     result.save();
     res.redirect('/memes');
   })
   .catch((err)=>{
     consolelog(err);
   })
});

router.delete("/memes/:id",function(req,res){
  console.log('WORKING');
  Meme.findByIdAndRemove(req.params.id,(err)=>{
      if(err) res.redirect("/");
      else res.redirect("/memes");
  })
})
router.delete("/memes/edit/:id",function(req,res){
  console.log('WORKING');
  Meme.findByIdAndRemove(req.params.id,(err)=>{
      if(err) res.redirect("/");
      else res.redirect("/memes");
  })
})

// router.put("/memes/:id",(req,res)=>{
//   Meme.findByIdAndUpdate(req.params.id,{req.meme.name,req.body.caption,req.body.image},(err,meme)=>{
//       if(err) console.log(err);
//       else res.redirect(`/memes/${meme._id}`);
//   })
// })
 module.exports = router;