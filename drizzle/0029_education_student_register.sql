-- Owner-reported current student register, update shared 14 October 2026.
-- Aggregate registration and district representation only, not tuition payments,
-- audited outcomes or a beneficiary total to add to learning-material recipients.
-- Never insert student names, full addresses, identity papers or the register file.
-- INSERT IGNORE preserves an existing owner-edited setting when re-applied.
INSERT IGNORE INTO `site_settings` (`settingKey`, `settingValue`, `label`, `category`)
VALUES (
  'stat_education_student_register',
  '{"reportedOn":"2026-10-14","students":51,"districts":["Kendrapara","Dhenkanal","Keonjhar","Jajpur","Mayurbhanj"],"isPublished":true}',
  'Student register: aggregate count and Odisha district representation',
  'stats'
);
