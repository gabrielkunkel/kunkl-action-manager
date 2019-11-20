import {Router, } from "express"
import controller from "./action.controller"

let router = new Router()

router.post("/add", controller.add_one) // { user: [ userID] }
router.get("/get_all", controller.get_all_of_user) 
router.get("/get_one", controller.get_one_of_user)

module.exports = router
