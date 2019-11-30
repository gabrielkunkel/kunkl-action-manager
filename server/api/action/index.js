import {Router, } from "express"
import controller from "./action.controller"

let router = new Router()

router.get("/getmaster", controller.get_master_action)
router.post("/add-or-update", controller.add_one_or_update) // api/actions/add-or-update
router.get("/get-all", controller.get_all_of_user) // api/actions/get-all
router.get("/get-one", controller.get_one) // api/actions/get-one

module.exports = router
