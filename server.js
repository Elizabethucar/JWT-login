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

}]
app.get("/", (req, res) => {
  res.send(userInfo)
})
app.post("/login", (req, res) => {
 const username = req.body.name
 const user ={ name : username }

 const accessToken= jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
 res.json({accessToken : accessToken})
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});