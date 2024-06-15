import mongoose, {Schema} from "mongoose";
import IOrganization from "../interfaces/org-interface";


const OrganizationSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    licence: { type: String, required: true },
    password: { type: String, required: true },
});


const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);
export default Organization;