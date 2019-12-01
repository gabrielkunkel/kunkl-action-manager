import axios from "../../node_modules/axios";

async function getMasterAction(user) {

    try {
        return await axios.get("http://localhost:3001/actions/getmaster?_id=" + user)
    } catch (error) {
        console.error(error);
    }
}

async function addAction(action) {

    try {
        return await axios.post("http://localhost:3001/actions/addaction", action);

    } catch (error) {
        console.error(error);
    }

}

async function nestChildAction(newChildActionId, newParentActionId, oldParentActionId) {

    console.log("the values from client: ", newChildActionId, "   ", newParentActionId, "   ", oldParentActionId);

    try {
        return await axios.post("http://localhost:3001/actions/nestaction?newchild=" + newChildActionId + "&newparent=" + newParentActionId + "&oldparent=" + oldParentActionId);

    } catch (error) {
        console.error(error);
    }

}


export default {
    getMasterAction,
    addAction,
    nestChildAction
}