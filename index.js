const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;

const { users } = require("./state");
let usersCount = users.length;

app.use(bodyParser.json());

/* BEGIN - create routes here */
app.get("/users", (req, res) => {
  return res.json(users);
});

/* END - create routes here */
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId - 1;
  console.log(userId);
  return res.json(users[userId]);
});

app.post("/users", function (req, res) {
  console.log("post", req.body);
  usersCount++;
  let newUsers = req.body;
  newUsers.id = usersCount;
  users.push(newUsers);
  console.log(newUsers);
  return res.json(users);
});

app.put("/users/:userId", (req, res) => {
  const userId = req.params.userId - 1;
  let user = users[userId];
  let updatedUser = req.body;
  users[userId] = { ...user, ...updatedUser };
  // user.name = "userName";
  return res.json(users[userId]);
});

// * DELETE /users/1
// * Give your server the ability to respond
// to a DELETE request with a path "/users/1" and remove the first item from the users array.
//  Use `res.send()` to send back a messsage, "deleted"

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId - 1;
  users.splice(userId, 1);
  console.log(users);
  return res.send("deleted");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
