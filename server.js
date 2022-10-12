require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

app.use(express.json());


const userInfo = [{
  name: "Lizzy",
  email: "liz@liz.com"
},
{
  name: "Sara",
  email: "sar@sar.com"

}];
app.get("/", authenticateToken,(req, res) => {
  res.send(userInfo.filter(user => user.name === req.user.name))
  console.log(req.body)
});
app.post("/login",  (req, res) => {
  const username = req.body.name
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next();
  })
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});