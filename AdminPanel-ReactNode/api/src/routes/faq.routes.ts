import { Router } from 'express';
import * as faqController from '../controllers/faq.controllers'
import { validateFAQRequestBody } from '../middlewares/schema-validator';
const faqRouter = Router();
faqRouter.get('/', faqController.getFAQs)
faqRouter.get('/:id', faqController.getFAQById)
faqRouter.post('/', validateFAQRequestBody, faqController.addFAQ)
faqRouter.put('/:id', validateFAQRequestBody, faqController.updateFAQ)
faqRouter.delete('/:id', faqController.deleteFAQ)
export default faqRouter;
