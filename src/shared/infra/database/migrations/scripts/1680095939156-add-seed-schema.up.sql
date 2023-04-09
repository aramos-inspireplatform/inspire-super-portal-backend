-- Vaults
INSERT INTO vaults (id, "name", is_active, wrapper_integration_id, created_date, updated_date, deleted_date) VALUES('8e661c0f-03e4-460e-8866-dc0a88d94d54'::uuid, 'Spreedly', true, '807c4e6b-2459-4c9b-9f79-493145f392c5', '2023-04-09 10:29:36.261', NULL, NULL);

-- Processors
INSERT INTO processors (id, "name", is_active, wrapper_integration_id, created_date, updated_date, deleted_date) VALUES('70ae4aff-afe9-4cf9-bcb5-f2d9c0d4c548'::uuid, 'ePN', true, '1b442d4d-c482-451f-8388-d80b2bbc610d', '2023-04-09 10:32:21.879', NULL, NULL);
INSERT INTO processors (id, "name", is_active, wrapper_integration_id, created_date, updated_date, deleted_date) VALUES('f8952532-1bb3-459e-aa2f-f0800d94025f'::uuid, 'Stripe', true, '51511a2c-2a52-4c7a-8b30-c0e849fe81c3', '2023-04-09 10:32:21.889', NULL, NULL);
INSERT INTO processors (id, "name", is_active, wrapper_integration_id, created_date, updated_date, deleted_date) VALUES('a14a4986-034e-4abe-aed1-f3ba15223126'::uuid, 'Pagar Me', true, '3a4925ce-8485-43c0-82a9-64352f39d61d', '2023-04-09 10:32:21.891', NULL, NULL);
INSERT INTO processors (id, "name", is_active, wrapper_integration_id, created_date, updated_date, deleted_date) VALUES('a351d0d3-8d8c-46bd-bc5d-a8b92671ab60'::uuid, 'Bexs', true, 'b8307c96-a9bc-448c-b31b-6bb90f0f6c71', '2023-04-09 10:32:21.898', NULL, NULL);

-- Payment Methods
INSERT INTO payment_methods (id, "name", is_active, wrapper_integration_id, created_date, updated_date, deleted_date) VALUES('16a704b6-ec22-46ae-b4dc-d5de8f755b45'::uuid, 'Credit Card', true, '73ebbb18-f6bf-4ccd-93cc-a6008594f889', '2023-04-09 10:34:21.807', NULL, NULL);
INSERT INTO payment_methods (id, "name", is_active, wrapper_integration_id, created_date, updated_date, deleted_date) VALUES('49945718-4d45-4f81-976b-bfd59fda95a8'::uuid, 'Pix', true, 'c1e57b76-18d8-4e05-bec8-570d4285ca02', '2023-04-09 10:34:21.819', NULL, NULL);
INSERT INTO payment_methods (id, "name", is_active, wrapper_integration_id, created_date, updated_date, deleted_date) VALUES('36212297-efcf-4e75-8021-5cc7a02d7800'::uuid, 'Boleto', true, 'c1065e1f-953e-4e53-89b3-9e38f4ff12cf', '2023-04-09 10:34:21.822', NULL, NULL);

-- Tenant Statuses
INSERT INTO tenant_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('8e119286-dd47-4430-aec1-77fe50c6766b'::uuid, 'Pending', '2023-04-09 10:35:51.170', NULL, NULL);
INSERT INTO tenant_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('a217e218-a723-4659-8f3d-9f218310655b'::uuid, 'Active', '2023-04-09 10:35:51.181', NULL, NULL);

-- Module Request Types
INSERT INTO module_request_types (id, "name", created_date, updated_date, deleted_date, wrapper_integration_id) VALUES('bbf8b5ce-d2fe-43ba-8144-f510c1ed3f49'::uuid, 'Payments', '2023-04-09 10:36:35.960', NULL, NULL, NULL);

-- Module Provision Request Statuses
INSERT INTO module_provision_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('9a3e164a-5a59-4dfd-939e-0c39dc74a70e'::uuid, 'Completed', '2023-04-09 10:39:02.769', NULL, NULL);
INSERT INTO module_provision_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('b303d14a-5791-40d8-a339-0bf6ffd1bfbb'::uuid, 'Sent', '2023-04-09 10:39:02.780', NULL, NULL);
INSERT INTO module_provision_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('75cdebcd-5c89-4b78-9376-3920a7bd009b'::uuid, 'Pending', '2023-04-09 10:39:02.784', NULL, NULL);
INSERT INTO module_provision_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('1be22e2e-8ac3-412c-a08e-2d4fde9e0375'::uuid, 'Partially', '2023-04-09 10:39:02.786', NULL, NULL);
INSERT INTO module_provision_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('1f60b12f-8d9d-4309-865a-1d6c91c7f6b8'::uuid, 'Canceled', '2023-04-09 10:39:02.788', NULL, NULL);

-- Module Request Statuses
INSERT INTO module_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('f6a1b4ff-cfcc-4996-ab8d-b22412593a7a'::uuid, 'Requested', '2023-04-09 10:42:24.093', NULL, NULL);
INSERT INTO module_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('18fc912b-893c-4639-9462-d3f44f7084d1'::uuid, 'Provisioning', '2023-04-09 10:42:24.099', NULL, NULL);
INSERT INTO module_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('d82588e4-f046-47f9-be56-fa453fc65a8b'::uuid, 'Completed', '2023-04-09 10:42:24.102', NULL, NULL);
INSERT INTO module_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('79f5c885-b401-435c-8a4f-2826f7664cfd'::uuid, 'Failed', '2023-04-09 10:42:24.103', NULL, NULL);
