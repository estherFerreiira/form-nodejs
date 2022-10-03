const yup = require("yup");
const parserPhoneNumber = require("libphonenumber-js");
const {cpf, cnpj} = require ("cpf-cnpj-validator");
const formModel = require ("../models/formModel");


    
    
   const formGet = async(req,res)=>{
     const form = await formModel.find();
     if (!form) return res.status(204).json({ 'message': 'No forms found.' });
    res.json(form);
    }
    const formId = async(req, res)=>{
        try {
            const {id} = req.params;
            const form = await formModel.findById(id);
            if (!form) {
                return res.status.json(404);
            }
           return res.status(200).json(form);
        } catch (error) {
            return res.status(500).json({message: "Object not found"});
        }
    }
    
    const formPost = async(req, res)=>{
        const {
            name,
            email,
            mobile,
            document,
            city,
            state,
            zipCode,
            address,
            neighborhood
        } = req.body
    
        const schema = yup.object({
            name: yup.string().required().min(3),
            email: yup.string().required().email(),
            mobile: yup.string().required().test(
                "is-valid-mobile",
                "${path} is not a mobile number",(value)=>
                parserPhoneNumber(value, "BR").isValid()
            ),
            document: yup.string().required().test(
                "is-valid-document",
                "${path} is not a valid CPF / CNPJ", (value)=>
                    cpf.isValid(value) || cnpj.isValid(value)
            ),
            city: yup.string().required(),
            state: yup.string().required(),
            zipCode: yup.string().required(),
            address: yup.string().required(),
            neighborhood: yup.string().required()
    
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                erro: "Error on validade schema"
            })
        }
      const newForm = new formModel({
        name,
        email,
        mobile,
        document,
        city,
        state,
        zipCode,
        address,
        neighborhood

       })
        try{
          await newForm.save();
          return res.status(200).json(newForm);
        } catch (error){
          return res.status(500).json(error);
        }
    }

const formPatch = async(req, res)=>{
   const id = req.params.id
   
     const {
            name,
            email,
            mobile,
            document,
            city,
            state,
            zipCode,
            address,
            neighborhood
   } = req.body

   const form  = {
            name,
            email,
            mobile,
            document,
            city,
            state,
            zipCode,
            address,
            neighborhood
   }
   try{
    const updatedPerson = await formModel.updateOne({_id : id}, form)
    
    if(updatedPerson.matchedCount === 0){
        res.status(422).json({message: "Usuário não encontrado"})
        return
    }
    res.status(200).json(form)

} catch(error){
    res.status(500).json({error: error})
}
}


const formDelete = async(req, res)=>{
    try {
        const {id} = req.params;
        const form = await formModel.findByIdAndDelete(id);
        if (!form) {
            return res.status.json(404);
        }
       return res.status(200).json(form);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {formGet, formId,formPost,formPatch,formDelete}


/*{
    "name": "Akira de SOuza",
    "email": "akia@gmail.com",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "30860330",
    "address": "rua caitite",
    "mobile": "553199199881",
    "neighborhood": "Moema"
} */