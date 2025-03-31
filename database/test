-- Create the tables before inserting data
CREATE TABLE IF NOT EXISTS table_of_tables (
    table_name VARCHAR(100) PRIMARY KEY,
    description TEXT
);

CREATE TABLE IF NOT EXISTS table_of_columns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name VARCHAR(100),
    column_name VARCHAR(100),
    description TEXT,
    FOREIGN KEY (table_name) REFERENCES table_of_tables(table_name)
);


delete from table_of_tables;
delete from table_of_columns;
-- Now proceed with the existing insert statements
insert into table_of_tables (table_name, description)
values 
('Kunde_tabel', 'description of table 1'),
('Items_tabel', 'description of table 2'),
('Adresse_tabel', 'description of table 4');

insert into table_of_columns (table_name, column_name, description) 
values 
('Kunde_tabel', 'Kunde_id', 'description of column 1'),
('Kunde_tabel', 'Kunde_navn', 'description of column 2'),
('Kunde_tabel', 'Kunde_adresse', 'description of column 3'),
('Kunde_tabel', 'Kunde_postnummer', 'description of column 4'),
('Kunde_tabel', 'Kunde_telefonnummer', 'description of column 5'),
('Kunde_tabel', 'Kunde_email', 'description of column 6'),
('Kunde_tabel', 'Kunde_kredit', 'description of column 7'),
('Kunde_tabel', 'Kunde_kredit_limit', 'description of column 8'),
('Kunde_tabel', 'Kunde_kredit_status', 'description of column 9'),
('Kunde_tabel', 'Kunde_kredit_opdateret', 'description of column 10'),
('Kunde_tabel', 'Kunde_kredit_opdateret_af', 'description of column 11'),
('Kunde_tabel', 'Kunde_kredit_opdateret_dato', 'description of column 12'),
('Kunde_tabel', 'Kunde_kredit_opdateret_tid', 'description of column 13'),
('Items_tabel', 'Produkt1', ''),
('Items_tabel', 'produkt_egenskabeer', ''),
('Items_tabel', 'pris', ''),
('Adresse_tabel', 'vejnavn', ''),
('Adresse_tabel', 'husnummer', ''),
('Adresse_tabel', 'postnummer', ''),
('Adresse_tabel', 'by', '');

-- USER RELATED TABLES
insert into table_of_tables (table_name, description)
values 
('Bruger_tabel', 'Contains user account information'),
('Bruger_rolle_tabel', 'User roles and permissions'),
('Login_historik_tabel', 'User login history'),
('Bruger_profil_tabel', 'Extended user profile information'),
('Bruger_præferencer_tabel', 'User preferences and settings');

-- PRODUCT RELATED TABLES
insert into table_of_tables (table_name, description)
values 
('Produkt_tabel', 'Main product information'),
('Produkt_kategori_tabel', 'Product categories'),
('Produkt_billede_tabel', 'Product images'),
('Produkt_review_tabel', 'Product reviews from users'),
('Lager_tabel', 'Product inventory information'),
('Produkt_variant_tabel', 'Product variants like sizes and colors'),
('Produkt_tag_tabel', 'Product tags for search and filtering'),
('Mærke_tabel', 'Product brands'),
('Produkt_specifikation_tabel', 'Detailed product specifications'),
('Rabat_tabel', 'Product discounts and promotions');

-- ORDER RELATED TABLES
insert into table_of_tables (table_name, description)
values 
('Ordre_tabel', 'Order header information'),
('Ordre_linje_tabel', 'Order line items'),
('Ordre_status_tabel', 'Order status types'),
('Betaling_tabel', 'Payment information'),
('Forsendelse_tabel', 'Shipping information'),
('Returvare_tabel', 'Product returns'),
('Faktura_tabel', 'Invoice information');

-- CONTENT RELATED TABLES
insert into table_of_tables (table_name, description)
values 
('Artikel_tabel', 'Blog articles and content'),
('Kommentar_tabel', 'Comments on content'),
('Medie_tabel', 'Media files storage'),
('Side_tabel', 'Website pages'),
('Blog_tabel', 'Blog posts'),
('Forfatter_tabel', 'Content authors');

-- MARKETING RELATED TABLES
insert into table_of_tables (table_name, description)
values 
('Kampagne_tabel', 'Marketing campaigns'),
('Nyhedsbrev_tabel', 'Newsletter subscriptions'),
('Kupon_tabel', 'Coupon codes'),
('Annonce_tabel', 'Advertisement data');

-- SUPPORT RELATED TABLES
insert into table_of_tables (table_name, description)
values 
('Support_ticket_tabel', 'Customer support tickets'),
('FAQ_tabel', 'Frequently asked questions'),
('Kontakt_besked_tabel', 'Contact form messages');

-- ANALYTICS RELATED TABLES
insert into table_of_tables (table_name, description)
values 
('Besøg_tabel', 'Site visits'),
('Bruger_aktivitet_tabel', 'User activity tracking'),
('Søgning_tabel', 'Search queries');

-- ANALYTICS RELATED COLUMNS
insert into table_of_columns (table_name, column_name, description)
values
('Besøg_tabel', 'besøg_id', 'Unique identifier for site visits'),
('Besøg_tabel', 'besøgende_id', 'Visitor identifier (cookie/session based)'),
('Besøg_tabel', 'bruger_id', 'Reference to user if logged in'),
('Besøg_tabel', 'ip_adresse', 'Visitor IP address'),
('Besøg_tabel', 'start_tidspunkt', 'Visit start timestamp'),
('Besøg_tabel', 'slut_tidspunkt', 'Visit end timestamp'),
('Besøg_tabel', 'enhed', 'Device information'),
('Besøg_tabel', 'browser', 'Browser information'),
('Besøg_tabel', 'referer_url', 'Referring URL'),
('Besøg_tabel', 'landing_side', 'First page visited'),

