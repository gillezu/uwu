import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

// An empty baseURL makes axios issue same-origin relative requests.
axios.defaults.baseURL = API_BASE_URL;
