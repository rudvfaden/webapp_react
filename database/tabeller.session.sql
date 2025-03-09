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

-- Uncomment these lines if you need to clear the tables
-- delete from table_of_tables;
-- delete from table_of_columns;

select * from table_of_columns
where table_name = 'Items_tabel';