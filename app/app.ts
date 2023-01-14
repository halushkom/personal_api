import MainApplication from './main_application'
import { Controller } from './controller/controller';
import CompanyController  from './controller/company_controller'


const controllers: Controller[] = [
    new CompanyController()
];

const application = new MainApplication(controllers);
application.listen();
