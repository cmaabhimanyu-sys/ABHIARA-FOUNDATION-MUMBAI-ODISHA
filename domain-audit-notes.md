# Public Domain Check

Checked the public donation page from `https://abhiarafoundation.org/donate` on desktop and mobile.

The non-www dot org page returned HTTP 200 and loaded the current donation page. The early script in `client/index.html` sends non-www dot org visits to `https://www.abhiarafoundation.org` while preserving the path, query string, and hash. Both desktop and mobile captures showed the current one-time donation page with the Abhiara header, donation hero, approved support photos, and Razorpay secure payment label.

No payment was opened, created, or charged during this check. A real one-time payment test must be completed by the user after publishing the latest checkpoint.
