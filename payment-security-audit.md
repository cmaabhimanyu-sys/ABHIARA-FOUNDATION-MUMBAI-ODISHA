# Payment Security Audit

## Public wording

The donation hero no longer displays **Razorpay Secure Payment**. It now says **Secure One Time Payment** in English and Odia. This is a presentation change only and does not replace technical security controls.

## Confirmed security controls

Razorpay order creation uses the server-side secret from the deployment environment. The browser receives only the Razorpay key ID, order ID, amount, and currency required to open checkout. The Razorpay key secret is not referenced in client source or the built browser bundle.

Payment completion now requires both a valid HMAC signature and an exact match between the submitted Razorpay order ID and the order ID stored for that donation record. Signature comparison uses a constant-time check. An invalid client submission no longer marks a donation as failed.

The public checkout accepts one-time payments only. Monthly auto debit and subscription creation remain disabled.

## Confirmed credential exposure

The file `.project-config.json` was tracked in Git and contained literal payment, database, and infrastructure credentials. The file is now removed from Git tracking and is already ignored locally. Removing the current file does not remove values from earlier Git history.

## Required action

The following credentials must be rotated before the setup can be considered secure:

1. Razorpay key secret and corresponding key pair.
2. Database password or database user credentials.
3. Repository infrastructure credentials stored in the old project configuration.

After rotation, update the deployment secrets through the secure project secret settings. Do not place credentials in source files, Git commits, screenshots, or chat messages.

The Razorpay webhook should also use a separate webhook secret rather than reusing the API key secret. This requires creating a webhook secret in the Razorpay dashboard and adding it to deployment secrets before changing the server configuration.
