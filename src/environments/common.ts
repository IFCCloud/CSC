export const config = {
    dimUOM : [
        { code : 'm', desc : 'Metre' },
        { code : 'cm', desc : 'Centimetre' },
        { code : 'mm', desc : 'Millimetre' }
    ],
    weightUOM : [
		{ code : 't', desc : 'Metric Tonne (Mg)' },
        { code : 'Kg', desc : 'Kilogram' },
        { code : 'g', desc : 'Gram' }
    ],
    volumeUOM : [
        { code : 'm3', desc : 'Cubic Metre' },
        { code : 'cm3', desc : 'Cubic Centimetre' }
    ],
    itemUOM : [
        { code : 'EA', desc : 'Each' },
        { code : 'CS', desc : 'Case' },
        { code : 'IN', desc : 'Inner' },
		{ code : 'LYR', desc : 'Layer' },
		{ code : 'CNPL', desc : 'Asian Standard Pallet' },
		{ code : 'AUPL', desc : 'Australian Standard Pallet' },
		{ code : 'EUPL', desc : 'European Standard Pallet' }
    ],
    currency : [
        { code : 'AUD', desc : 'AUD' },
        { code : 'USD', desc : 'USD' }
    ],
    companies : [
        { code : '3TOTTOOL', name : 'Total Tools' }
    ],
    defaultDimUOM : 'm',
    defaultWgUOM : 'Kg'
}
