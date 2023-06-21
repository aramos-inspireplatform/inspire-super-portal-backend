ALTER TABLE public.request_module_attempts DROP CONSTRAINT IF EXISTS fk__req_module_attempt_statuses__req_module_attempts CASCADE;
-- ddl-end --
ALTER TABLE public.request_modules DROP CONSTRAINT IF EXISTS pk__request_modules CASCADE;
-- ddl-end --
ALTER TABLE public.request_modules ADD CONSTRAINT pk__request_module PRIMARY KEY (id);
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__settlement_currencies CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__settlement_currencies CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__payment_methods CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__payment_methods CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__vaults CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__vaults CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__countries__native_name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__countries__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__countries CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__countries CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__processors CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__processors CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__request_module_attempts__request_module_attempt_status_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__request_module_attempts__request_module_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__request_modules__module_request_status_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__request_modules__module_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__request_modules CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__request_modules CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__requests__request_status_id CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__requests__tenant_id CASCADE;
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
DROP INDEX IF EXISTS public.idx__part__uq__modules CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__module_request_statuses CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__tenant_statuses CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__part__uq__request_statuses CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__request_statuses CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__modules CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__module_request_statuses CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.idx__uq__tenant_statuses CASCADE;
-- ddl-end --

-- requests.request_status
ALTER TABLE public.requests ADD COLUMN request_status uuid NULL;
-- ddl-end --

UPDATE public.requests SET request_status = request_status_id;
-- ddl-end --

ALTER TABLE public.requests ALTER COLUMN request_status SET NOT NULL;
-- ddl-end --

ALTER TABLE public.requests DROP COLUMN IF EXISTS request_status_id CASCADE;
-- ddl-end --

-- request_module_attempts.module_request_id
ALTER TABLE public.request_module_attempts ADD COLUMN module_request_id uuid NULL;
-- ddl-end --

UPDATE public.request_module_attempts SET module_request_id = request_module_id;
-- ddl-end --

ALTER TABLE public.request_module_attempts ALTER COLUMN module_request_id SET NOT NULL;
-- ddl-end --

ALTER TABLE public.request_module_attempts DROP COLUMN IF EXISTS request_module_id CASCADE;
-- ddl-end --

CREATE UNIQUE INDEX uq__vault__name ON public.vaults
	USING btree
	(
	  name,
	  deleted_date
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX uq__part__vault__name ON public.vaults
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date IS NULL);
-- ddl-end --

CREATE UNIQUE INDEX uq__processors__name ON public.processors
	USING btree
	(
	  name,
	  deleted_date
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX uq__part__processors__name ON public.processors
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date IS NULL);
-- ddl-end --

CREATE UNIQUE INDEX uq__payment_methods__name ON public.payment_methods
	USING btree
	(
	  name,
	  deleted_date
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX uq__settlement_currencies__name ON public.settlement_currencies
	USING btree
	(
	  name,
	  deleted_date
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX uq__part__settlement_currencies__name ON public.settlement_currencies
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date IS NULL);
-- ddl-end --

CREATE UNIQUE INDEX uq__part__payment_methods__name ON public.payment_methods
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date IS NULL);
-- ddl-end --

CREATE UNIQUE INDEX uq__tenant_statuses__name ON public.tenant_statuses
	USING btree
	(
	  name,
	  deleted_date
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX uq__part__tenant_statuses__name ON public.tenant_statuses
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date IS NULL);
-- ddl-end --

CREATE UNIQUE INDEX uq__module_request_statuses__name ON public.module_request_statuses
	USING btree
	(
	  name,
	  deleted_date
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX uq__part__module_request_statuses__name ON public.module_request_statuses
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date IS NULL);
-- ddl-end --

CREATE UNIQUE INDEX uq__module_request_types__name ON public.modules
	USING btree
	(
	  name,
	  deleted_date
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX uq__part__module_request_types__name ON public.modules
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date IS NULL);
-- ddl-end --

CREATE UNIQUE INDEX uq__request_statuses__name ON public.request_statuses
	USING btree
	(
	  name,
	  deleted_date
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX uq__part__request_statuses__name ON public.request_statuses
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date IS NULL);
-- ddl-end --

ALTER TABLE public.request_module_attempts ADD CONSTRAINT fk__request_module_attempt_statuses__request_module_d41d8c FOREIGN KEY (request_module_attempt_status_id)
REFERENCES public.request_module_attempt_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

ALTER TABLE public.request_module_attempts ADD CONSTRAINT fk__request_modules__request_module_attempts FOREIGN KEY (module_request_id)
REFERENCES public.request_modules (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

ALTER TABLE public.requests ADD CONSTRAINT fk__request_statuses__requests FOREIGN KEY (request_status)
REFERENCES public.request_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


