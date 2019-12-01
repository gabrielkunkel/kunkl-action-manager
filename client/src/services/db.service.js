import axios from "../../node_modules/axios";

async function getMasterAction(user) {

    try {
        return await axios.get("http://localhost:3001/actions/getmaster?_id=" + user)
    } catch (error) {
        console.error(error);
    }
}

// todo: add new
async function addAction(action) {

    try {
        return await axios.post("http://localhost:3001/actions/addaction", action);

    } catch (error) {
        console.error(error);
    }

}


// todo: make to child


export default {
    getMasterAction,
    addAction
}