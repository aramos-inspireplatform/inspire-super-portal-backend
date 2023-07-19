ALTER TABLE public.tenants ADD COLUMN google_tenant_id varchar(100) NULL;
-- ddl-end --
UPDATE public.tenants SET google_tenant_id = tenant_id;
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN google_tenant_id SET NOT NULL;
-- ddl-end --
COMMENT ON COLUMN public.tenants.google_tenant_id IS E'The google tenant id. It is the same ID from tenants.googleTenantId of tenant module database.';
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN agencies_id uuid;
-- ddl-end --
COMMENT ON COLUMN public.tenants.agencies_id IS E'The agency ID. It is the same ID from agencies.id of tenant module database.';
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN agency_name varchar(200);
-- ddl-end --
COMMENT ON COLUMN public.tenants.agency_name IS E'The agency name. It is the same name from agencies.name of tenant module database.';
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN terms_recurring_interval_count smallint NULL;
-- ddl-end --
UPDATE public.tenants SET terms_recurring_interval_count = 30;
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN terms_recurring_interval_count SET NOT NULL;
-- ddl-end --
COMMENT ON COLUMN public.tenants.terms_recurring_interval_count IS E'The terms recurring interval count.';
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN terms_recurring_intervals_id uuid NULL;
-- ddl-end --
UPDATE public.tenants SET terms_recurring_intervals_id = '9f001db6-3297-4146-bbd3-971d6c54f28b'; --month
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN terms_recurring_intervals_id SET NOT NULL;
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN tenant_statuses_id uuid NULL;
-- ddl-end --
UPDATE public.tenants SET tenant_statuses_id = tenant_status_id;
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN tenant_statuses_id SET NOT NULL;
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN total_paid_amount numeric(15,6) NULL;
-- ddl-end --
UPDATE public.tenants SET total_paid_amount = 0;
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN total_paid_amount SET NOT NULL;
-- ddl-end --
COMMENT ON COLUMN public.tenants.total_paid_amount IS E'The total paid amount.';
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN last_tenant_payouts_id uuid;
-- ddl-end --

COMMENT ON COLUMN public.tenants.id IS E'The unique identifier for the object. It is the same ID from tenants.id of tenant module database.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.name IS E'The tenant name. It is the same name from tenants.name of tenant module database.';
-- ddl-end --

ALTER TABLE public.tenant_statuses ALTER COLUMN name TYPE varchar(50);
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.name IS E'The tenant status name. Possible values are Active and Inactive.';
-- ddl-end --

ALTER TABLE public.tenant_statuses ADD COLUMN slug varchar(50) NULL;
-- ddl-end --
UPDATE public.tenant_statuses SET slug = 'active' WHERE id = 'a217e218-a723-4659-8f3d-9f218310655b'; -- name = 'Active';
-- sql-end --
UPDATE public.tenant_statuses SET slug = 'pending' WHERE id = '8e119286-dd47-4430-aec1-77fe50c6766b'; -- name = 'Pending';
-- sql-end --
INSERT INTO public.tenant_statuses (id, "name", slug, created_date, updated_date, deleted_date) VALUES('5a8f1c1e-1252-4cfe-9f80-24a0a99f7350', 'Inactive', 'inactive', CURRENT_TIMESTAMP, NULL, NULL);
-- sql-end --
ALTER TABLE public.tenant_statuses ALTER COLUMN slug SET NOT NULL;
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.slug IS E'The tenant status slug. Possible values are Active = active and Inactive = inactive.';
-- ddl-end --

COMMENT ON COLUMN public.tenant_statuses.id IS E'The unique identifier for the object. The same ID from tenantStatuses.id from Tenant Module database.';
-- ddl-end --

CREATE TABLE public.users (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1 ),
	first_name varchar(100) NOT NULL,
	last_name varchar(200) NOT NULL,
	email varchar(300) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__templates_cp PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.users.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.users.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.users.first_name IS E'The user first name.';
-- ddl-end --
COMMENT ON COLUMN public.users.last_name IS E'The user last name.';
-- ddl-end --
COMMENT ON COLUMN public.users.email IS E'The user email.';
-- ddl-end --
COMMENT ON COLUMN public.users.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.users.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.users.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --

CREATE TABLE public.recurring_intervals (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1 ),
	name varchar(50) NOT NULL,
	"interval" varchar(10) NOT NULL,
	is_active boolean NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__recurring_intervals PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.recurring_intervals.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.recurring_intervals.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.recurring_intervals.name IS E'The name of the frequency at which a subscription is billed. Days, Weeks, Months or Years.';
