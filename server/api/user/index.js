import {Router, } from "express"
import Controller from "../controller"
import User from "./user.model"

let controller = new Controller(User)
let router = new Router()

router.post("/", controller.update)
router.post("/index", controller.index)

module.exports = router
