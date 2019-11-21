import {Router, } from "express"
import controller from "./action.controller"
import { checkJwt } from "../../auth";

let router = new Router()

router.post("/add-or-update", checkJwt, controller.add_one_or_update) // api/actions/add-or-update
router.get("/get-all", checkJwt, controller.get_all_of_user) // api/actions/get-all
router.get("/get-one", checkJwt, controller.get_one) // api/actions/get-one

module.exports = router
