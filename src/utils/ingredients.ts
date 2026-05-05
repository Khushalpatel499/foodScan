/**
 * Ingredient explainer data & parser.
 * Pure utility — no React, no side effects.
 */

/** Known E-numbers and common additives with explanations */
const ADDITIVE_DB: Record<string, { name: string; description: string; risk: 'safe' | 'caution' | 'avoid' }> = {
  'e100': { name: 'Curcumin', description: 'Natural yellow color from turmeric', risk: 'safe' },
  'e101': { name: 'Riboflavin', description: 'Vitamin B2, yellow food coloring', risk: 'safe' },
  'e102': { name: 'Tartrazine', description: 'Synthetic yellow dye, may cause hyperactivity in children', risk: 'caution' },
  'e104': { name: 'Quinoline Yellow', description: 'Synthetic yellow dye', risk: 'caution' },
  'e110': { name: 'Sunset Yellow', description: 'Synthetic orange dye, linked to hyperactivity', risk: 'caution' },
  'e120': { name: 'Cochineal', description: 'Red dye from insects, natural but allergenic for some', risk: 'caution' },
  'e122': { name: 'Carmoisine', description: 'Synthetic red dye', risk: 'caution' },
  'e124': { name: 'Ponceau 4R', description: 'Synthetic red dye, banned in some countries', risk: 'avoid' },
  'e129': { name: 'Allura Red', description: 'Synthetic red dye, linked to hyperactivity', risk: 'caution' },
  'e131': { name: 'Patent Blue V', description: 'Synthetic blue dye', risk: 'caution' },
  'e132': { name: 'Indigo Carmine', description: 'Synthetic blue dye', risk: 'caution' },
  'e133': { name: 'Brilliant Blue', description: 'Synthetic blue dye used in candies', risk: 'caution' },
  'e150a': { name: 'Caramel Color', description: 'Simple caramel coloring from heated sugar', risk: 'safe' },
  'e150d': { name: 'Sulphite Ammonia Caramel', description: 'Caramel color, may contain 4-MEI', risk: 'caution' },
  'e160a': { name: 'Beta-Carotene', description: 'Natural orange pigment, precursor to Vitamin A', risk: 'safe' },
  'e160b': { name: 'Annatto', description: 'Natural orange-red color from seeds', risk: 'safe' },
  'e170': { name: 'Calcium Carbonate', description: 'Chalk, used as white color and calcium source', risk: 'safe' },
  'e200': { name: 'Sorbic Acid', description: 'Natural preservative, generally safe', risk: 'safe' },
  'e202': { name: 'Potassium Sorbate', description: 'Common preservative, prevents mold', risk: 'safe' },
  'e210': { name: 'Benzoic Acid', description: 'Preservative, may cause allergies in sensitive people', risk: 'caution' },
  'e211': { name: 'Sodium Benzoate', description: 'Preservative, may form benzene with vitamin C', risk: 'caution' },
  'e220': { name: 'Sulphur Dioxide', description: 'Preservative in wine/dried fruit, triggers asthma', risk: 'caution' },
  'e250': { name: 'Sodium Nitrite', description: 'Preservative in cured meats, linked to cancer risk', risk: 'avoid' },
  'e251': { name: 'Sodium Nitrate', description: 'Preservative, converts to nitrite in body', risk: 'avoid' },
  'e260': { name: 'Acetic Acid', description: 'Vinegar, natural preservative', risk: 'safe' },
  'e270': { name: 'Lactic Acid', description: 'Natural acid found in fermented foods', risk: 'safe' },
  'e300': { name: 'Ascorbic Acid', description: 'Vitamin C, antioxidant', risk: 'safe' },
  'e301': { name: 'Sodium Ascorbate', description: 'Vitamin C salt, antioxidant', risk: 'safe' },
  'e306': { name: 'Tocopherols', description: 'Vitamin E, natural antioxidant', risk: 'safe' },
  'e322': { name: 'Lecithin', description: 'Emulsifier from soy or sunflower, natural', risk: 'safe' },
  'e330': { name: 'Citric Acid', description: 'Natural acid from citrus fruits', risk: 'safe' },
  'e331': { name: 'Sodium Citrate', description: 'Acidity regulator, safe', risk: 'safe' },
  'e338': { name: 'Phosphoric Acid', description: 'Acidifier in cola drinks, may affect bone health', risk: 'caution' },
  'e339': { name: 'Sodium Phosphate', description: 'Emulsifier, excessive intake may harm kidneys', risk: 'caution' },
  'e400': { name: 'Alginic Acid', description: 'Natural thickener from seaweed', risk: 'safe' },
  'e401': { name: 'Sodium Alginate', description: 'Thickener from seaweed', risk: 'safe' },
  'e407': { name: 'Carrageenan', description: 'Thickener from seaweed, debated safety', risk: 'caution' },
  'e410': { name: 'Locust Bean Gum', description: 'Natural thickener from carob seeds', risk: 'safe' },
  'e412': { name: 'Guar Gum', description: 'Natural thickener from guar beans', risk: 'safe' },
  'e414': { name: 'Gum Arabic', description: 'Natural gum from acacia trees', risk: 'safe' },
  'e415': { name: 'Xanthan Gum', description: 'Thickener produced by fermentation', risk: 'safe' },
  'e420': { name: 'Sorbitol', description: 'Sugar alcohol sweetener, may cause bloating', risk: 'caution' },
  'e421': { name: 'Mannitol', description: 'Sugar alcohol, laxative effect in large amounts', risk: 'caution' },
  'e422': { name: 'Glycerol', description: 'Humectant, naturally occurring in fats', risk: 'safe' },
  'e440': { name: 'Pectin', description: 'Natural gelling agent from fruit', risk: 'safe' },
  'e450': { name: 'Diphosphates', description: 'Raising agent, excessive may affect calcium absorption', risk: 'caution' },
  'e460': { name: 'Cellulose', description: 'Plant fiber, anti-caking agent', risk: 'safe' },
  'e471': { name: 'Mono/Diglycerides', description: 'Emulsifier from fats, generally safe', risk: 'safe' },
  'e472e': { name: 'DATEM', description: 'Dough conditioner, emulsifier', risk: 'safe' },
  'e500': { name: 'Sodium Carbonate', description: 'Baking soda, raising agent', risk: 'safe' },
  'e501': { name: 'Potassium Carbonate', description: 'Alkaline salt, raising agent', risk: 'safe' },
  'e503': { name: 'Ammonium Carbonate', description: 'Traditional raising agent', risk: 'safe' },
  'e509': { name: 'Calcium Chloride', description: 'Firming agent, mineral salt', risk: 'safe' },
  'e516': { name: 'Calcium Sulphate', description: 'Tofu coagulant, firming agent', risk: 'safe' },
  'e621': { name: 'MSG (Monosodium Glutamate)', description: 'Flavor enhancer, may cause headaches in sensitive people', risk: 'caution' },
  'e627': { name: 'Disodium Guanylate', description: 'Flavor enhancer, often paired with MSG', risk: 'caution' },
  'e631': { name: 'Disodium Inosinate', description: 'Flavor enhancer, often paired with MSG', risk: 'caution' },
  'e635': { name: 'Disodium Ribonucleotides', description: 'Flavor enhancer combo', risk: 'caution' },
  'e900': { name: 'Dimethylpolysiloxane', description: 'Anti-foaming agent in frying oils', risk: 'caution' },
  'e901': { name: 'Beeswax', description: 'Natural glazing agent', risk: 'safe' },
  'e903': { name: 'Carnauba Wax', description: 'Natural plant wax, glazing agent', risk: 'safe' },
  'e950': { name: 'Acesulfame K', description: 'Artificial sweetener, 200x sweeter than sugar', risk: 'caution' },
  'e951': { name: 'Aspartame', description: 'Artificial sweetener, controversial safety profile', risk: 'caution' },
  'e952': { name: 'Cyclamate', description: 'Artificial sweetener, banned in some countries', risk: 'avoid' },
  'e954': { name: 'Saccharin', description: 'Oldest artificial sweetener', risk: 'caution' },
  'e955': { name: 'Sucralose', description: 'Artificial sweetener, 600x sweeter than sugar', risk: 'caution' },
  'e960': { name: 'Stevia (Steviol Glycosides)', description: 'Natural sweetener from stevia plant', risk: 'safe' },
  'e965': { name: 'Maltitol', description: 'Sugar alcohol, may cause digestive issues', risk: 'caution' },
  'e966': { name: 'Lactitol', description: 'Sugar alcohol with laxative effect', risk: 'caution' },
  'e967': { name: 'Xylitol', description: 'Sugar alcohol, good for teeth but toxic to dogs', risk: 'safe' },
};

