-- Insert user reactions with realistic preferences
-- Each user can only have one reaction per target user (enforced by unique constraint)
INSERT INTO UserReaction (from_user_id, to_user_id, type) VALUES
-- User 1 (John Doe - MALE, looking for love) reactions
(1, 2, 'LIKE'),        -- likes Jane Smith (FEMALE, looking for friend)
(1, 5, 'SUPER_LIKE'),  -- super likes Emily Clark (FEMALE, looking for friend+coworker)
(1, 7, 'LIKE'),        -- likes Sophia Turner (FEMALE, looking for friend)
(1, 10, 'SUPER_LIKE'), -- super likes Olivia Park (FEMALE, looking for friend+coworker)
(1, 12, 'LIKE'),       -- likes Mia Lee (FEMALE, looking for friend)
(1, 15, 'LIKE'),       -- likes Ava Lee (FEMALE, looking for friend+coworker)
(1, 17, 'DISLIKE'),    -- dislikes Ella Kim (FEMALE, looking for friend)
(1, 20, 'LIKE'),       -- likes Grace Kim (FEMALE, looking for friend+coworker)
(1, 22, 'SUPER_LIKE'), -- super likes Chloe Kim (FEMALE, looking for friend)
(1, 25, 'LIKE'),       -- likes Lily Kim (FEMALE, looking for friend+coworker)

-- User 2 (Jane Smith - FEMALE, looking for friend) reactions
(2, 1, 'LIKE'),        -- likes John Doe back
(2, 4, 'LIKE'),        -- likes Chris Evans (MALE, looking for love+friend)
(2, 6, 'DISLIKE'),     -- dislikes Michael Lee (MALE, looking for love only)
(2, 9, 'LIKE'),        -- likes David Kim (MALE, looking for love+friend)
(2, 11, 'DISLIKE'),    -- dislikes Daniel Choi (MALE, looking for love only)
(2, 14, 'LIKE'),       -- likes Ethan Kim (MALE, looking for love+friend)
(2, 16, 'DISLIKE'),    -- dislikes Matthew Lee (MALE, looking for love only)
(2, 19, 'LIKE'),       -- likes Benjamin Park (MALE, looking for love+friend)
(2, 21, 'DISLIKE'),    -- dislikes Lucas Lee (MALE, looking for love only)
(2, 24, 'SUPER_LIKE'), -- super likes Henry Kim (MALE, looking for love+friend)

-- User 3 (Alex Kim - OTHER, looking for coworker) reactions
(3, 5, 'LIKE'),        -- likes Emily Clark (FEMALE, looking for friend+coworker)
(3, 8, 'SUPER_LIKE'),  -- super likes Taylor Morgan (OTHER, looking for coworker)
(3, 10, 'LIKE'),       -- likes Olivia Park (FEMALE, looking for friend+coworker)
(3, 13, 'LIKE'),       -- likes Jordan Lee (OTHER, looking for coworker)
(3, 15, 'SUPER_LIKE'), -- super likes Ava Lee (FEMALE, looking for friend+coworker)
(3, 18, 'LIKE'),       -- likes Morgan Lee (OTHER, looking for coworker)
(3, 20, 'LIKE'),       -- likes Grace Kim (FEMALE, looking for friend+coworker)
(3, 23, 'SUPER_LIKE'), -- super likes Casey Lee (OTHER, looking for coworker)
(3, 25, 'LIKE'),       -- likes Lily Kim (FEMALE, looking for friend+coworker)
(3, 28, 'LIKE'),       -- likes Riley Kim (OTHER, looking for coworker)

