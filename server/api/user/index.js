import {Router, } from "express"
import controller from "./user.controller"
import { checkJwt } from "../../auth";

let router = new Router()

router.post("/", checkJwt, controller.add_edit_user) // api/users/
router.get("/user", checkJwt, controller.get_user) // api/users/user/

module.exports = router
