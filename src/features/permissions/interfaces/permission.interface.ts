import { Document } from 'mongoose';

interface IPermission extends Document {
    user_id: string;
    org_id: string;
    status: boolean;
}

export default IPermission;
