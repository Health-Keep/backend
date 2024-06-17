import { Router } from 'express';
// Controllers
import { signup } from '../controllers/signup.users';
// Input's validation
import { signupValidation } from '../input-validation/signup.validation';
import login_patient from '../controllers/signin.users';

const user_router = Router();

user_router.route('/signup').post(signupValidation, signup);
user_router.route('/login').post(login_patient.login_patient);

export { user_router };
