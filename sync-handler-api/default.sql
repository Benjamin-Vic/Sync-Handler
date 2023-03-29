INSERT INTO "rank"(name, prefix, suffix, chat_color)
SELECT 'default', null, null, 'gray'
WHERE NOT EXISTS (SELECT * FROM "rank");

INSERT INTO "user"(name, email, password)
SELECT 'Default', 'contact@alwan.fr', '$2a$10$4LIxW3mKGrtV3bZjnQ73JuVMeC.Duv8jl20u/9ljz9044Z1r9cEiW'
WHERE NOT EXISTS (SELECT * FROM "user");