-- User 4 (Chris Evans - MALE, looking for love+friend) reactions
(4, 2, 'SUPER_LIKE'),  -- super likes Jane Smith back
(4, 5, 'LIKE'),        -- likes Emily Clark
(4, 7, 'LIKE'),        -- likes Sophia Turner
(4, 9, 'LIKE'),        -- likes David Kim (fellow love+friend seeker)
(4, 10, 'SUPER_LIKE'), -- super likes Olivia Park
(4, 12, 'LIKE'),       -- likes Mia Lee
(4, 14, 'LIKE'),       -- likes Ethan Kim (fellow love+friend seeker)
(4, 15, 'LIKE'),       -- likes Ava Lee
(4, 17, 'DISLIKE'),    -- dislikes Ella Kim
(4, 19, 'SUPER_LIKE'), -- super likes Benjamin Park (fellow love+friend seeker)

-- User 5 (Emily Clark - FEMALE, looking for friend+coworker) reactions
(5, 1, 'LIKE'),        -- likes John Doe
(5, 3, 'SUPER_LIKE'),  -- super likes Alex Kim back
(5, 4, 'LIKE'),        -- likes Chris Evans
(5, 8, 'LIKE'),        -- likes Taylor Morgan
(5, 9, 'LIKE'),        -- likes David Kim
(5, 10, 'SUPER_LIKE'), -- super likes Olivia Park (fellow friend+coworker)
(5, 13, 'LIKE'),       -- likes Jordan Lee
(5, 14, 'LIKE'),       -- likes Ethan Kim
(5, 15, 'SUPER_LIKE'), -- super likes Ava Lee (fellow friend+coworker)
(5, 18, 'LIKE'),       -- likes Morgan Lee

-- User 6 (Michael Lee - MALE, looking for love) reactions
(6, 7, 'LIKE'),        -- likes Sophia Turner (FEMALE, looking for friend)
(6, 10, 'SUPER_LIKE'), -- super likes Olivia Park (FEMALE, looking for friend+coworker)
(6, 12, 'LIKE'),       -- likes Mia Lee (FEMALE, looking for friend)
(6, 15, 'LIKE'),       -- likes Ava Lee (FEMALE, looking for friend+coworker)
(6, 17, 'SUPER_LIKE'), -- super likes Ella Kim (FEMALE, looking for friend)
(6, 20, 'LIKE'),       -- likes Grace Kim (FEMALE, looking for friend+coworker)
(6, 22, 'LIKE'),       -- likes Chloe Kim (FEMALE, looking for friend)
(6, 25, 'SUPER_LIKE'), -- super likes Lily Kim (FEMALE, looking for friend+coworker)
(6, 27, 'LIKE'),       -- likes Zoe Kim (FEMALE, looking for friend)
(6, 30, 'LIKE'),       -- likes Hannah Kim (FEMALE, looking for friend+coworker)

-- User 7 (Sophia Turner - FEMALE, looking for friend) reactions
(7, 2, 'LIKE'),        -- likes Jane Smith (fellow friend seeker)
(7, 4, 'SUPER_LIKE'),  -- super likes Chris Evans (MALE, looking for love+friend)
(7, 5, 'LIKE'),        -- likes Emily Clark (FEMALE, looking for friend+coworker)
(7, 9, 'LIKE'),        -- likes David Kim (MALE, looking for love+friend)
(7, 10, 'SUPER_LIKE'), -- super likes Olivia Park (FEMALE, looking for friend+coworker)
(7, 12, 'LIKE'),       -- likes Mia Lee (FEMALE, looking for friend)
(7, 14, 'LIKE'),       -- likes Ethan Kim (MALE, looking for love+friend)
(7, 15, 'SUPER_LIKE'), -- super likes Ava Lee (FEMALE, looking for friend+coworker)
(7, 17, 'LIKE'),       -- likes Ella Kim (FEMALE, looking for friend)
(7, 19, 'LIKE'),       -- likes Benjamin Park (MALE, looking for love+friend)

