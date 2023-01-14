import { Controller } from "./controller";
import { routes } from "../const/routes";
import { createCompanyProvider } from '../provider/company_provider';
import {Company} from '../model/company_model';

class CompanyController extends Controller {
    constructor() {
        super()
        this.createCompany()
    }

    public createCompany() {
        this.router.post(routes.company.create, async (req, res ) => {
            await Company.createRecord(req.body).then(result => res.send(result)) 
        })
    } 
}
export default CompanyController