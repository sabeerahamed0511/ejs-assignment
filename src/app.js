const express = require("express");
const app = express();
const ejs = require("ejs");
const methodOverride = require("method-override");
const User = require("./models/userModel");

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).render("pages/Home.ejs", { users})
    } catch (err) {
        res.status(404).send("404 Not found")
    }
})

app.post("/user", async (req, res) => {
    try {
        let newUser = await User(req.body);
        await newUser.save();
        res.redirect("/")
    } catch (err) {
        res.status(404).send("404 Not found")
    }
})

app.get("/form", async (req, res) => {
    try {
        res.status(200).render("pages/Form.ejs");
    } catch (err) {
        res.status(404).send("404 Not Found")
    }
})

app.put("/users/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        let newValue = user.isPromoted === null ? true : user.isPromoted ? false : true ;
        await User.findByIdAndUpdate(req.params.id, {isPromoted : newValue});
        res.redirect("/");
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
})




module.exports = app;