// Integration boundary. Never fabricate a quote, delivery receipt or successful payment.
// Connect these operations to an authenticated same-origin service; validate on the server.
export class IntegrationRequiredError extends Error {
  constructor(operation){super(`${operation} is not connected yet. No information has been submitted.`);this.name='IntegrationRequiredError';}
}
export const insuranceApi=Object.freeze({
  async requestServiceOtp(){throw new IntegrationRequiredError('Mobile verification');},
  async verifyServiceOtp(){throw new IntegrationRequiredError('Mobile verification');},
  async submitClaim(){throw new IntegrationRequiredError('Claim submission');},
  async getPaymentStatus(){throw new IntegrationRequiredError('Payment status');},
  async getClassificationRules(){throw new IntegrationRequiredError('Classification rules');},
  async calculateQuote(){throw new IntegrationRequiredError('Quote calculation');},
  async emailQuote(){throw new IntegrationRequiredError('Quotation email');},
  async submitApplication(){throw new IntegrationRequiredError('Application submission');},
  async requestOtp(){throw new IntegrationRequiredError('OTP delivery');},
  async verifyOtp(){throw new IntegrationRequiredError('OTP verification');},
  async createPayment(){throw new IntegrationRequiredError('Payment processing');},
  async requestSupport(){throw new IntegrationRequiredError('Support requests');}
});