-- ddl-end --
COMMENT ON COLUMN public.recurring_intervals."interval" IS E'The frequency at which a subscription is billed. Possible values are Days = day, Weeks = week, Months = month or Years = year.';
-- ddl-end --
COMMENT ON COLUMN public.recurring_intervals.is_active IS E'Whether the recurring interval can be used for new product price configurations.';
-- ddl-end --
COMMENT ON COLUMN public.recurring_intervals.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.recurring_intervals.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.recurring_intervals.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --

INSERT INTO recurring_intervals (id, "name", "interval", is_active, created_date, updated_date, deleted_date) VALUES('cd44a946-bfdd-4370-b2cc-1b3f0df311fd', 'Daily', 'day', true, CURRENT_TIMESTAMP, NULL, NULL);
-- sql-end --
INSERT INTO recurring_intervals (id, "name", "interval", is_active, created_date, updated_date, deleted_date) VALUES('bad52bb2-a8e9-4928-8bfe-7bf66f46c819', 'Weekly', 'week', true, CURRENT_TIMESTAMP, NULL, NULL);
-- sql-end --
INSERT INTO recurring_intervals (id, "name", "interval", is_active, created_date, updated_date, deleted_date) VALUES('9f001db6-3297-4146-bbd3-971d6c54f28b', 'Monthly', 'month', true, CURRENT_TIMESTAMP, NULL, NULL);
-- sql-end --
INSERT INTO recurring_intervals (id, "name", "interval", is_active, created_date, updated_date, deleted_date) VALUES('096ccea5-f8e1-46ae-a9dc-9335c41b306c', 'Yearly', 'year', true, CURRENT_TIMESTAMP, NULL, NULL);
-- sql-end --

