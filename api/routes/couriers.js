var express = require('express');
const {verifyToken, Roles} = require("../verification");
var router = express.Router();
module.exports = router;
var { courier } = require('../models');
router.get("/", verifyToken([Roles.MANAGER]) ,async(req,res) => {
    try {
        const couriers = await courier.findAll();
        let dt = [];
        couriers.forEach((cr) => {
            const data = {
                IdCourier: cr.IdCourier,
                Name: cr.Name,
                Surname: cr.Surname,
                EmploymentDate: cr.EmploymentDate,
                CourierStatus: cr.CourierStatus,
                IsActive: cr.IsActive
            }
            dt.push(data)
        })
        for (let i = 0; i < 10; i++) {
            const data = {
                IdCourier: `FabicatedData${i}`,
                Name: `FabicatedData${i}`,
                Surname: `FabicatedData${i}`,
                EmploymentDate: `FabicatedData${i}`,
                CourierStatus: `FabicatedData${i}`,
                IsActive: false
            }
            dt.push(data)
        }
        res.status(200).json(dt);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
    }

})