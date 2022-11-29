import express from 'express';
import { getContractors, createContractor, deleteContractor, updateContractor } from '../controllers/contractors.js';


const router = express.Router();

router.get('/', getContractors);
router.post('/', createContractor);
router.delete('/:id', deleteContractor);
router.patch('/:id', updateContractor);

export default router;