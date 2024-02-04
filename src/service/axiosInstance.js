import axios from "axios";

const API_BASE_URL = "https://api.rimoned.com/api/pharmacy-management/v1";

export const axiosPublic = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
});

export const axiosPrivate = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
});

export const setPrivateHeader = ()=>{
    axiosPrivate.defaults.headers.common["authorization"] = localStorage.getItem("accessToken");
}

// export const accessTokenChk =  localStorage.removeItem("accessToken");

axiosPrivate.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){
        if(error.response && error.response.status == 401){
            localStorage.removeItem("accessToken");
            location.href="/"
            console.log("...con1...")
        }
        return Promise.reject(error)
       // console.log("...con2..."+error)
    }
     
)

