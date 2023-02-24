import axios from "axios";
import { BASE_URL,token,clientid,messageid} from "./pathMap";

const instance=axios.create({
    baseURL:BASE_URL,
    headers: { 
        Authorization:'5e46871f34a6e5748c2c417142f210b2-97ec-428a-a01b-34556f96c9ea',
        'content-type': 'application/json',
        token:token,
        clientid:clientid,
        messageid:messageid,
    },
    
})

export default {
    get:instance.get,
    post:instance.post
}