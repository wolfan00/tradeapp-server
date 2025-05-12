import db from '../models/index.js';
import {Op} from 'sequelize';

const { TradeOffer, Product, User } = db;
export const createOffer = async (req, res) =>  {
    try {
        const { offered_product_id, requested_product_id, message } = req.body;
        const userId = req.user.id; // Kullanıcının kimliğini JWT'den alıyoruz
        // Teklif edilen ürünün sahibi mi 
        const offeredProduct = await Product.findByPk(offered_product_id);
        if (!offeredProduct) return res.status(404).json({ message: 'Teklif edilen ürün bulunamadı.' });
        if (offeredProduct.owner_id !== userId) {
            return res.status(403).json({ message: 'Bu ürünü teklif edemezsiniz.' });
        }
        // teklif daha önce yapılmış mı
        const existingOffer = await TradeOffer.findOne({
            where: {
                offered_product_id,
                requested_product_id,
              }
        });
        if (existingOffer) {
            return res.status(400).json({ message: 'Bu ürün için zaten bir teklif yapılmış.' });
        }

        // Teklif oluşturma
        const newOffer = await TradeOffer.create({
            offered_product_id,
            requested_product_id,
            message,
            offerer_id: userId // Teklifin sahibi olan kullanıcının kimliği
        });

        return res.status(201).json(newOffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Teklif oluşturulurken bir hata oluştu.' });
    }
}
export const getIncomingOffers = async (req, res) => {
try {
    const userId = req.user.id;

    const offers = await TradeOffer.findAll({
      include: [
        {
          model: Product,
          as: 'offered_product',
          
        },
        {
          model: Product,
          as: 'requested_product',
          where: { owner_id: userId }
        },
        {
          model: User,
          as: 'offerer',
          attributes: ['id', 'first_name', 'last_name', 'email']
        }
      ]
    });

    res.json(offers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Gelen teklifler alınamadı', details: error.message });
  }
};

// Gönderilen teklifler
export const getOutgoingOffers = async (req, res) => {
  try {
    const userId = req.user.id;

    const offers = await TradeOffer.findAll({
      where: { offerer_id: userId },
      include: [
        { model: Product, as: 'offered_product' },
        { model: Product, as: 'requested_product' }
      ]
    });

    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: 'Gönderilen teklifler alınamadı', details: error.message });
  }
};

// Teklif detayları
export const getOfferById = async (req, res) => {
  try {
    const offer = await TradeOffer.findByPk(req.params.id, {
      include: [
        { model: Product, as: 'offered_product' },
        { model: Product, as: 'requested_product' },
        { model: User, as: 'trade_offers', attributes: ['id', 'first_name', 'last_name', 'email'] }
      ]
    });

    if (!offer) return res.status(404).json({ error: 'Teklif bulunamadı' });

    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: 'Teklif alınamadı', details: error.message });
  }
};

// Teklifi kabul et
export const acceptOffer = async (req, res) => {
  try {
    const offer = await TradeOffer.findByPk(req.params.id);

    if (!offer) return res.status(404).json({ error: 'Teklif bulunamadı' });

    // İzin kontrolü: sadece ürün sahibi kabul edebilir
    const requestedProduct = await Product.findByPk(offer.requested_product_id);
    if (requestedProduct.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Bu teklifi kabul etme yetkiniz yok' });
    }

    offer.status = 'accepted';
    await offer.save();

    res.json({ message: 'Teklif kabul edildi', offer });
  } catch (error) {
    res.status(500).json({ error: 'Teklif kabul edilemedi', details: error.message });
  }
};

// Teklifi reddet
export const rejectOffer = async (req, res) => {
  try {
    const offer = await TradeOffer.findByPk(req.params.id);

    if (!offer) return res.status(404).json({ error: 'Teklif bulunamadı' });

    const requestedProduct = await Product.findByPk(offer.requested_product_id);
    if (requestedProduct.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Bu teklifi reddetme yetkiniz yok' });
    }

    offer.status = 'rejected';
    await offer.save();

    res.json({ message: 'Teklif reddedildi', offer });
  } catch (error) {
    res.status(500).json({ error: 'Teklif reddedilemedi', details: error.message });
  }
};

// Teklifi sil (sadece teklifi yapan silebilir)
export const deleteOffer = async (req, res) => {
  try {
    const offer = await TradeOffer.findByPk(req.params.id);

    if (!offer) return res.status(404).json({ error: 'Teklif bulunamadı' });
    if (offer.offerer_id !== req.user.id) {
      return res.status(403).json({ error: 'Bu teklifi silme yetkiniz yok' });
    }

    await offer.destroy();
    res.json({ message: 'Teklif silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Teklif silinemedi', details: error.message });
  }
};