// First we need to import axios.js
import axios from "axios";
// Next we make an 'instance' of it
const instance = axios.create({
	// .. where we make our configurations
	baseURL: "http://localhost:9559/",
});
// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common["Access-Control-Allow-Origin"] =
// 	"http://localhost:3000";
// instance.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

// Also add/ configure interceptors && all the other cool stuff

export default instance;
