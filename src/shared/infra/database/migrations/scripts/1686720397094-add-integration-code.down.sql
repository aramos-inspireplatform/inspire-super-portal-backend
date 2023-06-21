ALTER TABLE public.vaults ADD COLUMN wrapper_integration_id character varying(300);
-- ddl-end --
UPDATE public.vaults SET wrapper_integration_id = integration_code;
-- ddl-end --
ALTER TABLE public.vaults DROP COLUMN IF EXISTS integration_code CASCADE;
-- ddl-end --

ALTER TABLE public.processors ADD COLUMN wrapper_integration_id character varying(300);
-- ddl-end --
UPDATE public.processors SET wrapper_integration_id = integration_code;
-- ddl-end --
ALTER TABLE public.processors DROP COLUMN IF EXISTS integration_code CASCADE;
-- ddl-end --

ALTER TABLE public.payment_methods ADD COLUMN wrapper_integration_id character varying(300);
-- ddl-end --
UPDATE public.payment_methods SET wrapper_integration_id = integration_code;
-- ddl-end --
ALTER TABLE public.payment_methods DROP COLUMN IF EXISTS integration_code CASCADE;
-- ddl-end --

ALTER TABLE public.settlement_currencies ADD COLUMN wrapper_integration_id character varying(300);
-- ddl-end --
UPDATE public.settlement_currencies SET wrapper_integration_id = integration_code;
-- ddl-end --
ALTER TABLE public.settlement_currencies DROP COLUMN IF EXISTS integration_code CASCADE;
-- ddl-end --

ALTER TABLE public.tenants ADD COLUMN wrapper_integration_id character varying(300) NULL;
-- ddl-end --
UPDATE public.tenants SET wrapper_integration_id = integration_code;
-- ddl-end --
ALTER TABLE public.tenants ALTER COLUMN wrapper_integration_id SET NOT NULL;
-- ddl-end --
ALTER TABLE public.tenants DROP COLUMN IF EXISTS integration_code CASCADE;
-- ddl-end --

ALTER TABLE public.modules ADD COLUMN wrapper_integration_id character varying(300);
-- ddl-end --
UPDATE public.modules SET wrapper_integration_id = integration_code;
-- ddl-end --
ALTER TABLE public.modules DROP COLUMN IF EXISTS integration_code CASCADE;
-- ddl-end --

ALTER TABLE public.countries ADD COLUMN wrapper_integration_id character varying(300) NULL;
-- ddl-end --
UPDATE public.countries SET wrapper_integration_id = integration_code;
-- ddl-end --
ALTER TABLE public.countries ALTER COLUMN wrapper_integration_id SET NOT NULL;
-- ddl-end --
ALTER TABLE public.countries DROP COLUMN IF EXISTS integration_code CASCADE;
-- ddl-end --

ALTER TABLE public.request_modules ADD COLUMN wrapper_integration_id character varying(300);
-- ddl-end --

ALTER TABLE public.request_module_attempts ADD COLUMN wrapper_integration_id character varying(300);
-- ddl-end --


COMMENT ON COLUMN public.vaults.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.vaults.is_active IS '';
-- ddl-end --
COMMENT ON COLUMN public.processors.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.processors.is_active IS '';
-- ddl-end --
COMMENT ON COLUMN public.payment_methods.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.payment_methods.is_active IS '';
-- ddl-end --
COMMENT ON COLUMN public.settlement_currencies.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.settlement_currencies.is_active IS '';
-- ddl-end --
COMMENT ON COLUMN public.tenants.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.tenants.tenant_id IS '';
-- ddl-end --
COMMENT ON COLUMN public.tenants.created_by_user_id IS '';
-- ddl-end --
COMMENT ON COLUMN public.tenants.created_by_user_email IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_modules.attempts IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_modules.request_settings IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_modules.request_notes IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_modules.api_request_body IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_modules.api_response_body IS '';
-- ddl-end --
COMMENT ON COLUMN public.module_request_statuses.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.modules.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.modules.deploy_url IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_module_attempts.created_by_user_id IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_module_attempts.provision_api_request_body IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_module_attempts.provision_api_response_body IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_module_attempts.provision_api_response_status_code IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_module_attempts.webhook_response_body IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_module_attempt_statuses.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.countries.name IS '';
-- ddl-end --
COMMENT ON COLUMN public.countries.flag_svg_url IS '';
-- ddl-end --
COMMENT ON COLUMN public.countries.native_name IS '';
-- ddl-end --
COMMENT ON COLUMN public.countries.code IS '';
-- ddl-end --
COMMENT ON COLUMN public.requests.created_by_user_id IS '';
-- ddl-end --
COMMENT ON COLUMN public.requests.created_by_user_email IS '';
-- ddl-end --
COMMENT ON COLUMN public.request_statuses.name IS '';
-- ddl-end --
