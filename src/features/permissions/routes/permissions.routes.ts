import { Router } from 'express';

// verify authorization token
import { verifyToken } from '../../../middleware/verifyToken';

// Controllers
import request_permission from '../controllers/request.permission';
import grant_permission from '../controllers/grant.permission';
import revoke_permission from '../controllers/revoke.permission';
import get_all_permissions from '../controllers/get-all-user.permission';
import get_all_org_permissions from '../controllers/get-all-org.permission';

// Input validation
import { permissionValidation } from '../input-validation/permission.validation';
import { permissionUserValidation } from '../input-validation/get-permission-user.validaiton';
import { permissionOrgValidation } from '../input-validation/get-permission-org.validation';

const permission_router = Router();

permission_router.route('/user').get(verifyToken, permissionUserValidation, get_all_permissions.get_all_permissions);
permission_router.route('/org').get(verifyToken, permissionOrgValidation, get_all_org_permissions.get_all_org_permissions);
permission_router.route('/request').post(verifyToken, permissionValidation, request_permission.request_permission);
permission_router.route('/grant').patch(verifyToken, permissionValidation, grant_permission.grant_permission);
permission_router.route('/revoke').patch(verifyToken, permissionValidation, revoke_permission.revoke_permission);

export { permission_router };
