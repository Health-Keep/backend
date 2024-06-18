import { Request, Response, NextFunction } from 'express';
import { globalError } from '../../../utils/globalError';
import { statusCode } from '../../../utils/httpStatusCode';
import { REQUEST_PER_DTO } from '../interfaces/request.permission.dto';
import { permissionExistsService } from '../services/permission-exits.service';
import { grantPermissionService } from '../services/grant-permission.service';
import { idMatchOrgService } from '../services/match-id-org.services';
const { SUCCESS, FAIL, ERROR } = statusCode;

class GrantPermission {
    async grant_permission(req: Request, res: Response, next: NextFunction) {
        const payload: REQUEST_PER_DTO = req.body;
        const token = req.decodedToken;
        if (payload.user_id !== token?.id) {
            const err = new globalError('Unauthorized to perform this action', 401, FAIL);
            return next(err);
        }
        try {
            const permissionExits = await permissionExistsService(payload.user_id, payload.org_id);
            if (!permissionExits) {
                const err = new globalError('Invalid credentials', 401, FAIL);
                return next(err);
            }
            const permission = await grantPermissionService(payload);
            res.json({
                status: SUCCESS,
                message: 'Permission has been granted',
                data: permission
            });
        } catch (error: any) {
            res.status(500).json({
                status: ERROR,
                message: error.message
            });
        }
    }
}

const grant_permission = new GrantPermission();
export default grant_permission;
