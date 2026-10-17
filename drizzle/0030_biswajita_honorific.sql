-- Owner-requested public honorific correction for the existing Board card.
-- Keep the role, qualifications, portrait, ordering and publication status unchanged.
UPDATE `leadership_members`
SET `nameEn` = 'Mrs. Biswajita Mallik',
    `nameOd` = 'ଶ୍ରୀମତୀ ବିଶ୍ୱଜିତା ମଲ୍ଲିକ'
WHERE `id` = 2
  AND `memberType` = 'board'
  AND `nameEn` IN ('Ms. Biswajita Mallik', 'Biswajita Mallik');
