-- The owner requested the Board profile without a defensive daily-operations disclaimer.
-- Preserve Ms. Biswajita Mallik's directorship, qualification, and all other profiles.
UPDATE `leadership_members`
SET `bioEn` = NULL,
    `bioOd` = NULL,
    `bioIsPublic` = FALSE
WHERE `id` = 2
  AND `nameEn` = 'Ms. Biswajita Mallik';
