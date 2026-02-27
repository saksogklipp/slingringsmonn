// Payment simulation service with basic card type and field validation.
class PaymentService {
    validate(details) {
        const normalizedCard = details.cardNumber.replace(/\s+/g, '');
        if (!/^\d{13,19}$/.test(normalizedCard)) {
            return { valid: false, error: 'Card number must be 13-19 digits.' };
        }
        const method = this.detectCardType(normalizedCard);
        if (!method) {
            return { valid: false, error: 'Only Visa and Mastercard are accepted.' };
        }
        if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(details.expiry)) {
            return { valid: false, error: 'Expiry must be in MM/YY format.' };
        }
        if (!/^\d{3,4}$/.test(details.cvv)) {
            return { valid: false, error: 'CVV must be 3 or 4 digits.' };
        }
        return { valid: true, method };
    }
    detectCardType(cardNumber) {
        if (/^4\d{12}(\d{3})?(\d{3})?$/.test(cardNumber)) {
            return 'Visa';
        }
        const firstTwo = Number(cardNumber.slice(0, 2));
        const firstFour = Number(cardNumber.slice(0, 4));
        if ((firstTwo >= 51 && firstTwo <= 55) || (firstFour >= 2221 && firstFour <= 2720)) {
            return 'Mastercard';
        }
        return null;
    }
}
export const paymentService = new PaymentService();
