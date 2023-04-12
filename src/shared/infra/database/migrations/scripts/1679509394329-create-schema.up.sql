-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.0
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---
-- object: admin_project | type: ROLE --
-- DROP ROLE IF EXISTS admin_project;
-- ddl-end --


-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: "Project" | type: DATABASE --
-- DROP DATABASE IF EXISTS "Project";
-- ddl-end --


-- object: public.templates | type: TABLE --
-- DROP TABLE IF EXISTS public.templates CASCADE;
CREATE TABLE public.templates (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__templates PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.templates.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.templates.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.templates.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.templates.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.templates.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.templates OWNER TO admin_project;
-- ddl-end --

-- object: public.system_configurations | type: TABLE --
-- DROP TABLE IF EXISTS public.system_configurations CASCADE;
CREATE TABLE public.system_configurations (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	general_data_type_id uuid NOT NULL,
	description varchar(1000),
	slug varchar(20) NOT NULL,
	is_global bool NOT NULL,
	is_hidden bool NOT NULL,
	int_value integer,
	bool_value bool,
	string_value varchar,
	uuid_value uuid,
	timestamp_value timestamp with time zone,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__system_configurations PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.name IS E'The name of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.description IS E'The description of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.slug IS E'The unique slug of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.is_global IS E'Whatever the system configuration is global. True if it is global for all tenants.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.is_hidden IS E'Whatever the system configuration is hidden. True if it is hidden and not visible to the client.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.int_value IS E'The int value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.bool_value IS E'The bool value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.string_value IS E'The string value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.uuid_value IS E'The uuid value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.timestamp_value IS E'The timestamp value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.system_configurations OWNER TO admin_project;
-- ddl-end --

-- object: public.general_data_types | type: TABLE --
-- DROP TABLE IF EXISTS public.general_data_types CASCADE;
CREATE TABLE public.general_data_types (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(40) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__general_data_types PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.general_data_types.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.general_data_types.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.general_data_types.name IS E'The unique name of the data type.';
-- ddl-end --
COMMENT ON COLUMN public.general_data_types.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.general_data_types.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.general_data_types.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.general_data_types OWNER TO admin_project;
-- ddl-end --

-- object: fk__general_data_types__system_configurations | type: CONSTRAINT --
-- ALTER TABLE public.system_configurations DROP CONSTRAINT IF EXISTS fk__general_data_types__system_configurations CASCADE;
ALTER TABLE public.system_configurations ADD CONSTRAINT fk__general_data_types__system_configurations FOREIGN KEY (general_data_type_id)
REFERENCES public.general_data_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

-- object: idx__uq__general_data_types | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__general_data_types CASCADE;
CREATE UNIQUE INDEX idx__uq__general_data_types ON public.general_data_types
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__general_data_types | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__general_data_types CASCADE;
CREATE UNIQUE INDEX idx__part__uq__general_data_types ON public.general_data_types
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__uq__system_configurations | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__system_configurations CASCADE;
CREATE UNIQUE INDEX idx__uq__system_configurations ON public.system_configurations
USING btree
(
	slug,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__system_configurations | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__system_configurations CASCADE;
CREATE UNIQUE INDEX idx__part__uq__system_configurations ON public.system_configurations
USING btree
(
	slug
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: public.vaults | type: TABLE --
-- DROP TABLE IF EXISTS public.vaults CASCADE;
CREATE TABLE public.vaults (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	is_active boolean NOT NULL,
	wrapper_integration_id varchar(300),
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__vaults PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.vaults.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.vaults.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.vaults.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.vaults.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.vaults.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.vaults OWNER TO admin_project;
-- ddl-end --

-- object: public.processors | type: TABLE --
-- DROP TABLE IF EXISTS public.processors CASCADE;
CREATE TABLE public.processors (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	is_active boolean NOT NULL,
	wrapper_integration_id varchar(300),
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__processors PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.processors.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.processors.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.processors.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.processors.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.processors.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.processors OWNER TO admin_project;
-- ddl-end --

-- object: public.payment_methods | type: TABLE --
-- DROP TABLE IF EXISTS public.payment_methods CASCADE;
CREATE TABLE public.payment_methods (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	is_active boolean NOT NULL,
	wrapper_integration_id varchar(300),
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__payment_methods PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.payment_methods.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.payment_methods.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.payment_methods.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.payment_methods.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.payment_methods.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.payment_methods OWNER TO admin_project;
-- ddl-end --

-- object: public.settlement_currencies | type: TABLE --
-- DROP TABLE IF EXISTS public.settlement_currencies CASCADE;
CREATE TABLE public.settlement_currencies (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	is_active boolean NOT NULL,
	wrapper_integration_id varchar(300),
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__settlement_currencies PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.settlement_currencies.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.settlement_currencies.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.settlement_currencies.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.settlement_currencies.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.settlement_currencies.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.settlement_currencies OWNER TO admin_project;
-- ddl-end --

-- object: public.tenants | type: TABLE --
-- DROP TABLE IF EXISTS public.tenants CASCADE;
CREATE TABLE public.tenants (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	tenant_status_id uuid NOT NULL,
	name varchar(200) NOT NULL,
	tenant_id varchar(300) NOT NULL,
	wrapper_integration_id varchar(300) NOT NULL,
	created_by_user_id varchar(300) NOT NULL,
	created_by_user_email varchar(300) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__tenants PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.tenants.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.tenants OWNER TO admin_project;
-- ddl-end --

-- object: public.tenant_statuses | type: TABLE --
-- DROP TABLE IF EXISTS public.tenant_statuses CASCADE;
CREATE TABLE public.tenant_statuses (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__tenant_statuses PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.tenant_statuses.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.tenant_statuses OWNER TO admin_project;
-- ddl-end --

-- object: fk__tenant_statuses__tenants | type: CONSTRAINT --
-- ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS fk__tenant_statuses__tenants CASCADE;
ALTER TABLE public.tenants ADD CONSTRAINT fk__tenant_statuses__tenants FOREIGN KEY (tenant_status_id)
REFERENCES public.tenant_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.module_requests | type: TABLE --
-- DROP TABLE IF EXISTS public.module_requests CASCADE;
CREATE TABLE public.module_requests (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	wrapper_integration_id varchar(300),
	module_request_status_id uuid NOT NULL,
	module_request_type_id uuid NOT NULL,
	attempts smallint NOT NULL,
	request_settings jsonb NOT NULL,
	request_notes jsonb,
	api_request_body jsonb,
	api_response_body jsonb,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__module_requests PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.module_requests.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.module_requests.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.module_requests.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.module_requests.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.module_requests.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.module_requests OWNER TO admin_project;
-- ddl-end --

-- object: public.module_request_statuses | type: TABLE --
-- DROP TABLE IF EXISTS public.module_request_statuses CASCADE;
CREATE TABLE public.module_request_statuses (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__module_request_statuses PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.module_request_statuses.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_statuses.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_statuses.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_statuses.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_statuses.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.module_request_statuses OWNER TO admin_project;
-- ddl-end --

-- object: fk__module_request_statuses__module_requests | type: CONSTRAINT --
-- ALTER TABLE public.module_requests DROP CONSTRAINT IF EXISTS fk__module_request_statuses__module_requests CASCADE;
ALTER TABLE public.module_requests ADD CONSTRAINT fk__module_request_statuses__module_requests FOREIGN KEY (module_request_status_id)
REFERENCES public.module_request_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.module_request_types | type: TABLE --
-- DROP TABLE IF EXISTS public.module_request_types CASCADE;
CREATE TABLE public.module_request_types (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	wrapper_integration_id varchar(300),
	CONSTRAINT pk__module_types PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.module_request_types.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_types.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_types.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_types.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_types.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.module_request_types OWNER TO admin_project;
-- ddl-end --

-- object: fk__module_request_types__module_requests | type: CONSTRAINT --
-- ALTER TABLE public.module_requests DROP CONSTRAINT IF EXISTS fk__module_request_types__module_requests CASCADE;
ALTER TABLE public.module_requests ADD CONSTRAINT fk__module_request_types__module_requests FOREIGN KEY (module_request_type_id)
REFERENCES public.module_request_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.module_request_module_provision_requests | type: TABLE --
-- DROP TABLE IF EXISTS public.module_request_module_provision_requests CASCADE;
CREATE TABLE public.module_request_module_provision_requests (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	module_provision_request_id uuid NOT NULL,
	module_request_id uuid NOT NULL,
	CONSTRAINT pk__module_request_module_provision_requests PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.module_request_module_provision_requests.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_module_provision_requests.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_module_provision_requests.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_module_provision_requests.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.module_request_module_provision_requests.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.module_request_module_provision_requests OWNER TO admin_project;
-- ddl-end --

-- object: public.module_provision_requests | type: TABLE --
-- DROP TABLE IF EXISTS public.module_provision_requests CASCADE;
CREATE TABLE public.module_provision_requests (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	module_provision_request_status_id uuid NOT NULL,
	created_by_user_id varchar(300) NOT NULL,
	provision_api_request_body jsonb,
	provision_api_response_body jsonb,
	provision_api_response_status_code smallint,
	wrapper_integration_id varchar(300),
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__module_provision_requests PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.module_provision_requests.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.module_provision_requests.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.module_provision_requests.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.module_provision_requests.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.module_provision_requests.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.module_provision_requests OWNER TO admin_project;
-- ddl-end --

-- object: fk__module_provision_requests__module_request_module_p_d41d8c | type: CONSTRAINT --
-- ALTER TABLE public.module_request_module_provision_requests DROP CONSTRAINT IF EXISTS fk__module_provision_requests__module_request_module_p_d41d8c CASCADE;
ALTER TABLE public.module_request_module_provision_requests ADD CONSTRAINT fk__module_provision_requests__module_request_module_p_d41d8c FOREIGN KEY (module_provision_request_id)
REFERENCES public.module_provision_requests (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: fk__module_requests__module_request_module_provision_d41d8c | type: CONSTRAINT --
-- ALTER TABLE public.module_request_module_provision_requests DROP CONSTRAINT IF EXISTS fk__module_requests__module_request_module_provision_d41d8c CASCADE;
ALTER TABLE public.module_request_module_provision_requests ADD CONSTRAINT fk__module_requests__module_request_module_provision_d41d8c FOREIGN KEY (module_request_id)
REFERENCES public.module_requests (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.module_provision_request_statuses | type: TABLE --
-- DROP TABLE IF EXISTS public.module_provision_request_statuses CASCADE;
CREATE TABLE public.module_provision_request_statuses (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__module_provision_request_statuses PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.module_provision_request_statuses.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.module_provision_request_statuses.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.module_provision_request_statuses.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.module_provision_request_statuses.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.module_provision_request_statuses.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.module_provision_request_statuses OWNER TO admin_project;
-- ddl-end --

-- object: fk__module_provision_request_statuses__module_provisio_d41d8c | type: CONSTRAINT --
-- ALTER TABLE public.module_provision_requests DROP CONSTRAINT IF EXISTS fk__module_provision_request_statuses__module_provisio_d41d8c CASCADE;
ALTER TABLE public.module_provision_requests ADD CONSTRAINT fk__module_provision_request_statuses__module_provisio_d41d8c FOREIGN KEY (module_provision_request_status_id)
REFERENCES public.module_provision_request_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: uq__vault__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__vault__name CASCADE;
CREATE UNIQUE INDEX uq__vault__name ON public.vaults
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__part__vault__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__vault__name CASCADE;
CREATE UNIQUE INDEX uq__part__vault__name ON public.vaults
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: uq__processors__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__processors__name CASCADE;
CREATE UNIQUE INDEX uq__processors__name ON public.processors
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__part__processors__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__processors__name CASCADE;
CREATE UNIQUE INDEX uq__part__processors__name ON public.processors
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: uq__payment_methods__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__payment_methods__name CASCADE;
CREATE UNIQUE INDEX uq__payment_methods__name ON public.payment_methods
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__settlement_currencies__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__settlement_currencies__name CASCADE;
CREATE UNIQUE INDEX uq__settlement_currencies__name ON public.settlement_currencies
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__part__settlement_currencies__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__settlement_currencies__name CASCADE;
CREATE UNIQUE INDEX uq__part__settlement_currencies__name ON public.settlement_currencies
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: uq__part__payment_methods__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__payment_methods__name CASCADE;
CREATE UNIQUE INDEX uq__part__payment_methods__name ON public.payment_methods
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: uq__tenant_statuses__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__tenant_statuses__name CASCADE;
CREATE UNIQUE INDEX uq__tenant_statuses__name ON public.tenant_statuses
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__part__tenant_statuses__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__tenant_statuses__name CASCADE;
CREATE UNIQUE INDEX uq__part__tenant_statuses__name ON public.tenant_statuses
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: uq__module_request_statuses__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__module_request_statuses__name CASCADE;
CREATE UNIQUE INDEX uq__module_request_statuses__name ON public.module_request_statuses
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__part__module_request_statuses__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__module_request_statuses__name CASCADE;
CREATE UNIQUE INDEX uq__part__module_request_statuses__name ON public.module_request_statuses
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: uq__module_request_types__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__module_request_types__name CASCADE;
CREATE UNIQUE INDEX uq__module_request_types__name ON public.module_request_types
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__part__module_request_types__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__module_request_types__name CASCADE;
CREATE UNIQUE INDEX uq__part__module_request_types__name ON public.module_request_types
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: uq__module_provision_request_statuses__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__module_provision_request_statuses__name CASCADE;
CREATE UNIQUE INDEX uq__module_provision_request_statuses__name ON public.module_provision_request_statuses
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__part__module_provision_request_statuses__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__module_provision_request_statuses__name CASCADE;
CREATE UNIQUE INDEX uq__part__module_provision_request_statuses__name ON public.module_provision_request_statuses
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: public.countries | type: TABLE --
-- DROP TABLE IF EXISTS public.countries CASCADE;
CREATE TABLE public.countries (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	flag_svg_url varchar(400) NOT NULL,
	native_name varchar(200) NOT NULL,
	code varchar(2) NOT NULL,
	wrapper_integration_id varchar(300) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__countries PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.countries.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.countries.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.countries.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.countries.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.countries.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.countries OWNER TO admin_project;
-- ddl-end --

-- object: public.requests | type: TABLE --
-- DROP TABLE IF EXISTS public.requests CASCADE;
CREATE TABLE public.requests (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	request_status uuid NOT NULL,
	tenant_id uuid NOT NULL,
	module_request_id uuid NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__requests PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.requests.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.requests.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.requests.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.requests.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.requests.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.requests OWNER TO admin_project;
-- ddl-end --

-- object: fk__tenants__requests | type: CONSTRAINT --
-- ALTER TABLE public.requests DROP CONSTRAINT IF EXISTS fk__tenants__requests CASCADE;
ALTER TABLE public.requests ADD CONSTRAINT fk__tenants__requests FOREIGN KEY (tenant_id)
REFERENCES public.tenants (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: fk__module_requests__requests | type: CONSTRAINT --
-- ALTER TABLE public.requests DROP CONSTRAINT IF EXISTS fk__module_requests__requests CASCADE;
ALTER TABLE public.requests ADD CONSTRAINT fk__module_requests__requests FOREIGN KEY (module_request_id)
REFERENCES public.module_requests (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.request_statuses | type: TABLE --
-- DROP TABLE IF EXISTS public.request_statuses CASCADE;
CREATE TABLE public.request_statuses (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(200) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__request_statuses PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.request_statuses.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.request_statuses.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.request_statuses.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.request_statuses.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.request_statuses.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
-- ALTER TABLE public.request_statuses OWNER TO admin_project;
-- ddl-end --

-- object: uq__request_statuses__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__request_statuses__name CASCADE;
CREATE UNIQUE INDEX uq__request_statuses__name ON public.request_statuses
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: uq__part__request_statuses__name | type: INDEX --
-- DROP INDEX IF EXISTS public.uq__part__request_statuses__name CASCADE;
CREATE UNIQUE INDEX uq__part__request_statuses__name ON public.request_statuses
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: fk__request_statuses__requests | type: CONSTRAINT --
-- ALTER TABLE public.requests DROP CONSTRAINT IF EXISTS fk__request_statuses__requests CASCADE;
ALTER TABLE public.requests ADD CONSTRAINT fk__request_statuses__requests FOREIGN KEY (request_status)
REFERENCES public.request_statuses (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