/** Common ingredient names with explanations */
const INGREDIENT_DB: Record<string, { name: string; description: string; risk: 'safe' | 'caution' | 'avoid' }> = {
  'palm oil': { name: 'Palm Oil', description: 'Vegetable oil high in saturated fat, environmental concerns', risk: 'caution' },
  'high fructose corn syrup': { name: 'HFCS', description: 'Cheap sweetener linked to obesity and metabolic issues', risk: 'avoid' },
  'hydrogenated': { name: 'Hydrogenated Oil', description: 'Contains trans fats, increases heart disease risk', risk: 'avoid' },
  'partially hydrogenated': { name: 'Partially Hydrogenated Oil', description: 'Source of trans fats, banned in many countries', risk: 'avoid' },
  'maltodextrin': { name: 'Maltodextrin', description: 'Highly processed starch, spikes blood sugar quickly', risk: 'caution' },
  'dextrose': { name: 'Dextrose', description: 'Simple sugar (glucose), high glycemic index', risk: 'caution' },
  'corn syrup': { name: 'Corn Syrup', description: 'Liquid sugar from corn starch', risk: 'caution' },
  'modified starch': { name: 'Modified Starch', description: 'Chemically or physically altered starch, thickener', risk: 'safe' },
  'soy lecithin': { name: 'Soy Lecithin', description: 'Emulsifier from soybeans, generally safe', risk: 'safe' },
  'natural flavors': { name: 'Natural Flavors', description: 'Flavoring from natural sources, vague labeling', risk: 'safe' },
  'artificial flavors': { name: 'Artificial Flavors', description: 'Synthetic flavoring chemicals', risk: 'caution' },
  'sodium bicarbonate': { name: 'Sodium Bicarbonate', description: 'Baking soda, raising agent', risk: 'safe' },
  'mono and diglycerides': { name: 'Mono & Diglycerides', description: 'Emulsifiers from fats', risk: 'safe' },
  'carrageenan': { name: 'Carrageenan', description: 'Seaweed-derived thickener, may cause inflammation', risk: 'caution' },
  'titanium dioxide': { name: 'Titanium Dioxide', description: 'White colorant, banned in EU food since 2022', risk: 'avoid' },
  'bht': { name: 'BHT', description: 'Synthetic antioxidant preservative, debated safety', risk: 'caution' },
  'bha': { name: 'BHA', description: 'Synthetic antioxidant, possible carcinogen', risk: 'caution' },
  'tbhq': { name: 'TBHQ', description: 'Synthetic preservative for oils, limit intake', risk: 'caution' },
  'polysorbate 80': { name: 'Polysorbate 80', description: 'Emulsifier, may affect gut bacteria', risk: 'caution' },
  'sodium nitrite': { name: 'Sodium Nitrite', description: 'Preservative in processed meats, cancer risk', risk: 'avoid' },
};

