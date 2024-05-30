export class HelperBase {

    static getNumberFromText(priceText: string | null) {
        const match = priceText?.match(/(\d+\.\d+)/);
        const extractedNumber = match ? match[0] : null;
        
        if(!extractedNumber) {
            throw new Error('expected string to contain number')
        }

        return extractedNumber
    }

    static addPrices(price1: string, price2: string): string {
        const factor = 100;
        const sum = Math.round(+price1 * factor) + Math.round(+price2 * factor);
        return (sum / factor).toString();
    }
    
}