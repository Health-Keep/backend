import { Document } from "mongoose";

interface IOrganization extends Document{
    name: string;
    email: string;
    licence: string;
    password: string;
}

export default IOrganization;