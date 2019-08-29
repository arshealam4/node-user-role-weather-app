import RolesModel1 from "../lib/maindb";
const RolesModel =  RolesModel1.model("Roles");
import * as polyfill from "babel-polyfill";
import responseHandler from "../lib/responseHandler";

class roleController {
    constructor() { }

    public addRole = async (req, res, next) => {

        const roleName = req.body.roleName;
        const roleNumber = req.body.roleNumber;

        if (!roleName || !roleNumber) {
            return responseHandler.makeResponse(res, false, 400, "invalid input parameters!", []);
        }
        try {
            const role = await RolesModel.findOne({ roleName });
            if (role) {
                return responseHandler.makeResponse(res, false, 200, "role already exist!", []);
            }
            const roleObj =  new RolesModel({
                roleName,
                roleNumber,
            });
            await roleObj.save();
            return responseHandler.makeResponse(res, true, 201, "role successfully added!", []);
        } catch (err) {
            return responseHandler.makeResponse(res, false, 500, "internel server error!", []);
        }
    }

    public updateRole = async (req, res, next) => {

        const id = req.body._id;

        if (!id) {
            return responseHandler.makeResponse(res, false, 400, "invalid input parameters", []);
        }

        try {

            const role = await RolesModel.findOne({ _id: id });
            console.log(role)
            if (!role) {
                return responseHandler.makeResponse(res, false, 200, "role doesn't exist!", []);
            }

            let updateRole = await RolesModel.findOneAndUpdate({_id: id}, req.body);

            if (updateRole) {
                return responseHandler.makeResponse(res, true, 200, "role successfully updated!", []);
            }
    
        } catch (err) {
            return responseHandler.makeResponse(res, false, 500, "internel server error", []);
        }
    }

    public deleteRole = async (req, res, next) => {

        const _id = req.params.id;

        if (!_id) {
            return responseHandler.makeResponse(res, false, 400, "invalid input parameters", []);
        }

        try {

            const role = await RolesModel.findOne({ _id });
            if (!role) {
                return responseHandler.makeResponse(res, false, 200, "role doesn't exist!", []);
            }

            let deleteRole = await RolesModel.findByIdAndRemove(_id);

            if (deleteRole) {
                return responseHandler.makeResponse(res, true, 200, "role successfully deleted!", []);
            }
    
        } catch (err) {
            return responseHandler.makeResponse(res, false, 500, "internel server error", []);
        }
    }

    public getRole = async (req, res, next) => {

        const id = req.params.id

        if (!id) {
            return responseHandler.makeResponse(res, false, 400, "invalid input parameters", []);
        }

        try {
            const role = await RolesModel.find({_id: id});
            return responseHandler.makeResponse(res, true, 200, "success", role);    
        } catch (err) {
            return responseHandler.makeResponse(res, false, 500, "internel server error", []);
        }
    }

    public getRoleList = async (req, res, next) => {

        const pageNo = parseInt(req.params.pageNo);
        const limit = parseInt(req.params.limit);
        const skip = limit * (pageNo - 1);

        if (limit && pageNo) {
            const role = await RolesModel.find({}).skip(skip).limit(limit);
            return responseHandler.makeResponse(res, true, 200, "success", role);
        } else {
            try {
                const role = await RolesModel.find({});
                return responseHandler.makeResponse(res, true, 200, "success", role);
            } catch (err) {
                console.log(err);
                return responseHandler.makeResponse(res, false, 500, "failed", []);
            }
        }

    }
    
}

export default new roleController();
