import { store } from '../store/store';
import axios from "axios";
// import { mapGetters } from "vuex"

export async function serviceToken(data){
    const token = store.getters.sessionToken;


        let config = {
            headers: {
            //   'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${token}`
              }
        }

        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(`${key}`, value);
        }
      

        let resp =  await axios.post("https://lionware.dev/ari-dasci/webservice",formData, config );

        if(resp.status == 200) return resp.data;
        else alert("Lo sentimos, hubo un error")
    
        //poner try catch para borrer token y dirigir a login cuando sea error 401
    
}

export async function service(data){
  
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(`${key}`, value);
        }
      

        let resp =  await axios.post("https://lionware.dev/ari-dasci/webservice",formData );

        if(resp.status == 200) return resp.data;
        else alert("Lo sentimos, hubo un error")
    
}

export async function serviceAddQestions(data, questions){
    const token = store.getters.sessionToken;

        let config = { headers: { Authorization: `Bearer ${token}` }}

        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(`${key}`, value);
        }

        for (const [key, value] of Object.entries(questions)) {
            formData.append("questions["+key+"][category]", value.category);
            formData.append("questions["+key+"][task]", value.task);
            formData.append("questions["+key+"][time]", value.time);
        }
      
        let resp =  await axios.post("https://lionware.dev/ari-dasci/webservice",formData, config );
        if(resp.status == 200) return resp.data;
        else alert("Lo sentimos, hubo un error")    
}

export async function serviceAddQestionsQuestionnaire(data, questions){
    const token = store.getters.sessionToken;

        let config = { headers: { Authorization: `Bearer ${token}` }}

        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(`${key}`, value);
        }

        for (const [key, value] of Object.entries(questions)) {
            formData.append("questions["+key+"]", value.question);
        }
      
        let resp =  await axios.post("https://lionware.dev/ari-dasci/webservice",formData, config );
        if(resp.status == 200) return resp.data;
        else alert("Lo sentimos, hubo un error")    
}