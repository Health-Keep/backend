import { Router } from 'express';
// Controllers
import login_org from '../controllers/sigin.org';
import signup_org from '../controllers/singup.org';
// Input validation
import { signupOrgValidation } from '../input-validation/signup.org.validation';
import { signinOrgValidation } from '../input-validation/signin.org.validation';

const org_router = Router();

org_router.route('/signup').post(signupOrgValidation, signup_org.signup_org);
org_router.route('/login').post(signinOrgValidation, login_org.login_org);

export { org_router };