-- User 8 (Taylor Morgan - OTHER, looking for coworker) reactions
(8, 3, 'SUPER_LIKE'),  -- super likes Alex Kim back
(8, 5, 'LIKE'),        -- likes Emily Clark back
(8, 10, 'LIKE'),       -- likes Olivia Park
(8, 13, 'SUPER_LIKE'), -- super likes Jordan Lee (fellow OTHER coworker seeker)
(8, 15, 'LIKE'),       -- likes Ava Lee
(8, 18, 'SUPER_LIKE'), -- super likes Morgan Lee (fellow OTHER coworker seeker)
(8, 20, 'LIKE'),       -- likes Grace Kim
(8, 23, 'LIKE'),       -- likes Casey Lee (fellow OTHER coworker seeker)
(8, 25, 'LIKE'),       -- likes Lily Kim
(8, 28, 'SUPER_LIKE'), -- super likes Riley Kim (fellow OTHER coworker seeker)

-- User 9 (David Kim - MALE, looking for love+friend) reactions
(9, 2, 'SUPER_LIKE'),  -- super likes Jane Smith
(9, 4, 'LIKE'),        -- likes Chris Evans (fellow love+friend seeker)
(9, 5, 'LIKE'),        -- likes Emily Clark
(9, 7, 'SUPER_LIKE'),  -- super likes Sophia Turner
(9, 10, 'LIKE'),       -- likes Olivia Park
(9, 12, 'LIKE'),       -- likes Mia Lee
(9, 14, 'SUPER_LIKE'), -- super likes Ethan Kim (fellow love+friend seeker)
(9, 15, 'LIKE'),       -- likes Ava Lee
(9, 17, 'LIKE'),       -- likes Ella Kim
(9, 19, 'LIKE'),       -- likes Benjamin Park (fellow love+friend seeker)

-- User 10 (Olivia Park - FEMALE, looking for friend+coworker) reactions
(10, 1, 'LIKE'),       -- likes John Doe
(10, 3, 'SUPER_LIKE'), -- super likes Alex Kim
(10, 4, 'LIKE'),       -- likes Chris Evans
(10, 5, 'LIKE'),       -- likes Emily Clark (fellow friend+coworker)
(10, 7, 'SUPER_LIKE'), -- super likes Sophia Turner
(10, 8, 'LIKE'),       -- likes Taylor Morgan
(10, 9, 'LIKE'),       -- likes David Kim
(10, 13, 'LIKE'),      -- likes Jordan Lee
(10, 14, 'LIKE'),      -- likes Ethan Kim
(10, 15, 'SUPER_LIKE'), -- super likes Ava Lee (fellow friend+coworker)

-- Continue with more users following similar patterns...

-- User 11 (Daniel Choi - MALE, looking for love) reactions
(11, 12, 'SUPER_LIKE'), -- super likes Mia Lee (FEMALE, looking for friend)
(11, 15, 'LIKE'),       -- likes Ava Lee (FEMALE, looking for friend+coworker)
(11, 17, 'LIKE'),       -- likes Ella Kim (FEMALE, looking for friend)
(11, 20, 'SUPER_LIKE'), -- super likes Grace Kim (FEMALE, looking for friend+coworker)
(11, 22, 'LIKE'),       -- likes Chloe Kim (FEMALE, looking for friend)
(11, 25, 'LIKE'),       -- likes Lily Kim (FEMALE, looking for friend+coworker)
(11, 27, 'SUPER_LIKE'), -- super likes Zoe Kim (FEMALE, looking for friend)
(11, 30, 'LIKE'),       -- likes Hannah Kim (FEMALE, looking for friend+coworker)
(11, 32, 'LIKE'),       -- likes Sophie Kim (FEMALE, looking for friend)
(11, 35, 'DISLIKE'),    -- dislikes Layla Kim (FEMALE, looking for friend+coworker)

