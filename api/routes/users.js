var express = require('express');
var router = express.Router();
var { client, user, courier, menager } = require('../models');
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
var { secretKey } = require('../config/config')
const {verifyToken, Roles} = require("../verification");

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}


router.post('/auth', async function(req, res, next) {
    try {
        const { Login, Password } = req.body;
        const usr = await user.findOne({ where: { Login: Login }});

        if(usr === null) res.status(404).json({ error: "User not found!"});
        else bcrypt.compare(Password, usr.Password, async (err, result) => {
            if (err || !result)
                return res.status(401).json({error: 'Wrong password!'});
            else {
                const token = jwt.sign({
                    login: usr.Login,
                    role: usr.Role
                }, secretKey, {expiresIn: '30m'});

                res.json({token});
            }
        })


    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
    }

});

router.post('/register', async (req,res,next) => {
    try {
        const { Login, Password, Name, Surname, Email, Phone} = req.body;
        const usr = await user.findOne({ where: { Login: Login }});
        if(usr !== null) res.status(400).json({error: "userExistsNotification"});
        else if(Login.length < 3 || Login.length > 20) res.status(400).json({error: "correctLoginNotification"});
        else if(Password.length < 3 || Password.length > 20) res.status(400).json({error: "correctPasswordNotification"});
        else if(Name.length < 3 || Name.length > 20) res.status(400).json({error: "correctNameNotification"});
        else if(Surname.length < 3 || Surname.length > 20) res.status(400).json({error: "correctSurnameNotification"});
        else {
            const hashedPasswd = await hashPassword(Password);
            const newUser = await user.create({
                Login: Login,
                Password: hashedPasswd,
                Role: Roles.CLIENT
            })
            client.create({
                IdUser: newUser.IdUser,
                Name: Name,
                Surname: Surname,
                Email: Email,
                Phone: Phone
            })
            res.status(200).json({message: "User added successfully!"});
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
    }
})

router.get('/verify', verifyToken(), async(req,res) => {
    res.json({verification: true});
})

router.get('/:login', verifyToken([Roles.CLIENT,Roles.COURIER,Roles.MANAGER]), async function(req, res) {
    try {
        const login = req.params.login;
        const usr = await user.findOne({where: {Login: login}});
        let detailedusr;
        if (usr.Role === Roles.CLIENT) {
            detailedusr = await client.findOne({where: {IdUser: usr.IdUser}});
            res.json({
                id: detailedusr.IdClient,
                name: detailedusr.Name,
                surname: detailedusr.Surname,
                email: detailedusr.Email,
                phone: detailedusr.Phone
            })
        } else if (usr.Role === Roles.COURIER) {
            detailedusr = await courier.findOne({where: {IdUser: usr.IdUser}});
            res.json({
                id: detailedusr.IdCourier,
                name: detailedusr.Name,
                surname: detailedusr.Surname,
                employmentDate: detailedusr.EmploymentDate,
                courierStatus: detailedusr.CourierStatus
            })
        } else if (usr.Role === Roles.MANAGER) {
            detailedusr = await menager.findOne({where: {IdUser: usr.IdUser}});
            res.json({
                id: detailedusr.IdMenager,
                name: detailedusr.Name,
                surname: detailedusr.Surname,
                employmentDate: detailedusr.EmploymentDate
            })
        } else {
            res.status(500).json({error: "Internal Server Error"});
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
    }

})

router.post("/modify", verifyToken([Roles.CLIENT,Roles.COURIER,Roles.MANAGER]), async function(req, res, next) {
    const {id, role, name, surname, phone, email} = req.body;
    if(role === Roles.CLIENT) {
        const usr = await client.findByPk(id);
        await usr.update({
            IdClient: usr.IdClient,
            IdUser: usr.IdUser,
            Name: name,
            Surname: surname,
            Email: email,
            Phone: phone
        })
        res.status(200).json({message: "modificationSuccessful"})
    }
    else if(role === Roles.COURIER) {
        const usr = await courier.findByPk(id);
        await usr.update({
            IdCourier: usr.IdCourier,
            IdUser: usr.IdUser,
            Name: name,
            Surname: surname
        })
        res.status(200).json({message: "modificationSuccessful"})
    }
    else if(role === Roles.MANAGER) {
        const usr = await menager.findByPk(id);
        await usr.update({
            IdManager: usr.IdMenager,
            IdUser: usr.IdUser,
            Name: name,
            Surname: surname
        })
        res.status(200).json({message: "modificationSuccessful"})
    }
    else {
        res.status(304);
        res.send();
    }
})



module.exports = router;