# Monthly Impact Audit

## Instagram source

The user supplied the public Reel `https://www.instagram.com/reel/Dc6oZSqN1_6/`. It belongs to the account `@abhiarafoundation`. The visible Reel frame is a general **Right to Information** post, not evidence of a field activity or monthly beneficiary result. It can be shown in a separate **Instagram Updates** section, but it must not be counted as programme impact.

The older fallback profile link `https://www.instagram.com/cma.abhimanyu/` currently opens Instagram’s “Profile isn’t available” page and should not be used as the Impact source.

## Maintenance decision

The first version will use a curated list of user-approved public Instagram post URLs. This avoids exposing Instagram credentials and prevents unrelated posts from being treated as field impact. Automatic account syncing can be considered later only with an official supported account connection and the user’s approval.

| Approach | Tradeoffs | Cost | Setup complexity |
| --- | --- | --- | --- |
| Curated public posts | The owner supplies a post or Reel URL. The website shows it after the activity and caption are checked. This is accurate and keeps personal posts out, but each new post needs a small content update. | No extra service cost | Low |
| Automatic official-account feed | New posts can appear without a code update. It requires an official supported Instagram account connection, permission management, error handling, and rules to stop unrelated posts from being treated as impact. | Depends on the account and service used | Medium to high |

The curated approach is implemented for the first release. No recurring job, background polling, or Instagram credential is added.
