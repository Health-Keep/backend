import express,{ Router } from "express";
import login_org from "../controllers/sigin.org";


const org_router:Router = express.Router()


org_router.route("/login-org").post(login_org.login_org);

export default org_router;