require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
// const rawData = fs.readFileSync('./users.json', 'utf8');
const userinfo = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
const multer = require('multer');
const path = require('path');

const app = express();
app.use('/uploadimg', express.static('vidi'));
app.use(express.json());


var storage_img = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, 'vidi');
  },
  filename : function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var storage_video = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, 'videos');
  },
  filename : function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const video_upload = multer ( {storage: storage_video} );
const img_upload = multer({ storage: storage_img }); 

app.use(bodyParser.json());
app.use('/show_imgs', express.static('vidi'))
app.listen('5000', () => {
  console.log("server has started.");
});


app.post('/uploadvideo', video_upload.single('video-file'), (req, res, next) => {
  const file = req.file;
  const videoname = req.body.videoname;
  const folder = req.body.folder;
  const subfolder = req.body.subfolder;

  
})
app.post('/uploadimg', img_upload.single('img-file'), (req, res, next) => {
  const file = req.file;
  
 let dupfn = require(`./jsons/${req.body.username}/data.js`).find(i => i.foldername === req.body.folderName);
 if(dupfn != undefined) {
  console.log("dupfn.folderName");
  fs.unlinkSync(__dirname + `/vidi/${file.filename}`)
  return res.status(405).send('Folder name already exists')
 }

  if(!file) {
    if(req.body.imgUrl === "") {
      return  res.status(401).send('No image passed.')
    }
    let dup = require(`./jsons/${req.body.username}/data.js`).find(i => i.img === req.body.imgUrl);
    if(dup != undefined) {
      return res.status(402).send('Image url already exists, try changing the url.');
    }
    require(`${__dirname}/jsons/${req.body.username}/data.js`).push({'foldername' : req.body.folderName, img : req.body.imgUrl});
    fs.mkdir(`${__dirname}/jsons/${req.body.username}/${req.body.folderName}`, {recursive : true}, (err) =>{
      if (err) console.log(err)
        else {
          console.log("done")
        }
    } )
    // console.log( require(`./jsons/${req.body.username}/data.js`));
    return res.json({"success" : true})
  }
  let dup3 = require(`./jsons/${req.body.username}/data.js`).find(i => i.img === `/vidi/${file.filename}`);
  if(dup3 != undefined) {
    return res.status(403).send('Image with same name exists');
  }
  
  require(`${__dirname}/jsons/${req.body.username}/data.js`).push({'foldername' : req.body.folderName,'img' : `/vidi/${file.filename}`});
  // console.log(require(`./jsons/${req.body.username}/data.js`))
  // console.log( require(`./jsons/${req.body.username}/data.js`));

  fs.mkdir(`${__dirname}/jsons/${req.body.username}/${req.body.folderName}`, {recursive : true}, (err) =>{
    
    if (err) console.log(err)
      else {
        console.log("done")
      }
  } )

  res.json({"filename" : file.filename});
})

app.post('/videos', (req, res) => {
  let user = req.body.user;
  console.log(user)
  let folder = req.body.folder;
  let subfolder = req.body.subfolder;
  console.log(req.body)
  console.log("videos madhe aala")
    let obj = require(`${__dirname}/jsons/${req.body.user}/${req.body.folder}/vid-locs.js`).find((s) => s.subfolder === subfolder);
    let details = obj.details;
    console.log(details);
    if(details != undefined && details != null) {
      res.json(details)
    }
    
})
app.post('/createsf', (req, res) => {
  // console.log(req.body)
  console.log("ala")
  if(fs.existsSync(`${__dirname}/jsons/${req.body.username}/${req.body.folder}/${req.body.subfolder}`)) {
    return res.sendStatus(420);
  }
  fs.mkdir(`${__dirname}/jsons/${req.body.username}/${req.body.folder}/${req.body.subfolder}`, {recursive:true}, (err) => {if (err) return res.sendStatus(400)});
  return res.json({"success" : "true"});
})

app.post('/subfolders', (req, res) => {
  // console.log(req.body)
  let user = req.body.user;
  console.log(user)
  let folder = req.body.folder;
  res.json(require(`${__dirname}/jsons/${user}/${folder}/subfolders.js`));
  // console.log(req.body)
})

app.post

app.get('/vidi/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'vidi', req.params.filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(404); 
    }
  });
});
app.get('/videos/:filename' , (req, res) => {
  const filepath = path.join(__dirname, 'videos', req.params.filename);
  res.sendFile(filepath, (err) => {
    if(err) {
      console.log(error);
      res.sendStatus(404)
    }  
  })
 
})






app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = userinfo.find(u => u.username === username);
  if (!user) {
    return res.status(400).send("Cannot find user.");
  }
  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log("Login successful");
      const accessToken = jwt.sign(user, process.env.SECRET_KEY);
      res.json({"accesstoken" : accessToken})
    } else {
      res.status(401).send("Invalid credentials.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

app.post('/checkTok', (req, res) => {
  // console.log(req.body)
  let tempToken = req.body.accesstoken;
  if(tempToken == null) return res.sendStatus(401)
  jwt.verify(tempToken, process.env.SECRET_KEY, (err, user) => {
    if(err) return res.sendStatus(403)

    res.json(require(`./jsons/${req.body.username}/data.js`))
  })
})