export interface IngredientInfo {
  original: string;
  name: string;
  description: string;
  risk: 'safe' | 'caution' | 'avoid' | 'unknown';
}

/**
 * Parses an ingredients string and returns info for each ingredient.
 * Matches against E-number database and common ingredient names.
 */
export function parseIngredients(ingredientsText: string): IngredientInfo[] {
  // Split by comma, semicolon, or period — common separators in ingredient lists
  const parts = ingredientsText
    .split(/[,;.]/)
    .map(s => s.trim())
    .filter(s => s.length > 1);

  return parts.map(part => {
    const lower = part.toLowerCase().replace(/[()[\]]/g, '').trim();

    // Check E-numbers (e.g., "E621", "e 621", "E-621")
    const eMatch = lower.match(/e[-\s]?(\d{3,4}[a-z]?)/);
    if (eMatch) {
      const code = `e${eMatch[1]}`;
      const info = ADDITIVE_DB[code];
      if (info) return { original: part, ...info };
    }

    // Check common ingredient names
    for (const [key, info] of Object.entries(INGREDIENT_DB)) {
      if (lower.includes(key)) return { original: part, ...info };
    }

    // Check additives by name match
    for (const [, info] of Object.entries(ADDITIVE_DB)) {
      if (lower.includes(info.name.toLowerCase())) return { original: part, name: info.name, description: info.description, risk: info.risk };
    }

    return { original: part, name: part, description: '', risk: 'unknown' as const };
  });
}
