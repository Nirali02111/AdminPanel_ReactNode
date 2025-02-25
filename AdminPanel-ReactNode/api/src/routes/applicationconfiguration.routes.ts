
import { Router } from 'express';
import * as applicationConfiguration from '../controllers/applicationconfiguration.controllers'
import { validateApplicationConfigurationRequestBody } from '../middlewares/schema-validator';
const applicationConfigurationRouter = Router();
applicationConfigurationRouter.get('/', applicationConfiguration.getApplicationConfigurations)
applicationConfigurationRouter.get('/:id', applicationConfiguration.getApplicationConfigurationById)
applicationConfigurationRouter.post('/', validateApplicationConfigurationRequestBody, applicationConfiguration.addApplicationConfiguration)
applicationConfigurationRouter.put('/:id', validateApplicationConfigurationRequestBody, applicationConfiguration.updateApplicationConfiguration)
applicationConfigurationRouter.delete('/:id', applicationConfiguration.deleteApplicationConfiguration)
export default applicationConfigurationRouter;
