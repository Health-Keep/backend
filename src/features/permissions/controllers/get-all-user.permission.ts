import { Request, Response, NextFunction } from 'express';
import { globalError } from '../../../utils/globalError';
import { statusCode } from '../../../utils/httpStatusCode';
import { GET_ALL_USER_DTO } from '../interfaces/get-all-user.permission.dto';
import { getAllUserPermissionsService } from '../services/get-all-user.permission.service';
const { SUCCESS, FAIL, ERROR } = statusCode;

class GetAllPermissions {
    async get_all_permissions(req: Request, res: Response, next: NextFunction) {
        const payload: GET_ALL_USER_DTO = req.query as unknown as GET_ALL_USER_DTO;
        const token = req.decodedToken;
        if (payload.user_id !== token?.id) {
            const err = new globalError('Unauthorized to perform this action', 401, FAIL);
            return next(err);
        }
        try {
            const permissions = await getAllUserPermissionsService(payload);
            if (!permissions) {
                const err = new globalError('No permissions found', 404, FAIL);
                return next(err);
            }
            res.json({
                status: SUCCESS,
                message: null,
                data: permissions
            });
        } catch (error: any) {
            res.status(500).json({
                status: ERROR,
                message: error.message
            });
        }
    }
}

const get_all_permissions = new GetAllPermissions();
export default get_all_permissions;
