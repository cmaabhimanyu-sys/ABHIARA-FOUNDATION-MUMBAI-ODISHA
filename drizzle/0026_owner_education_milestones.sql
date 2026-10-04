-- Owner statement supplied on 4 October 2026. These are programme milestones,
-- not monthly tuition counts, audited results, or distinct groups to be added.
-- Most of the onboarded children are orphaned; not all are represented as such.
INSERT IGNORE INTO `site_settings`
  (`settingKey`, `settingValue`, `label`, `category`)
VALUES
  (
    'stat_education_programme_snapshot',
    '{"reportedOn":"2026-10-04","onboarded":"50+","materials":"300+","mostlyOrphaned":true}',
    'Foundation-reported education programme milestones',
    'stats'
  );