-- User 12 (Mia Lee - FEMALE, looking for friend) reactions
(12, 2, 'LIKE'),        -- likes Jane Smith (fellow friend seeker)
(12, 4, 'SUPER_LIKE'),  -- super likes Chris Evans
(12, 7, 'LIKE'),        -- likes Sophia Turner (fellow friend seeker)
(12, 9, 'LIKE'),        -- likes David Kim
(12, 11, 'LIKE'),       -- likes Daniel Choi back
(12, 14, 'SUPER_LIKE'), -- super likes Ethan Kim
(12, 17, 'LIKE'),       -- likes Ella Kim (fellow friend seeker)
(12, 19, 'LIKE'),       -- likes Benjamin Park
(12, 22, 'SUPER_LIKE'), -- super likes Chloe Kim (fellow friend seeker)
(12, 24, 'LIKE'),       -- likes Henry Kim

-- User 13 (Jordan Lee - OTHER, looking for coworker) reactions
(13, 3, 'SUPER_LIKE'),  -- super likes Alex Kim
(13, 5, 'LIKE'),        -- likes Emily Clark
(13, 8, 'LIKE'),        -- likes Taylor Morgan back
(13, 10, 'LIKE'),       -- likes Olivia Park
(13, 15, 'SUPER_LIKE'), -- super likes Ava Lee
(13, 18, 'LIKE'),       -- likes Morgan Lee
(13, 20, 'LIKE'),       -- likes Grace Kim
(13, 23, 'SUPER_LIKE'), -- super likes Casey Lee
(13, 25, 'LIKE'),       -- likes Lily Kim
(13, 28, 'LIKE'),       -- likes Riley Kim

-- User 14 (Ethan Kim - MALE, looking for love+friend) reactions
(14, 2, 'LIKE'),        -- likes Jane Smith
(14, 4, 'SUPER_LIKE'),  -- super likes Chris Evans (fellow love+friend)
(14, 5, 'LIKE'),        -- likes Emily Clark
(14, 7, 'LIKE'),        -- likes Sophia Turner
(14, 9, 'LIKE'),        -- likes David Kim (fellow love+friend)
(14, 10, 'SUPER_LIKE'), -- super likes Olivia Park
(14, 12, 'LIKE'),       -- likes Mia Lee
(14, 15, 'LIKE'),       -- likes Ava Lee
(14, 17, 'DISLIKE'),    -- dislikes Ella Kim
(14, 19, 'SUPER_LIKE'), -- super likes Benjamin Park (fellow love+friend)

-- User 15 (Ava Lee - FEMALE, looking for friend+coworker) reactions
(15, 3, 'LIKE'),        -- likes Alex Kim
(15, 5, 'SUPER_LIKE'),  -- super likes Emily Clark (fellow friend+coworker)
(15, 8, 'LIKE'),        -- likes Taylor Morgan
(15, 10, 'LIKE'),       -- likes Olivia Park (fellow friend+coworker)
(15, 13, 'LIKE'),       -- likes Jordan Lee
(15, 20, 'SUPER_LIKE'), -- super likes Grace Kim (fellow friend+coworker)
(15, 23, 'LIKE'),       -- likes Casey Lee
(15, 25, 'LIKE'),       -- likes Lily Kim (fellow friend+coworker)
(15, 28, 'LIKE'),       -- likes Riley Kim
(15, 30, 'SUPER_LIKE'), -- super likes Hannah Kim (fellow friend+coworker)

-- User 16 (Matthew Lee - MALE, looking for love) reactions
(16, 17, 'SUPER_LIKE'), -- super likes Ella Kim (FEMALE, looking for friend)
(16, 20, 'LIKE'),       -- likes Grace Kim (FEMALE, looking for friend+coworker)
(16, 22, 'LIKE'),       -- likes Chloe Kim (FEMALE, looking for friend)
(16, 25, 'SUPER_LIKE'), -- super likes Lily Kim (FEMALE, looking for friend+coworker)
(16, 27, 'LIKE'),       -- likes Zoe Kim (FEMALE, looking for friend)
(16, 30, 'LIKE'),       -- likes Hannah Kim (FEMALE, looking for friend+coworker)
(16, 32, 'SUPER_LIKE'), -- super likes Sophie Kim (FEMALE, looking for friend)
(16, 35, 'LIKE'),       -- likes Layla Kim (FEMALE, looking for friend+coworker)
(16, 37, 'LIKE'),       -- likes Isabella Choi (FEMALE, looking for friend)
(16, 40, 'DISLIKE'),    -- dislikes Madison Park (FEMALE, looking for friend+coworker)

