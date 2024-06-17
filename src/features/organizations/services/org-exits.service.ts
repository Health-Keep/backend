import Organization from '../models/org-model';

const orgExistsService = async (name: string, email: string, licence: string): Promise<boolean> => {
    const org = await Organization.findOne({
        $or: [{ name }, { email }, { licence }]
    });
    return !!org;
};

export { orgExistsService };
