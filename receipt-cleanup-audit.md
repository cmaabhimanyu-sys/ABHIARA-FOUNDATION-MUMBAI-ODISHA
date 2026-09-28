# Donation Receipt Cleanup Audit

## Accurate functions kept

The Razorpay order field named `receipt` is an internal merchant reference used to match an order with a donation record. It is not shown to donors as a tax receipt and must remain for payment reconciliation.

Real Razorpay order IDs, payment IDs, payment status, donor privacy choices, and completed donation records remain unchanged.

The public website may say **Donation Acknowledgement**. It must also say that 80G approval is pending and donations made now are not eligible for an 80G tax deduction.

## Fake or unsupported functions removed

The inactive donor dashboard was removed from public use. It claimed that donors could download 80G receipts and manage monthly subscriptions even though neither function is active. Its access form also claimed that an email link had been sent when no email was sent.

The bank-transfer page no longer promises an official receipt within 24 hours. It now explains how to request a Donation Acknowledgement after payment verification.

PAN fields labelled for 80G receipts were removed from the occasion, memorial, and manual admin donation forms. The website no longer asks for PAN for a tax benefit that is not available.

The special donation pages no longer say that an already verified online payment still needs to be completed. Their 80G wording now says approval is pending and no tax deduction is available yet.

The Financials page now shows **80G Application Status** rather than presenting an in-process application as an existing certificate.

## Database safety

No real donation, Razorpay order, payment ID, donor record, or subscription row has been deleted. Database records must be inspected separately for obvious test entries. Any destructive deletion requires the owner's confirmation first.