-- User 17 (Ella Kim - FEMALE, looking for friend) reactions
(17, 2, 'SUPER_LIKE'),  -- super likes Jane Smith (fellow friend seeker)
(17, 4, 'LIKE'),        -- likes Chris Evans
(17, 7, 'LIKE'),        -- likes Sophia Turner (fellow friend seeker)
(17, 9, 'SUPER_LIKE'),  -- super likes David Kim
(17, 12, 'LIKE'),       -- likes Mia Lee (fellow friend seeker)
(17, 14, 'DISLIKE'),    -- dislikes Ethan Kim
(17, 16, 'LIKE'),       -- likes Matthew Lee back
(17, 19, 'LIKE'),       -- likes Benjamin Park
(17, 22, 'SUPER_LIKE'), -- super likes Chloe Kim (fellow friend seeker)
(17, 24, 'LIKE'),       -- likes Henry Kim

-- User 18 (Morgan Lee - OTHER, looking for coworker) reactions
(18, 3, 'LIKE'),        -- likes Alex Kim
(18, 5, 'SUPER_LIKE'),  -- super likes Emily Clark
(18, 8, 'LIKE'),        -- likes Taylor Morgan back
(18, 10, 'LIKE'),       -- likes Olivia Park
(18, 13, 'SUPER_LIKE'), -- super likes Jordan Lee
(18, 15, 'LIKE'),       -- likes Ava Lee
(18, 20, 'LIKE'),       -- likes Grace Kim
(18, 23, 'LIKE'),       -- likes Casey Lee
(18, 25, 'SUPER_LIKE'), -- super likes Lily Kim
(18, 28, 'LIKE'),       -- likes Riley Kim

-- User 19 (Benjamin Park - MALE, looking for love+friend) reactions
(19, 2, 'LIKE'),        -- likes Jane Smith
(19, 4, 'SUPER_LIKE'),  -- super likes Chris Evans (fellow love+friend)
(19, 7, 'LIKE'),        -- likes Sophia Turner
(19, 9, 'LIKE'),        -- likes David Kim (fellow love+friend)
(19, 10, 'SUPER_LIKE'), -- super likes Olivia Park
(19, 12, 'LIKE'),       -- likes Mia Lee
(19, 14, 'LIKE'),       -- likes Ethan Kim (fellow love+friend)
(19, 15, 'LIKE'),       -- likes Ava Lee
(19, 17, 'SUPER_LIKE'), -- super likes Ella Kim
(19, 20, 'LIKE'),       -- likes Grace Kim

-- User 20 (Grace Kim - FEMALE, looking for friend+coworker) reactions
(20, 1, 'LIKE'),        -- likes John Doe
(20, 3, 'LIKE'),        -- likes Alex Kim
(20, 5, 'SUPER_LIKE'),  -- super likes Emily Clark (fellow friend+coworker)
(20, 8, 'LIKE'),        -- likes Taylor Morgan
(20, 10, 'LIKE'),       -- likes Olivia Park (fellow friend+coworker)
(20, 13, 'SUPER_LIKE'), -- super likes Jordan Lee
(20, 15, 'LIKE'),       -- likes Ava Lee (fellow friend+coworker)
(20, 18, 'LIKE'),       -- likes Morgan Lee
(20, 25, 'SUPER_LIKE'), -- super likes Lily Kim (fellow friend+coworker)
(20, 30, 'LIKE'),       -- likes Hannah Kim (fellow friend+coworker)

-- Additional reactions for users 21-105 following similar patterns...

