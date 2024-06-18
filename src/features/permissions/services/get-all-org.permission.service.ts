import { GET_ALL_ORG_DTO } from '../interfaces/get-all-org.permission.dto';
import { GET_ALL_USER_DTO } from '../interfaces/get-all-user.permission.dto';
import { REQUEST_PER_DTO } from '../interfaces/request.permission.dto';
import Permissions from '../models/permission.model';

const getAllOrgPermissionsService = async (payload: GET_ALL_ORG_DTO) => {
    const permissions = await Permissions.findOne({ org_id: payload.org_id });
    return permissions;
};

export { getAllOrgPermissionsService };
