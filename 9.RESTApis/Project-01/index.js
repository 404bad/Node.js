import express from "express";
import fs from "fs";
import path from "path";

const app = express();

const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// read JSON file
const dataPath = path.resolve("../MOCK_DATA.json");
const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

//routes

// 1. get /users  get/api/users
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>   
    `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

// 2. get /api/users/:id  dynamic path parameter
// app

//3. post /api/users
app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);
  const newUser = {
    id: users.length + 1,
    ...body,
  };
  users.push(newUser);
  fs.writeFile(dataPath, JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to save user" });
    }
    res.status(201).json(newUser);
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    // console.log(typeof(id));// this is a string so convert it to  number data typer
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    users[userIndex] = {
      ...users[userIndex],
      ...body,
    };
    //   console.log(userIndex.id);
    fs.writeFile(dataPath, JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to update user" });
      }
      return res.json(users[userIndex]);
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    // get index of the user
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // remove the user from array
    const deletedUser = users.splice(userIndex, 1);

    // write updated array to JSON file
    fs.writeFile(dataPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to delete the user" });
      }
      return res.json({
        message: "User deleted successfully",
        user: deletedUser[0],
      });
    });
  });

//4. patch /api/users/:id
// app

//4. delete /api/users/:id
// app

//listen the server on port
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
