import express from "express";
import users from "../MOCK_DATA.json" with  { type: "json" };

const app = express();

const PORT = 5000;

//routes

// 1. get /users  get/api/users

app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>   
    `;
    return res.send(html)
});

app.get("/api/users",(req,res)=>{
    return res.json(users)
})

// 2. get /api/users/:id  dynamic path parameter

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    // console.log(typeof(id));// this is a string so convert it to  number data typer
    const user = users.find((user)=>user.id=== id)
    return res.json(user)
})


app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
