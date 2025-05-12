import { Router } from 'express';
const router = Router();
import { auth,authAdmin} from '../middleware/auth.js';
import { adminRouter } from '../admin.js';

//Main routes
import users from './users.js';
import signup from './signup.js';
import login from './login.js';
import products from './products.js';
import refresh from './refresh.js';
import offers from './offers.js';
import offer_messages from './offer_messages.js';
import logout from './logout.js';
import categories from './categories.js';
import upload from './upload.js';
//Routes
router.use('/api/products', products);
router.use('/api/uploads',auth, upload);
router.use('/api/users',auth, users);
router.use('/api/signup', signup);
router.use('/api/login', login);
router.use(`/api/refresh`,refresh);
router.use('/api/logout',auth, logout);
router.use('/api/offers',auth, offers);
router.use('/api/offers/:offerId/messages',auth, offer_messages);

router.use('/admin', authAdmin, adminRouter);
router.use(`/api/categories`, categories);

export default router;