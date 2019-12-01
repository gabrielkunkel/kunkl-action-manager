import {Router, } from "express"
import controller from "./action.controller"

let router = new Router()

router.get("/getmaster", controller.get_master_action)
router.post("/addaction", controller.add_action)
router.post("/nestaction", controller.nest_child_action)
router.post("/sortupdate", controller.sort_update)
router.get("/getaction", controller.get_action)
router.post("/nestchildupparentlist", controller.nest_child_up_parent_list)

module.exports = router
