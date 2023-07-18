ALTER TABLE public.tenant_payouts DROP CONSTRAINT IF EXISTS fk__users__tenant_payouts__payer CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP COLUMN IF EXISTS paid_date CASCADE;
-- ddl-end --
ALTER TABLE public.tenant_payouts DROP COLUMN IF EXISTS payer_users_id CASCADE;
-- ddl-end --
