require("dotenv").config();
const { check, validationResult } = require("express-validator");
const { MongoClient } = require("mongodb");

const express = require("express");
const cors = require("cors");
const VaccinesController = require("./controllers/VaccinesController");
const PricesController = require("./controllers/PricesController");
const PatientsController = require("./controllers/PatientsController");
const AuthController = require("./controllers/AuthController");
const EmployeesController = require("./controllers/EmployeesController");
const OldPatientsController = require("./controllers/oldPatientsController")

const { mongoose } = require("mongoose");

const checkAuth = require('./utils/checkAuth')


const PORT = process.env.PORT || 5005;

const app = express();

//MiddleWare
app.use(cors()); //Відправляти запити на сервер з різних ip адрес
app.use(express.json()); //з react дані приходять у форматі json

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://doc:backdoc@cluster0.bxc7cmu.mongodb.net/?retryWrites=true&w=majority');
    app.listen(PORT, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.log(err);
  }
};
start();

//routes
app.get("/vaccines", VaccinesController.getVaccines);

app.post("/vaccines", VaccinesController.addVaccine);

app.delete("/vaccines/:id", VaccinesController.removeVaccine);

app.put("/vaccines/:id", VaccinesController.editVaccine);

app.get("/prices", PricesController.getPrices);

app.post("/prices", PricesController.addPrice);

app.delete("/prices/:id", PricesController.removePrice);

app.put("/prices/:id", PricesController.editPrice);

app.get("/patients", PatientsController.getPatients);

app.get("/statistics/orders", PatientsController.getPatients);

app.get("/statistics/customers", OldPatientsController.getOldPatients);

app.get("/statistics/employees", EmployeesController.getEmployees);

app.post("/oldpatient", OldPatientsController.addOldPatient);



app.post("/patients", PatientsController.addPatient);
// app.post("/allPatients", PatientsController.addPatient);

app.delete("/patients/:id", PatientsController.removePatient);

app.post(
  "/auth/registration",
  [
    check("username", "Логін має бути не менше 4 символів").isLength({
      min: 4,
      max: 20,
    }),
    check("password", "Пароль має бути не менше 4 символів").isLength({
      min: 4,
      max: 20,
    }),
  ],
  AuthController.registration
);

app.post("/auth/login", AuthController.login);

app.get("/auth/me", checkAuth, AuthController.getMe)

// app.listen(PORT,() => { 
// })
