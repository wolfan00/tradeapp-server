import express from 'express';
const router = express.Router();

import  {createOffer, getIncomingOffers, getOutgoingOffers, getOfferById, acceptOffer, rejectOffer, deleteOffer} from  '../controller/offersController.js';


router.post('/',createOffer); //teklif oluştur
router.get('/incoming',getIncomingOffers); // gelen teklifler
router.get('/outgoing',getOutgoingOffers); // gönderilen teklifler
router.get('/:id',getOfferById); // teklif detayları
router.put('/accept/:id',acceptOffer);// teklifi kabul et
router.put('/reject/:id',rejectOffer);//teklifi reddet
router.delete('/:id',deleteOffer ); //teklifi sil (authorize edilmesi lazım)

export default router;