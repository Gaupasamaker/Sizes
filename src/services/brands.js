// Popular clothing brands database for autocomplete
export const POPULAR_BRANDS = [
    // Fast Fashion
    { name: 'Zara', category: 'fast-fashion' },
    { name: 'H&M', category: 'fast-fashion' },
    { name: 'Primark', category: 'fast-fashion' },
    { name: 'Pull&Bear', category: 'fast-fashion' },
    { name: 'Bershka', category: 'fast-fashion' },
    { name: 'Stradivarius', category: 'fast-fashion' },
    { name: 'Mango', category: 'fast-fashion' },
    { name: 'Massimo Dutti', category: 'fast-fashion' },
    { name: 'Uniqlo', category: 'fast-fashion' },
    { name: 'C&A', category: 'fast-fashion' },
    { name: 'Forever 21', category: 'fast-fashion' },
    { name: 'Shein', category: 'fast-fashion' },

    // Sports
    { name: 'Nike', category: 'sports' },
    { name: 'Adidas', category: 'sports' },
    { name: 'Puma', category: 'sports' },
    { name: 'Reebok', category: 'sports' },
    { name: 'New Balance', category: 'sports' },
    { name: 'Under Armour', category: 'sports' },
    { name: 'Asics', category: 'sports' },
    { name: 'Converse', category: 'sports' },
    { name: 'Vans', category: 'sports' },
    { name: 'Fila', category: 'sports' },
    { name: 'Skechers', category: 'sports' },
    { name: 'Jordan', category: 'sports' },
    { name: 'The North Face', category: 'sports' },
    { name: 'Columbia', category: 'sports' },
    { name: 'Salomon', category: 'sports' },
    { name: 'Decathlon', category: 'sports' },

    // Premium / Designer
    { name: 'Tommy Hilfiger', category: 'premium' },
    { name: 'Ralph Lauren', category: 'premium' },
    { name: 'Calvin Klein', category: 'premium' },
    { name: 'Hugo Boss', category: 'premium' },
    { name: 'Lacoste', category: 'premium' },
    { name: 'Guess', category: 'premium' },
    { name: 'Levi\'s', category: 'premium' },
    { name: 'Diesel', category: 'premium' },
    { name: 'Timberland', category: 'premium' },
    { name: 'G-Star Raw', category: 'premium' },
    { name: 'Superdry', category: 'premium' },
    { name: 'Jack & Jones', category: 'premium' },
    { name: 'Pepe Jeans', category: 'premium' },

    // Outdoor / Casual
    { name: 'Carhartt', category: 'outdoor' },
    { name: 'Patagonia', category: 'outdoor' },
    { name: 'Dickies', category: 'outdoor' },
    { name: 'Dockers', category: 'outdoor' },

    // Underwear / Basics
    { name: 'Intimissimi', category: 'underwear' },
    { name: 'Calzedonia', category: 'underwear' },
    { name: 'Victoria\'s Secret', category: 'underwear' },
    { name: 'Oysho', category: 'underwear' },

    // Kids
    { name: 'Zara Kids', category: 'kids' },
    { name: 'H&M Kids', category: 'kids' },
    { name: 'Gap Kids', category: 'kids' },
    { name: 'Next', category: 'kids' },
    { name: 'Kiabi', category: 'kids' },

    // Shoes specific
    { name: 'Clarks', category: 'shoes' },
    { name: 'Geox', category: 'shoes' },
    { name: 'Camper', category: 'shoes' },
    { name: 'Dr. Martens', category: 'shoes' },
    { name: 'Crocs', category: 'shoes' },
    { name: 'Birkenstock', category: 'shoes' },
    { name: 'Merrell', category: 'shoes' },

    // Department stores / Generic
    { name: 'El Corte Inglés', category: 'department' },
    { name: 'Cortefiel', category: 'department' },
    { name: 'Springfield', category: 'department' },
    { name: 'Women\'secret', category: 'department' },
];

// Search brands by query
export function searchBrandSuggestions(query) {
    if (!query || query.length < 1) return [];

    const lowerQuery = query.toLowerCase();

    return POPULAR_BRANDS
        .filter(brand => brand.name.toLowerCase().includes(lowerQuery))
        .slice(0, 8) // Limit to 8 suggestions
        .map(brand => brand.name);
}

// Get all brand names
export function getAllBrandNames() {
    return POPULAR_BRANDS.map(b => b.name).sort();
}