-- User 21 (Lucas Lee - MALE, looking for love) reactions
(21, 22, 'SUPER_LIKE'), -- super likes Chloe Kim (FEMALE, looking for friend)
(21, 25, 'LIKE'),       -- likes Lily Kim (FEMALE, looking for friend+coworker)
(21, 27, 'LIKE'),       -- likes Zoe Kim (FEMALE, looking for friend)
(21, 30, 'SUPER_LIKE'), -- super likes Hannah Kim (FEMALE, looking for friend+coworker)
(21, 32, 'LIKE'),       -- likes Sophie Kim (FEMALE, looking for friend)
(21, 35, 'LIKE'),       -- likes Layla Kim (FEMALE, looking for friend+coworker)
(21, 37, 'SUPER_LIKE'), -- super likes Isabella Choi (FEMALE, looking for friend)
(21, 40, 'LIKE'),       -- likes Madison Park (FEMALE, looking for friend+coworker)
(21, 42, 'LIKE'),       -- likes Charlotte Lee (FEMALE, looking for friend)
(21, 45, 'DISLIKE'),    -- dislikes Amelia Lee (FEMALE, looking for friend+coworker)

-- User 22 (Chloe Kim - FEMALE, looking for friend) reactions
(22, 1, 'LIKE'),        -- likes John Doe
(22, 4, 'SUPER_LIKE'),  -- super likes Chris Evans
(22, 7, 'LIKE'),        -- likes Sophia Turner (fellow friend seeker)
(22, 12, 'LIKE'),       -- likes Mia Lee (fellow friend seeker)
(22, 17, 'SUPER_LIKE'), -- super likes Ella Kim (fellow friend seeker)
(22, 19, 'LIKE'),       -- likes Benjamin Park
(22, 21, 'LIKE'),       -- likes Lucas Lee back
(22, 24, 'SUPER_LIKE'), -- super likes Henry Kim
(22, 26, 'LIKE'),       -- likes Jack Lee
(22, 29, 'LIKE'),       -- likes Samuel Kim

-- User 23 (Casey Lee - OTHER, looking for coworker) reactions
(23, 3, 'SUPER_LIKE'),  -- super likes Alex Kim
(23, 8, 'LIKE'),        -- likes Taylor Morgan
(23, 13, 'LIKE'),       -- likes Jordan Lee
(23, 18, 'SUPER_LIKE'), -- super likes Morgan Lee
(23, 28, 'LIKE'),       -- likes Riley Kim
(23, 33, 'SUPER_LIKE'), -- super likes Jamie Kim
(23, 38, 'LIKE'),       -- likes Avery Kim
(23, 43, 'LIKE'),       -- likes Quinn Park
(23, 48, 'SUPER_LIKE'), -- super likes Blake Lee
(23, 53, 'LIKE'),       -- likes Sage Kim

-- User 24 (Henry Kim - MALE, looking for love+friend) reactions
(24, 2, 'SUPER_LIKE'),  -- super likes Jane Smith
(24, 5, 'LIKE'),        -- likes Emily Clark
(24, 7, 'LIKE'),        -- likes Sophia Turner
(24, 10, 'SUPER_LIKE'), -- super likes Olivia Park
(24, 12, 'LIKE'),       -- likes Mia Lee
(24, 15, 'LIKE'),       -- likes Ava Lee
(24, 17, 'LIKE'),       -- likes Ella Kim
(24, 20, 'SUPER_LIKE'), -- super likes Grace Kim
(24, 22, 'LIKE'),       -- likes Chloe Kim
(24, 25, 'LIKE'),       -- likes Lily Kim

