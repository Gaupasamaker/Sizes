// Size equivalence tables for different clothing categories

// Men Tops (camisetas, camisas)
export const MEN_TOPS_EQUIVALENCES = {
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

// Women Tops
export const WOMEN_TOPS_EQUIVALENCES = {
    headers: ['EU', 'UK', 'US', 'Medidas (pecho cm)'],
    rows: [
        ['34 (XS)', '6', '2', '80-84'],
        ['36 (S)', '8', '4', '85-89'],
        ['38 (M)', '10', '6', '90-94'],
        ['40 (L)', '12', '8', '95-100'],
        ['42 (XL)', '14', '10', '101-106'],
        ['44 (XXL)', '16', '12', '107-112'],
    ]
};

// Men Bottoms (pantalones)
export const MEN_BOTTOMS_EQUIVALENCES = {
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

// Women Bottoms
export const WOMEN_BOTTOMS_EQUIVALENCES = {
    headers: ['EU', 'UK', 'US', 'Cintura (cm)'],
    rows: [
        ['34 (XS)', '6', '25', '60-64'],
        ['36 (S)', '8', '26-27', '65-69'],
        ['38 (M)', '10', '28-29', '70-74'],
        ['40 (L)', '12', '30-31', '75-79'],
        ['42 (XL)', '14', '32', '80-85'],
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

// Kids Shoes
export const KIDS_SHOES_EQUIVALENCES = {
    headers: ['EU', 'UK', 'US', 'cm', 'Edad aprox.'],
    rows: [
        ['19', '3', '3.5', '11.5', '9-12 m'],
        ['20', '3.5', '4', '12', '12-15 m'],
        ['21', '4.5', '5', '13', '15-18 m'],
        ['22', '5', '6', '13.5', '18-24 m'],
        ['23', '6', '7', '14', '2 años'],
        ['24', '7', '8', '15', '2-3 años'],
        ['25', '8', '8', '15.5', '3 años'],
        ['26', '8.5', '9', '16.5', '3-4 años'],
        ['27', '9', '10', '17', '4 años'],
        ['28', '10', '11', '17.5', '5 años'],
        ['29', '11', '12', '18.5', '5-6 años'],
        ['30', '11.5', '12.5', '19', '6 años'],
        ['31', '12.5', '13', '19.5', '7 años'],
        ['32', '13', '13.5', '20.5', '8 años'],
        ['33', '1', '1.5', '21', '8-9 años'],
        ['34', '1.5', '2', '21.5', '9 años'],
        ['35', '2.5', '3', '22', '10 años'],
        ['36', '3', '3.5', '22.5', '10-11 años'],
        ['37', '4', '4.5', '23.5', '11-12 años'],
    ]
};

// Kids Tops (camisetas, jerseys)
export const KIDS_TOPS_EQUIVALENCES = {
    headers: ['Talla', 'Edad', 'Altura (cm)', 'Pecho (cm)'],
    rows: [
        ['74', '6-9 m', '68-74', '47-49'],
        ['80', '9-12 m', '74-80', '49-51'],
        ['86', '12-18 m', '80-86', '51-53'],
        ['92', '18-24 m', '86-92', '53-55'],
        ['98', '2-3 años', '92-98', '54-56'],
        ['104', '3-4 años', '98-104', '55-57'],
        ['110', '4-5 años', '104-110', '57-59'],
        ['116', '5-6 años', '110-116', '59-61'],
        ['122', '6-7 años', '116-122', '61-63'],
        ['128', '7-8 años', '122-128', '63-65'],
        ['134', '8-9 años', '128-134', '65-68'],
        ['140', '9-10 años', '134-140', '68-71'],
        ['146', '10-11 años', '140-146', '71-74'],
        ['152', '11-12 años', '146-152', '74-78'],
        ['158', '12-13 años', '152-158', '78-82'],
        ['164', '13-14 años', '158-164', '82-86'],
    ]
};

// Kids Bottoms (pantalones)
export const KIDS_BOTTOMS_EQUIVALENCES = {
    headers: ['Talla', 'Edad', 'Altura (cm)', 'Cintura (cm)'],
    rows: [
        ['74', '6-9 m', '68-74', '46-48'],
        ['80', '9-12 m', '74-80', '48-50'],
        ['86', '12-18 m', '80-86', '50-51'],
        ['92', '18-24 m', '86-92', '51-52'],
        ['98', '2-3 años', '92-98', '52-53'],
        ['104', '3-4 años', '98-104', '53-54'],
        ['110', '4-5 años', '104-110', '54-55'],
        ['116', '5-6 años', '110-116', '55-56'],
        ['122', '6-7 años', '116-122', '56-58'],
        ['128', '7-8 años', '122-128', '58-60'],
        ['134', '8-9 años', '128-134', '60-62'],
        ['140', '9-10 años', '134-140', '62-64'],
        ['146', '10-11 años', '140-146', '64-66'],
        ['152', '11-12 años', '146-152', '66-68'],
        ['158', '12-13 años', '152-158', '68-71'],
        ['164', '13-14 años', '158-164', '71-74'],
    ]
};

// Get equivalence table by category
export function getEquivalenceByCategory(category) {
    switch (category) {
        case 'tops':
            return { title: 'Camisetas / Tops', data: MEN_TOPS_EQUIVALENCES };
        case 'women_tops':
            return { title: 'Camisetas / Tops (Mujer)', data: WOMEN_TOPS_EQUIVALENCES };
        case 'bottoms':
            return { title: 'Pantalones', data: MEN_BOTTOMS_EQUIVALENCES };
        case 'women_bottoms':
            return { title: 'Pantalones (Mujer)', data: WOMEN_BOTTOMS_EQUIVALENCES };
        case 'shoes':
            return { title: 'Calzado', data: SHOES_EQUIVALENCES };
        case 'outerwear':
            return { title: 'Abrigos / Chaquetas', data: OUTERWEAR_EQUIVALENCES };
        case 'kids_shoes':
            return { title: 'Calzado Infantil', data: KIDS_SHOES_EQUIVALENCES };
        default:
            return null;
    }
}

// Find equivalent sizes based on input
// NOTE: This basic functionality currently searches in basic male tables for simplification
// Ideally it should receive gender as context to search in correct table
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

    // Create translated headers
    const shoesHeaders = ['EU', 'UK', t.headers.usMen, t.headers.usWomen, 'cm'];
    const topsHeaders = ['EU', 'UK', 'US', t.headers.chest];
    const bottomsHeaders = ['EU', 'UK', 'US', t.headers.waist];
    const outerwearHeaders = ['EU', 'UK', 'US', t.headers.chest];

    return [
        // MEN
        {
            id: 'tops',
            ...t.tops,
            data: { headers: topsHeaders, rows: MEN_TOPS_EQUIVALENCES.rows },
            gender: ['man']
        },
        {
            id: 'bottoms',
            ...t.bottoms,
            data: { headers: bottomsHeaders, rows: MEN_BOTTOMS_EQUIVALENCES.rows },
            gender: ['man']
        },
        // WOMEN
        {
            id: 'women_tops',
            ...t.tops,
            data: { headers: topsHeaders, rows: WOMEN_TOPS_EQUIVALENCES.rows },
            gender: ['woman']
        },
        {
            id: 'women_bottoms',
            ...t.bottoms,
            data: { headers: bottomsHeaders, rows: WOMEN_BOTTOMS_EQUIVALENCES.rows },
            gender: ['woman']
        },
        // UNISEX / SHARED
        {
            id: 'shoes',
            ...t.shoes,
            data: { headers: shoesHeaders, rows: SHOES_EQUIVALENCES.rows },
            gender: ['man', 'woman'],
            hasGenderColumns: true
        },
        {
            id: 'outerwear',
            ...t.outerwear,
            data: { headers: outerwearHeaders, rows: OUTERWEAR_EQUIVALENCES.rows },
            gender: ['man', 'woman']
        },
        // KIDS
        {
            id: 'kids_tops',
            title: language === 'es' ? '👕 Camisetas / Tops (Niños)' : '👕 Kids Tops',
            shortTitle: language === 'es' ? 'Camisetas' : 'Tops',
            data: {
                headers: language === 'es'
                    ? ['Talla', 'Edad', 'Altura (cm)', 'Pecho (cm)']
                    : ['Size', 'Age', 'Height (cm)', 'Chest (cm)'],
                rows: KIDS_TOPS_EQUIVALENCES.rows
            },
            gender: ['child']
        },
        {
            id: 'kids_bottoms',
            title: language === 'es' ? '👖 Pantalones (Niños)' : '👖 Kids Pants',
            shortTitle: language === 'es' ? 'Pantalones' : 'Pants',
            data: {
                headers: language === 'es'
                    ? ['Talla', 'Edad', 'Altura (cm)', 'Cintura (cm)']
                    : ['Size', 'Age', 'Height (cm)', 'Waist (cm)'],
                rows: KIDS_BOTTOMS_EQUIVALENCES.rows
            },
            gender: ['child']
        },
        {
            id: 'kids_shoes',
            title: language === 'es' ? '👟 Calzado Infantil' : '👟 Kids Shoes',
            shortTitle: language === 'es' ? 'Calzado' : 'Shoes',
            data: {
                headers: language === 'es' ? ['EU', 'UK', 'US', 'cm', 'Edad aprox.'] : ['EU', 'UK', 'US', 'cm', 'Approx Age'],
                rows: KIDS_SHOES_EQUIVALENCES.rows
            },
            gender: ['child']
        }
    ];
}
