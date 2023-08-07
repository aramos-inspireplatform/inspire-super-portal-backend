ALTER TABLE public.tenants ADD COLUMN tenant_id character varying(300) NULL;
-- ddl-end --
UPDATE public.tenants SET tenant_id = google_tenant_id;
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN tenant_id SET NOT NULL;
-- ddl-end --
COMMENT ON COLUMN public.tenants.tenant_id IS E'The tenant id generated by the tenant module.';
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN tenant_status_id uuid NULL;
-- ddl-end --
UPDATE public.tenants SET tenant_status_id = tenant_statuses_id;
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN tenant_status_id SET NOT NULL;
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN integration_code character varying(50);
-- ddl-end --
COMMENT ON COLUMN public.tenants.integration_code IS E'The tenant integration code.';
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN created_by_user_id character varying(300) NULL;
-- ddl-end --
UPDATE public.tenants SET created_by_user_id = 'undefined';
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN created_by_user_id SET NOT NULL;
-- ddl-end --
COMMENT ON COLUMN public.tenants.created_by_user_id IS E'The tenant creator user id.';
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN created_by_user_email character varying(300) NULL;
-- ddl-end --
UPDATE public.tenants SET created_by_user_email = 'undefined';
-- sql-end --
ALTER TABLE public.tenants ALTER COLUMN created_by_user_email SET NOT NULL;
-- ddl-end --
COMMENT ON COLUMN public.tenants.created_by_user_email IS E'The tenant creator user email.';
-- ddl-end --

ALTER TABLE public.tenant_statuses ALTER COLUMN name TYPE character varying(200);
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.name IS '';
-- ddl-end --

COMMENT ON COLUMN public.tenants.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.name IS E'The tenant name.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.id IS E'The unique identifier for the object.';
-- ddl-end --

ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__users__tenant_payouts__deleter CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS fk__tenant_payouts__tenants CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS fk__tenant_statuses__tenants CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__users__tenant_payouts__updater CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__users__tenant_payouts__creator CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__users__tenant_payouts__processor CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__currencies__tenant_payouts CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__recurring_intervals__tenant_payouts CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__payout_statuses__tenant_payouts CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__tenants__tenant_payouts CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_balances DROP CONSTRAINT IF EXISTS fk__currencies__tenant_balances CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_balances DROP CONSTRAINT IF EXISTS fk__tenants__tenant_balances CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS fk__recurring_intervals__tenants CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__payout_statuses CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__payout_statuses CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS public.payout_statuses CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS public.tenant_payouts CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__tenant_balances CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__tenant_balances CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__currencies CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__currencies CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS public.currencies CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS public.tenant_balances CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__tenants__agencies_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__tenants CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__tenants CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__recurring_intervals CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__recurring_intervals CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS public.recurring_intervals CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS public.users CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS google_tenant_id CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS agencies_id CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS agency_name CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS terms_recurring_interval_count CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS total_paid_amount CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS terms_recurring_intervals_id CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS last_tenant_payouts_id CASCADE;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS tenant_statuses_id CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_statuses DROP COLUMN IF EXISTS slug CASCADE;
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__tenants__name ON public.tenants
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__tenants__name ON public.tenants
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__tenants__tenant_id ON public.tenants
USING btree
(
	tenant_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__tenants__tenant_id ON public.tenants
USING btree
(
	tenant_id
)
WHERE (deleted_date is null);
-- ddl-end --

CREATE INDEX idx__tenants__tenant_status_id ON public.tenants
USING btree
(
	tenant_status_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

ALTER TABLE public.tenants ADD CONSTRAINT fk__tenant_statuses__tenants FOREIGN KEY (tenant_status_id)
REFERENCES public.tenant_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

DELETE FROM public.tenant_statuses WHERE id = '5a8f1c1e-1252-4cfe-9f80-24a0a99f7350'; -- inactive
-- sql-end --
