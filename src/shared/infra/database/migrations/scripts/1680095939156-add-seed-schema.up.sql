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
INSERT INTO module_request_statuses (id, "name", created_date, updated_date, deleted_date) VALUES('9044aeff-3418-49fb-9fae-918192b3e727'::uuid, 'Canceled', '2023-04-09 07:42:24.103 -0300', NULL, NULL);

INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('ef579caf-a6da-4d53-80cb-a67bf4742a3e'::uuid, 'United States dollar', 'ef579caf-a6da-4d53-80cb-a67bf4742a3e'::uuid, true, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('bb2d5ae7-e161-4f24-a0fc-435b1f5f6ac2'::uuid, 'Brazilian Real', 'bb2d5ae7-e161-4f24-a0fc-435b1f5f6ac2'::uuid, true, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('0cea1993-1b24-41e7-88dc-5a330f1f5af1'::uuid, 'Algerian dinar', '0cea1993-1b24-41e7-88dc-5a330f1f5af1'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('9780bf8c-ceb9-48cb-b466-2b266b432381'::uuid, 'Jordanian dinar', '9780bf8c-ceb9-48cb-b466-2b266b432381'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('777bf366-a4f1-4f67-bfbd-2ec60299f701'::uuid, 'Moroccan dirham', '777bf366-a4f1-4f67-bfbd-2ec60299f701'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('a577feda-7dac-4f57-b5f6-804a48b590b7'::uuid, 'Australian dollar', 'a577feda-7dac-4f57-b5f6-804a48b590b7'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('abfccbea-86e0-4043-a8be-9cb366d7c462'::uuid, 'Brunei dollar', 'abfccbea-86e0-4043-a8be-9cb366d7c462'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('8cbc40b5-e2ee-465a-9b7a-ab2622dc1608'::uuid, 'Eastern Caribbean dollar', '8cbc40b5-e2ee-465a-9b7a-ab2622dc1608'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('ba403c20-fba6-4868-b82f-7309b021c597'::uuid, 'Hong Kong dollar', 'ba403c20-fba6-4868-b82f-7309b021c597'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('ab89d7c2-5f42-4b79-aee9-ce8afa565d5b'::uuid, 'New Zealand dollar', 'ab89d7c2-5f42-4b79-aee9-ce8afa565d5b'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('29fce250-b905-4698-97f2-74aec52fcf2b'::uuid, 'Singapore dollar', '29fce250-b905-4698-97f2-74aec52fcf2b'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('74fe1c4b-2f3b-4a70-8e98-01e5d04e858f'::uuid, 'Armenian dram', '74fe1c4b-2f3b-4a70-8e98-01e5d04e858f'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('500fc160-a08b-4d89-903d-e41109144e8e'::uuid, 'Euro', '500fc160-a08b-4d89-903d-e41109144e8e'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('a2c9c150-2b30-44d3-9752-98254a2d3d84'::uuid, 'Central African CFA franc', 'a2c9c150-2b30-44d3-9752-98254a2d3d84'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('40d50fe0-803a-43fb-988a-9cd831ab3a80'::uuid, 'CFP franc', '40d50fe0-803a-43fb-988a-9cd831ab3a80'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('13e3e2f4-2dd6-4ef5-bd29-41f46443abe1'::uuid, 'Swiss franc', '13e3e2f4-2dd6-4ef5-bd29-41f46443abe1'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('2fdd715b-52d5-4717-a028-e2486953a725'::uuid, 'West African CFA franc', '2fdd715b-52d5-4717-a028-e2486953a725'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('826d1f47-d335-4196-8a58-48990e480291'::uuid, 'Netherlands Antillean guilder', '826d1f47-d335-4196-8a58-48990e480291'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('05a65961-7d11-419a-9e5c-630cb0dd83e0'::uuid, 'Danish krone', '05a65961-7d11-419a-9e5c-630cb0dd83e0'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('469e2fc7-4b8e-4a7e-a223-83e7a3d42fa0'::uuid, 'Turkish lira', '469e2fc7-4b8e-4a7e-a223-83e7a3d42fa0'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('5805ea18-a0c4-4efe-b62d-f347989d6822'::uuid, 'Mauritanian ouguiya', '5805ea18-a0c4-4efe-b62d-f347989d6822'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('e81e4869-7663-4b1b-ac84-5fb925c83de5'::uuid, 'British pound', 'e81e4869-7663-4b1b-ac84-5fb925c83de5'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('ca3c4043-9141-47d0-9977-d9023c07fae0'::uuid, 'Guernsey pound', 'ca3c4043-9141-47d0-9977-d9023c07fae0'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('cec5472c-a5d6-41b6-bb22-25b73267b373'::uuid, 'Saint Helena pound', 'cec5472c-a5d6-41b6-bb22-25b73267b373'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('ef021472-98d8-4fb3-a415-dfacf56f66a1'::uuid, 'South African rand', 'ef021472-98d8-4fb3-a415-dfacf56f66a1'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('49d28ff7-1331-4e6a-9ebf-4d8b0b831ad6'::uuid, 'Russian ruble', '49d28ff7-1331-4e6a-9ebf-4d8b0b831ad6'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('4f196287-5692-4121-ad96-ddf2f99f68f3'::uuid, 'Indian rupee', '4f196287-5692-4121-ad96-ddf2f99f68f3'::uuid, false, '2021-10-05 14:56:57.859');
INSERT INTO settlement_currencies (id, "name", wrapper_integration_id, is_active, created_date) VALUES('07725b33-f3a5-4189-8cbf-e6bd03434d97'::uuid, 'Israeli new shekel', '07725b33-f3a5-4189-8cbf-e6bd03434d97'::uuid, false, '2021-10-05 14:56:57.859');

INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('8eb128c3-7466-454a-8b75-aca334e82ef9', 'Afghanistan', 'Afghanistan', 'AF', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AF.svg', 'bb8de9f9-0794-4686-bad8-77f27a70d8c8', '2023-04-11 13:26:59.581124');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('7340af42-a7e2-4316-a21e-4b29aadc7d26', 'Åland Islands', 'Åland Islands', 'AX', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AX.svg', '03297a0b-aec1-4bca-a740-d89029492a1d', '2023-04-11 13:26:59.581354');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('45531dec-e122-46bc-8c2c-899ceb8eac14', 'Albania', 'Albania', 'AL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AL.svg', 'ad18be24-5825-43f2-ad69-542beef9985d', '2023-04-11 13:26:59.581364');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2494c33c-e6e8-499f-bf7a-e6bb2ab91507', 'Algeria', 'Algeria', 'DZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/DZ.svg', 'ca54aa8d-3364-4e73-9831-0aac1ef80f06', '2023-04-11 13:26:59.581370');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0f434216-0f0d-4727-8c86-107d9bf7378d', 'AmericanSamoa', 'AmericanSamoa', 'AS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AS.svg', 'f1aa5f8b-f5cb-4760-953b-0d21d3ddb6b0', '2023-04-11 13:26:59.581376');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f39af5fe-659f-4ee2-9002-f5074e4390aa', 'Andorra', 'Andorra', 'AD', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AD.svg', '5f66bf28-6949-4fb3-9fdf-b96caf7953a2', '2023-04-11 13:26:59.581382');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0eaef7b4-0320-4a88-802b-564c2a9344aa', 'Angola', 'Angola', 'AO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AO.svg', '35149aa9-2e65-4427-a132-adf1251c8a6e', '2023-04-11 13:26:59.581388');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f488165c-e4d1-4d7d-917e-befb0fa33470', 'Anguilla', 'Anguilla', 'AI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AI.svg', '9edc4e38-9e3b-4f6e-a8a3-f7f6c7be60ba', '2023-04-11 13:26:59.581393');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('e002e50a-9baf-489e-bf26-aa00f649c3c7', 'Antarctica', 'Antarctica', 'AQ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AQ.svg', '6848b761-f7f4-4c07-bf8a-482eeed14936', '2023-04-11 13:26:59.581398');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f4254564-836f-422f-86e4-aa5a9d89edf8', 'Antigua and Barbuda', 'Antigua and Barbuda', 'AG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AG.svg', 'eabdd3b5-7da1-47e5-aca9-376e50cae0bf', '2023-04-11 13:26:59.581404');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ee303451-069b-46e8-a974-3dbb968aabb7', 'Argentina', 'Argentina', 'AR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AR.svg', '66bf9b6f-bc92-4ac6-a77f-dd97e519f1af', '2023-04-11 13:26:59.581409');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('5413eaba-fea9-4c60-a340-923e02f606f7', 'Armenia', 'Armenia', 'AM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AM.svg', '840ad2aa-1721-4551-a710-29edb28efc4b', '2023-04-11 13:26:59.581414');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('cf0aad92-6d8d-42d0-91f8-570c59fa071b', 'Aruba', 'Aruba', 'AW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AW.svg', 'd8ffd656-1dbc-4042-afd6-e1688d98dcf7', '2023-04-11 13:26:59.581419');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ea7420d2-d81b-4923-92ca-96fbb79c279a', 'Australia', 'Australia', 'AU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AU.svg', 'a0938fe5-4712-4b93-bb4d-8baf196e279b', '2023-04-11 13:26:59.581425');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f1b6e352-64da-4764-96e2-5f3747dbc4b3', 'Austria', 'Austria', 'AT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AT.svg', 'd7b983f2-8af6-4d9d-832d-78d1ea3408d1', '2023-04-11 13:26:59.581430');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('dffc4de7-6dca-4ee4-aa6c-558db0f8d3ae', 'Azerbaijan', 'Azerbaijan', 'AZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AZ.svg', '467f0ecd-2609-49a3-8f63-f80948228ac2', '2023-04-11 13:26:59.581435');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('5e1830f4-68a0-4499-9b6f-9d2249c4bed0', 'Bahamas', 'Bahamas', 'BS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BS.svg', '29106b45-abed-47a1-b205-829bd699cf03', '2023-04-11 13:26:59.581440');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a475a07f-b89a-4762-9fca-095b147a2ece', 'Bahrain', 'Bahrain', 'BH', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BH.svg', '69572bc1-0365-4ce1-a175-b8e2357dd7be', '2023-04-11 13:26:59.581445');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('1adcf738-9179-4ba4-9d8b-d0ac6633ee0e', 'Bangladesh', 'Bangladesh', 'BD', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BD.svg', '01d070a9-5d41-4950-8f58-0cf3f38a839c', '2023-04-11 13:26:59.581450');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('aa65271f-410c-4ec0-9e4b-507cb60dad51', 'Barbados', 'Barbados', 'BB', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BB.svg', '47a9dd85-e9fc-4823-bd19-c6b32d2b7efb', '2023-04-11 13:26:59.581455');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('56bebaf4-30bf-45d3-ba3b-90471b464664', 'Belarus', 'Belarus', 'BY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BY.svg', 'e576df27-ec22-4fb3-928c-277e53414268', '2023-04-11 13:26:59.581459');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c719d1b0-f5f8-4e09-8ac6-ced5f3082a92', 'Belgium', 'Belgium', 'BE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BE.svg', '7f7eacc0-88ad-4812-98d5-d658cb16a5c4', '2023-04-11 13:26:59.581464');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('1667ecf6-31e1-435a-b964-efc1d1b8e9ec', 'Belize', 'Belize', 'BZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BZ.svg', '6e45c818-f70b-4eee-81db-189f94ea1e34', '2023-04-11 13:26:59.581469');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a751791f-51e0-4f37-9b2d-5c246ac56a1a', 'Benin', 'Benin', 'BJ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BJ.svg', '451c4d80-e55a-45e8-baba-f63efa78e7b3', '2023-04-11 13:26:59.581474');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ae9d3886-c082-4d36-9479-d1bde0c85c09', 'Bermuda', 'Bermuda', 'BM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BM.svg', '43d0725c-ce09-43bf-b6a2-dfd2e14ab6f5', '2023-04-11 13:26:59.581479');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0d0c9b64-0556-4909-b7d1-f75d510e7659', 'Bhutan', 'Bhutan', 'BT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BT.svg', 'a071d90a-5259-4b8e-af62-8b1105b1a797', '2023-04-11 13:26:59.581513');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('5d703c49-a2fa-4c5d-be05-b9b2cf6261b1', 'Bolivia, Plurinational State of', 'Bolivia, Plurinational State of', 'BO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BO.svg', '442a83c2-aab2-4d2c-8445-6df0b5993e58', '2023-04-11 13:26:59.581519');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('fd636507-80da-4442-b73f-899b790bba01', 'Bosnia and Herzegovina', 'Bosnia and Herzegovina', 'BA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BA.svg', 'df8c4ba1-0188-434e-9747-95d1cae217e0', '2023-04-11 13:26:59.581524');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('070c3b26-a2f9-4f85-841a-03748e310eab', 'Botswana', 'Botswana', 'BW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BW.svg', '942eadd7-bb0d-476f-8042-d68cbd136dc0', '2023-04-11 13:26:59.581530');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('cca374fd-2888-4d8c-a6ae-e0183834a444', 'Brazil', 'Brazil', 'BR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BR.svg', '8b49702a-a52f-4753-955a-336a4bd4714b', '2023-04-11 13:26:59.581535');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0a4f72e9-637b-47a8-b65a-a26d5056a772', 'British Indian Ocean Territory', 'British Indian Ocean Territory', 'IO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IO.svg', '2a01bda4-cc5c-41a5-b15d-1e27ac7f6439', '2023-04-11 13:26:59.581540');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('e00c3107-08d4-4590-82ba-7b7283dbec8d', 'Brunei Darussalam', 'Brunei Darussalam', 'BN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BN.svg', '90d33ee6-8a4e-4060-8d78-c536b0b23908', '2023-04-11 13:26:59.581545');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d6842020-4715-47da-92f7-1ab07cbd3451', 'Bulgaria', 'Bulgaria', 'BG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BG.svg', '62c204be-9e40-439a-a277-09cebaf7a5e8', '2023-04-11 13:26:59.581550');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('92a8bda7-1b27-421b-b1e7-ca7a01bd9e3f', 'Burkina Faso', 'Burkina Faso', 'BF', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BF.svg', 'd6502b17-ebdf-4a80-add9-10222adf3836', '2023-04-11 13:26:59.581555');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ef37a753-7cd8-4870-8ab3-9c0bb76411e0', 'Burundi', 'Burundi', 'BI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BI.svg', 'c8fd4221-5380-4c75-8018-050449022280', '2023-04-11 13:26:59.581560');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('9e2426ad-2648-48b7-ab22-b63e2db2a1c9', 'Cambodia', 'Cambodia', 'KH', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KH.svg', 'e80df6dd-affd-4c7a-9c5d-8026e8678024', '2023-04-11 13:26:59.581565');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('e42143c9-8e0a-4680-a2c9-29500e32f53a', 'Cameroon', 'Cameroon', 'CM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CM.svg', '463a768c-48b2-4113-9dc4-d312dfae17e3', '2023-04-11 13:26:59.581570');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a9314b53-01ba-4e40-b9b8-fd005831432f', 'Canada', 'Canada', 'CA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CA.svg', '5bf693ae-55cd-44c3-9625-766ee78f5f30', '2023-04-11 13:26:59.581575');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('645a69d6-96dc-4179-9105-907d8e245079', 'Cape Verde', 'Cape Verde', 'CV', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CV.svg', '482ee2e5-bcc8-44e5-8081-c3f89af43d81', '2023-04-11 13:26:59.581580');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('52b7aea8-bf35-4559-aa96-ceaa982b8b30', 'Cayman Islands', 'Cayman Islands', 'KY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KY.svg', 'c866748f-031a-4501-a477-2f8a3ac99aae', '2023-04-11 13:26:59.581584');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('dd0d2d22-606e-435a-9d99-83aae43b14df', 'Central African Republic', 'Central African Republic', 'CF', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CF.svg', 'ac038d7a-c059-4041-b763-41898114ca5e', '2023-04-11 13:26:59.581590');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('90c66b1c-3176-4f54-9df3-36d6803860af', 'Chad', 'Chad', 'TD', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TD.svg', 'a8039a29-758f-411e-887a-fbfcb74d6f83', '2023-04-11 13:26:59.581594');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6898cfe9-a821-49b1-bf98-1ae6652388e9', 'Chile', 'Chile', 'CL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CL.svg', '597d56cb-6ced-4006-aa51-43c8f7c046c8', '2023-04-11 13:26:59.581600');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f995be2b-79b7-4ae4-b443-f9e11dc8e140', 'China', 'China', 'CN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CN.svg', '84bbaba4-4c22-4360-bdc1-89d7efa6a180', '2023-04-11 13:26:59.581605');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('9812f11b-4bba-4f47-aa10-7953fe2ae5c1', 'Christmas Island', 'Christmas Island', 'CX', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CX.svg', '259d2821-3c02-4ac8-bc19-0a68c2462a84', '2023-04-11 13:26:59.581610');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c40f8c2f-f37d-43b4-9b69-18d8eb44f4dc', 'Cocos (Keeling) Islands', 'Cocos (Keeling) Islands', 'CC', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CC.svg', 'bca5e232-6f9f-475c-bc25-bf6dd17fae10', '2023-04-11 13:26:59.581615');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('4c820300-34a7-44a8-90d4-7019367f2dfd', 'Colombia', 'Colombia', 'CO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CO.svg', '5de34f8a-f539-43cd-be23-50ae3a4be14e', '2023-04-11 13:26:59.581620');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('dcc03e5e-63f5-4000-a6a8-ffd77f13d7f8', 'Comoros', 'Comoros', 'KM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KM.svg', '58df6b7e-567d-47de-a0ca-bf7d43d85853', '2023-04-11 13:26:59.581626');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('5536edd2-9f3a-4ba4-8995-344b250908c5', 'Congo', 'Congo', 'CG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CG.svg', '51fb9e1b-fa3d-4c75-872d-e06369e3e5a1', '2023-04-11 13:26:59.581643');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f51dca60-50a1-4019-839f-c8355340f3a8', 'Congo, The Democratic Republic of the', 'Congo, The Democratic Republic of the', 'CD', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CD.svg', '87444c67-77e3-4fe0-8bce-f800ca1a81c8', '2023-04-11 13:26:59.581649');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d739248a-734d-4a65-85ce-33b42b6ad82d', 'Cook Islands', 'Cook Islands', 'CK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CK.svg', 'b1014673-56a8-42ef-9ccb-694778f0f0eb', '2023-04-11 13:26:59.581654');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0a0e65c4-69ca-4a38-9048-30382b970d02', 'Costa Rica', 'Costa Rica', 'CR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CR.svg', '2d45ff32-6f40-4f59-9c63-a814a0e2af6d', '2023-04-11 13:26:59.581659');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c4a04f27-c68a-4bb1-aa50-18a652727dd2', 'Cote dIvoire', 'Cote dIvoire', 'CI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CI.svg', '4b51f062-d7c9-4f14-b247-ac1cd83bb9a3', '2023-04-11 13:26:59.581665');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('7498f3ed-8e89-4171-b42c-5cf31a01f237', 'Croatia', 'Croatia', 'HR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/HR.svg', 'd2a58e73-acb9-4c0a-a92a-9316c22cd6f3', '2023-04-11 13:26:59.581670');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('933f8282-c02a-45db-83e2-5e278b186616', 'Cuba', 'Cuba', 'CU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CU.svg', 'c5b6a075-9ea9-4908-a789-64ff5125dd5d', '2023-04-11 13:26:59.581675');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b53de407-0a9c-47dc-a6de-ac2c31108688', 'Cyprus', 'Cyprus', 'CY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CY.svg', 'fb6d0929-e8a3-45d2-b670-de88e876419b', '2023-04-11 13:26:59.581680');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('e5499c94-fa0b-4f3a-9d33-b70d9e72e5a3', 'Czech Republic', 'Czech Republic', 'CZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CZ.svg', 'ca8ee367-9ad6-4278-bd92-c94ec853ab4a', '2023-04-11 13:26:59.581685');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('de4d6203-b103-4164-823a-9ab94cd3d0a3', 'Denmark', 'Denmark', 'DK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/DK.svg', '7b9c5665-6dd1-44d8-845c-a888aed9ff36', '2023-04-11 13:26:59.581689');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('e4f71acc-4a49-4305-912d-fb1c3ed8605e', 'Djibouti', 'Djibouti', 'DJ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/DJ.svg', '636d6587-f363-4b58-bd04-f9486fa04578', '2023-04-11 13:26:59.581694');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c3e940fb-137d-43a0-9435-a83d77040c98', 'Dominica', 'Dominica', 'DM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/DM.svg', '8597252b-5e94-4b95-af49-a69cbdc4a1f9', '2023-04-11 13:26:59.581699');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ed393c51-92e4-4f58-89f1-41e76ef09694', 'Dominican Republic', 'Dominican Republic', 'DO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/DO.svg', '0d1d01df-71c6-44a3-aaa9-4d74467d7cbf', '2023-04-11 13:26:59.581704');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('712b1da7-8c4a-4152-835f-388e1626f499', 'Ecuador', 'Ecuador', 'EC', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/EC.svg', 'b387b771-1439-4486-b161-d1cde1ade8b8', '2023-04-11 13:26:59.581710');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('49a25188-9bc8-4488-b5c1-e6eba7739885', 'Egypt', 'Egypt', 'EG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/EG.svg', 'aefeb372-e02e-42ed-be8d-b67c36a892db', '2023-04-11 13:26:59.581804');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6cbbd436-5f59-4958-a156-8618813bbf8d', 'El Salvador', 'El Salvador', 'SV', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SV.svg', 'c9e6c4b4-1052-41f7-9e6e-c2829a2ec1f3', '2023-04-11 13:26:59.581821');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('36f8d37c-a97e-404a-b61d-3a8f95361a4a', 'Equatorial Guinea', 'Equatorial Guinea', 'GQ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GQ.svg', '5463dd31-cb01-48a5-8fb0-3395316a93be', '2023-04-11 13:26:59.581830');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('dac2b6c4-4bb3-4807-aef8-cea6546f2f4c', 'Eritrea', 'Eritrea', 'ER', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ER.svg', '1a15340e-0121-4da1-b863-d91bdb0fd4b7', '2023-04-11 13:26:59.581836');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2a57e631-ca4a-4abe-8b47-9e5f93602f95', 'Estonia', 'Estonia', 'EE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/EE.svg', '0a988cc0-cf18-4618-87de-b5421c7700a4', '2023-04-11 13:26:59.581841');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('eefd1f45-dc23-412a-8521-b33ca95b8688', 'Ethiopia', 'Ethiopia', 'ET', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ET.svg', '2001c116-6bb7-4bb4-aaef-7a9a73e36295', '2023-04-11 13:26:59.581847');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b8f4439b-0aaf-4b43-8f50-cf0e7ddb793a', 'Falkland Islands (Malvinas)', 'Falkland Islands (Malvinas)', 'FK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/FK.svg', '05159b74-868b-4fca-ac54-571c80fabc1f', '2023-04-11 13:26:59.581852');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d3f97535-472c-4fef-9aec-f2cab4494318', 'Faroe Islands', 'Faroe Islands', 'FO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/FO.svg', '861762f1-4888-4fe4-9d76-2da030cab0fb', '2023-04-11 13:26:59.581858');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('7b07ea92-2acd-4cd7-bd51-5ff7b50e8189', 'Fiji', 'Fiji', 'FJ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/FJ.svg', '8a93588c-9249-4671-a938-1b0b2a90cecd', '2023-04-11 13:26:59.581863');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d1111cee-1957-46fb-9a0c-bb5bef74271e', 'Finland', 'Finland', 'FI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/FI.svg', '54b61489-d7fd-449d-81a5-1052522a523c', '2023-04-11 13:26:59.581868');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b9607cff-160e-4b3a-8cbc-48b19f87345c', 'France', 'France', 'FR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/FR.svg', '4b22926e-84e3-4bbd-840b-17d2de4b3527', '2023-04-11 13:26:59.581892');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b81e6c1d-545b-4b7f-b8f1-5fc156e48233', 'French Guiana', 'French Guiana', 'GF', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GF.svg', 'b4399b88-97fd-4f80-b378-2d5625db1ea8', '2023-04-11 13:26:59.581899');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('9539b5f8-6d34-4748-84cc-5f809749aff5', 'French Polynesia', 'French Polynesia', 'PF', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PF.svg', '44b8a8be-6485-42a2-bd87-98c81a40689e', '2023-04-11 13:26:59.581905');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('05c3e5bf-3a0a-414f-a9ea-a73dbf9825e0', 'Gabon', 'Gabon', 'GA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GA.svg', 'cbde89df-5830-4704-a21c-daff897561c4', '2023-04-11 13:26:59.581910');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('eb5768b3-87c4-4752-bb54-a6403d264792', 'Gambia', 'Gambia', 'GM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GM.svg', '14efb27d-669d-46b1-8e3e-d5e8cf4e4840', '2023-04-11 13:26:59.581916');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2870edc0-b75d-47d6-8479-b1f3f38e3d08', 'Georgia', 'Georgia', 'GE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GE.svg', '93e1d144-9dad-4308-82b2-d3decf7666a5', '2023-04-11 13:26:59.581921');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('97b48f0c-8cf5-4454-ba61-3a3cf3f3c958', 'Germany', 'Germany', 'DE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/DE.svg', 'baaae453-a3d1-490d-9c0a-1c3d98a136f9', '2023-04-11 13:26:59.581926');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('9695f1f2-3d99-4974-857e-0794ec4642a9', 'Ghana', 'Ghana', 'GH', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GH.svg', 'd2ca824d-3066-47f4-8a6b-8997b2b7bb78', '2023-04-11 13:26:59.581931');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('1a9521ce-2f2f-4ecf-88d4-e5f68b00802b', 'Gibraltar', 'Gibraltar', 'GI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GI.svg', 'c28f9d87-3d60-4853-b134-ab06071897b4', '2023-04-11 13:26:59.581935');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ab7f4d62-d39d-4e50-8c43-6373c24d90f2', 'Greece', 'Greece', 'GR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GR.svg', '77d2c530-3874-42b2-a2de-882c1c9eadb6', '2023-04-11 13:26:59.581941');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d8416121-f582-4cc4-a4e3-f41ae36eb004', 'Greenland', 'Greenland', 'GL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GL.svg', 'e81af2cd-b0f4-4ea7-891d-0ea86a7da7c0', '2023-04-11 13:26:59.581946');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c7c86795-768a-4eb6-82ca-e2f3e9ff9045', 'Grenada', 'Grenada', 'GD', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GD.svg', 'c3fdf640-d822-4e83-884f-76a90f4ea2af', '2023-04-11 13:26:59.581951');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('283634b3-0e8c-4590-ba40-c6e9b5e6cad9', 'Guadeloupe', 'Guadeloupe', 'GP', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GP.svg', '580b44bb-cad7-4796-a2a3-cc5504bc777f', '2023-04-11 13:26:59.581956');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6a29f0a0-e21d-4b15-bbf9-2a3fd5667567', 'Guam', 'Guam', 'GU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GU.svg', '6dfa7745-1ba7-4905-afad-bda499fea511', '2023-04-11 13:26:59.581960');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('86cbd81f-ab47-4a12-9190-e45d0249a880', 'Guatemala', 'Guatemala', 'GT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GT.svg', '27b7cca2-a708-43c8-ac65-8f7edb94255a', '2023-04-11 13:26:59.581966');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('1ad36e85-5d7b-4c40-9a52-72405bbc5ba9', 'Guernsey', 'Guernsey', 'GG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GG.svg', '6d191618-5a9a-4d59-89fa-26bca9db54f5', '2023-04-11 13:26:59.581971');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('74a3631b-0730-486b-bbe7-5298a7589901', 'Guinea', 'Guinea', 'GN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GN.svg', 'fe6ca0ee-72ca-4c85-9485-a8d039742cbb', '2023-04-11 13:26:59.581975');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0c3291bb-9483-48aa-a983-599a1909dbbb', 'Guinea-Bissau', 'Guinea-Bissau', 'GW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GW.svg', '695fa923-5e7b-4072-96f8-f4d79932a3e7', '2023-04-11 13:26:59.581980');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('702ff267-9e66-4c07-b67c-a361b688eefd', 'Guyana', 'Guyana', 'GY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GY.svg', '10e69191-1595-4210-bcc1-1b5ff451bf33', '2023-04-11 13:26:59.581986');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f63c7820-9bcd-4aaf-baf3-1d602fad9da0', 'Haiti', 'Haiti', 'HT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/HT.svg', 'cf070cc8-702b-49f3-88c6-33566e4380df', '2023-04-11 13:26:59.581990');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('1310dc14-0a1d-48d7-9737-095452cd84ef', 'Holy See (Vatican City State)', 'Holy See (Vatican City State)', 'VA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/VA.svg', 'da4d9f47-0bca-45fc-961b-1a6eee619d49', '2023-04-11 13:26:59.581995');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a89cf352-b9fd-4dd5-80e1-e45186c48f23', 'Honduras', 'Honduras', 'HN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/HN.svg', '664f3f31-d33a-449f-ab4d-a254acd9f26b', '2023-04-11 13:26:59.582000');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f91f8bf0-8c9b-4dc0-8fe4-ee5016e5ab49', 'Hong Kong', 'Hong Kong', 'HK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/HK.svg', '80aca597-1d71-403d-bf0b-96a888c72c6d', '2023-04-11 13:26:59.582005');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('19ef0915-8b73-4075-9113-df66399af32e', 'Hungary', 'Hungary', 'HU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/HU.svg', '03920b9a-339d-498f-b440-2110bd5eb40f', '2023-04-11 13:26:59.582021');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('1a67228a-0085-4688-aabf-546005e8cfd2', 'Iceland', 'Iceland', 'IS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IS.svg', '4e36a996-f142-4a0c-ab76-af4afac581f8', '2023-04-11 13:26:59.582027');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('5906829d-eb45-46dc-9849-eb8721984914', 'India', 'India', 'IN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IN.svg', '41a50541-434d-44ef-8a56-02ef1f5d19e4', '2023-04-11 13:26:59.582032');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ea60eb9d-d48e-404f-ad9b-dcfc54eab473', 'Indonesia', 'Indonesia', 'ID', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ID.svg', 'fcf4e52b-06c9-42e1-af32-522179f9a00b', '2023-04-11 13:26:59.582037');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('9d62ef27-c780-4a14-b874-0fd441ab6a68', 'Iran, Islamic Republic of', 'Iran, Islamic Republic of', 'IR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IR.svg', '6d5a30af-88e5-47a2-b94c-c6e457a6e019', '2023-04-11 13:26:59.582042');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0ae8b756-50c5-44b1-aa61-8af43ff80e82', 'Iraq', 'Iraq', 'IQ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IQ.svg', '932ef26d-897d-4bf1-841c-b9f04e78a3f7', '2023-04-11 13:26:59.582047');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ea597b9e-3049-4950-b801-93cfb274afc6', 'Ireland', 'Ireland', 'IE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IE.svg', 'c88727d1-b3d7-45f0-8cd0-d5482bc39352', '2023-04-11 13:26:59.582052');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('606bd4cd-b3b8-4458-8dd6-240b8536ddc4', 'Isle of Man', 'Isle of Man', 'IM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IM.svg', '3c1bd2bb-f710-43a9-9650-3450b4be0d3f', '2023-04-11 13:26:59.582057');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('9873b47c-cc98-401d-bd05-475aa46ba71d', 'Israel', 'Israel', 'IL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IL.svg', '0c9c234b-0400-434f-a63e-771a798f6892', '2023-04-11 13:26:59.582061');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ad21931d-45d7-424a-91ea-f852a73fcdc3', 'Italy', 'Italy', 'IT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/IT.svg', '3812a3ea-b4af-4b2d-a757-5a35f3ecd376', '2023-04-11 13:26:59.582066');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('943dd5fc-3fc7-4f3f-9ddb-74b92ff14111', 'Jamaica', 'Jamaica', 'JM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/JM.svg', 'd059b49c-1efb-4730-bfa7-144b4fce545c', '2023-04-11 13:26:59.582072');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c3645dc8-c292-4b55-afe2-a7c5403b0613', 'Japan', 'Japan', 'JP', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/JP.svg', '5197f434-d7ac-49ec-bcd3-8becc3bd05ab', '2023-04-11 13:26:59.582077');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('3f953732-da32-4233-8236-d1b32664870a', 'Jersey', 'Jersey', 'JE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/JE.svg', '8dad75de-f8c8-4efe-b218-a3e2f3c5eba3', '2023-04-11 13:26:59.582082');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d4319328-f0b8-4d06-8dfa-21d2f4908323', 'Jordan', 'Jordan', 'JO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/JO.svg', 'c7837fb6-3f29-45ee-b3a2-5d867f7c05c5', '2023-04-11 13:26:59.582087');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b02737ed-3002-4723-abf5-28df8322179b', 'Kazakhstan', 'Kazakhstan', 'KZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KZ.svg', 'd5aecefb-423c-4e91-bb72-cf7d8982041b', '2023-04-11 13:26:59.582092');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a473ba28-4e5e-402d-ae42-972ca0af7f2c', 'Kenya', 'Kenya', 'KE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KE.svg', '8092b6e1-3639-4a07-8d18-7c7e3dc268c3', '2023-04-11 13:26:59.582096');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('bc28a168-c80c-4bd7-97b1-f8c70263e4ba', 'Kiribati', 'Kiribati', 'KI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KI.svg', '6c0e9e85-1a4e-4999-9391-dc1d0f5c8a87', '2023-04-11 13:26:59.582101');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ef82f2c3-735f-4f25-b99b-31684d8d8d6a', 'Korea, Democratic Peoples Republic of', 'Korea, Democratic Peoples Republic of', 'KP', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KP.svg', '507b9239-b1d4-477a-9c9c-8ee58c32696b', '2023-04-11 13:26:59.582106');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('9511f621-59ef-4e8e-883c-b7c0ea001c24', 'Korea, Republic of', 'Korea, Republic of', 'KR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KR.svg', 'ace092bd-a3b0-4cb3-bfcf-e25227020053', '2023-04-11 13:26:59.582246');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d06eb441-6aa2-42c3-bdb1-bc7f77c2d648', 'Kuwait', 'Kuwait', 'KW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KW.svg', 'b4dc6fc6-262a-4773-ba43-36d6cb2d4400', '2023-04-11 13:26:59.582276');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('413f862e-144b-4920-8c64-c56ba06511ff', 'Kyrgyzstan', 'Kyrgyzstan', 'KG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KG.svg', '9cd46e16-2da2-452c-a104-e7e781e945aa', '2023-04-11 13:26:59.582284');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('81b82d54-1b2b-4f74-9ab1-a0c0e84e8fbb', 'Lao Peoples Democratic Republic', 'Lao Peoples Democratic Republic', 'LA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LA.svg', '4af9d15d-c72c-4d56-bb4a-902da5c84e24', '2023-04-11 13:26:59.582290');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b4e1785f-b67d-409c-bafb-1486f409d1b4', 'Latvia', 'Latvia', 'LV', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LV.svg', '4118752d-b606-4297-9007-0168cd5b725a', '2023-04-11 13:26:59.582296');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('30e310b8-862f-48da-b4c1-9244ba26950b', 'Lebanon', 'Lebanon', 'LB', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LB.svg', 'ea24112d-e7c9-432d-b5dc-c07e09a0920c', '2023-04-11 13:26:59.582301');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('8e54a9fb-0802-4040-a1bf-7725f2d9610c', 'Lesotho', 'Lesotho', 'LS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LS.svg', '51a8aa59-a696-42fe-a6a7-20d2021fa5bc', '2023-04-11 13:26:59.582341');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('e4fcad6a-58e8-46d3-8e69-64672b153bf7', 'Liberia', 'Liberia', 'LR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LR.svg', '56028f6c-7a28-48e5-b0da-85ad6c9d48d9', '2023-04-11 13:26:59.582348');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('847fea5c-9ad8-4cc6-a052-5beb26c1b358', 'Libyan Arab Jamahiriya', 'Libyan Arab Jamahiriya', 'LY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LY.svg', '48e80a3c-e8dd-4309-8886-5b6fa6932429', '2023-04-11 13:26:59.582353');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2858f8ba-6517-42f1-a560-1317693e6b57', 'Liechtenstein', 'Liechtenstein', 'LI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LI.svg', '1836531e-b3f0-4d83-919e-781332536407', '2023-04-11 13:26:59.582358');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6bde1c89-9128-4db8-b991-5ec88ac13c42', 'Lithuania', 'Lithuania', 'LT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LT.svg', 'ad3036ad-f501-41a9-8da9-608015b19c1d', '2023-04-11 13:26:59.582363');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b8f16a8e-0d0d-46f1-80ba-7596a5a1c59b', 'Luxembourg', 'Luxembourg', 'LU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LU.svg', 'bb0501ef-26d5-466a-b667-821bc51710b5', '2023-04-11 13:26:59.582368');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a09d8adc-528d-4e0b-9779-e8c56f51fdfc', 'Macao', 'Macao', 'MO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MO.svg', '3dace8d4-c223-443d-9996-1d562417774d', '2023-04-11 13:26:59.582373');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('eb73e772-f6c7-41eb-9139-9cdb873c129e', 'Macedonia, The Former Yugoslav Republic of', 'Macedonia, The Former Yugoslav Republic of', 'MK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MK.svg', 'bf0a711b-2f44-4fdf-8d34-a5eb8bb13e97', '2023-04-11 13:26:59.582378');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('979ce8e1-3958-4b6e-a968-b979200ed623', 'Madagascar', 'Madagascar', 'MG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MG.svg', '1c7e7b69-4b21-4f05-83f1-cda02c6e6b1c', '2023-04-11 13:26:59.582383');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2c5284d8-1349-4792-ac75-c602520b0458', 'Malawi', 'Malawi', 'MW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MW.svg', '2565e60c-dfbf-4cd6-81ad-652610e8c13d', '2023-04-11 13:26:59.582388');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('577edc42-d599-4a04-a7c2-2659e830bcd1', 'Malaysia', 'Malaysia', 'MY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MY.svg', '201482c0-0888-4129-ae6a-1256c4f35fd0', '2023-04-11 13:26:59.582393');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('17836678-c813-4439-89b3-6e468265e772', 'Maldives', 'Maldives', 'MV', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MV.svg', 'aa30f83f-ce95-4250-b4a8-3678a1aa23a1', '2023-04-11 13:26:59.582398');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('3b554b30-5937-4331-afed-d0816984dd8b', 'Mali', 'Mali', 'ML', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ML.svg', '23286b60-9670-4160-9aed-080b18b0b7df', '2023-04-11 13:26:59.582403');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('e48dec51-408c-4aad-83b1-2814c3f92440', 'Malta', 'Malta', 'MT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MT.svg', 'e3d941bd-6e5f-4ecc-81a5-9b43d0dd8da4', '2023-04-11 13:26:59.582408');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c1abad81-404e-43b7-8248-379a9d36ecb4', 'Marshall Islands', 'Marshall Islands', 'MH', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MH.svg', '3a9d2a59-72e5-4a24-8367-761afd0c6c11', '2023-04-11 13:26:59.582413');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6189a350-f4a3-4afa-952a-dbeb07ab137a', 'Martinique', 'Martinique', 'MQ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MQ.svg', 'd80dc635-3637-479f-98d5-4b59bc18bb54', '2023-04-11 13:26:59.582418');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('fcd71ece-39d7-40ea-9878-ee451bf86e21', 'Mauritania', 'Mauritania', 'MR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MR.svg', 'e37e75f9-1788-47a4-aa23-557ea40981ea', '2023-04-11 13:26:59.582423');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2b4aaeff-4334-4b6a-aa68-e9ff7a942bd5', 'Mauritius', 'Mauritius', 'MU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MU.svg', '781366c7-92b6-47fa-bc5e-b65c16d185e8', '2023-04-11 13:26:59.582428');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('00276f58-d81c-4fd7-8cb5-9b1c74b712b6', 'Mayotte', 'Mayotte', 'YT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/YT.svg', '2eb5c7ef-8eed-4aac-b247-33cd21d97ea3', '2023-04-11 13:26:59.582433');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('aad35f7f-dca5-43d6-8771-ac576f35933b', 'Mexico', 'Mexico', 'MX', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MX.svg', '383f4235-370e-4035-b681-f578678eb27a', '2023-04-11 13:26:59.582439');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('46278538-4e32-463a-ad52-a743c8b9cea1', 'Micronesia, Federated States of', 'Micronesia, Federated States of', 'FM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/FM.svg', '1d6571a8-1674-419a-a99c-b752fecdca14', '2023-04-11 13:26:59.582444');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d7fdff7f-61ee-4401-b1af-644e22659b57', 'Moldova, Republic of', 'Moldova, Republic of', 'MD', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MD.svg', 'afd0e1c7-c180-4ec4-ac64-4d3334f090b6', '2023-04-11 13:26:59.582449');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('e03e30bb-e8df-4ed0-95ec-945bc827dba6', 'Monaco', 'Monaco', 'MC', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MC.svg', 'd251ec5b-b6c3-416b-9628-11770f29dcbd', '2023-04-11 13:26:59.582454');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ae102519-9f96-4bea-a179-7aabfa12021d', 'Mongolia', 'Mongolia', 'MN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MN.svg', 'ae43b61f-8a9f-46da-83be-117af16dcbdf', '2023-04-11 13:26:59.582470');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f895d66b-d542-4897-b294-82a519679b5f', 'Montenegro', 'Montenegro', 'ME', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ME.svg', '781fdf9a-fd32-4c0e-bae8-4c54dc9884c0', '2023-04-11 13:26:59.582476');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('88009d07-3528-410c-83cf-1c52fc858e73', 'Montserrat', 'Montserrat', 'MS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MS.svg', '1648bac9-969d-44c8-80f8-51eb166f1250', '2023-04-11 13:26:59.582481');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('13ecd6e1-efee-487b-b8b8-165ec32bf813', 'Morocco', 'Morocco', 'MA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MA.svg', '2de4fac2-5f99-4793-80dc-9ac3e967d4a2', '2023-04-11 13:26:59.582486');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2bb4b3cf-3509-43dc-a827-45c29817fec4', 'Mozambique', 'Mozambique', 'MZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MZ.svg', '98a1bdf0-35b4-400f-8899-d4d0f8f30f72', '2023-04-11 13:26:59.582491');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('afa40765-d0ba-4867-9093-eccf04c814e6', 'Myanmar', 'Myanmar', 'MM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MM.svg', '8bdfbad3-ebb9-49d7-b0f1-a5fb59912e99', '2023-04-11 13:26:59.582496');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('dc299a7f-2e75-45b0-81b3-67017eb3673b', 'Namibia', 'Namibia', 'NA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NA.svg', '75b8932b-d56c-4f61-a09b-10d3e60b49c5', '2023-04-11 13:26:59.582501');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('128b3a43-c790-427f-a30c-31f1f4687605', 'Nauru', 'Nauru', 'NR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NR.svg', 'fb45d179-2406-448c-86de-e4c1235a209d', '2023-04-11 13:26:59.582506');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2906a740-1911-4a95-a913-01c0683f4a03', 'Nepal', 'Nepal', 'NP', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NP.svg', 'dca58989-54fd-4b87-bd8e-3e5f715af861', '2023-04-11 13:26:59.582511');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('701a81bb-2e51-4548-bafc-5c9125366ecf', 'Netherlands', 'Netherlands', 'NL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NL.svg', '23edbe5d-ad0f-4e84-b55c-043ac42ca045', '2023-04-11 13:26:59.582516');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('da07d826-0d21-4442-a956-d4dff7e14de2', 'New Caledonia', 'New Caledonia', 'NC', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NC.svg', 'cf581632-2b50-4a7e-93c9-c8e5262c5ab3', '2023-04-11 13:26:59.582521');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d2d28ad8-6237-4287-b015-8767bbbd5d20', 'New Zealand', 'New Zealand', 'NZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NZ.svg', '75bec6df-38e7-4c45-99e6-94eab336bdb5', '2023-04-11 13:26:59.582526');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6bbb87c2-d49b-413e-bc6e-6749b91fc424', 'Nicaragua', 'Nicaragua', 'NI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NI.svg', 'd5921292-5c3f-45cf-b9af-66ca4ced5a5b', '2023-04-11 13:26:59.582531');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('3d47d1cf-d1dc-4012-b6c3-eeb0caa48078', 'Niger', 'Niger', 'NE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NE.svg', 'f953c51b-673b-40c2-94e5-a8c56428606b', '2023-04-11 13:26:59.582536');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('46acfec5-16c9-47d1-893b-ecb6a8ab83fd', 'Nigeria', 'Nigeria', 'NG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NG.svg', '94081ea6-0f28-4a3d-a2b0-577e7dd8e3ce', '2023-04-11 13:26:59.582541');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a0756daa-cde2-42f1-9b30-9d82765c8a04', 'Niue', 'Niue', 'NU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NU.svg', 'f865a3d2-0459-44fb-aef4-f27d883a077d', '2023-04-11 13:26:59.582545');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('492b3a47-b432-4d6b-838b-3017d48abc71', 'Norfolk Island', 'Norfolk Island', 'NF', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NF.svg', '37d04e0a-0bc6-4d80-84bc-c691953d5473', '2023-04-11 13:26:59.582550');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('bbb53a54-eafe-4095-b3f4-852f899e2bae', 'Northern Mariana Islands', 'Northern Mariana Islands', 'MP', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MP.svg', 'fddba161-ca01-4d34-93fb-18c0b0aaffe9', '2023-04-11 13:26:59.582555');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('7c56ad02-b5da-43f8-b509-47790d71ac30', 'Norway', 'Norway', 'NO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/NO.svg', '5d287098-3dd2-4f43-aba3-dc0f7eb0f116', '2023-04-11 13:26:59.582560');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('13dc49e6-e705-4604-9a3b-a4fd9e7a6076', 'Oman', 'Oman', 'OM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/OM.svg', 'd9addbef-daf4-4437-a578-2709173ad275', '2023-04-11 13:26:59.582565');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0fdb0e67-0c18-4874-80f4-ee641a63ef81', 'Pakistan', 'Pakistan', 'PK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PK.svg', '9ae2ee88-4a5e-46dd-a177-51b41eb15d6a', '2023-04-11 13:26:59.582570');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d3739e41-6d5b-43c0-9568-30426322bd7a', 'Palau', 'Palau', 'PW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PW.svg', '47130549-b4cd-4d12-a148-4f1dd6269c21', '2023-04-11 13:26:59.582575');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('3dd29099-bfae-422c-bdf4-7c4ed5c7abb2', 'Palestinian Territory, Occupied', 'Palestinian Territory, Occupied', 'PS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PS.svg', '68c347d1-820f-416d-9b60-a545522aea34', '2023-04-11 13:26:59.582580');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('9cb88151-bf4b-4ee8-aa9f-c9c23e92b1e6', 'Panama', 'Panama', 'PA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PA.svg', '62db47ef-9d02-425e-88a1-902a001e8c8d', '2023-04-11 13:26:59.582584');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6501290d-ec6c-420a-95c6-682a46bd64c5', 'Papua New Guinea', 'Papua New Guinea', 'PG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PG.svg', '4835af45-4d4d-44fe-9d99-1f933bc77314', '2023-04-11 13:26:59.582601');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6c9d847b-d9f5-4a7b-a677-293a633b6925', 'Paraguay', 'Paraguay', 'PY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PY.svg', 'b813b054-704b-4b42-8b62-2126e75df12d', '2023-04-11 13:26:59.582606');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('8293218f-0ee3-496d-9b06-4b863962af74', 'Peru', 'Peru', 'PE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PE.svg', '2d3fa2a9-ec5f-48a0-aedb-f4b6e80cbbb2', '2023-04-11 13:26:59.582611');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('3d2925b1-4881-4661-bdfb-751a5c29f79a', 'Philippines', 'Philippines', 'PH', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PH.svg', '75bc08e1-bb46-47e6-b3a0-8052fa4723e5', '2023-04-11 13:26:59.582616');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c7793f6b-fd5f-4645-894e-6edfaa9a5c63', 'Pitcairn', 'Pitcairn', 'PN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PN.svg', 'e2cb0db3-60cd-44af-9a1b-14a8270527a9', '2023-04-11 13:26:59.582621');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f7ba1dbf-c29d-4b46-88fd-ce0cafba26d9', 'Poland', 'Poland', 'PL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PL.svg', '47d48a3c-58b5-4c68-9436-7da154812984', '2023-04-11 13:26:59.582626');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2d98758a-278d-4d97-bb52-f2fd30d525ec', 'Portugal', 'Portugal', 'PT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PT.svg', '979e99b1-e6ea-4fd9-b3df-d993c91c512e', '2023-04-11 13:26:59.582630');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2a4b6319-abe4-4cd1-bbe2-dcd3f9846c6b', 'Puerto Rico', 'Puerto Rico', 'PR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PR.svg', 'ba1c8229-a152-4020-9401-955100962f27', '2023-04-11 13:26:59.582635');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('bf8e79c8-bb1f-41c2-9c92-24b7cd6fa87c', 'Qatar', 'Qatar', 'QA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/QA.svg', '6ccfed37-3659-4f09-9017-fb05f305cbdd', '2023-04-11 13:26:59.582640');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('8c9f23ee-82ac-4078-86f1-cbf464ebe140', 'Réunion', 'Réunion', 'RE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/RE.svg', '204d1ec3-a61a-4a0d-98e1-9d22a79d8a72', '2023-04-11 13:26:59.582645');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('66ba7638-cfa5-4f85-b3a8-ffe371cda66c', 'Romania', 'Romania', 'RO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/RO.svg', '5b486774-b6df-4d14-952c-890a12768cda', '2023-04-11 13:26:59.582650');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('3373c5bf-e12f-4e9c-a926-3894f03debf9', 'Russia', 'Russia', 'RU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/RU.svg', '50a7d984-59fd-4872-8151-5364bc54070a', '2023-04-11 13:26:59.582656');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b8924b75-5d32-40ac-81ca-d2d93f4d9233', 'Rwanda', 'Rwanda', 'RW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/RW.svg', '387a1c05-613a-42b1-8728-9b2c95e6ef0b', '2023-04-11 13:26:59.582661');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0e174953-4176-4bd7-b0a9-b7e89d745ff3', 'Saint Barthélemy', 'Saint Barthélemy', 'BL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/BL.svg', '402099ec-7542-49a1-9241-f41528021a3d', '2023-04-11 13:26:59.582665');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('bc596a78-0926-49ba-ba12-354f9ec3c3aa', 'Saint Helena, Ascension and Tristan Da Cunha', 'Saint Helena, Ascension and Tristan Da Cunha', 'SH', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SH.svg', '7ac0b458-4f1b-43ee-b771-a6de4ff6a070', '2023-04-11 13:26:59.582671');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b05e39fd-f8de-46f2-a9b7-76de1d7e0d44', 'Saint Kitts and Nevis', 'Saint Kitts and Nevis', 'KN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/KN.svg', 'f2cb4617-2490-4bc1-a00f-b4f5ba86849a', '2023-04-11 13:26:59.582676');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c85ba3cb-ac54-4ea2-943d-9c7d8e2992b5', 'Saint Lucia', 'Saint Lucia', 'LC', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LC.svg', '8d247778-d87a-47be-8409-0eb8bafc1934', '2023-04-11 13:26:59.582681');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('406489da-56df-4439-b15d-f553a2c82030', 'Saint Martin', 'Saint Martin', 'MF', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/MF.svg', '32ad3267-cb51-480c-a4dd-e176681d3534', '2023-04-11 13:26:59.582686');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c2cef8f7-a325-4df4-960c-cc4168b4978f', 'Saint Pierre and Miquelon', 'Saint Pierre and Miquelon', 'PM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/PM.svg', 'cc7503b3-c18c-4af7-bcf9-c437ffffb600', '2023-04-11 13:26:59.582691');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('8e5a775c-522f-4883-a523-a9ca368f2ebd', 'Saint Vincent and the Grenadines', 'Saint Vincent and the Grenadines', 'VC', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/VC.svg', '84b19960-469b-43f7-85f6-d73ee25877aa', '2023-04-11 13:26:59.582696');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('4540eb7e-1ee0-4f5d-b53c-d13313294975', 'Samoa', 'Samoa', 'WS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/WS.svg', '146d4653-bf78-4672-be5f-931ff4cabb8a', '2023-04-11 13:26:59.582701');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('8b3e042b-b7fd-4fff-9793-f9a0a0df2be3', 'San Marino', 'San Marino', 'SM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SM.svg', '54d7d78b-a35b-402f-8057-9a18aee7d47d', '2023-04-11 13:26:59.582705');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('1e6e70b8-77e0-4705-a594-c620e2f3cab2', 'Sao Tome and Principe', 'Sao Tome and Principe', 'ST', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ST.svg', '28482e71-2ccb-4505-bce0-d01120994317', '2023-04-11 13:26:59.582710');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('52e41a9b-70d3-4f84-b48e-0b271f7896eb', 'Saudi Arabia', 'Saudi Arabia', 'SA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SA.svg', '40a37cfd-27f6-4bce-83dd-fe26ee75dc39', '2023-04-11 13:26:59.582726');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ff8cc3a2-f0e1-442a-9870-ef386d324548', 'Senegal', 'Senegal', 'SN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SN.svg', '712df788-101f-448f-82a9-ad42ce8f9156', '2023-04-11 13:26:59.582731');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('42c2203f-a8e8-44bf-83d0-8ff23d68b3c2', 'Serbia', 'Serbia', 'RS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/RS.svg', '09135592-ffb5-444f-ae1b-aac0550e4451', '2023-04-11 13:26:59.582736');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('53573bbf-06fb-486d-bc10-863e701a4b1b', 'Seychelles', 'Seychelles', 'SC', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SC.svg', 'c39e8a64-fc65-4e50-aeef-34a78ded30cc', '2023-04-11 13:26:59.582741');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('89308619-4fad-4085-8153-b4282fbe8964', 'Sierra Leone', 'Sierra Leone', 'SL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SL.svg', 'd3365a0b-49a9-402a-8035-07408c2a5723', '2023-04-11 13:26:59.582746');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b08b5cc1-6713-40db-877a-eba6fd86fd57', 'Singapore', 'Singapore', 'SG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SG.svg', '63b33b55-9a3f-4747-8af1-b66d1ecce53a', '2023-04-11 13:26:59.582751');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f57f77f9-5092-47d3-952c-44cc20ffbf35', 'Slovakia', 'Slovakia', 'SK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SK.svg', '471c8eb1-ca06-4fdf-a40b-5f3b85ea8c78', '2023-04-11 13:26:59.582755');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('10795128-06bd-408a-9528-f88b8aad4bcf', 'Slovenia', 'Slovenia', 'SI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SI.svg', 'd6471de8-ec08-4f0f-8333-21769edb5b4f', '2023-04-11 13:26:59.582760');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('5162ca39-d531-4a13-b8b5-07feadc1896f', 'Solomon Islands', 'Solomon Islands', 'SB', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SB.svg', '1e980770-b6f8-444a-8655-9a590a36911f', '2023-04-11 13:26:59.582765');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a0a80a72-9696-4249-aca0-1e76bce55a07', 'Somalia', 'Somalia', 'SO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SO.svg', 'bea43aa1-0ac5-41d4-8882-d88db53e0495', '2023-04-11 13:26:59.582770');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('de026f32-fb05-424e-b3eb-965d93aa6107', 'South Africa', 'South Africa', 'ZA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ZA.svg', 'f77f8737-c60e-46da-8289-837a24808963', '2023-04-11 13:26:59.582775');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('71df4094-c03c-4896-ac5a-4342113f825f', 'South Georgia and the South Sandwich Islands', 'South Georgia and the South Sandwich Islands', 'GS', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GS.svg', '8d9b9945-9f57-4cd5-a1f2-18dc8b3c530a', '2023-04-11 13:26:59.582780');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('8c93b931-8035-4b67-9bd8-cb2f49021944', 'Spain', 'Spain', 'ES', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ES.svg', '3cd30bbc-24c3-4445-a5c5-3a5581003bfa', '2023-04-11 13:26:59.582784');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c7a38369-5a10-49ce-89b4-264690aed024', 'Sri Lanka', 'Sri Lanka', 'LK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/LK.svg', '370d4ede-9497-4c0a-820d-4d3909facbbc', '2023-04-11 13:26:59.582789');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('159e66fd-f457-4d92-be0a-bb15ff15960e', 'Sudan', 'Sudan', 'SD', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SD.svg', '17391279-ccc9-4d5f-af8a-f9bb3064fcf4', '2023-04-11 13:26:59.582794');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('4669ec0b-a0fb-4d01-bf5e-315cc2cb064b', 'Suriname', 'Suriname', 'SR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SR.svg', '70b655c8-9017-4c5c-b15a-64606c22505c', '2023-04-11 13:26:59.582799');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('a27b6b43-e8a2-403e-902d-72bde5173ee8', 'Svalbard and Jan Mayen', 'Svalbard and Jan Mayen', 'SJ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SJ.svg', '69087053-e93e-4f66-a25d-6c17b695a514', '2023-04-11 13:26:59.582804');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('248d5ac5-7955-4056-a758-5268c9d95479', 'Swaziland', 'Swaziland', 'SZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SZ.svg', '0bcc9888-6eda-4b5b-a57b-e442f6a3811d', '2023-04-11 13:26:59.582809');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('0785aa44-91df-4e8e-a602-95d02088e2e6', 'Sweden', 'Sweden', 'SE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SE.svg', '4fc8d573-6f6a-4cd7-a84c-e2931902895e', '2023-04-11 13:26:59.582814');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('bfde4a81-8e5f-44c5-9790-338272cc02ae', 'Switzerland', 'Switzerland', 'CH', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/CH.svg', 'fd08f364-62c6-4767-8ace-677db6795fa1', '2023-04-11 13:26:59.582819');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d491925c-56a1-45e8-9fb5-abaea800cc8a', 'Syrian Arab Republic', 'Syrian Arab Republic', 'SY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/SY.svg', '9e77e2c5-eaf8-4837-aadc-996f146ef176', '2023-04-11 13:26:59.582824');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('4c9113fd-85a5-4d36-af51-724a9a234712', 'Taiwan, Province of China', 'Taiwan, Province of China', 'TW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TW.svg', '4dbcc9c5-9a27-4eea-905e-145460f490d0', '2023-04-11 13:26:59.582829');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('30513b98-c6ee-4260-b4ab-916d3048f571', 'Tajikistan', 'Tajikistan', 'TJ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TJ.svg', '9d88fa24-140d-4567-a00e-b6bc0af12116', '2023-04-11 13:26:59.582834');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('7a656c2c-79cb-4362-a5b3-6726681ddb2f', 'Tanzania, United Republic of', 'Tanzania, United Republic of', 'TZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TZ.svg', '59b5d9c4-6202-41b1-bc8b-5f1510ea8aa3', '2023-04-11 13:26:59.582851');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c7d8d617-d935-4cf8-b80d-9eeff98f2c14', 'Thailand', 'Thailand', 'TH', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TH.svg', 'bdd2dca7-ef4c-41cf-a0d4-f8af7d0d9f40', '2023-04-11 13:26:59.582857');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('07c437eb-c0e3-4864-b3bd-d1ef19187065', 'Timor-Leste', 'Timor-Leste', 'TL', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TL.svg', '18d439de-49fc-4de2-bd36-cc3c4608c036', '2023-04-11 13:26:59.582862');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('35a068b7-6fcd-4e74-be2c-b133342faeea', 'Togo', 'Togo', 'TG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TG.svg', '3cec9d57-8d15-4345-afc0-6746fd1d06b3', '2023-04-11 13:26:59.582867');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('2ae874bc-0568-46eb-9ee6-18b343dc047e', 'Tokelau', 'Tokelau', 'TK', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TK.svg', '20215443-06e9-428e-af03-0bc4674c935f', '2023-04-11 13:26:59.582872');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('1c1d1f1f-7d97-4720-b600-4a394e8f128d', 'Tonga', 'Tonga', 'TO', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TO.svg', '7a1e6f53-5fa9-4509-a9e0-71aa0ceb9def', '2023-04-11 13:26:59.582877');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('8e001015-e5c8-41c6-959e-a24a9dd3f0e5', 'Trinidad and Tobago', 'Trinidad and Tobago', 'TT', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TT.svg', '4a90fe01-0a79-439f-82df-84ec6d40903b', '2023-04-11 13:26:59.582882');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('6a9584a4-944f-4b3d-835e-db38cf1c1cb9', 'Tunisia', 'Tunisia', 'TN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TN.svg', '16764e2a-dc91-4dde-ab37-47489f7e51ae', '2023-04-11 13:26:59.582887');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('79969180-02a2-48df-8f5e-17054c3fc507', 'Turkey', 'Turkey', 'TR', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TR.svg', '6d9006c2-9e10-4fd5-9f94-14ab16148760', '2023-04-11 13:26:59.582892');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('c6aef69c-2171-4d3b-89ee-bdd2794699bd', 'Turkmenistan', 'Turkmenistan', 'TM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TM.svg', '085c7ba5-4182-42b1-b485-2f13b1296146', '2023-04-11 13:26:59.582897');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('42e2b5b7-ea58-4237-b2b6-e851ffb00208', 'Turks and Caicos Islands', 'Turks and Caicos Islands', 'TC', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TC.svg', '069293fc-a12f-4029-b996-a74adb47d3d2', '2023-04-11 13:26:59.582902');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('7f75a767-2211-4b12-8b48-9fd745086862', 'Tuvalu', 'Tuvalu', 'TV', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/TV.svg', '9326a590-af47-4d0d-9f44-f74cca256d87', '2023-04-11 13:26:59.582907');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('bfda3080-2698-43af-9ac8-7bc7633a8824', 'Uganda', 'Uganda', 'UG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/UG.svg', '9c9f37c7-7b2c-4d6f-849b-8908a4f59db1', '2023-04-11 13:26:59.582912');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('4a77a600-d02d-4d59-9009-a0f38bb4bcd0', 'Ukraine', 'Ukraine', 'UA', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/UA.svg', 'd2f712aa-b722-4ff3-994c-e7644e6c126b', '2023-04-11 13:26:59.582916');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('989bcff2-13ca-4fc2-85d0-b0ebb30121e4', 'United Arab Emirates', 'United Arab Emirates', 'AE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/AE.svg', '253f18a4-9b61-45ff-ba06-a276c79b543d', '2023-04-11 13:26:59.582921');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ee5ebb9c-1c11-4cc9-8626-b8f5aaa18386', 'United Kingdom', 'United Kingdom', 'GB', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/GB.svg', '5812d0d2-1e83-4593-9532-77e99764f6d4', '2023-04-11 13:26:59.582926');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('51af0b91-9e75-4695-bbbe-3a25fc97cdfe', 'United States', 'United States', 'US', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/US.svg', '332d516b-0eae-49f5-bbce-fbfcfe4cdf77', '2023-04-11 13:26:59.582930');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('ffba038a-e9f8-4ca1-bc52-1e4952d717ee', 'Uruguay', 'Uruguay', 'UY', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/UY.svg', '97642486-23b2-4547-85df-75a7dd9daeec', '2023-04-11 13:26:59.582935');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('67fe7937-e8e8-49c0-b8a5-5e52d4a5bd4a', 'Uzbekistan', 'Uzbekistan', 'UZ', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/UZ.svg', '13f3a32c-3800-4cda-a9c6-4549576a5cb3', '2023-04-11 13:26:59.582940');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('379589be-7677-438a-9d58-20e329b4a100', 'Vanuatu', 'Vanuatu', 'VU', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/VU.svg', 'b4372a4b-273c-4deb-ba05-dac358615be7', '2023-04-11 13:26:59.582945');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('4ab47a4b-e65d-40a1-85ce-97df3fe27dae', 'Venezuela, Bolivarian Republic of', 'Venezuela, Bolivarian Republic of', 'VE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/VE.svg', '2fc3b765-8f4d-479b-b012-380e6401a816', '2023-04-11 13:26:59.582950');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('3f895456-22ed-4f3c-8bb4-ecbd5e6de1ab', 'Viet Nam', 'Viet Nam', 'VN', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/VN.svg', '7f6b12dc-1893-44be-b2da-144a0859df50', '2023-04-11 13:26:59.582954');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('995a53fe-287e-4522-b74f-9df5d3e6f6dd', 'Virgin Islands, British', 'Virgin Islands, British', 'VG', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/VG.svg', '2a71b7b1-f5c1-40b4-8a80-0110e24f6973', '2023-04-11 13:26:59.582959');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('4ff04c10-82aa-482c-a480-6f2951a2ed1b', 'Virgin Islands, U.S.', 'Virgin Islands, U.S.', 'VI', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/VI.svg', 'c151f194-0e99-4c7b-be5a-31270003f529', '2023-04-11 13:26:59.582974');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('86b6588a-9a06-403e-a1ed-69eaa155211d', 'Wallis and Futuna', 'Wallis and Futuna', 'WF', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/WF.svg', '3034d768-0acc-49e2-b5f8-131848a8226a', '2023-04-11 13:26:59.582980');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('f5e86a30-2a76-468b-bb0c-5b706b5d9532', 'Yemen', 'Yemen', 'YE', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/YE.svg', 'c75fefea-2333-4fc1-bcaf-fa5a091e474e', '2023-04-11 13:26:59.582984');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('d77ee42d-d4f7-4878-879e-ee28dbaf768e', 'Zambia', 'Zambia', 'ZM', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ZM.svg', 'bfb0a6b8-eaaf-4459-9e33-a4683824b270', '2023-04-11 13:26:59.582989');
INSERT INTO countries (id, name, native_name, code, flag_svg_url, wrapper_integration_id, created_date)
VALUES ('b7e5e2dd-b12a-4790-82d7-21ad83b4a778', 'Zimbabwe', 'Zimbabwe', 'ZW', 'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/ZW.svg', 'ff57f99d-e48f-4b6c-98a2-4f0d4b0cf748', '2023-04-11 13:26:59.582994');


-- Request Statuses

INSERT INTO request_statuses (id, alternative_id, "name", created_date, updated_date, deleted_date) VALUES('78256c0b-cbb2-440b-ae2e-a43c741f1e82'::uuid, 1, 'Sent', '2023-04-12 06:50:28.860', NULL, NULL);
INSERT INTO request_statuses (id, alternative_id, "name", created_date, updated_date, deleted_date) VALUES('667a6083-9ba8-4822-a50d-22b34e0c08a9'::uuid, 2, 'Pending', '2023-04-12 06:50:28.863', NULL, NULL);
INSERT INTO request_statuses (id, alternative_id, "name", created_date, updated_date, deleted_date) VALUES('f6a59aa8-d35d-4c68-b92e-c42107af043b'::uuid, 3, 'Completed', '2023-04-12 06:50:28.864', NULL, NULL);
INSERT INTO request_statuses (id, alternative_id, "name", created_date, updated_date, deleted_date) VALUES('7e1de153-3a2d-4c0b-b432-665298e25b73'::uuid, 4, 'Canceled', '2023-04-12 06:50:28.866', NULL, NULL);
INSERT INTO request_statuses (id, alternative_id, "name", created_date, updated_date, deleted_date) VALUES('46b6189b-7e7e-45f1-8004-f9f81c2769ed'::uuid, 5, 'Partially Completed', '2023-04-12 06:50:28.867', NULL, NULL);