-- User 25 (Lily Kim - FEMALE, looking for friend+coworker) reactions
(25, 3, 'LIKE'),        -- likes Alex Kim
(25, 5, 'SUPER_LIKE'),  -- super likes Emily Clark (fellow friend+coworker)
(25, 8, 'LIKE'),        -- likes Taylor Morgan
(25, 10, 'LIKE'),       -- likes Olivia Park (fellow friend+coworker)
(25, 13, 'SUPER_LIKE'), -- super likes Jordan Lee
(25, 15, 'LIKE'),       -- likes Ava Lee (fellow friend+coworker)
(25, 18, 'LIKE'),       -- likes Morgan Lee
(25, 20, 'SUPER_LIKE'), -- super likes Grace Kim (fellow friend+coworker)
(25, 23, 'LIKE'),       -- likes Casey Lee
(25, 28, 'LIKE'),       -- likes Riley Kim

-- Continue adding more reactions for remaining users...
-- Users 26-105 would follow similar patterns based on their preferences

-- Some reverse reactions to create mutual matches
(26, 21, 'LIKE'),       -- Jack Lee likes Lucas Lee back
(27, 16, 'SUPER_LIKE'), -- Zoe Kim super likes Matthew Lee back
(28, 3, 'LIKE'),        -- Riley Kim likes Alex Kim
(29, 22, 'SUPER_LIKE'), -- Samuel Kim super likes Chloe Kim back
(30, 11, 'LIKE'),       -- Hannah Kim likes Daniel Choi back
(32, 11, 'SUPER_LIKE'), -- Sophie Kim super likes Daniel Choi back
(35, 16, 'DISLIKE'),    -- Layla Kim dislikes Matthew Lee back
(37, 21, 'LIKE'),       -- Isabella Choi likes Lucas Lee back
(40, 16, 'DISLIKE'),    -- Madison Park dislikes Matthew Lee back
(42, 21, 'SUPER_LIKE'), -- Charlotte Lee super likes Lucas Lee back
(45, 21, 'DISLIKE'),    -- Amelia Lee dislikes Lucas Lee back

-- Add some random additional reactions
(50, 49, 'SUPER_LIKE'), -- Evelyn Kim super likes Caleb Park
(51, 52, 'LIKE'),       -- Ian Lee likes Abigail Park
(54, 55, 'SUPER_LIKE'), -- Landon Lee super likes Elizabeth Park
(56, 57, 'LIKE'),       -- Wyatt Kim likes Scarlett Lee
(59, 60, 'SUPER_LIKE'), -- Luke Kim super likes Victoria Lee
(61, 62, 'LIKE'),       -- Owen Park likes Aria Kim
(64, 65, 'SUPER_LIKE'), -- Gabriel Park super likes Luna Kim
(66, 67, 'LIKE'),       -- Grayson Lee likes Stella Park
(69, 70, 'SUPER_LIKE'), -- Lincoln Lee super likes Hazel Park
(71, 72, 'LIKE'),       -- Isaiah Kim likes Violet Lee
(74, 75, 'SUPER_LIKE'), -- Thomas Kim super likes Ivy Lee
(76, 77, 'LIKE'),       -- Eli Park likes Aurora Kim
(79, 80, 'SUPER_LIKE'), -- Levi Park super likes Savannah Kim
(81, 82, 'LIKE'),       -- Mason Lee likes Skylar Park
(84, 85, 'SUPER_LIKE'), -- Asher Lee super likes Brooklyn Park
(86, 87, 'LIKE'),       -- Carson Kim likes Paisley Lee
(89, 90, 'SUPER_LIKE'), -- Axel Kim super likes Piper Lee
(91, 92, 'LIKE'),       -- Miles Park likes Ruby Kim
(94, 95, 'SUPER_LIKE'), -- Easton Park super likes Alice Kim
(96, 97, 'LIKE'),       -- Adrian Lee likes Genesis Park
(99, 100, 'SUPER_LIKE'), -- Colton Lee super likes Serenity Park
(101, 102, 'LIKE'),     -- Jaxon Kim likes Willow Lee
(104, 105, 'SUPER_LIKE'), -- Ryder Kim super likes Athena Lee
(106, 1, 'LIKE');       -- William Lee likes John Doe