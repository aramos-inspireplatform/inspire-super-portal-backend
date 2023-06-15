ALTER TABLE public.request_module_attempts DROP CONSTRAINT IF EXISTS fk__request_module_attempt_statuses__request_module_d41d8c CASCADE;
-- ddl-end --
ALTER TABLE public.request_modules DROP CONSTRAINT IF EXISTS pk__request_module CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__part__request_statuses__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__request_statuses__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__part__module_request_types__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__module_request_types__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__part__module_request_statuses__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__module_request_statuses__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__part__tenant_statuses__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__tenant_statuses__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__part__payment_methods__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__part__settlement_currencies__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__settlement_currencies__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__payment_methods__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__part__processors__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__processors__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__part__vault__name CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS public.uq__vault__name CASCADE;
-- ddl-end --

ALTER TABLE public.request_modules ADD CONSTRAINT pk__request_modules PRIMARY KEY (id);
-- ddl-end --

-- requests.request_status_id
ALTER TABLE public.requests ADD COLUMN request_status_id uuid NULL;
-- ddl-end --

UPDATE public.requests SET request_status_id = request_status;
-- ddl-end --

ALTER TABLE public.requests ALTER COLUMN request_status_id SET NOT NULL;
-- ddl-end --

ALTER TABLE public.requests DROP COLUMN IF EXISTS request_status CASCADE;
-- ddl-end --


-- request_module_attempts.request_module_id
ALTER TABLE public.request_module_attempts ADD COLUMN request_module_id uuid NULL;
-- ddl-end --

UPDATE public.request_module_attempts SET request_module_id = module_request_id;
-- ddl-end --

ALTER TABLE public.request_module_attempts ALTER COLUMN request_module_id SET NOT NULL;
-- ddl-end --

ALTER TABLE public.request_module_attempts DROP COLUMN IF EXISTS module_request_id CASCADE;
-- ddl-end --


CREATE UNIQUE INDEX idx__uq__tenant_statuses ON public.tenant_statuses
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__module_request_statuses ON public.module_request_statuses
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__modules ON public.modules
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__request_statuses ON public.request_statuses
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__request_statuses ON public.request_statuses
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__tenant_statuses ON public.tenant_statuses
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__module_request_statuses ON public.module_request_statuses
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__modules ON public.modules
	USING btree
	(
	  name
	)
	WITH (FILLFACTOR = 90)
	WHERE (deleted_date is null);
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

CREATE INDEX idx__requests__tenant_id ON public.requests
	USING btree
	(
	  tenant_id,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE INDEX idx__requests__request_status_id ON public.requests
	USING btree
	(
	  request_status_id,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__request_modules ON public.request_modules
	USING btree
	(
	  request_id,
	  module_id,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__request_modules ON public.request_modules
	USING btree
	(
	  request_id,
	  module_id
	)
	WHERE (deleted_date is null);
-- ddl-end --

CREATE INDEX idx__request_modules__module_id ON public.request_modules
	USING btree
	(
	  module_id,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE INDEX idx__request_modules__module_request_status_id ON public.request_modules
	USING btree
	(
	  module_request_status_id,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE INDEX idx__request_module_attempts__request_module_id ON public.request_module_attempts
	USING btree
	(
	  request_module_id,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE INDEX idx__request_module_attempts__request_module_attempt_status_id ON public.request_module_attempts
	USING btree
	(
	  request_module_attempt_status_id,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__processors ON public.processors
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__processors ON public.processors
	USING btree
	(
	  name
	)
	WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__countries ON public.countries
	USING btree
	(
	  code,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__countries ON public.countries
	USING btree
	(
	  code
	)
	WHERE (deleted_date is null);
-- ddl-end --

CREATE INDEX idx__countries__name ON public.countries
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE INDEX idx__countries__native_name ON public.countries
	USING btree
	(
	  native_name,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__vaults ON public.vaults
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__vaults ON public.vaults
	USING btree
	(
	  name
	)
	WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__payment_methods ON public.payment_methods
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__payment_methods ON public.payment_methods
	USING btree
	(
	  name
	)
	WHERE (deleted_date is null);
-- ddl-end --

CREATE UNIQUE INDEX idx__uq__settlement_currencies ON public.settlement_currencies
	USING btree
	(
	  name,
	  deleted_date ASC NULLS FIRST
	);
-- ddl-end --

CREATE UNIQUE INDEX idx__part__uq__settlement_currencies ON public.settlement_currencies
	USING btree
	(
	  name
	)
	WHERE (deleted_date is null);
-- ddl-end --

ALTER TABLE public.request_module_attempts ADD CONSTRAINT fk__req_module_attempt_statuses__req_module_attempts FOREIGN KEY (request_module_attempt_status_id)
REFERENCES public.request_module_attempt_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

ALTER TABLE public.requests ADD CONSTRAINT fk__request_statuses__requests FOREIGN KEY (request_status_id)
REFERENCES public.request_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

ALTER TABLE public.request_module_attempts ADD CONSTRAINT fk__request_modules__request_module_attempts FOREIGN KEY (request_module_id)
REFERENCES public.request_modules (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --
