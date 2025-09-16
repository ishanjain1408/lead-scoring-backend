/**
 * Offer Controller - handles saving product/offer info in memory
 */

let offerContext = null;

/**
 * POST /offer
 */
export const saveOffer = (req, res) => {
  const { name, value_props, ideal_use_cases } = req.body;

  if (!name || !value_props || !ideal_use_cases) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  offerContext = { name, value_props, ideal_use_cases };
  res.status(201).json({ message: "Offer saved", offer: offerContext });
};

/**
 * Getter for in-memory offer
 */
export const getOfferContext = () => offerContext;
