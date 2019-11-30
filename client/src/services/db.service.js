import axios from "../../node_modules/axios";

async function getMasterAction(user) {

    try {
        return await axios.get("http://localhost:3001/actions/getmaster?_id=" + user)
    } catch (error) {
        console.error(error);
    }
    

}

export default {
    getMasterAction
}