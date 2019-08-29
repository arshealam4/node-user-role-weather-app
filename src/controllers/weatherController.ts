import * as polyfill from "babel-polyfill";
import axios from 'axios';
import * as config from 'config'
import responseHandler from "../lib/responseHandler";

class weatherController {
    constructor() { }

    public getWeatherList = async (req, res, next) => {

        const city = req.params.city;

        if (!city) {
            return responseHandler.makeResponse(res, false, 400, "city name is required!", []);
        }

        try {
            let weather = await axios.get(`${config.get('weathetURL')}?q=${city}&appid=${config.get('weatherAppID')}`);
        
            return responseHandler.makeResponse(res, true, 200, "success", weather.data);
        } catch (err) {
            console.log(err);
            return responseHandler.makeResponse(res, false, 500, "failed", []);
        }

    }
    
}

export default new weatherController();
