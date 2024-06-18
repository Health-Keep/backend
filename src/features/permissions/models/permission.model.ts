import mongoose, { Schema } from 'mongoose';
import IPermission from '../interfaces/permission.interface';

const PermissionSchema = new Schema({
    user_id: { type: String, required: true },
    org_id: { type: String, required: true },
    status: { type: Boolean, required: true }
});

const Permission = mongoose.model<IPermission>('Permission', PermissionSchema);
export default Permission;
