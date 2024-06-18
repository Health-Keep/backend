import { Router } from 'express';

// verify authorization token
import { verifyToken } from '../../../middleware/verifyToken';

// Controllers
import request_permission from '../controllers/request.permission';
import grant_permission from '../controllers/grant.permission';
import revoke_permission from '../controllers/revoke.permission';

// Input validation
import { permissionValidation } from '../input-validation/permission.validation';

const permission_router = Router();

permission_router.route('/request').post(verifyToken, permissionValidation, request_permission.request_permission);
permission_router.route('/grant').patch(verifyToken, permissionValidation, grant_permission.grant_permission);
permission_router.route('/revoke').patch(verifyToken, permissionValidation, revoke_permission.revoke_permission);

export { permission_router };
