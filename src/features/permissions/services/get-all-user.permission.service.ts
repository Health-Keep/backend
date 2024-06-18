import { GET_ALL_USER_DTO } from '../interfaces/get-all-user.permission.dto';
import { REQUEST_PER_DTO } from '../interfaces/request.permission.dto';
import Permissions from '../models/permission.model';

const getAllUserPermissionsService = async (payload: GET_ALL_USER_DTO) => {
    const permissions = await Permissions.findOne({ user_id: payload.user_id });
    return permissions;
};

export { getAllUserPermissionsService };
