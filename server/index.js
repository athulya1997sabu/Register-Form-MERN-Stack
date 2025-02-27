const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then(user => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Password is incurrect");
      }
    } else {
      res.json("No record Existed");
    }
  });
});
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
