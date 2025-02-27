import express from "express";
import {Staff} from "../model/Staff";
import {getAllStaff, getStaffNames, StaffAdd, StaffDelete, StaffUpdate} from "../database/Staff-data-store";

const router =express.Router();
//save
router.post('/add',async (req,res,next)=>{
    console.log(req.body);

    const staff: Staff= req.body;
    Number(staff.fieldId);
    try{
        const addedStaff = await StaffAdd(staff);
        res.send('staff Added !')
    }catch(err){
        console.log("error adding staff", err);
        res.status(400).send("error adding staff");
    }
});

//update
router.put('/update/:firstName',async (req,res,next)=>{
    const firstName: string = req.params.firstName;
    const staff : Staff = req.body;
    Number(staff.fieldId)

    try{
        await StaffUpdate(firstName, staff);
        res.send('Staff Updated !');
        console.log("staff updated");

    }catch(err){
        console.log("error updating staff", err);
    }
});

//delete
router.delete('/delete/:firstName', async (req, res) => {
    const firstName = req.params.firstName;

    try {
        const deleteResult = await StaffDelete(firstName);
        res.send("Staff delete success!");
    } catch (err) {
        console.error("Error deleting staff:", err);
        res.status(400).json({ error: "Error deleting staff" });
    }
});

//View
router.get('/view',async (req,res,next)=>{
    try{
        const staff=  await getAllStaff();
        res.json(staff);
    }catch(err){
        console.log("error getting staff", err);
    }
});

//Staff Names

router.get('/staffNames', async (req, res, next) => {
    try {
        const staffNames = await getStaffNames();
        res.json(staffNames);
    } catch (err) {
        console.error("Error getting staff names", err);
    }
});


export default router;