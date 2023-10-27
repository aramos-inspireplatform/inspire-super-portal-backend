-- object: is_payout_available | type: COLUMN --
-- ALTER TABLE public.processors DROP COLUMN IF EXISTS is_payout_available CASCADE;
ALTER TABLE processors ADD COLUMN is_payout_available boolean;
-- ddl-end --
COMMENT ON COLUMN processors.is_payout_available IS E'Whatever the payout is available and working for the payment gateway. True if it is available.';
-- ddl-end --

UPDATE processors SET is_payout_available = TRUE;
-- PARGARME
-- EPN
UPDATE processors SET is_payout_available = FALSE WHERE id IN ('a14a4986-034e-4abe-aed1-f3ba15223126', '70ae4aff-afe9-4cf9-bcb5-f2d9c0d4c548');

ALTER TABLE processors ALTER COLUMN is_payout_available SET NOT NULL;
