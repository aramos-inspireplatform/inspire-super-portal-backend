ALTER TABLE public.tenant_payouts ADD COLUMN paid_date timestamp with time zone;
-- ddl-end --
COMMENT ON COLUMN public.tenant_payouts.paid_date IS E'The date the payout was updated to Paid.';
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD COLUMN payer_users_id uuid;
-- ddl-end --

ALTER TABLE public.tenant_payouts ADD CONSTRAINT fk__users__tenant_payouts__payer FOREIGN KEY (payer_users_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --
