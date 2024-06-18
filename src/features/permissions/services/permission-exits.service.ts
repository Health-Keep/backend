import Permissions from '../models/permission.model';

const permissionExistsService = async (user_id: string, org_id: string): Promise<boolean> => {
    const org = await Permissions.findOne({
        user_id,
        org_id
    });
    return !!org;
};

export { permissionExistsService };