CREATE UNIQUE INDEX idx__uq__recurring_intervals ON public.recurring_intervals
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__recurring_intervals ON public.recurring_intervals
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__tenants ON public.tenants
USING btree
(
	google_tenant_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__tenants ON public.tenants
USING btree
(
	google_tenant_id
)
WHERE (deleted_date is null);
-- ddl-end --

CREATE INDEX idx__tenants__agencies_id ON public.tenants
USING btree
(
	agencies_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

CREATE TABLE public.tenant_balances (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1 ),
	tenants_id uuid NOT NULL,
	settlement_currencies_id uuid NOT NULL,
	amount numeric(15,6) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__tenant_balances PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.tenant_balances.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_balances.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_balances.amount IS E'The tenant balance amount.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_balances.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_balances.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_balances.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --

CREATE TABLE public.currencies (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1 ),
	name varchar(50) NOT NULL,
	symbol varchar(5) NOT NULL,
	iso_code varchar(3) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__currencies PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.currencies.id IS E'The unique identifier for the object. The same ID from currencies.id from Payment Module database.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.name IS E'The name of the currency. Examples: Dolar for US, Euro for Europe and Real for Brazil.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.symbol IS E'The symbol of the currency. Examples: $ for Dolar/US, € for Euro/Europe and R$ for Real/Brazil.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.iso_code IS E'Three-letter ISO currency code, in lowercase. Must be a supported currency.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --

INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('0cea1993-1b24-41e7-88dc-5a330f1f5af1', 'Algerian dinar', 'د.ج ', 'DZD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('9780bf8c-ceb9-48cb-b466-2b266b432381', 'Jordanian dinar', 'د.ا', 'JOD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('777bf366-a4f1-4f67-bfbd-2ec60299f701', 'Moroccan dirham', 'د.م.', 'MAD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('a577feda-7dac-4f57-b5f6-804a48b590b7', 'Australian dollar', '$', 'AUD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('abfccbea-86e0-4043-a8be-9cb366d7c462', 'Brunei dollar', '$', 'BND', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('8cbc40b5-e2ee-465a-9b7a-ab2622dc1608', 'Eastern Caribbean dollar', '$', 'XCD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('ba403c20-fba6-4868-b82f-7309b021c597', 'Hong Kong dollar', '$', 'HKD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('ab89d7c2-5f42-4b79-aee9-ce8afa565d5b', 'New Zealand dollar', '$', 'NZD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('29fce250-b905-4698-97f2-74aec52fcf2b', 'Singapore dollar', '$', 'SGD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('ef579caf-a6da-4d53-80cb-a67bf4742a3e', 'United States dollar', '$', 'USD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('74fe1c4b-2f3b-4a70-8e98-01e5d04e858f', 'Armenian dram', '֏', 'AMD', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('500fc160-a08b-4d89-903d-e41109144e8e', 'Euro', '€', 'EUR', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('a2c9c150-2b30-44d3-9752-98254a2d3d84', 'Central African CFA franc', 'Fr', 'XAF', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('40d50fe0-803a-43fb-988a-9cd831ab3a80', 'CFP franc', '₣', 'XPF', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('13e3e2f4-2dd6-4ef5-bd29-41f46443abe1', 'Swiss franc', 'Fr.', 'CHF', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('2fdd715b-52d5-4717-a028-e2486953a725', 'West African CFA franc', 'Fr', 'XOF', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('826d1f47-d335-4196-8a58-48990e480291', 'Netherlands Antillean guilder', 'ƒ', 'ANG', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('05a65961-7d11-419a-9e5c-630cb0dd83e0', 'Danish krone', 'kr', 'DKK', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('469e2fc7-4b8e-4a7e-a223-83e7a3d42fa0', 'Turkish lira', '₺', 'TRY', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('5805ea18-a0c4-4efe-b62d-f347989d6822', 'Mauritanian ouguiya', 'UM', 'MRU', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('e81e4869-7663-4b1b-ac84-5fb925c83de5', 'British pound', '£', 'GBP', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('ca3c4043-9141-47d0-9977-d9023c07fae0', 'Guernsey pound', '£', 'GGP', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('cec5472c-a5d6-41b6-bb22-25b73267b373', 'Saint Helena pound', '£', 'SHP', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('ef021472-98d8-4fb3-a415-dfacf56f66a1', 'South African rand', 'R', 'ZAR', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('49d28ff7-1331-4e6a-9ebf-4d8b0b831ad6', 'Russian ruble', '₽', 'RUB', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('4f196287-5692-4121-ad96-ddf2f99f68f3', 'Indian rupee', '₹', 'INR', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('07725b33-f3a5-4189-8cbf-e6bd03434d97', 'Israeli new shekel', '₪', 'ILS', CURRENT_TIMESTAMP, NULL, NULL);
INSERT INTO currencies (id, "name", symbol, iso_code, created_date, updated_date, deleted_date) VALUES('bb2d5ae7-e161-4f24-a0fc-435b1f5f6ac2', 'Brazilian Real', 'R$', 'BRL', CURRENT_TIMESTAMP, NULL, NULL);

CREATE UNIQUE INDEX idx__uq__currencies ON public.currencies
USING btree
(
	iso_code,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__currencies ON public.currencies
USING btree
(
	iso_code
)
WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__tenant_balances ON public.tenant_balances
USING btree
(
	tenants_id,
	settlement_currencies_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__tenant_balances ON public.tenant_balances
USING btree
(
	tenants_id,
	settlement_currencies_id
)
WHERE (deleted_date is null);
-- ddl-end --

CREATE TABLE public.tenant_payouts (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1 ),
	tenants_id uuid NOT NULL,
	payout_statuses_id uuid NOT NULL,
	payout_alternative_id bigint NOT NULL,
	period_start_date date NOT NULL,
	period_end_date date NOT NULL,
	amount numeric(15,6) NOT NULL,
	terms_recurring_interval_count smallint NOT NULL,
	terms_recurring_intervals_id uuid NOT NULL,
	customer_gross_amount numeric(15,6) NOT NULL,
	customer_fee_amount numeric(15,6) NOT NULL,
	payment_gateway_net_amount numeric(15,6) NOT NULL,
	settlement_currencies_id uuid NOT NULL,
	expected_arrival_date date,
	processed_date timestamp with time zone,
	processor_users_id uuid,
	created_date timestamp with time zone NOT NULL,
	creator_users_id uuid NOT NULL,
	updated_date timestamp with time zone,
	updater_users_id uuid,
	deleted_date timestamp with time zone,
	deleter_users_id uuid,
	CONSTRAINT pk__tenant_payouts PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.id IS E'The unique identifier for the object. The same ID from payouts.id of Payment Module database.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.payout_alternative_id IS E'The payout alternative ID. Same ID from payouts.alternative_id from Payment Module database.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.period_start_date IS E'The payout period start date.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.period_end_date IS E'The payout period end date.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.amount IS E'The payout amount.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.terms_recurring_interval_count IS E'The tenant payout terms recurring interval count.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.customer_gross_amount IS E'The tenant payout customer gross amount.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.customer_fee_amount IS E'The tenant payout customer fee amount.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.payment_gateway_net_amount IS E'The tenant payout payment gateway net amount.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.expected_arrival_date IS E'The tenant payout expected arrival date. It is filled when the payout is updated to Paid.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.processed_date IS E'The date the payout was updated to Processed.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --

CREATE TABLE public.payout_statuses (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1 ),
	name varchar(50) NOT NULL,
	slug varchar(50) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__payout_statuses PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.payout_statuses.id IS E'The unique identifier for the object. The same ID from payout_statuses.id from Payment Module database.';
-- ddl-end --
COMMENT ON COLUMN public.payout_statuses.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.payout_statuses.name IS E'The payout status name. The same name from payout_statuses.name of Payment Module database.';
-- ddl-end --
COMMENT ON COLUMN public.payout_statuses.slug IS E'The payout status slug. The same slug from payout_statuses.slug of Payment Module database.';
-- ddl-end --
COMMENT ON COLUMN public.payout_statuses.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.payout_statuses.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.payout_statuses.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__payout_statuses ON public.payout_statuses
USING btree
(
	slug,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__payout_statuses ON public.payout_statuses
USING btree
(
	slug
)
WHERE (deleted_date is null);
-- ddl-end --

ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS fk__tenant_statuses__tenants CASCADE;
-- ddl-end --

ALTER TABLE public.tenants ADD CONSTRAINT fk__recurring_intervals__tenants FOREIGN KEY (terms_recurring_intervals_id)
REFERENCES public.recurring_intervals (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_balances ADD CONSTRAINT fk__tenants__tenant_balances FOREIGN KEY (tenants_id)
REFERENCES public.tenants (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_balances ADD CONSTRAINT fk__currencies__tenant_balances FOREIGN KEY (settlement_currencies_id)
REFERENCES public.currencies (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__tenants__tenant_payouts FOREIGN KEY (tenants_id)
REFERENCES public.tenants (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__payout_statuses__tenant_payouts FOREIGN KEY (payout_statuses_id)
REFERENCES public.payout_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__recurring_intervals__tenant_payouts FOREIGN KEY (terms_recurring_intervals_id)
REFERENCES public.recurring_intervals (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__currencies__tenant_payouts FOREIGN KEY (settlement_currencies_id)
REFERENCES public.currencies (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__users__tenant_payouts__processor FOREIGN KEY (processor_users_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__users__tenant_payouts__creator FOREIGN KEY (creator_users_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__users__tenant_payouts__updater FOREIGN KEY (updater_users_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenants ADD CONSTRAINT fk__tenant_payouts__tenants FOREIGN KEY (last_tenant_payouts_id)
REFERENCES public.tenant_payouts (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenants ADD CONSTRAINT fk__tenant_statuses__tenants FOREIGN KEY (tenant_statuses_id)
REFERENCES public.tenant_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__users__tenant_payouts__deleter FOREIGN KEY (deleter_users_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

DROP INDEX IF EXISTS public.idx__tenants__tenant_status_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__tenants__tenant_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__tenants__tenant_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__tenants__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__tenants__name CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS tenant_id CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS integration_code CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS tenant_status_id CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS created_by_user_id CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS created_by_user_email CASCADE;
-- ddl-end --

INSERT INTO payout_statuses (id, "name", slug, created_date, updated_date, deleted_date) VALUES('a2a07174-dfe0-47b7-a43c-d63cea41681f', 'Draft', 'draft', CURRENT_TIMESTAMP, null, null);
INSERT INTO payout_statuses (id, "name", slug, created_date, updated_date, deleted_date) VALUES('2eca46d3-40e3-4555-afa6-d8d52b04fa2e', 'Processed', 'processed', CURRENT_TIMESTAMP, null, null);
INSERT INTO payout_statuses (id, "name", slug, created_date, updated_date, deleted_date) VALUES('6f1342e6-af0e-4642-8e56-cec2efb2303d', 'Paid', 'paid', CURRENT_TIMESTAMP, null, null);
INSERT INTO payout_statuses (id, "name", slug, created_date, updated_date, deleted_date) VALUES('da7327cb-d6bd-4381-8763-6085b6699f40', 'Canceled', 'canceled', CURRENT_TIMESTAMP, null, null);
INSERT INTO payout_statuses (id, "name", slug, created_date, updated_date, deleted_date) VALUES('e9d9daa0-212d-4da4-8ca7-416bdb40aaed', 'Deleted', 'deleted', CURRENT_TIMESTAMP, null, null);
