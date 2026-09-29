ALTER TABLE `gallery_photos` ADD `isHomepageFeatured` boolean DEFAULT false NOT NULL;
--> statement-breakpoint
UPDATE `gallery_photos` SET `isHomepageFeatured` = false;
--> statement-breakpoint
UPDATE `gallery_photos`
SET `isHomepageFeatured` = true, `isPublished` = true
WHERE `id` = 30046;
--> statement-breakpoint
UPDATE `gallery_photos` SET `title`='Children With School Supplies Outdoors', `description`='Children stand together outdoors carrying backpacks, notebooks and other school supplies.' WHERE `id`=30046 AND `category`='education';
--> statement-breakpoint
UPDATE `gallery_photos` SET `title`='Classroom Teaching Session With Learning Activities', `description`='A standing instructor addresses seated learners, with educational displays, a chalkboard and classroom decorations visible.' WHERE `id`=30041 AND `category`='education';
--> statement-breakpoint
UPDATE `gallery_photos` SET `title`='Outdoor Group Lesson With Learning Materials', `description`='A group sits outdoors on mats while an instructor presents materials, with notebooks and school bags nearby.' WHERE `id`=30042 AND `category`='education';
--> statement-breakpoint
UPDATE `gallery_photos` SET `title`='Outdoor Learning Session With Books', `description`='Young learners sit outdoors on a mat with books while an adult guides the learning activity.' WHERE `id`=30043 AND `category`='education';
--> statement-breakpoint
UPDATE `gallery_photos` SET `title`='Books and Learning Materials Outdoors', `description`='Participants gather outdoors with books, bags and learning materials during an educational activity.' WHERE `id`=30044 AND `category`='education';
--> statement-breakpoint
UPDATE `gallery_photos` SET `title`='Children Seated Together in a Classroom', `description`='Children sit together in a classroom surrounded by educational charts, posters and learning materials.' WHERE `id`=30047 AND `category`='education';
--> statement-breakpoint
UPDATE `gallery_photos` SET `title`='Classroom Learning Session With Teaching Materials', `description`='A classroom session shows children seated near a teaching table, with educational displays and artwork visible on the wall.' WHERE `id`=30048 AND `category`='education';
--> statement-breakpoint
UPDATE `gallery_photos` SET `title`='Open Air Learning Session', `description`='Books and learning materials were shared during an open air education session.' WHERE `id`=1 AND `category`='education';
--> statement-breakpoint
UPDATE `gallery_photos`
SET `isPublished` = false,
    `isHomepageFeatured` = false
WHERE `id` IN (30019, 30020, 30021, 30022)
  AND `category` = 'education';
