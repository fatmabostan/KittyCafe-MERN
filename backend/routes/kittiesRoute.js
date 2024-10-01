import { Kitty } from "../models/kittyModel.js";
import express from "express";

const router = express.Router();


router.post("/", async (req, res) =>{
    try{
        if(!req.body.description){
            return res.status(400).send({
                message: "Lütfen açıklama girin, açıklama girilmesi zorunludur!"
            })
        }
        const newKitty={
            breed: req.body.breed,
            description: req.body.description,
            age: req.body.age,
            personality: req.body.personality,
            color: req.body.color,
            gender: req.body.gender,
            imgUrl: req.body.imgUrl,
            adoptionStatus: req.body.adoptionStatus,
            vaccinated: req.body.healthStatus.vaccinated,
            spayedOrNeutered: req.body.healthStatus.spayedOrNeutered,
            healthNotes: req.body.healthStatus.healthNotes,
            lastVetVisit: req.body.lastVetVisit,
            Location: req.body.Location,
    }
    const kitty = await Kitty.create(newKitty);
    return res.status(201).send(kitty);

}
    catch(err){
        res.status(500).send({ message: `Bir şeyler yanlış gitti! \n ${err.message}`});
    }
})

router.get("/", async(req, res) => {
    try{ 
        const kitties = await Kitty.find();
        return res.status(200).json({
            count: kitties.length, 
            data: kitties
        });
    }
    catch(err){
        res.status(500).send(
        { message: `Bir şeyler yanlış gitti! ${err.message}`}
    )
    }
});

router.get("/:id", async (req, res) => {
    try{ 
        const { id } = req.params;
        const kitty = await Kitty.findById(id);
        return res.status(200).json({
            data: kitty
        });
        
    }
    catch(err){
        res.status(500).send(
        { message: `Bir şeyler yanlış gitti! ${err.message}`}
    )
    }
});

router.put("/:id", async (req, res) => {
    try{   if(!req.body.description){
            return res.status(400).send({
            message: "Lütfen açıklama girin, açıklama girilmesi zorunludur!"
        })
    }
        const { id } = req.params;
        const result = await Kitty.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({
                message: " This kitty is not found!"
            })
        }
        return res.status(200).send({
            message: "Kitty informations updated successfully!"
        })
    }
    catch(err){
        res.status(500).send(
        { message: `Bir şeyler yanlış gitti! ${err.message}`}
    )
    }
});

router.delete("/:id", async (req, res) => {
    try{  
        const { id } = req.params;
        const result = await Kitty.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({
                message: " This kitty is not found!"
            })
        }
        return res.status(200).send({
            message: "Kitty informations deleted successfully!"
        })
    }
    catch(err){
        res.status(500).send(
        { message: `Bir şeyler yanlış gitti! ${err.message}`}
    )
    }
});

export default router;