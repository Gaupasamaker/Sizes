// Size equivalence tables for different clothing categories

// Tops (camisetas, camisas)
export const TOPS_EQUIVALENCES = {
    headers: ['EU', 'UK', 'US', 'Medidas (pecho cm)'],
    rows: [
        ['XS', '32-34', 'XS', '86-89'],
        ['S', '36-38', 'S', '89-94'],
        ['M', '38-40', 'M', '94-99'],
        ['L', '42-44', 'L', '99-104'],
        ['XL', '46-48', 'XL', '104-109'],
        ['XXL', '50-52', 'XXL', '109-114'],
        ['3XL', '54-56', '3XL', '114-119'],
    ]
};

// Bottoms (pantalones)
export const BOTTOMS_EQUIVALENCES = {
    headers: ['EU', 'UK', 'US', 'Cintura (cm)'],
    rows: [
        ['38', '28', '28', '71-74'],
        ['40', '30', '30', '76-79'],
        ['42', '32', '32', '81-84'],
        ['44', '34', '34', '86-89'],
        ['46', '36', '36', '91-94'],
        ['48', '38', '38', '96-99'],
        ['50', '40', '40', '101-104'],
        ['52', '42', '42', '106-109'],
    ]
};

// Shoes (calzado)
export const SHOES_EQUIVALENCES = {
    headers: ['EU', 'UK', 'US Hombre', 'US Mujer', 'cm'],
    rows: [
        ['36', '3.5', '4', '6', '22.5'],
        ['37', '4', '5', '6.5', '23'],
        ['38', '5', '6', '7.5', '24'],
        ['39', '6', '7', '8.5', '24.5'],
        ['40', '6.5', '7.5', '9', '25'],
        ['41', '7', '8', '9.5', '25.5'],
        ['42', '8', '9', '10.5', '26.5'],
        ['43', '9', '10', '11.5', '27.5'],
        ['44', '9.5', '10.5', '12', '28'],
        ['45', '10.5', '11.5', '13', '29'],
        ['46', '11', '12', '13.5', '29.5'],
        ['47', '12', '13', '14.5', '30.5'],
        ['48', '13', '14', '15.5', '31'],
    ]
};

// Outerwear (abrigos)
export const OUTERWEAR_EQUIVALENCES = {
    headers: ['EU', 'UK', 'US', 'Medidas (pecho cm)'],
    rows: [
        ['44', '34', 'XS', '86-89'],
        ['46', '36', 'S', '89-94'],
        ['48', '38', 'M', '94-99'],
        ['50', '40', 'L', '99-104'],
        ['52', '42', 'XL', '104-109'],
        ['54', '44', 'XXL', '109-114'],
        ['56', '46', '3XL', '114-119'],
    ]
};

// Get equivalence table by category
export function getEquivalenceByCategory(category) {
    switch (category) {
        case 'tops':
            return { title: 'Camisetas / Tops', data: TOPS_EQUIVALENCES };
        case 'bottoms':
            return { title: 'Pantalones', data: BOTTOMS_EQUIVALENCES };
        case 'shoes':
            return { title: 'Calzado', data: SHOES_EQUIVALENCES };
        case 'outerwear':
            return { title: 'Abrigos / Chaquetas', data: OUTERWEAR_EQUIVALENCES };
        default:
            return null;
    }
}

// Find equivalent sizes based on input
export function findEquivalentSizes(category, size) {
    const equivalence = getEquivalenceByCategory(category);
    if (!equivalence) return null;

    const sizeUpper = size.toUpperCase().trim();
    const { headers, rows } = equivalence.data;

    // Search in all columns
    for (const row of rows) {
        for (let i = 0; i < row.length; i++) {
            if (row[i].toUpperCase() === sizeUpper) {
                // Found match, return all equivalences
                const result = {};
                headers.forEach((header, idx) => {
                    result[header] = row[idx];
                });
                return result;
            }
        }
    }

    return null;
}

// Get all equivalence tables for info page
export function getAllEquivalences(language = 'es') {
    const translations = {
        es: {
            tops: { title: '👕 Camisetas / Tops', shortTitle: 'Camisetas' },
            bottoms: { title: '👖 Pantalones', shortTitle: 'Pantalones' },
            shoes: { title: '👟 Calzado', shortTitle: 'Calzado' },
            outerwear: { title: '🧥 Abrigos', shortTitle: 'Abrigos' },
            headers: {
                chest: 'Medidas (pecho cm)',
                waist: 'Cintura (cm)',
                usMen: 'US Hombre',
                usWomen: 'US Mujer',
            }
        },
        en: {
            tops: { title: '👕 Tops / T-Shirts', shortTitle: 'Tops' },
            bottoms: { title: '👖 Pants / Trousers', shortTitle: 'Pants' },
            shoes: { title: '👟 Shoes / Footwear', shortTitle: 'Shoes' },
            outerwear: { title: '🧥 Outerwear / Coats', shortTitle: 'Coats' },
            headers: {
                chest: 'Chest (cm)',
                waist: 'Waist (cm)',
                usMen: 'US Men',
                usWomen: 'US Women',
            }
        }
    };

    const t = translations[language] || translations.es;

    // Create translated headers for shoes
    const shoesHeaders = ['EU', 'UK', t.headers.usMen, t.headers.usWomen, 'cm'];
    const topsHeaders = ['EU', 'UK', 'US', t.headers.chest];
    const bottomsHeaders = ['EU', 'UK', 'US', t.headers.waist];
    const outerwearHeaders = ['EU', 'UK', 'US', t.headers.chest];

    return [
        { id: 'tops', ...t.tops, data: { headers: topsHeaders, rows: TOPS_EQUIVALENCES.rows } },
        { id: 'bottoms', ...t.bottoms, data: { headers: bottomsHeaders, rows: BOTTOMS_EQUIVALENCES.rows } },
        { id: 'shoes', ...t.shoes, data: { headers: shoesHeaders, rows: SHOES_EQUIVALENCES.rows } },
        { id: 'outerwear', ...t.outerwear, data: { headers: outerwearHeaders, rows: OUTERWEAR_EQUIVALENCES.rows } },
    ];
}

