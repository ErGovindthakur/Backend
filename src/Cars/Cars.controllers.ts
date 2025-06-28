import CarsModels from "./Cars.models";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";


// 1. Get all the cars
export const getAllCars = async(req:AuthRequest,res:Response) => {
     try{
          const cars = await CarsModels.find().populate("createdBy","name");
          res.status(200).json({
               success:true,
               data:cars
          })
     }
     catch(err){
          res.status(500).json({
               success:false,
               message:err instanceof Error ? err.message : "Car not found"
          })
     }
}

// 2. create single car

export const createCar = async(req:AuthRequest,res:Response) => {
     try{
          const {
               name,brand,color,price
          } = req.body;

          if(!name || !brand || !color || !price){
               return res.status(400).json({
                    success:false,
                    message:"All fields are required"
               })
          }
          const car = await CarsModels.create({
               name,
               brand,
               color,
               price,
               createdBy:req.user?._id
          })
     }
     catch(err){
          res.status(500).json({
               success:false,
               message:err instanceof Error ? err.message : "Car can't create"
          })
     }
}

// 3. update car by id
export const updateCar = async (req: AuthRequest, res: Response) => {
     try{
          const car = await CarsModels.findById(req.params.id);
        
          if (!car) return res.status(404).json({ message: "Car not found" });

          if (car.createdBy.toString() !== req?.user._id.toString())
            return res.status(403).json({ message: "Unauthorized" });
        
          car.name = req.body.name || car.name;
          car.brand = req.body.brand || car.brand;
          car.color = req.body.color || car.color;
          car.price = req.body.price || car.price;

          const updatedCar = await car.save();
          res.json(updatedCar);
     }
     catch(err){
           res.status(500).json({
               success:false,
               message:err instanceof Error ? err.message : "Unable to update"
          })
     }
}


// 4. Delete car by id
export const deleteCar = async (req: AuthRequest, res: Response) => {
     try{

          const car = await CarsModels.findById(req.params.id);

          if (!car) return res.status(404).json({ message: "Car not found" });

          if (car.createdBy.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Unauthorized" });
        
          await car.deleteOne();
          res.json({ message: "Car deleted" });
     }
     catch(err){
           res.status(500).json({
               success:false,
               message:err instanceof Error ? err.message : "Unable to delete"
          })
     }
};