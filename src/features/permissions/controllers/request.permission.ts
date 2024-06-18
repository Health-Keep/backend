import { Request, Response, NextFunction } from 'express';
import { globalError } from '../../../utils/globalError';
import { statusCode } from '../../../utils/httpStatusCode';
import { REQUEST_PER_DTO } from '../interfaces/request.permission.dto';
import { permissionExistsService } from '../services/permission-exits.service';
import { createPermissionService } from '../services/create-permission.service';
const { SUCCESS, FAIL, ERROR } = statusCode;

class RequestPermission {
    async request_permission(req: Request, res: Response, next: NextFunction) {
        const payload: REQUEST_PER_DTO = req.body;
        const token = req.decodedToken;
        if (payload.org_id !== token?.id) {
            const err = new globalError('Unauthorized to perform this action', 401, FAIL);
            return next(err);
        }
        try {
            const permission = await permissionExistsService(payload.user_id, payload.org_id);
            if (permission) {
                const err = new globalError('Permission exits', 400, FAIL);
                return next(err);
            }
            await createPermissionService(payload);
            res.json({
                status: SUCCESS,
                message: 'A permission request has been sent to the user'
            });
        } catch (error: any) {
            res.status(500).json({
                status: ERROR,
                message: error.message
            });
        }
    }
}

const request_permission = new RequestPermission();
export default request_permission;