('Bruger_aktivitet_tabel', 'aktivitet_id', 'Unique identifier for activities'),
('Bruger_aktivitet_tabel', 'bruger_id', 'Reference to user'),
('Bruger_aktivitet_tabel', 'besøg_id', 'Reference to visit'),
('Bruger_aktivitet_tabel', 'aktivitet_type', 'Type of activity'),
('Bruger_aktivitet_tabel', 'aktivitet_data', 'JSON with activity details'),
('Bruger_aktivitet_tabel', 'side_url', 'URL where activity occurred'),
('Bruger_aktivitet_tabel', 'tidspunkt', 'Activity timestamp'),
('Bruger_aktivitet_tabel', 'varighed_sekunder', 'Duration of activity'),

('Søgning_tabel', 'søgning_id', 'Unique identifier for searches'),
('Søgning_tabel', 'bruger_id', 'Reference to user if logged in'),
('Søgning_tabel', 'besøg_id', 'Reference to visit'),
('Søgning_tabel', 'søgeord', 'Search query text'),
('Søgning_tabel', 'kategori', 'Category filter if any'),
('Søgning_tabel', 'filtre', 'JSON with applied filters'),
('Søgning_tabel', 'antal_resultater', 'Number of search results'),
('Søgning_tabel', 'tidspunkt', 'Search timestamp'),
('Søgning_tabel', 'klik_på_resultater', 'Which results were clicked');

-- BUSINESS RELATED TABLES
insert into table_of_tables (table_name, description)
values 
('Leverandør_tabel', 'Supplier information'),
('Medarbejder_tabel', 'Employee information'),
('Afdeling_tabel', 'Department information'),
('Filial_tabel', 'Branch location information'),
('Projekt_tabel', 'Project management'),
('Opgave_tabel', 'Task tracking'),
('Tidsregistrering_tabel', 'Time tracking'),
('Budget_tabel', 'Budget planning'),
('Regnskab_tabel', 'Accounting records'),
('Dokument_tabel', 'Document management'),
('Kontrakt_tabel', 'Contract information'),
('Kalender_tabel', 'Calendar events'),
('Notifikation_tabel', 'User notifications');

-- USER RELATED COLUMNS
insert into table_of_columns (table_name, column_name, description)
values
('Bruger_tabel', 'bruger_id', 'Unique identifier for users'),
('Bruger_tabel', 'brugernavn', 'Username for login'),
('Bruger_tabel', 'email', 'User email address'),
('Bruger_tabel', 'kodeord_hash', 'Hashed password'),
('Bruger_tabel', 'oprettet_dato', 'Account creation date'),
('Bruger_tabel', 'sidst_logget_ind', 'Last login timestamp'),
('Bruger_tabel', 'aktiv', 'Whether the account is active'),
('Bruger_tabel', 'bekræftet_email', 'Whether email is verified'),

('Bruger_rolle_tabel', 'rolle_id', 'Unique identifier for roles'),
('Bruger_rolle_tabel', 'bruger_id', 'Reference to user'),
('Bruger_rolle_tabel', 'rolle_navn', 'Name of the role'),
('Bruger_rolle_tabel', 'tilladelser', 'JSON of permissions'),

('Login_historik_tabel', 'historik_id', 'Unique identifier for login events'),
('Login_historik_tabel', 'bruger_id', 'Reference to user'),
('Login_historik_tabel', 'login_tidspunkt', 'Login timestamp'),
('Login_historik_tabel', 'ip_adresse', 'IP address of login'),
('Login_historik_tabel', 'enhed', 'Device information'),

('Bruger_profil_tabel', 'profil_id', 'Unique identifier for user profiles'),
('Bruger_profil_tabel', 'bruger_id', 'Reference to user'),
('Bruger_profil_tabel', 'fornavn', 'First name'),
('Bruger_profil_tabel', 'efternavn', 'Last name'),
('Bruger_profil_tabel', 'fødselsdato', 'Date of birth'),
('Bruger_profil_tabel', 'køn', 'Gender'),
('Bruger_profil_tabel', 'profilbillede_url', 'Profile picture URL'),
('Bruger_profil_tabel', 'biografi', 'User biography'),

('Bruger_præferencer_tabel', 'præference_id', 'Unique identifier for preferences'),
('Bruger_præferencer_tabel', 'bruger_id', 'Reference to user'),
('Bruger_præferencer_tabel', 'tema', 'UI theme preference'),
('Bruger_præferencer_tabel', 'sprog', 'Language preference'),
('Bruger_præferencer_tabel', 'notifikationer_aktiv', 'Notification settings'),
('Bruger_præferencer_tabel', 'nyhedsbrev_tilmeldt', 'Newsletter subscription status');

-- PRODUCT RELATED COLUMNS
insert into table_of_columns (table_name, column_name, description)
values
('Produkt_tabel', 'produkt_id', 'Unique identifier for products'),
('Produkt_tabel', 'produkt_navn', 'Product name'),
('Produkt_tabel', 'beskrivelse', 'Product description'),
('Produkt_tabel', 'pris', 'Current price'),
('Produkt_tabel', 'oprettet_dato', 'Creation date'),
('Produkt_tabel', 'opdateret_dato', 'Last update date'),
('Produkt_tabel', 'vægt', 'Product weight'),
('Produkt_tabel', 'mål', 'Product dimensions'),
('Produkt_tabel', 'aktiv', 'Whether product is active'),
('Produkt_tabel', 'mærke_id', 'Reference to brand'),
('Produkt_tabel', 'kategori_id', 'Primary category');

-- Uncomment these lines if you need to clear the tables
-- delete from table_of_tables;
-- delete from table_of_columns;

select * from table_of_tables
