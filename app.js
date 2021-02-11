// const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Meme = require('./models/meme');
const memeRoutes = require('./routes/memeRoutes');
const methodOverride = require("method-override");
// express app
const app=express();
app.use(methodOverride("_method"));
//connect to mongodb
const dbURI = 'mongodb+srv://abhishekagrawal:Sarita@79@cluster0.l3y2w.mongodb.net/myfirst?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log());



// register view engine
app.set('view engine','ejs');
// app.set('views', 'myviews')
//middleware ans static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// mongoose and mongo sendbox routes
app.get('/add-meme', (req,res)=>{
   const meme = new Meme({
       title: 'new meme 2',
       snippet: 'about my new meme',
       body: 'url of new meme'
   });
   meme.save()
     .then((result)=>{
         res.send(result);
     })
     .catch((err)=>{
         console.log(err);
     });
});
app.get('/all-memes', (req,res)=>{
    Meme.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/single-meme',(req,res)=>{
    Meme.findById('601fbf45973f271d18b32b21')
      .then((result)=>{
          res.send(result)
      })
      .catch((err)=>{
          console,log(err);
      });
});


// middleware
// app.use((req,res,next)=>{
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ',req.method);
//     next();
// });

app.get('/',(req,res)=>{
    //automatically   set content header
    // res.send('<p>home page</p>');
    // res.sendFile('./views/index.html', {root: __dirname });
    res.redirect('/memes');
});
//*middleware
// app.use((req,res,next)=>{
//     console.log('in the next middleware');
//     next();
// });


app.get('/about',(req,res)=>{
    // res.send('<p>home page</p>');
    // res.sendFile('./views/about.html', {root: __dirname });
    res.render('about',{ title: 'About' });
});




// blog routes
app.use(memeRoutes);
//

// 404 page
app.use((req,res)=>{
    res.status(404).render('404',{ title: '404' });
});
