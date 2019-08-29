import UsersModel1 from "../lib/maindb";
const UsersModel =  UsersModel1.model("Users");
import * as polyfill from "babel-polyfill";
import responseHandler from "../lib/responseHandler";

class userController {
    constructor() { }

    public addUser = async (req, res, next) => {

        const userName = req.body.userName;
        const email = req.body.email;
        const gender = req.body.gender;
        const roleId = req.body.roleId;

        if (!userName || !email) {
            return responseHandler.makeResponse(res, false, 400, "invalid input parameters!", []);
        }
        try {
            const user = await UsersModel.findOne({ email });
            if (user) {
                return responseHandler.makeResponse(res, false, 200, "user already exist!", []);
            }
            const userObj =  new UsersModel({
                userName,
                email,
                gender,
                roleId
            });
            await userObj.save();
            return responseHandler.makeResponse(res, true, 201, "user successfully registered!", []);
        } catch (err) {
            console.log(err)
            return responseHandler.makeResponse(res, false, 500, "internel server error!", []);
        }
    }

    public updateUser = async (req, res, next) => {

        const id = req.body._id;

        if (!id) {
            return responseHandler.makeResponse(res, false, 400, "invalid input parameters", []);
        }

        try {

            const user = await UsersModel.findOne({ _id: id });
            if (!user) {
                return responseHandler.makeResponse(res, false, 200, "user doesn't exist!", []);
            }

            let updateUser = await UsersModel.findOneAndUpdate({_id: id}, req.body);

            if (updateUser) {
                return responseHandler.makeResponse(res, true, 200, "user successfully updated!", []);
            }
    
        } catch (err) {
            return responseHandler.makeResponse(res, false, 500, "internel server error", []);
        }
    }

    public deleteUser = async (req, res, next) => {

        const _id = req.params.id;

        if (!_id) {
            return responseHandler.makeResponse(res, false, 400, "invalid input parameters", []);
        }

        try {

            const user = await UsersModel.findOne({ _id });
            if (!user) {
                return responseHandler.makeResponse(res, false, 200, "user doesn't exist!", []);
            }

            let deleteUser = await UsersModel.findByIdAndRemove(_id);

            if (deleteUser) {
                return responseHandler.makeResponse(res, true, 200, "user successfully deleted!", []);
            }
    
        } catch (err) {
            return responseHandler.makeResponse(res, false, 500, "internel server error", []);
        }
    }

    public getUser = async (req, res, next) => {

        const id = req.params.id

        if (!id) {
            return responseHandler.makeResponse(res, false, 400, "invalid input parameters", []);
        }

        try {
            const user = await UsersModel.find({_id: id}).populate('roleId');
            return responseHandler.makeResponse(res, true, 200, "success", user);    
        } catch (err) {
            return responseHandler.makeResponse(res, false, 500, "internel server error", []);
        }
    }

    public getUserList = async (req, res, next) => {

        const pageNo = parseInt(req.params.pageNo);
        const limit = parseInt(req.params.limit);
        const skip = limit * (pageNo - 1);

        if (limit && pageNo) {
            const user = await UsersModel.find({}).skip(skip).limit(limit).populate('roleId');
            return responseHandler.makeResponse(res, true, 200, "success", user);
        } else {
            try {
                const user = await UsersModel.find({}).populate('roleId');
                return responseHandler.makeResponse(res, true, 200, "success", user);
            } catch (err) {
                console.log(err);
                return responseHandler.makeResponse(res, false, 500, "failed", []);
            }
        }

    }
    
}

export default new userController();
