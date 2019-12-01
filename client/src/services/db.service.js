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

    try {
        return await axios.post("http://localhost:3001/actions/nestaction?newchild=" + newChildActionId + "&newparent=" + newParentActionId + "&oldparent=" + oldParentActionId);

    } catch (error) {
        console.error(error);
    }

}

async function insertUpdateChildActions(actionToUpdateId, newArrayToUpdate) {

    try {
        return await axios.post("http://localhost:3001/actions/sortupdate?action=" + actionToUpdateId, {newArray: newArrayToUpdate});

    } catch (error) {
        console.error(error);
    }

}

async function getAction(actionId) {
    
    try {
        return await axios.get("http://localhost:3001/actions/getaction?_id=" + actionId);

    } catch (error) {
        console.error(error);
    }
}

async function nestChildUpParentList(newChildActionId, newParentActionId, oldParentActionId) {

    try {
        return await axios.post("http://localhost:3001/actions/nestchildupparentlist?newchild=" + newChildActionId + "&newparent=" + newParentActionId + "&oldparent=" + oldParentActionId);

    } catch (error) {
        console.error(error);
    }

}

export default {
    getMasterAction,
    addAction,
    nestChildAction,
    insertUpdateChildActions,
    getAction,
    nestChildUpParentList
}