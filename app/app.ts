import MainApplication from './main_application'
import { Controller } from './controller/controller';


const controllers: Controller[] = [
    
];

const application = new MainApplication(controllers);
application.listen();
