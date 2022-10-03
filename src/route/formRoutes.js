//const FormController = require( "../controllers/formController");
const routes = require("express").Router();
const formController = require("../controllers/formController")


routes.get("/formGet",formController.formGet);
routes.get("/formId/:id", formController.formId);
routes.post("/formPost", formController.formPost);
routes.patch("/formPatch/:id", formController.formPatch)
routes.delete("/formDelete/:id", formController.formDelete);


module.exports = routes;