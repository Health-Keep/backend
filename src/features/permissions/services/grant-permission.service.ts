import { REQUEST_PER_DTO } from '../interfaces/request.permission.dto';
import Permissions from '../models/permission.model';

const grantPermissionService = async (payload: REQUEST_PER_DTO) => {
    const permission = await Permissions.findOneAndUpdate({ user_id: payload.user_id, org_id: payload.org_id }, { status: true });
    await permission?.save();
    return permission;
};

export { grantPermissionService };
