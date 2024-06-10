const express = require('express');
const router = express.Router();
const { Eco } = require('../models');
const { Op } = require("sequelize");
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required()
    });
    try {
        data = await validationSchema.validate(data, { abortEarly: false });
        let result = await Eco.create(data);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Op.or] = [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } }
        ];
    }

    let list = await Eco.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let eco = await Eco.findByPk(id);
    // Check id not found
    if (!eco) {
        res.sendStatus(404);
        return;
    }
    res.json(eco);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let eco = await Eco.findByPk(id);
    if (!eco) {
        res.sendStatus(404);
        return;
    }

    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(100),
        description: yup.string().trim().min(3).max(500)
    });
    try {
        data = await validationSchema.validate(data, { abortEarly: false });

        let num = await Eco.update(data, { where: { id: id } });
        if (num == 1) {
            res.json({
                message: "Eco was updated successfully."
            });
        } else {
            res.status(400).json({
                message: `Cannot update eco with id ${id}.`
            });
        }
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let eco = await Eco.findByPk(id);
    if (!eco) {
        res.sendStatus(404);
        return;
    }

    let num = await Eco.destroy({ where: { id: id } });
    if (num == 1) {
        res.json({
            message: "Eco was deleted successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot delete eco with id ${id}.`
        });
    }
});

module.exports = router;
