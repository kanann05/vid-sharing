require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userinfo = require('./userinfo.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use('/uploadimg', express.static('vidi'));

var storage_img = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, 'vidi');
  },
  filename : function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const img_upload = multer({ storage: storage_img }); 

app.use(bodyParser.json());
app.use('/show_imgs', express.static('vidi'))
app.listen('5000', () => {
  console.log("server has started.");
});



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
    require(`./jsons/${req.body.username}/data.js`).push({'folderName' : req.body.folderName, img : req.body.imgUrl});
  }
  let dup3 = require(`./jsons/${req.body.username}/data.js`).find(i => i.img === `/vidi/${file.filename}`);
  if(dup3 != undefined) {
    return res.status(403).send('Image with same name exists');
  }
  
  require(`./jsons/${req.body.username}/data.js`).push({'folderName' : req.body.folderName,'img' : `/vidi/${file.filename}`});
  console.log(require(`./jsons/${req.body.username}/data.js`))

  res.json({"filename" : file.filename});
})

app.get('/vidi/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'vidi', req.params.filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(404); 
    }
  });
});



async function init() {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("leopard", salt);
    userinfo.push({ username: "admin", password: hashedPassword });
    // console.log(userinfo);
  } catch (err) {
    console.error(err);
  }
}
init();








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
