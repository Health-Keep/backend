import { REQUEST_PER_DTO } from '../interfaces/request.permission.dto';
import Permissions from '../models/permission.model';

const createPermissionService = async (payload: REQUEST_PER_DTO) => {
    const permission = new Permissions({
        user_id: payload.user_id,
        org_id: payload.org_id,
        status: false
    });
    await permission.save();
    return permission;
};

export { createPermissionService };
