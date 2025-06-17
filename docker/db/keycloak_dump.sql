--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_event_entity; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.admin_event_entity (
    id character varying(36) NOT NULL,
    admin_event_time bigint,
    realm_id character varying(255),
    operation_type character varying(255),
    auth_realm_id character varying(255),
    auth_client_id character varying(255),
    auth_user_id character varying(255),
    ip_address character varying(255),
    resource_path character varying(2550),
    representation text,
    error character varying(255),
    resource_type character varying(64)
);


ALTER TABLE public.admin_event_entity OWNER TO keycloak;

--
-- Name: associated_policy; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.associated_policy (
    policy_id character varying(36) NOT NULL,
    associated_policy_id character varying(36) NOT NULL
);


ALTER TABLE public.associated_policy OWNER TO keycloak;

--
-- Name: authentication_execution; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.authentication_execution (
    id character varying(36) NOT NULL,
    alias character varying(255),
    authenticator character varying(36),
    realm_id character varying(36),
    flow_id character varying(36),
    requirement integer,
    priority integer,
    authenticator_flow boolean DEFAULT false NOT NULL,
    auth_flow_id character varying(36),
    auth_config character varying(36)
);


ALTER TABLE public.authentication_execution OWNER TO keycloak;

--
-- Name: authentication_flow; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.authentication_flow (
    id character varying(36) NOT NULL,
    alias character varying(255),
    description character varying(255),
    realm_id character varying(36),
    provider_id character varying(36) DEFAULT 'basic-flow'::character varying NOT NULL,
    top_level boolean DEFAULT false NOT NULL,
    built_in boolean DEFAULT false NOT NULL
);


ALTER TABLE public.authentication_flow OWNER TO keycloak;

--
-- Name: authenticator_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.authenticator_config (
    id character varying(36) NOT NULL,
    alias character varying(255),
    realm_id character varying(36)
);


ALTER TABLE public.authenticator_config OWNER TO keycloak;

--
-- Name: authenticator_config_entry; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.authenticator_config_entry (
    authenticator_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.authenticator_config_entry OWNER TO keycloak;

--
-- Name: broker_link; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.broker_link (
    identity_provider character varying(255) NOT NULL,
    storage_provider_id character varying(255),
    realm_id character varying(36) NOT NULL,
    broker_user_id character varying(255),
    broker_username character varying(255),
    token text,
    user_id character varying(255) NOT NULL
);


ALTER TABLE public.broker_link OWNER TO keycloak;

--
-- Name: client; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client (
    id character varying(36) NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    full_scope_allowed boolean DEFAULT false NOT NULL,
    client_id character varying(255),
    not_before integer,
    public_client boolean DEFAULT false NOT NULL,
    secret character varying(255),
    base_url character varying(255),
    bearer_only boolean DEFAULT false NOT NULL,
    management_url character varying(255),
    surrogate_auth_required boolean DEFAULT false NOT NULL,
    realm_id character varying(36),
    protocol character varying(255),
    node_rereg_timeout integer DEFAULT 0,
    frontchannel_logout boolean DEFAULT false NOT NULL,
    consent_required boolean DEFAULT false NOT NULL,
    name character varying(255),
    service_accounts_enabled boolean DEFAULT false NOT NULL,
    client_authenticator_type character varying(255),
    root_url character varying(255),
    description character varying(255),
    registration_token character varying(255),
    standard_flow_enabled boolean DEFAULT true NOT NULL,
    implicit_flow_enabled boolean DEFAULT false NOT NULL,
    direct_access_grants_enabled boolean DEFAULT false NOT NULL,
    always_display_in_console boolean DEFAULT false NOT NULL
);


ALTER TABLE public.client OWNER TO keycloak;

--
-- Name: client_attributes; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_attributes (
    client_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value text
);


ALTER TABLE public.client_attributes OWNER TO keycloak;

--
-- Name: client_auth_flow_bindings; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_auth_flow_bindings (
    client_id character varying(36) NOT NULL,
    flow_id character varying(36),
    binding_name character varying(255) NOT NULL
);


ALTER TABLE public.client_auth_flow_bindings OWNER TO keycloak;

--
-- Name: client_initial_access; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_initial_access (
    id character varying(36) NOT NULL,
    realm_id character varying(36) NOT NULL,
    "timestamp" integer,
    expiration integer,
    count integer,
    remaining_count integer
);


ALTER TABLE public.client_initial_access OWNER TO keycloak;

--
-- Name: client_node_registrations; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_node_registrations (
    client_id character varying(36) NOT NULL,
    value integer,
    name character varying(255) NOT NULL
);


ALTER TABLE public.client_node_registrations OWNER TO keycloak;

--
-- Name: client_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_scope (
    id character varying(36) NOT NULL,
    name character varying(255),
    realm_id character varying(36),
    description character varying(255),
    protocol character varying(255)
);


ALTER TABLE public.client_scope OWNER TO keycloak;

--
-- Name: client_scope_attributes; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_scope_attributes (
    scope_id character varying(36) NOT NULL,
    value character varying(2048),
    name character varying(255) NOT NULL
);


ALTER TABLE public.client_scope_attributes OWNER TO keycloak;

--
-- Name: client_scope_client; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_scope_client (
    client_id character varying(255) NOT NULL,
    scope_id character varying(255) NOT NULL,
    default_scope boolean DEFAULT false NOT NULL
);


ALTER TABLE public.client_scope_client OWNER TO keycloak;

--
-- Name: client_scope_role_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_scope_role_mapping (
    scope_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);


ALTER TABLE public.client_scope_role_mapping OWNER TO keycloak;

--
-- Name: client_session; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session (
    id character varying(36) NOT NULL,
    client_id character varying(36),
    redirect_uri character varying(255),
    state character varying(255),
    "timestamp" integer,
    session_id character varying(36),
    auth_method character varying(255),
    realm_id character varying(255),
    auth_user_id character varying(36),
    current_action character varying(36)
);


ALTER TABLE public.client_session OWNER TO keycloak;

--
-- Name: client_session_auth_status; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session_auth_status (
    authenticator character varying(36) NOT NULL,
    status integer,
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_session_auth_status OWNER TO keycloak;

--
-- Name: client_session_note; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session_note (
    name character varying(255) NOT NULL,
    value character varying(255),
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_session_note OWNER TO keycloak;

--
-- Name: client_session_prot_mapper; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session_prot_mapper (
    protocol_mapper_id character varying(36) NOT NULL,
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_session_prot_mapper OWNER TO keycloak;

--
-- Name: client_session_role; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_session_role (
    role_id character varying(255) NOT NULL,
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_session_role OWNER TO keycloak;

--
-- Name: client_user_session_note; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.client_user_session_note (
    name character varying(255) NOT NULL,
    value character varying(2048),
    client_session character varying(36) NOT NULL
);


ALTER TABLE public.client_user_session_note OWNER TO keycloak;

--
-- Name: component; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.component (
    id character varying(36) NOT NULL,
    name character varying(255),
    parent_id character varying(36),
    provider_id character varying(36),
    provider_type character varying(255),
    realm_id character varying(36),
    sub_type character varying(255)
);


ALTER TABLE public.component OWNER TO keycloak;

--
-- Name: component_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.component_config (
    id character varying(36) NOT NULL,
    component_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value text
);


ALTER TABLE public.component_config OWNER TO keycloak;

--
-- Name: composite_role; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.composite_role (
    composite character varying(36) NOT NULL,
    child_role character varying(36) NOT NULL
);


ALTER TABLE public.composite_role OWNER TO keycloak;

--
-- Name: credential; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.credential (
    id character varying(36) NOT NULL,
    salt bytea,
    type character varying(255),
    user_id character varying(36),
    created_date bigint,
    user_label character varying(255),
    secret_data text,
    credential_data text,
    priority integer
);


ALTER TABLE public.credential OWNER TO keycloak;

--
-- Name: databasechangelog; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);


ALTER TABLE public.databasechangelog OWNER TO keycloak;

--
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE public.databasechangeloglock OWNER TO keycloak;

--
-- Name: default_client_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.default_client_scope (
    realm_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL,
    default_scope boolean DEFAULT false NOT NULL
);


ALTER TABLE public.default_client_scope OWNER TO keycloak;

--
-- Name: event_entity; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.event_entity (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    details_json character varying(2550),
    error character varying(255),
    ip_address character varying(255),
    realm_id character varying(255),
    session_id character varying(255),
    event_time bigint,
    type character varying(255),
    user_id character varying(255),
    details_json_long_value text
);


ALTER TABLE public.event_entity OWNER TO keycloak;

--
-- Name: fed_user_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_attribute (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    value character varying(2024),
    long_value_hash bytea,
    long_value_hash_lower_case bytea,
    long_value text
);


ALTER TABLE public.fed_user_attribute OWNER TO keycloak;

--
-- Name: fed_user_consent; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_consent (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    created_date bigint,
    last_updated_date bigint,
    client_storage_provider character varying(36),
    external_client_id character varying(255)
);


ALTER TABLE public.fed_user_consent OWNER TO keycloak;

--
-- Name: fed_user_consent_cl_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_consent_cl_scope (
    user_consent_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.fed_user_consent_cl_scope OWNER TO keycloak;

--
-- Name: fed_user_credential; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_credential (
    id character varying(36) NOT NULL,
    salt bytea,
    type character varying(255),
    created_date bigint,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36),
    user_label character varying(255),
    secret_data text,
    credential_data text,
    priority integer
);


ALTER TABLE public.fed_user_credential OWNER TO keycloak;

--
-- Name: fed_user_group_membership; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_group_membership (
    group_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_group_membership OWNER TO keycloak;

--
-- Name: fed_user_required_action; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_required_action (
    required_action character varying(255) DEFAULT ' '::character varying NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_required_action OWNER TO keycloak;

--
-- Name: fed_user_role_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.fed_user_role_mapping (
    role_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    storage_provider_id character varying(36)
);


ALTER TABLE public.fed_user_role_mapping OWNER TO keycloak;

--
-- Name: federated_identity; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.federated_identity (
    identity_provider character varying(255) NOT NULL,
    realm_id character varying(36),
    federated_user_id character varying(255),
    federated_username character varying(255),
    token text,
    user_id character varying(36) NOT NULL
);


ALTER TABLE public.federated_identity OWNER TO keycloak;

--
-- Name: federated_user; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.federated_user (
    id character varying(255) NOT NULL,
    storage_provider_id character varying(255),
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.federated_user OWNER TO keycloak;

--
-- Name: group_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.group_attribute (
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255),
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.group_attribute OWNER TO keycloak;

--
-- Name: group_role_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.group_role_mapping (
    role_id character varying(36) NOT NULL,
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.group_role_mapping OWNER TO keycloak;

--
-- Name: identity_provider; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.identity_provider (
    internal_id character varying(36) NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    provider_alias character varying(255),
    provider_id character varying(255),
    store_token boolean DEFAULT false NOT NULL,
    authenticate_by_default boolean DEFAULT false NOT NULL,
    realm_id character varying(36),
    add_token_role boolean DEFAULT true NOT NULL,
    trust_email boolean DEFAULT false NOT NULL,
    first_broker_login_flow_id character varying(36),
    post_broker_login_flow_id character varying(36),
    provider_display_name character varying(255),
    link_only boolean DEFAULT false NOT NULL
);


ALTER TABLE public.identity_provider OWNER TO keycloak;

--
-- Name: identity_provider_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.identity_provider_config (
    identity_provider_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.identity_provider_config OWNER TO keycloak;

--
-- Name: identity_provider_mapper; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.identity_provider_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    idp_alias character varying(255) NOT NULL,
    idp_mapper_name character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.identity_provider_mapper OWNER TO keycloak;

--
-- Name: idp_mapper_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.idp_mapper_config (
    idp_mapper_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.idp_mapper_config OWNER TO keycloak;

--
-- Name: keycloak_group; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.keycloak_group (
    id character varying(36) NOT NULL,
    name character varying(255),
    parent_group character varying(36) NOT NULL,
    realm_id character varying(36)
);


ALTER TABLE public.keycloak_group OWNER TO keycloak;

--
-- Name: keycloak_role; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.keycloak_role (
    id character varying(36) NOT NULL,
    client_realm_constraint character varying(255),
    client_role boolean DEFAULT false NOT NULL,
    description character varying(255),
    name character varying(255),
    realm_id character varying(255),
    client character varying(36),
    realm character varying(36)
);


ALTER TABLE public.keycloak_role OWNER TO keycloak;

--
-- Name: migration_model; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.migration_model (
    id character varying(36) NOT NULL,
    version character varying(36),
    update_time bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public.migration_model OWNER TO keycloak;

--
-- Name: offline_client_session; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.offline_client_session (
    user_session_id character varying(36) NOT NULL,
    client_id character varying(255) NOT NULL,
    offline_flag character varying(4) NOT NULL,
    "timestamp" integer,
    data text,
    client_storage_provider character varying(36) DEFAULT 'local'::character varying NOT NULL,
    external_client_id character varying(255) DEFAULT 'local'::character varying NOT NULL,
    version integer DEFAULT 0
);


ALTER TABLE public.offline_client_session OWNER TO keycloak;

--
-- Name: offline_user_session; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.offline_user_session (
    user_session_id character varying(36) NOT NULL,
    user_id character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    created_on integer NOT NULL,
    offline_flag character varying(4) NOT NULL,
    data text,
    last_session_refresh integer DEFAULT 0 NOT NULL,
    broker_session_id character varying(1024),
    version integer DEFAULT 0
);


ALTER TABLE public.offline_user_session OWNER TO keycloak;

--
-- Name: org; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.org (
    id character varying(255) NOT NULL,
    enabled boolean NOT NULL,
    realm_id character varying(255) NOT NULL,
    group_id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(4000)
);


ALTER TABLE public.org OWNER TO keycloak;

--
-- Name: org_domain; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.org_domain (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    verified boolean NOT NULL,
    org_id character varying(255) NOT NULL
);


ALTER TABLE public.org_domain OWNER TO keycloak;

--
-- Name: policy_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.policy_config (
    policy_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value text
);


ALTER TABLE public.policy_config OWNER TO keycloak;

--
-- Name: protocol_mapper; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.protocol_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    protocol character varying(255) NOT NULL,
    protocol_mapper_name character varying(255) NOT NULL,
    client_id character varying(36),
    client_scope_id character varying(36)
);


ALTER TABLE public.protocol_mapper OWNER TO keycloak;

--
-- Name: protocol_mapper_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.protocol_mapper_config (
    protocol_mapper_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.protocol_mapper_config OWNER TO keycloak;

--
-- Name: realm; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm (
    id character varying(36) NOT NULL,
    access_code_lifespan integer,
    user_action_lifespan integer,
    access_token_lifespan integer,
    account_theme character varying(255),
    admin_theme character varying(255),
    email_theme character varying(255),
    enabled boolean DEFAULT false NOT NULL,
    events_enabled boolean DEFAULT false NOT NULL,
    events_expiration bigint,
    login_theme character varying(255),
    name character varying(255),
    not_before integer,
    password_policy character varying(2550),
    registration_allowed boolean DEFAULT false NOT NULL,
    remember_me boolean DEFAULT false NOT NULL,
    reset_password_allowed boolean DEFAULT false NOT NULL,
    social boolean DEFAULT false NOT NULL,
    ssl_required character varying(255),
    sso_idle_timeout integer,
    sso_max_lifespan integer,
    update_profile_on_soc_login boolean DEFAULT false NOT NULL,
    verify_email boolean DEFAULT false NOT NULL,
    master_admin_client character varying(36),
    login_lifespan integer,
    internationalization_enabled boolean DEFAULT false NOT NULL,
    default_locale character varying(255),
    reg_email_as_username boolean DEFAULT false NOT NULL,
    admin_events_enabled boolean DEFAULT false NOT NULL,
    admin_events_details_enabled boolean DEFAULT false NOT NULL,
    edit_username_allowed boolean DEFAULT false NOT NULL,
    otp_policy_counter integer DEFAULT 0,
    otp_policy_window integer DEFAULT 1,
    otp_policy_period integer DEFAULT 30,
    otp_policy_digits integer DEFAULT 6,
    otp_policy_alg character varying(36) DEFAULT 'HmacSHA1'::character varying,
    otp_policy_type character varying(36) DEFAULT 'totp'::character varying,
    browser_flow character varying(36),
    registration_flow character varying(36),
    direct_grant_flow character varying(36),
    reset_credentials_flow character varying(36),
    client_auth_flow character varying(36),
    offline_session_idle_timeout integer DEFAULT 0,
    revoke_refresh_token boolean DEFAULT false NOT NULL,
    access_token_life_implicit integer DEFAULT 0,
    login_with_email_allowed boolean DEFAULT true NOT NULL,
    duplicate_emails_allowed boolean DEFAULT false NOT NULL,
    docker_auth_flow character varying(36),
    refresh_token_max_reuse integer DEFAULT 0,
    allow_user_managed_access boolean DEFAULT false NOT NULL,
    sso_max_lifespan_remember_me integer DEFAULT 0 NOT NULL,
    sso_idle_timeout_remember_me integer DEFAULT 0 NOT NULL,
    default_role character varying(255)
);


ALTER TABLE public.realm OWNER TO keycloak;

--
-- Name: realm_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_attribute (
    name character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL,
    value text
);


ALTER TABLE public.realm_attribute OWNER TO keycloak;

--
-- Name: realm_default_groups; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_default_groups (
    realm_id character varying(36) NOT NULL,
    group_id character varying(36) NOT NULL
);


ALTER TABLE public.realm_default_groups OWNER TO keycloak;

--
-- Name: realm_enabled_event_types; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_enabled_event_types (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_enabled_event_types OWNER TO keycloak;

--
-- Name: realm_events_listeners; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_events_listeners (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_events_listeners OWNER TO keycloak;

--
-- Name: realm_localizations; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_localizations (
    realm_id character varying(255) NOT NULL,
    locale character varying(255) NOT NULL,
    texts text NOT NULL
);


ALTER TABLE public.realm_localizations OWNER TO keycloak;

--
-- Name: realm_required_credential; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_required_credential (
    type character varying(255) NOT NULL,
    form_label character varying(255),
    input boolean DEFAULT false NOT NULL,
    secret boolean DEFAULT false NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.realm_required_credential OWNER TO keycloak;

--
-- Name: realm_smtp_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_smtp_config (
    realm_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.realm_smtp_config OWNER TO keycloak;

--
-- Name: realm_supported_locales; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.realm_supported_locales (
    realm_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.realm_supported_locales OWNER TO keycloak;

--
-- Name: redirect_uris; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.redirect_uris (
    client_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.redirect_uris OWNER TO keycloak;

--
-- Name: required_action_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.required_action_config (
    required_action_id character varying(36) NOT NULL,
    value text,
    name character varying(255) NOT NULL
);


ALTER TABLE public.required_action_config OWNER TO keycloak;

--
-- Name: required_action_provider; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.required_action_provider (
    id character varying(36) NOT NULL,
    alias character varying(255),
    name character varying(255),
    realm_id character varying(36),
    enabled boolean DEFAULT false NOT NULL,
    default_action boolean DEFAULT false NOT NULL,
    provider_id character varying(255),
    priority integer
);


ALTER TABLE public.required_action_provider OWNER TO keycloak;

--
-- Name: resource_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_attribute (
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255),
    resource_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_attribute OWNER TO keycloak;

--
-- Name: resource_policy; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_policy (
    resource_id character varying(36) NOT NULL,
    policy_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_policy OWNER TO keycloak;

--
-- Name: resource_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_scope (
    resource_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.resource_scope OWNER TO keycloak;

--
-- Name: resource_server; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server (
    id character varying(36) NOT NULL,
    allow_rs_remote_mgmt boolean DEFAULT false NOT NULL,
    policy_enforce_mode smallint NOT NULL,
    decision_strategy smallint DEFAULT 1 NOT NULL
);


ALTER TABLE public.resource_server OWNER TO keycloak;

--
-- Name: resource_server_perm_ticket; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server_perm_ticket (
    id character varying(36) NOT NULL,
    owner character varying(255) NOT NULL,
    requester character varying(255) NOT NULL,
    created_timestamp bigint NOT NULL,
    granted_timestamp bigint,
    resource_id character varying(36) NOT NULL,
    scope_id character varying(36),
    resource_server_id character varying(36) NOT NULL,
    policy_id character varying(36)
);


ALTER TABLE public.resource_server_perm_ticket OWNER TO keycloak;

--
-- Name: resource_server_policy; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server_policy (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255) NOT NULL,
    decision_strategy smallint,
    logic smallint,
    resource_server_id character varying(36) NOT NULL,
    owner character varying(255)
);


ALTER TABLE public.resource_server_policy OWNER TO keycloak;

--
-- Name: resource_server_resource; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server_resource (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255),
    icon_uri character varying(255),
    owner character varying(255) NOT NULL,
    resource_server_id character varying(36) NOT NULL,
    owner_managed_access boolean DEFAULT false NOT NULL,
    display_name character varying(255)
);


ALTER TABLE public.resource_server_resource OWNER TO keycloak;

--
-- Name: resource_server_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_server_scope (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    icon_uri character varying(255),
    resource_server_id character varying(36) NOT NULL,
    display_name character varying(255)
);


ALTER TABLE public.resource_server_scope OWNER TO keycloak;

--
-- Name: resource_uris; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.resource_uris (
    resource_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.resource_uris OWNER TO keycloak;

--
-- Name: role_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.role_attribute (
    id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255)
);


ALTER TABLE public.role_attribute OWNER TO keycloak;

--
-- Name: scope_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.scope_mapping (
    client_id character varying(36) NOT NULL,
    role_id character varying(36) NOT NULL
);


ALTER TABLE public.scope_mapping OWNER TO keycloak;

--
-- Name: scope_policy; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.scope_policy (
    scope_id character varying(36) NOT NULL,
    policy_id character varying(36) NOT NULL
);


ALTER TABLE public.scope_policy OWNER TO keycloak;

--
-- Name: user_attribute; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_attribute (
    name character varying(255) NOT NULL,
    value character varying(255),
    user_id character varying(36) NOT NULL,
    id character varying(36) DEFAULT 'sybase-needs-something-here'::character varying NOT NULL,
    long_value_hash bytea,
    long_value_hash_lower_case bytea,
    long_value text
);


ALTER TABLE public.user_attribute OWNER TO keycloak;

--
-- Name: user_consent; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_consent (
    id character varying(36) NOT NULL,
    client_id character varying(255),
    user_id character varying(36) NOT NULL,
    created_date bigint,
    last_updated_date bigint,
    client_storage_provider character varying(36),
    external_client_id character varying(255)
);


ALTER TABLE public.user_consent OWNER TO keycloak;

--
-- Name: user_consent_client_scope; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_consent_client_scope (
    user_consent_id character varying(36) NOT NULL,
    scope_id character varying(36) NOT NULL
);


ALTER TABLE public.user_consent_client_scope OWNER TO keycloak;

--
-- Name: user_entity; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_entity (
    id character varying(36) NOT NULL,
    email character varying(255),
    email_constraint character varying(255),
    email_verified boolean DEFAULT false NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    federation_link character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    realm_id character varying(255),
    username character varying(255),
    created_timestamp bigint,
    service_account_client_link character varying(255),
    not_before integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.user_entity OWNER TO keycloak;

--
-- Name: user_federation_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_federation_config (
    user_federation_provider_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.user_federation_config OWNER TO keycloak;

--
-- Name: user_federation_mapper; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_federation_mapper (
    id character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    federation_provider_id character varying(36) NOT NULL,
    federation_mapper_type character varying(255) NOT NULL,
    realm_id character varying(36) NOT NULL
);


ALTER TABLE public.user_federation_mapper OWNER TO keycloak;

--
-- Name: user_federation_mapper_config; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_federation_mapper_config (
    user_federation_mapper_id character varying(36) NOT NULL,
    value character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.user_federation_mapper_config OWNER TO keycloak;

--
-- Name: user_federation_provider; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_federation_provider (
    id character varying(36) NOT NULL,
    changed_sync_period integer,
    display_name character varying(255),
    full_sync_period integer,
    last_sync integer,
    priority integer,
    provider_name character varying(255),
    realm_id character varying(36)
);


ALTER TABLE public.user_federation_provider OWNER TO keycloak;

--
-- Name: user_group_membership; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_group_membership (
    group_id character varying(36) NOT NULL,
    user_id character varying(36) NOT NULL
);


ALTER TABLE public.user_group_membership OWNER TO keycloak;

--
-- Name: user_required_action; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_required_action (
    user_id character varying(36) NOT NULL,
    required_action character varying(255) DEFAULT ' '::character varying NOT NULL
);


ALTER TABLE public.user_required_action OWNER TO keycloak;

--
-- Name: user_role_mapping; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_role_mapping (
    role_id character varying(255) NOT NULL,
    user_id character varying(36) NOT NULL
);


ALTER TABLE public.user_role_mapping OWNER TO keycloak;

--
-- Name: user_session; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_session (
    id character varying(36) NOT NULL,
    auth_method character varying(255),
    ip_address character varying(255),
    last_session_refresh integer,
    login_username character varying(255),
    realm_id character varying(255),
    remember_me boolean DEFAULT false NOT NULL,
    started integer,
    user_id character varying(255),
    user_session_state integer,
    broker_session_id character varying(255),
    broker_user_id character varying(255)
);


ALTER TABLE public.user_session OWNER TO keycloak;

--
-- Name: user_session_note; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.user_session_note (
    user_session character varying(36) NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(2048)
);


ALTER TABLE public.user_session_note OWNER TO keycloak;

--
-- Name: username_login_failure; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.username_login_failure (
    realm_id character varying(36) NOT NULL,
    username character varying(255) NOT NULL,
    failed_login_not_before integer,
    last_failure bigint,
    last_ip_failure character varying(255),
    num_failures integer
);


ALTER TABLE public.username_login_failure OWNER TO keycloak;

--
-- Name: web_origins; Type: TABLE; Schema: public; Owner: keycloak
--

CREATE TABLE public.web_origins (
    client_id character varying(36) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.web_origins OWNER TO keycloak;

--
-- Data for Name: admin_event_entity; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.admin_event_entity (id, admin_event_time, realm_id, operation_type, auth_realm_id, auth_client_id, auth_user_id, ip_address, resource_path, representation, error, resource_type) FROM stdin;
\.


--
-- Data for Name: associated_policy; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.associated_policy (policy_id, associated_policy_id) FROM stdin;
b9044aec-0430-4062-96d2-2dcc098c1fe2	475a9f6e-0774-4bd0-ad71-eca92e31555e
\.


--
-- Data for Name: authentication_execution; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.authentication_execution (id, alias, authenticator, realm_id, flow_id, requirement, priority, authenticator_flow, auth_flow_id, auth_config) FROM stdin;
0a1272d6-808e-4d5d-9ca7-cd9f6ef33ce4	\N	auth-cookie	51ac782d-09fc-4a3b-a00f-1da1eee0183f	cdeaae08-a1c6-46f6-8cec-69ae3373fff5	2	10	f	\N	\N
5d039c9a-e68d-45f6-b44b-8e9962c56115	\N	auth-spnego	51ac782d-09fc-4a3b-a00f-1da1eee0183f	cdeaae08-a1c6-46f6-8cec-69ae3373fff5	3	20	f	\N	\N
830f1537-abfe-4bfc-8d53-2f1f27c086a1	\N	identity-provider-redirector	51ac782d-09fc-4a3b-a00f-1da1eee0183f	cdeaae08-a1c6-46f6-8cec-69ae3373fff5	2	25	f	\N	\N
3219d7fc-d33e-4dd8-a569-8fd9fc78038c	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	cdeaae08-a1c6-46f6-8cec-69ae3373fff5	2	30	t	4984f8da-03bd-4737-b5c6-37d9cbedb652	\N
d1c74cda-910b-4f77-885f-4ab5ac40ab7b	\N	auth-username-password-form	51ac782d-09fc-4a3b-a00f-1da1eee0183f	4984f8da-03bd-4737-b5c6-37d9cbedb652	0	10	f	\N	\N
013588fd-26ae-41c5-8f3e-a23c4b5765f7	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	4984f8da-03bd-4737-b5c6-37d9cbedb652	1	20	t	533f463b-8609-471a-8e2a-5f3055caf18c	\N
479ffbe0-98f7-4fc8-9478-4eedb394139f	\N	conditional-user-configured	51ac782d-09fc-4a3b-a00f-1da1eee0183f	533f463b-8609-471a-8e2a-5f3055caf18c	0	10	f	\N	\N
ca27fd51-1a8a-4daa-bed6-866a85847181	\N	auth-otp-form	51ac782d-09fc-4a3b-a00f-1da1eee0183f	533f463b-8609-471a-8e2a-5f3055caf18c	0	20	f	\N	\N
fe3798d7-a56d-4e63-b573-3e036f3177fd	\N	direct-grant-validate-username	51ac782d-09fc-4a3b-a00f-1da1eee0183f	678977e2-181e-4146-abf1-cfcae6a381f7	0	10	f	\N	\N
59f186d5-71e4-45da-b737-7e6fe0e00db6	\N	direct-grant-validate-password	51ac782d-09fc-4a3b-a00f-1da1eee0183f	678977e2-181e-4146-abf1-cfcae6a381f7	0	20	f	\N	\N
100a0dca-5461-4ca9-be0f-a5acbf4f3b43	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	678977e2-181e-4146-abf1-cfcae6a381f7	1	30	t	9c113d2c-e71c-43db-826f-253585bd93e4	\N
88c4ce0e-e88a-48ad-b083-21c6be07d61f	\N	conditional-user-configured	51ac782d-09fc-4a3b-a00f-1da1eee0183f	9c113d2c-e71c-43db-826f-253585bd93e4	0	10	f	\N	\N
f1323dd6-9be0-4f7e-9fb5-1ec1ce5e6ab4	\N	direct-grant-validate-otp	51ac782d-09fc-4a3b-a00f-1da1eee0183f	9c113d2c-e71c-43db-826f-253585bd93e4	0	20	f	\N	\N
f4f42e0c-a3cd-4e20-a998-152dbcf7a727	\N	registration-page-form	51ac782d-09fc-4a3b-a00f-1da1eee0183f	741decd3-e736-40ee-b40a-acd222a24d9f	0	10	t	d6e4230d-5328-4dde-8a86-2f85bfdbb435	\N
24a00ac0-82de-423c-9d8e-f421a2ca0570	\N	registration-user-creation	51ac782d-09fc-4a3b-a00f-1da1eee0183f	d6e4230d-5328-4dde-8a86-2f85bfdbb435	0	20	f	\N	\N
ec9d7b9d-2ffb-403f-9502-1b3b721b4a86	\N	registration-password-action	51ac782d-09fc-4a3b-a00f-1da1eee0183f	d6e4230d-5328-4dde-8a86-2f85bfdbb435	0	50	f	\N	\N
a35e9bfd-e9ff-4ec6-a018-b06c4e78455a	\N	registration-recaptcha-action	51ac782d-09fc-4a3b-a00f-1da1eee0183f	d6e4230d-5328-4dde-8a86-2f85bfdbb435	3	60	f	\N	\N
5915caae-2c69-4c35-a6d7-b53008aa8108	\N	registration-terms-and-conditions	51ac782d-09fc-4a3b-a00f-1da1eee0183f	d6e4230d-5328-4dde-8a86-2f85bfdbb435	3	70	f	\N	\N
f03de0e3-b94f-44a4-b7a4-62b790d44049	\N	reset-credentials-choose-user	51ac782d-09fc-4a3b-a00f-1da1eee0183f	eea94b0c-adbd-4710-98dc-e652240a621c	0	10	f	\N	\N
370db9b4-becf-4a2f-b051-61c1e87f9350	\N	reset-credential-email	51ac782d-09fc-4a3b-a00f-1da1eee0183f	eea94b0c-adbd-4710-98dc-e652240a621c	0	20	f	\N	\N
20ff6408-3066-4661-aa57-2eaa590270ec	\N	reset-password	51ac782d-09fc-4a3b-a00f-1da1eee0183f	eea94b0c-adbd-4710-98dc-e652240a621c	0	30	f	\N	\N
6f1e3d52-5718-4730-92b4-ff8b23ec8403	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	eea94b0c-adbd-4710-98dc-e652240a621c	1	40	t	5f4454dd-1e8b-4e3d-9e97-0ffe03d97ef3	\N
bb8d28cb-15b9-40e7-9ecd-d7301c6fe568	\N	conditional-user-configured	51ac782d-09fc-4a3b-a00f-1da1eee0183f	5f4454dd-1e8b-4e3d-9e97-0ffe03d97ef3	0	10	f	\N	\N
459e9802-3337-4b13-a3e4-0193c2f0c2ff	\N	reset-otp	51ac782d-09fc-4a3b-a00f-1da1eee0183f	5f4454dd-1e8b-4e3d-9e97-0ffe03d97ef3	0	20	f	\N	\N
c4a9db1e-3a15-41c0-a431-a2d0f58a2d1f	\N	client-secret	51ac782d-09fc-4a3b-a00f-1da1eee0183f	d08d84e3-c24b-4c70-a7ac-bf2640440458	2	10	f	\N	\N
d4b79c33-a988-4157-8053-3d36d05e4e56	\N	client-jwt	51ac782d-09fc-4a3b-a00f-1da1eee0183f	d08d84e3-c24b-4c70-a7ac-bf2640440458	2	20	f	\N	\N
a457dd70-2bce-44b0-8657-8b88e178905d	\N	client-secret-jwt	51ac782d-09fc-4a3b-a00f-1da1eee0183f	d08d84e3-c24b-4c70-a7ac-bf2640440458	2	30	f	\N	\N
e49a63d9-3698-4a73-8c31-7ea46c8b42f9	\N	client-x509	51ac782d-09fc-4a3b-a00f-1da1eee0183f	d08d84e3-c24b-4c70-a7ac-bf2640440458	2	40	f	\N	\N
2c5750b5-46f1-44f4-a5e6-c17fdc831fcd	\N	idp-review-profile	51ac782d-09fc-4a3b-a00f-1da1eee0183f	2b9c9003-02c3-4680-a9b6-a6a6f380cd3e	0	10	f	\N	06b871b4-21e5-4566-a329-14ee095d686c
1a2eadea-16b6-4f4e-bc2d-78985b098af6	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	2b9c9003-02c3-4680-a9b6-a6a6f380cd3e	0	20	t	e678a04e-943c-4146-9701-7421d9fd13fa	\N
484a9d1a-8a98-4ce0-a822-58484aee704c	\N	idp-create-user-if-unique	51ac782d-09fc-4a3b-a00f-1da1eee0183f	e678a04e-943c-4146-9701-7421d9fd13fa	2	10	f	\N	b7affa7b-0e76-40d6-913e-fa94cdaa47ac
2424b9fd-5096-42ad-a92f-af61028a97e1	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	e678a04e-943c-4146-9701-7421d9fd13fa	2	20	t	c6f86f1c-1a01-417d-8849-f90353e3885f	\N
000f160b-de6f-4877-bf9e-486576b72f41	\N	idp-confirm-link	51ac782d-09fc-4a3b-a00f-1da1eee0183f	c6f86f1c-1a01-417d-8849-f90353e3885f	0	10	f	\N	\N
7e1f5c25-c945-46eb-897f-3ecf87ed579b	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	c6f86f1c-1a01-417d-8849-f90353e3885f	0	20	t	f8c934aa-adda-448d-9385-9aa7729acb4b	\N
c5a83b02-3bf7-4081-bffd-51a316ad2212	\N	idp-email-verification	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f8c934aa-adda-448d-9385-9aa7729acb4b	2	10	f	\N	\N
a7acac0d-7e14-4cc4-89b1-a32a5759e0e0	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f8c934aa-adda-448d-9385-9aa7729acb4b	2	20	t	40426fe7-05c4-4858-8ee3-cb1b773bb9ee	\N
9816b141-f65a-4d3d-82c1-f22ac3c00b88	\N	idp-username-password-form	51ac782d-09fc-4a3b-a00f-1da1eee0183f	40426fe7-05c4-4858-8ee3-cb1b773bb9ee	0	10	f	\N	\N
11492404-c796-4424-8a24-2389c347ff35	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	40426fe7-05c4-4858-8ee3-cb1b773bb9ee	1	20	t	b08b4145-ec6d-457b-ab4a-e8d8de8d9d7b	\N
fef012ec-1acf-4415-b7ea-8b88e2208e2b	\N	conditional-user-configured	51ac782d-09fc-4a3b-a00f-1da1eee0183f	b08b4145-ec6d-457b-ab4a-e8d8de8d9d7b	0	10	f	\N	\N
72394e2b-1a8e-4c69-bd4b-a8a505217c34	\N	auth-otp-form	51ac782d-09fc-4a3b-a00f-1da1eee0183f	b08b4145-ec6d-457b-ab4a-e8d8de8d9d7b	0	20	f	\N	\N
8efb3d51-e515-49c3-abe5-f0e992220048	\N	http-basic-authenticator	51ac782d-09fc-4a3b-a00f-1da1eee0183f	5b644291-2432-4001-804c-be487cb3742e	0	10	f	\N	\N
acfcf46f-98f5-4c82-ba00-7e6ee77421eb	\N	docker-http-basic-authenticator	51ac782d-09fc-4a3b-a00f-1da1eee0183f	36d36bf8-016c-47d6-87cc-3d3d03c1eb71	0	10	f	\N	\N
\.


--
-- Data for Name: authentication_flow; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.authentication_flow (id, alias, description, realm_id, provider_id, top_level, built_in) FROM stdin;
cdeaae08-a1c6-46f6-8cec-69ae3373fff5	browser	browser based authentication	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	t	t
4984f8da-03bd-4737-b5c6-37d9cbedb652	forms	Username, password, otp and other auth forms.	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
533f463b-8609-471a-8e2a-5f3055caf18c	Browser - Conditional OTP	Flow to determine if the OTP is required for the authentication	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
678977e2-181e-4146-abf1-cfcae6a381f7	direct grant	OpenID Connect Resource Owner Grant	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	t	t
9c113d2c-e71c-43db-826f-253585bd93e4	Direct Grant - Conditional OTP	Flow to determine if the OTP is required for the authentication	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
741decd3-e736-40ee-b40a-acd222a24d9f	registration	registration flow	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	t	t
d6e4230d-5328-4dde-8a86-2f85bfdbb435	registration form	registration form	51ac782d-09fc-4a3b-a00f-1da1eee0183f	form-flow	f	t
eea94b0c-adbd-4710-98dc-e652240a621c	reset credentials	Reset credentials for a user if they forgot their password or something	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	t	t
5f4454dd-1e8b-4e3d-9e97-0ffe03d97ef3	Reset - Conditional OTP	Flow to determine if the OTP should be reset or not. Set to REQUIRED to force.	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
d08d84e3-c24b-4c70-a7ac-bf2640440458	clients	Base authentication for clients	51ac782d-09fc-4a3b-a00f-1da1eee0183f	client-flow	t	t
2b9c9003-02c3-4680-a9b6-a6a6f380cd3e	first broker login	Actions taken after first broker login with identity provider account, which is not yet linked to any Keycloak account	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	t	t
e678a04e-943c-4146-9701-7421d9fd13fa	User creation or linking	Flow for the existing/non-existing user alternatives	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
c6f86f1c-1a01-417d-8849-f90353e3885f	Handle Existing Account	Handle what to do if there is existing account with same email/username like authenticated identity provider	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
f8c934aa-adda-448d-9385-9aa7729acb4b	Account verification options	Method with which to verity the existing account	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
40426fe7-05c4-4858-8ee3-cb1b773bb9ee	Verify Existing Account by Re-authentication	Reauthentication of existing account	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
b08b4145-ec6d-457b-ab4a-e8d8de8d9d7b	First broker login - Conditional OTP	Flow to determine if the OTP is required for the authentication	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	f	t
5b644291-2432-4001-804c-be487cb3742e	saml ecp	SAML ECP Profile Authentication Flow	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	t	t
36d36bf8-016c-47d6-87cc-3d3d03c1eb71	docker auth	Used by Docker clients to authenticate against the IDP	51ac782d-09fc-4a3b-a00f-1da1eee0183f	basic-flow	t	t
\.


--
-- Data for Name: authenticator_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.authenticator_config (id, alias, realm_id) FROM stdin;
06b871b4-21e5-4566-a329-14ee095d686c	review profile config	51ac782d-09fc-4a3b-a00f-1da1eee0183f
b7affa7b-0e76-40d6-913e-fa94cdaa47ac	create unique user config	51ac782d-09fc-4a3b-a00f-1da1eee0183f
\.


--
-- Data for Name: authenticator_config_entry; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.authenticator_config_entry (authenticator_id, value, name) FROM stdin;
06b871b4-21e5-4566-a329-14ee095d686c	missing	update.profile.on.first.login
b7affa7b-0e76-40d6-913e-fa94cdaa47ac	false	require.password.update.after.registration
\.


--
-- Data for Name: broker_link; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.broker_link (identity_provider, storage_provider_id, realm_id, broker_user_id, broker_username, token, user_id) FROM stdin;
\.


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client (id, enabled, full_scope_allowed, client_id, not_before, public_client, secret, base_url, bearer_only, management_url, surrogate_auth_required, realm_id, protocol, node_rereg_timeout, frontchannel_logout, consent_required, name, service_accounts_enabled, client_authenticator_type, root_url, description, registration_token, standard_flow_enabled, implicit_flow_enabled, direct_access_grants_enabled, always_display_in_console) FROM stdin;
6a1524f5-16e1-4488-9d57-5a8266d81647	t	f	master-realm	0	f	\N	\N	t	\N	f	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N	0	f	f	master Realm	f	client-secret	\N	\N	\N	t	f	f	f
8e05f3e4-050a-47a7-a684-4c5a06789b84	t	f	account	0	t	\N	/realms/master/account/	f	\N	f	51ac782d-09fc-4a3b-a00f-1da1eee0183f	openid-connect	0	f	f	${client_account}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
a7664e11-c50b-44af-b8ec-2475f957af8e	t	f	account-console	0	t	\N	/realms/master/account/	f	\N	f	51ac782d-09fc-4a3b-a00f-1da1eee0183f	openid-connect	0	f	f	${client_account-console}	f	client-secret	${authBaseUrl}	\N	\N	t	f	f	f
21f6dbcc-da93-4221-869e-fe48ee713230	t	f	broker	0	f	\N	\N	t	\N	f	51ac782d-09fc-4a3b-a00f-1da1eee0183f	openid-connect	0	f	f	${client_broker}	f	client-secret	\N	\N	\N	t	f	f	f
76fbca71-34ed-42fc-9caf-7fa675e7c74c	t	f	security-admin-console	0	t	\N	/admin/master/console/	f	\N	f	51ac782d-09fc-4a3b-a00f-1da1eee0183f	openid-connect	0	f	f	${client_security-admin-console}	f	client-secret	${authAdminUrl}	\N	\N	t	f	f	f
e7adb48f-23fe-4164-977d-a84eefbea310	t	f	admin-cli	0	t	\N	\N	f	\N	f	51ac782d-09fc-4a3b-a00f-1da1eee0183f	openid-connect	0	f	f	${client_admin-cli}	f	client-secret	\N	\N	\N	f	f	t	f
067ba614-f7df-4e80-b3a4-143b4601abff	t	t	sge	0	f	oWuK8BhZYAomRnck7siIokXJoRO9QI0Z	https://sge-dev.frba.utn.edu.ar	f	https://sge-dev.frba.utn.edu.ar	f	51ac782d-09fc-4a3b-a00f-1da1eee0183f	openid-connect	-1	t	f	sge	t	client-secret	https://sge-dev.frba.utn.edu.ar		\N	t	f	t	f
\.


--
-- Data for Name: client_attributes; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_attributes (client_id, name, value) FROM stdin;
8e05f3e4-050a-47a7-a684-4c5a06789b84	post.logout.redirect.uris	+
a7664e11-c50b-44af-b8ec-2475f957af8e	post.logout.redirect.uris	+
a7664e11-c50b-44af-b8ec-2475f957af8e	pkce.code.challenge.method	S256
76fbca71-34ed-42fc-9caf-7fa675e7c74c	post.logout.redirect.uris	+
76fbca71-34ed-42fc-9caf-7fa675e7c74c	pkce.code.challenge.method	S256
067ba614-f7df-4e80-b3a4-143b4601abff	client.secret.creation.time	1750169923
067ba614-f7df-4e80-b3a4-143b4601abff	oauth2.device.authorization.grant.enabled	true
067ba614-f7df-4e80-b3a4-143b4601abff	oidc.ciba.grant.enabled	false
067ba614-f7df-4e80-b3a4-143b4601abff	post.logout.redirect.uris	https://sge-dev.frba.utn.edu.ar/*
067ba614-f7df-4e80-b3a4-143b4601abff	backchannel.logout.session.required	true
067ba614-f7df-4e80-b3a4-143b4601abff	backchannel.logout.revoke.offline.tokens	false
067ba614-f7df-4e80-b3a4-143b4601abff	display.on.consent.screen	false
\.


--
-- Data for Name: client_auth_flow_bindings; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_auth_flow_bindings (client_id, flow_id, binding_name) FROM stdin;
\.


--
-- Data for Name: client_initial_access; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_initial_access (id, realm_id, "timestamp", expiration, count, remaining_count) FROM stdin;
\.


--
-- Data for Name: client_node_registrations; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_node_registrations (client_id, value, name) FROM stdin;
\.


--
-- Data for Name: client_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_scope (id, name, realm_id, description, protocol) FROM stdin;
3f987e38-e5e4-4fe1-809e-6bee689f0c70	offline_access	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect built-in scope: offline_access	openid-connect
292aa59d-f810-4240-baea-8aad4bfa9f5a	role_list	51ac782d-09fc-4a3b-a00f-1da1eee0183f	SAML role list	saml
20374da6-ed13-46cf-bac0-ed9dc1aeb942	saml_organization	51ac782d-09fc-4a3b-a00f-1da1eee0183f	Organization Membership	saml
fed08b42-bb27-41e2-9f6a-a91993d4a492	profile	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect built-in scope: profile	openid-connect
04a2f6e2-ba00-4938-84fe-07b5323d614a	email	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect built-in scope: email	openid-connect
7e4caceb-05bf-4c19-9ce0-7c13081027fa	address	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect built-in scope: address	openid-connect
4d36e12b-cff6-484d-931e-97bd7d7c50b5	phone	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect built-in scope: phone	openid-connect
f125d8bf-33a3-4770-ab94-007cfad48bc8	roles	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect scope for add user roles to the access token	openid-connect
571ca0c8-ff4e-456b-99d3-8ca8202dcba4	web-origins	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect scope for add allowed web origins to the access token	openid-connect
4cafb182-98d6-4338-929c-85b8eb55063d	microprofile-jwt	51ac782d-09fc-4a3b-a00f-1da1eee0183f	Microprofile - JWT built-in scope	openid-connect
3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	acr	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect scope for add acr (authentication context class reference) to the token	openid-connect
8530c0d8-dd85-40b8-a290-fe30767b7eb0	basic	51ac782d-09fc-4a3b-a00f-1da1eee0183f	OpenID Connect scope for add all basic claims to the token	openid-connect
fd19b833-02b2-4812-9205-031b0e7f2536	organization	51ac782d-09fc-4a3b-a00f-1da1eee0183f	Additional claims about the organization a subject belongs to	openid-connect
\.


--
-- Data for Name: client_scope_attributes; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_scope_attributes (scope_id, value, name) FROM stdin;
3f987e38-e5e4-4fe1-809e-6bee689f0c70	true	display.on.consent.screen
3f987e38-e5e4-4fe1-809e-6bee689f0c70	${offlineAccessScopeConsentText}	consent.screen.text
292aa59d-f810-4240-baea-8aad4bfa9f5a	true	display.on.consent.screen
292aa59d-f810-4240-baea-8aad4bfa9f5a	${samlRoleListScopeConsentText}	consent.screen.text
20374da6-ed13-46cf-bac0-ed9dc1aeb942	false	display.on.consent.screen
fed08b42-bb27-41e2-9f6a-a91993d4a492	true	display.on.consent.screen
fed08b42-bb27-41e2-9f6a-a91993d4a492	${profileScopeConsentText}	consent.screen.text
fed08b42-bb27-41e2-9f6a-a91993d4a492	true	include.in.token.scope
04a2f6e2-ba00-4938-84fe-07b5323d614a	true	display.on.consent.screen
04a2f6e2-ba00-4938-84fe-07b5323d614a	${emailScopeConsentText}	consent.screen.text
04a2f6e2-ba00-4938-84fe-07b5323d614a	true	include.in.token.scope
7e4caceb-05bf-4c19-9ce0-7c13081027fa	true	display.on.consent.screen
7e4caceb-05bf-4c19-9ce0-7c13081027fa	${addressScopeConsentText}	consent.screen.text
7e4caceb-05bf-4c19-9ce0-7c13081027fa	true	include.in.token.scope
4d36e12b-cff6-484d-931e-97bd7d7c50b5	true	display.on.consent.screen
4d36e12b-cff6-484d-931e-97bd7d7c50b5	${phoneScopeConsentText}	consent.screen.text
4d36e12b-cff6-484d-931e-97bd7d7c50b5	true	include.in.token.scope
f125d8bf-33a3-4770-ab94-007cfad48bc8	true	display.on.consent.screen
f125d8bf-33a3-4770-ab94-007cfad48bc8	${rolesScopeConsentText}	consent.screen.text
f125d8bf-33a3-4770-ab94-007cfad48bc8	false	include.in.token.scope
571ca0c8-ff4e-456b-99d3-8ca8202dcba4	false	display.on.consent.screen
571ca0c8-ff4e-456b-99d3-8ca8202dcba4		consent.screen.text
571ca0c8-ff4e-456b-99d3-8ca8202dcba4	false	include.in.token.scope
4cafb182-98d6-4338-929c-85b8eb55063d	false	display.on.consent.screen
4cafb182-98d6-4338-929c-85b8eb55063d	true	include.in.token.scope
3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	false	display.on.consent.screen
3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	false	include.in.token.scope
8530c0d8-dd85-40b8-a290-fe30767b7eb0	false	display.on.consent.screen
8530c0d8-dd85-40b8-a290-fe30767b7eb0	false	include.in.token.scope
fd19b833-02b2-4812-9205-031b0e7f2536	true	display.on.consent.screen
fd19b833-02b2-4812-9205-031b0e7f2536	${organizationScopeConsentText}	consent.screen.text
fd19b833-02b2-4812-9205-031b0e7f2536	true	include.in.token.scope
\.


--
-- Data for Name: client_scope_client; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_scope_client (client_id, scope_id, default_scope) FROM stdin;
8e05f3e4-050a-47a7-a684-4c5a06789b84	fed08b42-bb27-41e2-9f6a-a91993d4a492	t
8e05f3e4-050a-47a7-a684-4c5a06789b84	f125d8bf-33a3-4770-ab94-007cfad48bc8	t
8e05f3e4-050a-47a7-a684-4c5a06789b84	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	t
8e05f3e4-050a-47a7-a684-4c5a06789b84	8530c0d8-dd85-40b8-a290-fe30767b7eb0	t
8e05f3e4-050a-47a7-a684-4c5a06789b84	571ca0c8-ff4e-456b-99d3-8ca8202dcba4	t
8e05f3e4-050a-47a7-a684-4c5a06789b84	04a2f6e2-ba00-4938-84fe-07b5323d614a	t
8e05f3e4-050a-47a7-a684-4c5a06789b84	4cafb182-98d6-4338-929c-85b8eb55063d	f
8e05f3e4-050a-47a7-a684-4c5a06789b84	fd19b833-02b2-4812-9205-031b0e7f2536	f
8e05f3e4-050a-47a7-a684-4c5a06789b84	3f987e38-e5e4-4fe1-809e-6bee689f0c70	f
8e05f3e4-050a-47a7-a684-4c5a06789b84	4d36e12b-cff6-484d-931e-97bd7d7c50b5	f
8e05f3e4-050a-47a7-a684-4c5a06789b84	7e4caceb-05bf-4c19-9ce0-7c13081027fa	f
a7664e11-c50b-44af-b8ec-2475f957af8e	fed08b42-bb27-41e2-9f6a-a91993d4a492	t
a7664e11-c50b-44af-b8ec-2475f957af8e	f125d8bf-33a3-4770-ab94-007cfad48bc8	t
a7664e11-c50b-44af-b8ec-2475f957af8e	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	t
a7664e11-c50b-44af-b8ec-2475f957af8e	8530c0d8-dd85-40b8-a290-fe30767b7eb0	t
a7664e11-c50b-44af-b8ec-2475f957af8e	571ca0c8-ff4e-456b-99d3-8ca8202dcba4	t
a7664e11-c50b-44af-b8ec-2475f957af8e	04a2f6e2-ba00-4938-84fe-07b5323d614a	t
a7664e11-c50b-44af-b8ec-2475f957af8e	4cafb182-98d6-4338-929c-85b8eb55063d	f
a7664e11-c50b-44af-b8ec-2475f957af8e	fd19b833-02b2-4812-9205-031b0e7f2536	f
a7664e11-c50b-44af-b8ec-2475f957af8e	3f987e38-e5e4-4fe1-809e-6bee689f0c70	f
a7664e11-c50b-44af-b8ec-2475f957af8e	4d36e12b-cff6-484d-931e-97bd7d7c50b5	f
a7664e11-c50b-44af-b8ec-2475f957af8e	7e4caceb-05bf-4c19-9ce0-7c13081027fa	f
e7adb48f-23fe-4164-977d-a84eefbea310	fed08b42-bb27-41e2-9f6a-a91993d4a492	t
e7adb48f-23fe-4164-977d-a84eefbea310	f125d8bf-33a3-4770-ab94-007cfad48bc8	t
e7adb48f-23fe-4164-977d-a84eefbea310	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	t
e7adb48f-23fe-4164-977d-a84eefbea310	8530c0d8-dd85-40b8-a290-fe30767b7eb0	t
e7adb48f-23fe-4164-977d-a84eefbea310	571ca0c8-ff4e-456b-99d3-8ca8202dcba4	t
e7adb48f-23fe-4164-977d-a84eefbea310	04a2f6e2-ba00-4938-84fe-07b5323d614a	t
e7adb48f-23fe-4164-977d-a84eefbea310	4cafb182-98d6-4338-929c-85b8eb55063d	f
e7adb48f-23fe-4164-977d-a84eefbea310	fd19b833-02b2-4812-9205-031b0e7f2536	f
e7adb48f-23fe-4164-977d-a84eefbea310	3f987e38-e5e4-4fe1-809e-6bee689f0c70	f
e7adb48f-23fe-4164-977d-a84eefbea310	4d36e12b-cff6-484d-931e-97bd7d7c50b5	f
e7adb48f-23fe-4164-977d-a84eefbea310	7e4caceb-05bf-4c19-9ce0-7c13081027fa	f
21f6dbcc-da93-4221-869e-fe48ee713230	fed08b42-bb27-41e2-9f6a-a91993d4a492	t
21f6dbcc-da93-4221-869e-fe48ee713230	f125d8bf-33a3-4770-ab94-007cfad48bc8	t
21f6dbcc-da93-4221-869e-fe48ee713230	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	t
21f6dbcc-da93-4221-869e-fe48ee713230	8530c0d8-dd85-40b8-a290-fe30767b7eb0	t
21f6dbcc-da93-4221-869e-fe48ee713230	571ca0c8-ff4e-456b-99d3-8ca8202dcba4	t
21f6dbcc-da93-4221-869e-fe48ee713230	04a2f6e2-ba00-4938-84fe-07b5323d614a	t
21f6dbcc-da93-4221-869e-fe48ee713230	4cafb182-98d6-4338-929c-85b8eb55063d	f
21f6dbcc-da93-4221-869e-fe48ee713230	fd19b833-02b2-4812-9205-031b0e7f2536	f
21f6dbcc-da93-4221-869e-fe48ee713230	3f987e38-e5e4-4fe1-809e-6bee689f0c70	f
21f6dbcc-da93-4221-869e-fe48ee713230	4d36e12b-cff6-484d-931e-97bd7d7c50b5	f
21f6dbcc-da93-4221-869e-fe48ee713230	7e4caceb-05bf-4c19-9ce0-7c13081027fa	f
6a1524f5-16e1-4488-9d57-5a8266d81647	fed08b42-bb27-41e2-9f6a-a91993d4a492	t
6a1524f5-16e1-4488-9d57-5a8266d81647	f125d8bf-33a3-4770-ab94-007cfad48bc8	t
6a1524f5-16e1-4488-9d57-5a8266d81647	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	t
6a1524f5-16e1-4488-9d57-5a8266d81647	8530c0d8-dd85-40b8-a290-fe30767b7eb0	t
6a1524f5-16e1-4488-9d57-5a8266d81647	571ca0c8-ff4e-456b-99d3-8ca8202dcba4	t
6a1524f5-16e1-4488-9d57-5a8266d81647	04a2f6e2-ba00-4938-84fe-07b5323d614a	t
6a1524f5-16e1-4488-9d57-5a8266d81647	4cafb182-98d6-4338-929c-85b8eb55063d	f
6a1524f5-16e1-4488-9d57-5a8266d81647	fd19b833-02b2-4812-9205-031b0e7f2536	f
6a1524f5-16e1-4488-9d57-5a8266d81647	3f987e38-e5e4-4fe1-809e-6bee689f0c70	f
6a1524f5-16e1-4488-9d57-5a8266d81647	4d36e12b-cff6-484d-931e-97bd7d7c50b5	f
6a1524f5-16e1-4488-9d57-5a8266d81647	7e4caceb-05bf-4c19-9ce0-7c13081027fa	f
76fbca71-34ed-42fc-9caf-7fa675e7c74c	fed08b42-bb27-41e2-9f6a-a91993d4a492	t
76fbca71-34ed-42fc-9caf-7fa675e7c74c	f125d8bf-33a3-4770-ab94-007cfad48bc8	t
76fbca71-34ed-42fc-9caf-7fa675e7c74c	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	t
76fbca71-34ed-42fc-9caf-7fa675e7c74c	8530c0d8-dd85-40b8-a290-fe30767b7eb0	t
76fbca71-34ed-42fc-9caf-7fa675e7c74c	571ca0c8-ff4e-456b-99d3-8ca8202dcba4	t
76fbca71-34ed-42fc-9caf-7fa675e7c74c	04a2f6e2-ba00-4938-84fe-07b5323d614a	t
76fbca71-34ed-42fc-9caf-7fa675e7c74c	4cafb182-98d6-4338-929c-85b8eb55063d	f
76fbca71-34ed-42fc-9caf-7fa675e7c74c	fd19b833-02b2-4812-9205-031b0e7f2536	f
76fbca71-34ed-42fc-9caf-7fa675e7c74c	3f987e38-e5e4-4fe1-809e-6bee689f0c70	f
76fbca71-34ed-42fc-9caf-7fa675e7c74c	4d36e12b-cff6-484d-931e-97bd7d7c50b5	f
76fbca71-34ed-42fc-9caf-7fa675e7c74c	7e4caceb-05bf-4c19-9ce0-7c13081027fa	f
067ba614-f7df-4e80-b3a4-143b4601abff	fed08b42-bb27-41e2-9f6a-a91993d4a492	t
067ba614-f7df-4e80-b3a4-143b4601abff	f125d8bf-33a3-4770-ab94-007cfad48bc8	t
067ba614-f7df-4e80-b3a4-143b4601abff	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	t
067ba614-f7df-4e80-b3a4-143b4601abff	8530c0d8-dd85-40b8-a290-fe30767b7eb0	t
067ba614-f7df-4e80-b3a4-143b4601abff	571ca0c8-ff4e-456b-99d3-8ca8202dcba4	t
067ba614-f7df-4e80-b3a4-143b4601abff	04a2f6e2-ba00-4938-84fe-07b5323d614a	t
067ba614-f7df-4e80-b3a4-143b4601abff	4cafb182-98d6-4338-929c-85b8eb55063d	f
067ba614-f7df-4e80-b3a4-143b4601abff	fd19b833-02b2-4812-9205-031b0e7f2536	f
067ba614-f7df-4e80-b3a4-143b4601abff	3f987e38-e5e4-4fe1-809e-6bee689f0c70	f
067ba614-f7df-4e80-b3a4-143b4601abff	4d36e12b-cff6-484d-931e-97bd7d7c50b5	f
067ba614-f7df-4e80-b3a4-143b4601abff	7e4caceb-05bf-4c19-9ce0-7c13081027fa	f
\.


--
-- Data for Name: client_scope_role_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_scope_role_mapping (scope_id, role_id) FROM stdin;
3f987e38-e5e4-4fe1-809e-6bee689f0c70	d2648772-4961-44fa-93b7-621648897ea4
\.


--
-- Data for Name: client_session; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session (id, client_id, redirect_uri, state, "timestamp", session_id, auth_method, realm_id, auth_user_id, current_action) FROM stdin;
\.


--
-- Data for Name: client_session_auth_status; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session_auth_status (authenticator, status, client_session) FROM stdin;
\.


--
-- Data for Name: client_session_note; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session_note (name, value, client_session) FROM stdin;
\.


--
-- Data for Name: client_session_prot_mapper; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session_prot_mapper (protocol_mapper_id, client_session) FROM stdin;
\.


--
-- Data for Name: client_session_role; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_session_role (role_id, client_session) FROM stdin;
\.


--
-- Data for Name: client_user_session_note; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.client_user_session_note (name, value, client_session) FROM stdin;
\.


--
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.component (id, name, parent_id, provider_id, provider_type, realm_id, sub_type) FROM stdin;
4edb1a94-8f0d-4ce2-bc6e-308efdd30ab8	Trusted Hosts	51ac782d-09fc-4a3b-a00f-1da1eee0183f	trusted-hosts	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	anonymous
70a98ee2-3dc5-4dff-b09b-020057247539	Consent Required	51ac782d-09fc-4a3b-a00f-1da1eee0183f	consent-required	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	anonymous
2708dd93-e4f6-4f33-9034-2c7c1f9c66fe	Full Scope Disabled	51ac782d-09fc-4a3b-a00f-1da1eee0183f	scope	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	anonymous
9bba95f9-9970-4c77-a327-f07874b1982a	Max Clients Limit	51ac782d-09fc-4a3b-a00f-1da1eee0183f	max-clients	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	anonymous
f363a41f-63d1-4525-afb3-4c0e5d7c9b43	Allowed Protocol Mapper Types	51ac782d-09fc-4a3b-a00f-1da1eee0183f	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	anonymous
23e8b877-f8d4-43cd-9de9-aee4e5ce089f	Allowed Client Scopes	51ac782d-09fc-4a3b-a00f-1da1eee0183f	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	anonymous
747fe2e1-a2d5-42bd-8a54-3fdce702ed84	Allowed Protocol Mapper Types	51ac782d-09fc-4a3b-a00f-1da1eee0183f	allowed-protocol-mappers	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	authenticated
c0d650c2-758f-47c9-98c0-a49814975ad8	Allowed Client Scopes	51ac782d-09fc-4a3b-a00f-1da1eee0183f	allowed-client-templates	org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	authenticated
4d7c6ad6-feb0-4e1d-8e98-4612eab8cc66	rsa-generated	51ac782d-09fc-4a3b-a00f-1da1eee0183f	rsa-generated	org.keycloak.keys.KeyProvider	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N
e7bb05e8-0048-4479-9b42-6d540d5aa714	rsa-enc-generated	51ac782d-09fc-4a3b-a00f-1da1eee0183f	rsa-enc-generated	org.keycloak.keys.KeyProvider	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N
843f2e8d-5168-42dd-b06c-e0e62a52f5e2	hmac-generated-hs512	51ac782d-09fc-4a3b-a00f-1da1eee0183f	hmac-generated	org.keycloak.keys.KeyProvider	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N
15f9569d-3429-46b3-ac6c-db9512f5e843	aes-generated	51ac782d-09fc-4a3b-a00f-1da1eee0183f	aes-generated	org.keycloak.keys.KeyProvider	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N
661af25a-11ac-454a-84d3-d1bef2ca0039	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	declarative-user-profile	org.keycloak.userprofile.UserProfileProvider	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N
\.


--
-- Data for Name: component_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.component_config (id, component_id, name, value) FROM stdin;
16938582-39aa-4aca-add5-68958cf6391c	9bba95f9-9970-4c77-a327-f07874b1982a	max-clients	200
9ab97721-62ae-4af4-9bfc-1e1e70390b01	f363a41f-63d1-4525-afb3-4c0e5d7c9b43	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
55271d09-a0b1-4f7c-bb1d-03870b618d08	f363a41f-63d1-4525-afb3-4c0e5d7c9b43	allowed-protocol-mapper-types	saml-user-property-mapper
7fad2b5f-9357-471d-848d-3bc08258fa19	f363a41f-63d1-4525-afb3-4c0e5d7c9b43	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
a5252844-d71e-4126-99af-4d9ce6a91187	f363a41f-63d1-4525-afb3-4c0e5d7c9b43	allowed-protocol-mapper-types	saml-role-list-mapper
e574e948-a84b-4df4-9343-02f4d7a3a91d	f363a41f-63d1-4525-afb3-4c0e5d7c9b43	allowed-protocol-mapper-types	oidc-address-mapper
ee10f535-4383-43b9-a7db-b85ca9557270	f363a41f-63d1-4525-afb3-4c0e5d7c9b43	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
0ebbf32d-0a91-42c4-95ad-dee739a7e657	f363a41f-63d1-4525-afb3-4c0e5d7c9b43	allowed-protocol-mapper-types	oidc-full-name-mapper
5e407194-6ab7-4e9d-9317-e425fba4913d	f363a41f-63d1-4525-afb3-4c0e5d7c9b43	allowed-protocol-mapper-types	saml-user-attribute-mapper
76182628-ce33-474a-a9c8-e8a02cc63796	4edb1a94-8f0d-4ce2-bc6e-308efdd30ab8	client-uris-must-match	true
f66de2cf-9ad3-4fa4-94c5-1d630b70c598	4edb1a94-8f0d-4ce2-bc6e-308efdd30ab8	host-sending-registration-request-must-match	true
b3a4d5a6-7a20-40ad-a4f3-7557f868c0fe	23e8b877-f8d4-43cd-9de9-aee4e5ce089f	allow-default-scopes	true
78e33628-4bc1-4bcc-96dc-e5422b3470c6	747fe2e1-a2d5-42bd-8a54-3fdce702ed84	allowed-protocol-mapper-types	oidc-full-name-mapper
4c79a61a-df99-4b15-bb0b-8c127092ecb7	747fe2e1-a2d5-42bd-8a54-3fdce702ed84	allowed-protocol-mapper-types	oidc-sha256-pairwise-sub-mapper
e9f87fb1-7c93-450f-9020-3b62c06634fa	747fe2e1-a2d5-42bd-8a54-3fdce702ed84	allowed-protocol-mapper-types	saml-user-property-mapper
4127d319-c895-43dc-b638-f340b42675d1	747fe2e1-a2d5-42bd-8a54-3fdce702ed84	allowed-protocol-mapper-types	oidc-usermodel-property-mapper
74bb408a-bf98-437a-8247-df28d7f7ee4b	747fe2e1-a2d5-42bd-8a54-3fdce702ed84	allowed-protocol-mapper-types	oidc-usermodel-attribute-mapper
74de9b08-f030-43f9-aca5-a5145a4599ba	747fe2e1-a2d5-42bd-8a54-3fdce702ed84	allowed-protocol-mapper-types	oidc-address-mapper
067a3a7d-9f03-41c7-a090-48c58acff024	747fe2e1-a2d5-42bd-8a54-3fdce702ed84	allowed-protocol-mapper-types	saml-role-list-mapper
feaf5c5a-30b0-4800-bf65-e7d4d3ca7003	747fe2e1-a2d5-42bd-8a54-3fdce702ed84	allowed-protocol-mapper-types	saml-user-attribute-mapper
ba0521c7-77fa-456f-95f4-89d6a5a938ba	c0d650c2-758f-47c9-98c0-a49814975ad8	allow-default-scopes	true
d7bb9450-90f0-4f6a-8691-686f4fc15523	661af25a-11ac-454a-84d3-d1bef2ca0039	kc.user.profile.config	{"attributes":[{"name":"username","displayName":"${username}","validations":{"length":{"min":3,"max":255},"username-prohibited-characters":{},"up-username-not-idn-homograph":{}},"permissions":{"view":["admin","user"],"edit":["admin","user"]},"multivalued":false},{"name":"email","displayName":"${email}","validations":{"email":{},"length":{"max":255}},"permissions":{"view":["admin","user"],"edit":["admin","user"]},"multivalued":false},{"name":"firstName","displayName":"${firstName}","validations":{"length":{"max":255},"person-name-prohibited-characters":{}},"permissions":{"view":["admin","user"],"edit":["admin","user"]},"multivalued":false},{"name":"lastName","displayName":"${lastName}","validations":{"length":{"max":255},"person-name-prohibited-characters":{}},"permissions":{"view":["admin","user"],"edit":["admin","user"]},"multivalued":false}],"groups":[{"name":"user-metadata","displayHeader":"User metadata","displayDescription":"Attributes, which refer to user metadata"}]}
09bd2882-946f-4017-b098-1eb3bc7e334c	4d7c6ad6-feb0-4e1d-8e98-4612eab8cc66	priority	100
6c9d7126-adba-4a63-b8c4-612791312195	4d7c6ad6-feb0-4e1d-8e98-4612eab8cc66	privateKey	MIIEogIBAAKCAQEAu7rVS6qETARwpbGMBD/LsK279fjF9pZBpVPS+KL4wki4uGD0+vfa6Ig4Nc+5J+Btjz2oqNsIhPuD4hGCS3+JRlTLMKAKmTRX/f1+f5wsHOw+pZph0LKmA0z9fIIgExJTjezcZNVZ+zh0lnTjiyzVpZFSEu0Fn19wu3ZOZ2hYZ8ZUSugWHLcdFok8bKVcIs2YV5Ddl5uUgdkQLKSwkK+9oAo0sS99mhfrWUugPcxVPaURwk82CvgcgoN/BiQlmWdtlrKO+fEp6gEQxI+AXm2gp2+qazuPwWcekSef32ObcTXnhiG4bRe7IeBMtVFoAxK0ts83GdBcEH5juNVJY+cUlwIDAQABAoIBAE8XvsDD5TxPzJQKszahGDTmZaASwXkMQjkhEWw+4Xadg/Huq5hHL7wzlBcb3uMNm6sza6lEqxi4DQ8EmHQtlg0DMZ5Zd02n74Crug2So0VGRXipDBgNBIO0fsHj4xaV7I0Jo6t59hCxbvFq6ulaqOK6UK13nhxQ7iKVDCBmJoUFoI2z0XNVCaZWaIG2s3b4ixPG/bHcVy3DqH813lvNQIErjQvdbuTyZaJrkHtgFeyB/lEqYtbH2RyK+ea/iioQ76Tj3tLayaNvUzeLtwBFTag0RvD01/AhUYhYaFy0+wQu1SwOOdvCucCtwAL1SiRMWekcLyn+AsC8fWKowCio6VkCgYEA+NAnszb9r16PR+aAimwPFLHoQW6PtzbK3YVsMEy3eDqC/SsHmiMuhl+cpbHmVp8YJRaUwhv4QetuN1cEEXZvuTEFDnVxmWFMCGIIGpcuBVzX+0c4aHy2C9aI1byWK3KF5eqkNznrMxbZMg5pnFGiO/bZQfqeFM3fBl8VNogGqe8CgYEAwSb/pPNlMBsnMAgwRvDrC3i6ctkQwAk3JcyrZu8nMiixVwZVoIevjt2biYqXK5ETO6macDbUIWb6JcHxPpb9fia4MKj52eD3sFR7s3391KPh3mLVVtmTYAKSgfAOcBmYRcgg+wXb1QjUk8qcoXXrx9rJdzaYlkr4IPyzREuch9kCgYAOnOMIAn3Js+sEVQRNnOUR2RUD6sNkBkLJ2dEt0QOhewZAaiuLIO/Vkn33uUgG5FcdroLUF6Jv9KzHcUPa5rLPFJLwc3NVh8JYZ7GEJkbcp8RDjL5CXLiwX0wwCWBkcthsVWiJmcw3dusQpooLVTwK+4ds+ZQZMrIbhLARQNHrXwKBgG7Ojag2jZ08Zo3SlMeN3HmXR/cs+cQBRWbk9Iu3tRe8aohPNP5D+P4PufP80t6Geq8mjFfFzIphBi51BY3vlvsxAUfBGJzax52byd9d7yl23tPyhQsvBLH2p8/tRIsg089skScQ5F1hlHo4qQSjnqDnrd47LuxBk/lwnvMWIXV5AoGAEJk7k9qoOKKFRXOkfewzw/3zfDVy6gY9eNJWXpEpPzl/frwrncIFvgqFmSj5dTX7WHZrbXCMVoQWqyEasUO0FCaqIlgXg0CucKT0FaZDFAloAyq2ZTsZKznSWrr44u4l8ttlZKttp0HbEe1qOPCFw+gTjXIfnJa41OsvQ/KD4N4=
7b1322ce-f55a-4881-9fb2-3b23eabe61be	4d7c6ad6-feb0-4e1d-8e98-4612eab8cc66	keyUse	SIG
c7ad472b-574f-4c7e-bb08-5afedfe2d0a3	4d7c6ad6-feb0-4e1d-8e98-4612eab8cc66	certificate	MIICmzCCAYMCBgGXfkCwLDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjUwNjE3MTQxNTU4WhcNMzUwNjE3MTQxNzM4WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7utVLqoRMBHClsYwEP8uwrbv1+MX2lkGlU9L4ovjCSLi4YPT699roiDg1z7kn4G2PPaio2wiE+4PiEYJLf4lGVMswoAqZNFf9/X5/nCwc7D6lmmHQsqYDTP18giATElON7Nxk1Vn7OHSWdOOLLNWlkVIS7QWfX3C7dk5naFhnxlRK6BYctx0WiTxspVwizZhXkN2Xm5SB2RAspLCQr72gCjSxL32aF+tZS6A9zFU9pRHCTzYK+ByCg38GJCWZZ22Wso758SnqARDEj4BebaCnb6prO4/BZx6RJ5/fY5txNeeGIbhtF7sh4Ey1UWgDErS2zzcZ0FwQfmO41Ulj5xSXAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAHTpj/ZdcBHXxKHptN8lzW3RV7EW+gIjjBLYTqgDFXz6owG8gUp3R/a1xm7aWAvIdr1ITepN3ifin+WelukiPqeC2AaplF5Y2YJXc9XVs9zJkvy/scCdmVXAqARItun6GqywenZX9iui3/5B8KqU53rmZ1bPdTqD1uAgXhepBOo7q2mzAg7mfLAD4iE0EspWqnWeT6qNR8zMLNlAI1DH+LCYG8fF4QUZmFUqWU5+1VMK6gqheSJLRJ5XFb7hBI88UN5ao3gfo/BX0Qjymg8iuWZc8Xq8k0wQjq0KoGSiq4e8GeJMptw3g5ylwum+u4E57/7Z+PBMB8JO4gHNA/94Tbg=
44f5c438-3859-4e69-a601-ad9d0bddc779	15f9569d-3429-46b3-ac6c-db9512f5e843	secret	U_gDVl22JHzJQwQDdI2l6g
18aa45f8-af9a-48e0-bb81-b76ebdbe6dfb	15f9569d-3429-46b3-ac6c-db9512f5e843	kid	404aedd1-60af-4518-bafb-8beaa9dcf9e0
18418591-9ba4-44aa-9017-674cfc8ed0c2	15f9569d-3429-46b3-ac6c-db9512f5e843	priority	100
86c90b71-fedc-4988-8f1b-86a22ff9682a	843f2e8d-5168-42dd-b06c-e0e62a52f5e2	priority	100
c63812dc-2257-4d1a-979f-4134751ad377	843f2e8d-5168-42dd-b06c-e0e62a52f5e2	kid	6711e4fd-3673-40a2-9d6e-258fc91d06f7
26159077-299c-41a8-be4b-770b37d8621c	843f2e8d-5168-42dd-b06c-e0e62a52f5e2	secret	CFdSnTJeMxau8kuHh9-S6YA8fvKwZodqZEY3JIAUj8wnAa3-za3ko0AMWxBzo_OLzrvUugORH8omxmZvPw70z7S4dmXpfAyPeDJv-iATb0wpF7dxKQdTrBavApcCFZRyZSpAojIB55my8XRyqrS5v4G2MtyLcK4AQ2e1VNEkuFU
5a236b33-a352-41ae-a21d-9d4230a6d90b	843f2e8d-5168-42dd-b06c-e0e62a52f5e2	algorithm	HS512
b099b575-24c4-4f8a-a94a-569863132519	e7bb05e8-0048-4479-9b42-6d540d5aa714	priority	100
f0f542d0-f62f-44b1-84f7-a3976419598a	e7bb05e8-0048-4479-9b42-6d540d5aa714	certificate	MIICmzCCAYMCBgGXfkCwrjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjUwNjE3MTQxNTU4WhcNMzUwNjE3MTQxNzM4WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCU+9OtSOc+r8wkzsuhYgziO0uc88KluX5yVZqnV2YQDrav9fvyifG/EIxCxSzbKirbUwqEV5iYJ4I6UPHTFMPOcFzdAwZ0KgsuWKDWUFm+Ch84pprdgz6OPQTz2OEQcPXMzKZunqWOnEnj/aNuuN4Qe0ZLWySf9ASZHaTnVaTCrDrB09z3SE453xvtRw1uk0WjNGkUgCuedyIMazhFbODzi8L3vfZOY6xf6hETk3azjgVXz36wrMWLAxoaxuKhWJK/AC3968wxHmHHtIPWyK9VPMb75IrlmUwHDtZvwl+CoVL2Zil0h+jBJiaHpnZ8C2VzhV+OSO0MX9RNK57HpfspAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAAdNBVdboN9KSIWKjwomAcLSxrwMDccxOW0zpRWXQ6+xpNKAFR0gUtyNSbYFB223XvHCafTXo6JeMU5udAkoDmsGskjqoiL/wQC4HIzy99sAg+QpN2UDyIk2aqAMp5W5/EGu/c8eMtpB/iSJ+AemxC0j1/CnW5O65xqX1oKP9SXgERK+GZiU56kF5mIQup1J3Oyx/hj1nRA8p1HY1CPntRtkhz8+wCwZ4UWpsBz6HQPc3ScoGTGJu75RkXGDxcWOlNG3cme67d7XyMTdzyXO1zY95dqrdMEQRw2cnEIg4/+633mIka0VX0D+2g2Sp191YxTsjmG07TXbdswsUwGRoHE=
d3912c6c-249c-41e1-8a4a-a5f4eb8a1106	e7bb05e8-0048-4479-9b42-6d540d5aa714	privateKey	MIIEogIBAAKCAQEAlPvTrUjnPq/MJM7LoWIM4jtLnPPCpbl+clWap1dmEA62r/X78onxvxCMQsUs2yoq21MKhFeYmCeCOlDx0xTDznBc3QMGdCoLLlig1lBZvgofOKaa3YM+jj0E89jhEHD1zMymbp6ljpxJ4/2jbrjeEHtGS1skn/QEmR2k51Wkwqw6wdPc90hOOd8b7UcNbpNFozRpFIArnnciDGs4RWzg84vC9732TmOsX+oRE5N2s44FV89+sKzFiwMaGsbioViSvwAt/evMMR5hx7SD1sivVTzG++SK5ZlMBw7Wb8JfgqFS9mYpdIfowSYmh6Z2fAtlc4VfjkjtDF/UTSuex6X7KQIDAQABAoIBAAEnPz4/gDrGAEiQqUGN5sJMPzZEf3nqSQZNj1hC9Eak4S5/iFHFAPAVCrZBnH/zKvMZCM3OzR7wagZVi2myPB8kU4kKdZ7/Qag8ML03+1nd7jFGvjrUwe6L87aHiUZ9TrR6fmyrdxChjm42D8Z9popuHzSEzMXIN846TS/VQ+SV5GBzmmTb6wy0q6eunv9Htz68mKYeLVPTl87ZZMol1xlMoW+6Hnt+tS3HohA80AgT7vPZHnMTIQJNIA/wLPG/ErQeTvAdtcAresLECZe2+vYXmlNwF9Y8lu1kGTrsu47liDIoO+TLz7a7XN9p0rQdEEIBYR7FCvmCApG3WAOOtHkCgYEAxVvH5hmR5HHGfRvNi2KGZBYt10oWRIS3WeHXy7U/b/8cDW63STndsetnc87inuEKVEZzlKLcrYsGCzd3HxqQnLHeXxLHiJFMKizOgCCJL0uanQA3qP5LajV97yZVVjfNGy3Td7zT+jkoR0MVtdNweRrqvQm8nTMfZjWvYf4jTN8CgYEAwUBhUcwP8QkpmD+somQp4f7PCYZhb61M6u3BBS76BA8mALVRlmZXNxjvr9Xo4s+BJ0EXeZlLgpb20cynHmTLxVhPssiAgT79esLdFlbCBLXr9f0lV9A2wYi49TxTOevAJ8sMG9YgqvopIXu4Y4IJaUij0owz98U+X22lwDNzMPcCgYBlxsgWxJb1DSuEN0NPnzaZBMsNHFrRaPO4+Xu0xLp7Qj8wOilxLNNEPpayJT2/G2SdQ1u1iittn6U1QZw/wQ5UkHGR6/hUWEHD+ilf7+dvKXkJgCQ0FTfFBOL14nndpZczbfWA6TMT9kfsQA9BHlIBUj090XigRM3rgsH4Mfv4VwKBgGkobUyjbDFPOREd5QTg2GGf1G1scGzisq5L/fKiI24+CAHuqJzcx6y1pwfZsMZq/+6qXunOXuaK23hCktXZJ4EVkxjIPhUWf7xjeQcE4sLJc8MBo2ZraMBbc7oOv4MPJBsDRG2JUXF4exU7S5TqV9CwtGSH4md7L3uiIMW7uXz1AoGAf+HXHWM3mNPXO1gu8cpV/Z7h2ljeuJsDXm2NI7cI2Hj21L9opK9Pc9w1vHvgKbRzxFrakacpmXKJ92QB+ES/CACQNwwvELo67bKn0zqc3WAgrtbe++gmXbin4E6MZXYFBdiJK3fBngjw/JSTGgpIj1I/QHOPnlRgtNj3eFZKSBo=
d75977b8-0169-4de7-a41e-654059a3920c	e7bb05e8-0048-4479-9b42-6d540d5aa714	keyUse	ENC
376366b2-afc6-472c-8ad8-de12953e3014	e7bb05e8-0048-4479-9b42-6d540d5aa714	algorithm	RSA-OAEP
\.


--
-- Data for Name: composite_role; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.composite_role (composite, child_role) FROM stdin;
74e7866f-c143-4815-af47-e323845f9008	56b4e5f2-0a8d-4fda-adbe-936237078d73
74e7866f-c143-4815-af47-e323845f9008	cc0839da-04a5-4301-80ad-517fbc36fdc0
74e7866f-c143-4815-af47-e323845f9008	b14f5f96-9280-4cd8-8686-ff6557197060
74e7866f-c143-4815-af47-e323845f9008	00dd09c9-c403-4cdb-b727-53376671bee2
74e7866f-c143-4815-af47-e323845f9008	584f65ca-92e9-4fe0-9d3a-d880f02761b5
74e7866f-c143-4815-af47-e323845f9008	f7fd0b0f-962b-4be0-820f-86bbb432dc64
74e7866f-c143-4815-af47-e323845f9008	1a0a0ad3-cae3-46ad-bb3c-eead7b3c622b
74e7866f-c143-4815-af47-e323845f9008	bea7bfa8-1dc6-4f3e-98d3-fb77987245c1
74e7866f-c143-4815-af47-e323845f9008	a1425e73-97e2-4fe9-99ae-65635416c67a
74e7866f-c143-4815-af47-e323845f9008	e90c7834-4231-4bfd-ab3f-681011fe3ce3
74e7866f-c143-4815-af47-e323845f9008	1bab1ad4-9e1c-4e1e-94b6-ed36d35fe9ee
74e7866f-c143-4815-af47-e323845f9008	79a066df-6274-4dba-b7f4-d6eccddc1eb6
74e7866f-c143-4815-af47-e323845f9008	891cb223-1b78-4122-9df0-42d7193fe55d
74e7866f-c143-4815-af47-e323845f9008	2cf8a32c-f54c-46cd-b2eb-57902d1f0cfb
74e7866f-c143-4815-af47-e323845f9008	4eae8535-2b95-4e2f-bc63-73ad81f7c694
74e7866f-c143-4815-af47-e323845f9008	c7f2b148-3a07-4042-b5f9-ce212ab5829a
74e7866f-c143-4815-af47-e323845f9008	e67e3236-2ba3-4f2e-ba34-2cd08a8eafa7
74e7866f-c143-4815-af47-e323845f9008	ce1560ea-95f5-4e2e-9622-98dde3d642a0
00dd09c9-c403-4cdb-b727-53376671bee2	ce1560ea-95f5-4e2e-9622-98dde3d642a0
00dd09c9-c403-4cdb-b727-53376671bee2	4eae8535-2b95-4e2f-bc63-73ad81f7c694
584f65ca-92e9-4fe0-9d3a-d880f02761b5	c7f2b148-3a07-4042-b5f9-ce212ab5829a
6c57d161-f0dc-4487-bc83-51b3b1aec6d3	3f792d68-0946-4029-8996-ac7170cc2985
6c57d161-f0dc-4487-bc83-51b3b1aec6d3	25e46347-0503-44d6-a154-44a98410d8f0
25e46347-0503-44d6-a154-44a98410d8f0	b44cd622-93f8-4a4e-82e0-eee6041e14b6
dc4f341c-1f2a-48c5-9db9-dfa08f95bb40	b214e2d5-600b-45e3-bb0a-9e1b3f5b45ba
74e7866f-c143-4815-af47-e323845f9008	0b809845-e9a9-4dc0-a913-8b8ac17a9366
6c57d161-f0dc-4487-bc83-51b3b1aec6d3	d2648772-4961-44fa-93b7-621648897ea4
6c57d161-f0dc-4487-bc83-51b3b1aec6d3	b515f18e-7452-4128-b8a5-55cfeda6ee85
\.


--
-- Data for Name: credential; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.credential (id, salt, type, user_id, created_date, user_label, secret_data, credential_data, priority) FROM stdin;
7b7121f0-da49-43f1-a674-906e0dfa1069	\N	password	c5dde975-1231-471a-bdd0-661f0272ef2e	1750169858667	\N	{"value":"Xrtn/4x0bPx96nZz05bIAZUV+2uXMb6FmWuIepvdefk=","salt":"BkckDC7JntfbpLIrvEZOCQ==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10
0253c877-df04-4136-9d60-03834d7ffa0d	\N	password	73ea429c-0ba8-469d-bfdf-5879ccc975b6	1750172018615	My password	{"value":"GlmnVFbbKU5srG5sxiVKdwshs4djBKZ4p6KK6g8fNIU=","salt":"vniTBepl3S3jQVLMaZvXew==","additionalParameters":{}}	{"hashIterations":5,"algorithm":"argon2","additionalParameters":{"hashLength":["32"],"memory":["7168"],"type":["id"],"version":["1.3"],"parallelism":["1"]}}	10
\.


--
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
1.0.0.Final-KEYCLOAK-5461	sthorger@redhat.com	META-INF/jpa-changelog-1.0.0.Final.xml	2025-06-17 14:17:35.740278	1	EXECUTED	9:6f1016664e21e16d26517a4418f5e3df	createTable tableName=APPLICATION_DEFAULT_ROLES; createTable tableName=CLIENT; createTable tableName=CLIENT_SESSION; createTable tableName=CLIENT_SESSION_ROLE; createTable tableName=COMPOSITE_ROLE; createTable tableName=CREDENTIAL; createTable tab...		\N	4.25.1	\N	\N	0169855467
1.0.0.Final-KEYCLOAK-5461	sthorger@redhat.com	META-INF/db2-jpa-changelog-1.0.0.Final.xml	2025-06-17 14:17:35.752316	2	MARK_RAN	9:828775b1596a07d1200ba1d49e5e3941	createTable tableName=APPLICATION_DEFAULT_ROLES; createTable tableName=CLIENT; createTable tableName=CLIENT_SESSION; createTable tableName=CLIENT_SESSION_ROLE; createTable tableName=COMPOSITE_ROLE; createTable tableName=CREDENTIAL; createTable tab...		\N	4.25.1	\N	\N	0169855467
1.1.0.Beta1	sthorger@redhat.com	META-INF/jpa-changelog-1.1.0.Beta1.xml	2025-06-17 14:17:35.777161	3	EXECUTED	9:5f090e44a7d595883c1fb61f4b41fd38	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=CLIENT_ATTRIBUTES; createTable tableName=CLIENT_SESSION_NOTE; createTable tableName=APP_NODE_REGISTRATIONS; addColumn table...		\N	4.25.1	\N	\N	0169855467
1.1.0.Final	sthorger@redhat.com	META-INF/jpa-changelog-1.1.0.Final.xml	2025-06-17 14:17:35.780955	4	EXECUTED	9:c07e577387a3d2c04d1adc9aaad8730e	renameColumn newColumnName=EVENT_TIME, oldColumnName=TIME, tableName=EVENT_ENTITY		\N	4.25.1	\N	\N	0169855467
1.2.0.Beta1	psilva@redhat.com	META-INF/jpa-changelog-1.2.0.Beta1.xml	2025-06-17 14:17:35.826377	5	EXECUTED	9:b68ce996c655922dbcd2fe6b6ae72686	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=PROTOCOL_MAPPER; createTable tableName=PROTOCOL_MAPPER_CONFIG; createTable tableName=...		\N	4.25.1	\N	\N	0169855467
1.2.0.Beta1	psilva@redhat.com	META-INF/db2-jpa-changelog-1.2.0.Beta1.xml	2025-06-17 14:17:35.83053	6	MARK_RAN	9:543b5c9989f024fe35c6f6c5a97de88e	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION; createTable tableName=PROTOCOL_MAPPER; createTable tableName=PROTOCOL_MAPPER_CONFIG; createTable tableName=...		\N	4.25.1	\N	\N	0169855467
1.2.0.RC1	bburke@redhat.com	META-INF/jpa-changelog-1.2.0.CR1.xml	2025-06-17 14:17:35.869032	7	EXECUTED	9:765afebbe21cf5bbca048e632df38336	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=MIGRATION_MODEL; createTable tableName=IDENTITY_P...		\N	4.25.1	\N	\N	0169855467
1.2.0.RC1	bburke@redhat.com	META-INF/db2-jpa-changelog-1.2.0.CR1.xml	2025-06-17 14:17:35.874024	8	MARK_RAN	9:db4a145ba11a6fdaefb397f6dbf829a1	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=MIGRATION_MODEL; createTable tableName=IDENTITY_P...		\N	4.25.1	\N	\N	0169855467
1.2.0.Final	keycloak	META-INF/jpa-changelog-1.2.0.Final.xml	2025-06-17 14:17:35.877797	9	EXECUTED	9:9d05c7be10cdb873f8bcb41bc3a8ab23	update tableName=CLIENT; update tableName=CLIENT; update tableName=CLIENT		\N	4.25.1	\N	\N	0169855467
1.3.0	bburke@redhat.com	META-INF/jpa-changelog-1.3.0.xml	2025-06-17 14:17:35.915285	10	EXECUTED	9:18593702353128d53111f9b1ff0b82b8	delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete tableName=USER_SESSION; createTable tableName=ADMI...		\N	4.25.1	\N	\N	0169855467
1.4.0	bburke@redhat.com	META-INF/jpa-changelog-1.4.0.xml	2025-06-17 14:17:35.942755	11	EXECUTED	9:6122efe5f090e41a85c0f1c9e52cbb62	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	4.25.1	\N	\N	0169855467
1.4.0	bburke@redhat.com	META-INF/db2-jpa-changelog-1.4.0.xml	2025-06-17 14:17:35.946034	12	MARK_RAN	9:e1ff28bf7568451453f844c5d54bb0b5	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	4.25.1	\N	\N	0169855467
1.5.0	bburke@redhat.com	META-INF/jpa-changelog-1.5.0.xml	2025-06-17 14:17:35.958992	13	EXECUTED	9:7af32cd8957fbc069f796b61217483fd	delete tableName=CLIENT_SESSION_AUTH_STATUS; delete tableName=CLIENT_SESSION_ROLE; delete tableName=CLIENT_SESSION_PROT_MAPPER; delete tableName=CLIENT_SESSION_NOTE; delete tableName=CLIENT_SESSION; delete tableName=USER_SESSION_NOTE; delete table...		\N	4.25.1	\N	\N	0169855467
1.6.1_from15	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2025-06-17 14:17:35.969621	14	EXECUTED	9:6005e15e84714cd83226bf7879f54190	addColumn tableName=REALM; addColumn tableName=KEYCLOAK_ROLE; addColumn tableName=CLIENT; createTable tableName=OFFLINE_USER_SESSION; createTable tableName=OFFLINE_CLIENT_SESSION; addPrimaryKey constraintName=CONSTRAINT_OFFL_US_SES_PK2, tableName=...		\N	4.25.1	\N	\N	0169855467
1.6.1_from16-pre	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2025-06-17 14:17:35.970833	15	MARK_RAN	9:bf656f5a2b055d07f314431cae76f06c	delete tableName=OFFLINE_CLIENT_SESSION; delete tableName=OFFLINE_USER_SESSION		\N	4.25.1	\N	\N	0169855467
1.6.1_from16	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2025-06-17 14:17:35.973871	16	MARK_RAN	9:f8dadc9284440469dcf71e25ca6ab99b	dropPrimaryKey constraintName=CONSTRAINT_OFFLINE_US_SES_PK, tableName=OFFLINE_USER_SESSION; dropPrimaryKey constraintName=CONSTRAINT_OFFLINE_CL_SES_PK, tableName=OFFLINE_CLIENT_SESSION; addColumn tableName=OFFLINE_USER_SESSION; update tableName=OF...		\N	4.25.1	\N	\N	0169855467
1.6.1	mposolda@redhat.com	META-INF/jpa-changelog-1.6.1.xml	2025-06-17 14:17:35.975771	17	EXECUTED	9:d41d8cd98f00b204e9800998ecf8427e	empty		\N	4.25.1	\N	\N	0169855467
1.7.0	bburke@redhat.com	META-INF/jpa-changelog-1.7.0.xml	2025-06-17 14:17:35.997235	18	EXECUTED	9:3368ff0be4c2855ee2dd9ca813b38d8e	createTable tableName=KEYCLOAK_GROUP; createTable tableName=GROUP_ROLE_MAPPING; createTable tableName=GROUP_ATTRIBUTE; createTable tableName=USER_GROUP_MEMBERSHIP; createTable tableName=REALM_DEFAULT_GROUPS; addColumn tableName=IDENTITY_PROVIDER; ...		\N	4.25.1	\N	\N	0169855467
1.8.0	mposolda@redhat.com	META-INF/jpa-changelog-1.8.0.xml	2025-06-17 14:17:36.018393	19	EXECUTED	9:8ac2fb5dd030b24c0570a763ed75ed20	addColumn tableName=IDENTITY_PROVIDER; createTable tableName=CLIENT_TEMPLATE; createTable tableName=CLIENT_TEMPLATE_ATTRIBUTES; createTable tableName=TEMPLATE_SCOPE_MAPPING; dropNotNullConstraint columnName=CLIENT_ID, tableName=PROTOCOL_MAPPER; ad...		\N	4.25.1	\N	\N	0169855467
1.8.0-2	keycloak	META-INF/jpa-changelog-1.8.0.xml	2025-06-17 14:17:36.022608	20	EXECUTED	9:f91ddca9b19743db60e3057679810e6c	dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; update tableName=CREDENTIAL		\N	4.25.1	\N	\N	0169855467
1.8.0	mposolda@redhat.com	META-INF/db2-jpa-changelog-1.8.0.xml	2025-06-17 14:17:36.026776	21	MARK_RAN	9:831e82914316dc8a57dc09d755f23c51	addColumn tableName=IDENTITY_PROVIDER; createTable tableName=CLIENT_TEMPLATE; createTable tableName=CLIENT_TEMPLATE_ATTRIBUTES; createTable tableName=TEMPLATE_SCOPE_MAPPING; dropNotNullConstraint columnName=CLIENT_ID, tableName=PROTOCOL_MAPPER; ad...		\N	4.25.1	\N	\N	0169855467
1.8.0-2	keycloak	META-INF/db2-jpa-changelog-1.8.0.xml	2025-06-17 14:17:36.028727	22	MARK_RAN	9:f91ddca9b19743db60e3057679810e6c	dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; update tableName=CREDENTIAL		\N	4.25.1	\N	\N	0169855467
1.9.0	mposolda@redhat.com	META-INF/jpa-changelog-1.9.0.xml	2025-06-17 14:17:36.043101	23	EXECUTED	9:bc3d0f9e823a69dc21e23e94c7a94bb1	update tableName=REALM; update tableName=REALM; update tableName=REALM; update tableName=REALM; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=REALM; update tableName=REALM; customChange; dr...		\N	4.25.1	\N	\N	0169855467
1.9.1	keycloak	META-INF/jpa-changelog-1.9.1.xml	2025-06-17 14:17:36.047776	24	EXECUTED	9:c9999da42f543575ab790e76439a2679	modifyDataType columnName=PRIVATE_KEY, tableName=REALM; modifyDataType columnName=PUBLIC_KEY, tableName=REALM; modifyDataType columnName=CERTIFICATE, tableName=REALM		\N	4.25.1	\N	\N	0169855467
1.9.1	keycloak	META-INF/db2-jpa-changelog-1.9.1.xml	2025-06-17 14:17:36.049891	25	MARK_RAN	9:0d6c65c6f58732d81569e77b10ba301d	modifyDataType columnName=PRIVATE_KEY, tableName=REALM; modifyDataType columnName=CERTIFICATE, tableName=REALM		\N	4.25.1	\N	\N	0169855467
1.9.2	keycloak	META-INF/jpa-changelog-1.9.2.xml	2025-06-17 14:17:36.058783	26	EXECUTED	9:fc576660fc016ae53d2d4778d84d86d0	createIndex indexName=IDX_USER_EMAIL, tableName=USER_ENTITY; createIndex indexName=IDX_USER_ROLE_MAPPING, tableName=USER_ROLE_MAPPING; createIndex indexName=IDX_USER_GROUP_MAPPING, tableName=USER_GROUP_MEMBERSHIP; createIndex indexName=IDX_USER_CO...		\N	4.25.1	\N	\N	0169855467
authz-2.0.0	psilva@redhat.com	META-INF/jpa-changelog-authz-2.0.0.xml	2025-06-17 14:17:36.084877	27	EXECUTED	9:43ed6b0da89ff77206289e87eaa9c024	createTable tableName=RESOURCE_SERVER; addPrimaryKey constraintName=CONSTRAINT_FARS, tableName=RESOURCE_SERVER; addUniqueConstraint constraintName=UK_AU8TT6T700S9V50BU18WS5HA6, tableName=RESOURCE_SERVER; createTable tableName=RESOURCE_SERVER_RESOU...		\N	4.25.1	\N	\N	0169855467
authz-2.5.1	psilva@redhat.com	META-INF/jpa-changelog-authz-2.5.1.xml	2025-06-17 14:17:36.087331	28	EXECUTED	9:44bae577f551b3738740281eceb4ea70	update tableName=RESOURCE_SERVER_POLICY		\N	4.25.1	\N	\N	0169855467
2.1.0-KEYCLOAK-5461	bburke@redhat.com	META-INF/jpa-changelog-2.1.0.xml	2025-06-17 14:17:36.110401	29	EXECUTED	9:bd88e1f833df0420b01e114533aee5e8	createTable tableName=BROKER_LINK; createTable tableName=FED_USER_ATTRIBUTE; createTable tableName=FED_USER_CONSENT; createTable tableName=FED_USER_CONSENT_ROLE; createTable tableName=FED_USER_CONSENT_PROT_MAPPER; createTable tableName=FED_USER_CR...		\N	4.25.1	\N	\N	0169855467
2.2.0	bburke@redhat.com	META-INF/jpa-changelog-2.2.0.xml	2025-06-17 14:17:36.119106	30	EXECUTED	9:a7022af5267f019d020edfe316ef4371	addColumn tableName=ADMIN_EVENT_ENTITY; createTable tableName=CREDENTIAL_ATTRIBUTE; createTable tableName=FED_CREDENTIAL_ATTRIBUTE; modifyDataType columnName=VALUE, tableName=CREDENTIAL; addForeignKeyConstraint baseTableName=FED_CREDENTIAL_ATTRIBU...		\N	4.25.1	\N	\N	0169855467
2.3.0	bburke@redhat.com	META-INF/jpa-changelog-2.3.0.xml	2025-06-17 14:17:36.130203	31	EXECUTED	9:fc155c394040654d6a79227e56f5e25a	createTable tableName=FEDERATED_USER; addPrimaryKey constraintName=CONSTR_FEDERATED_USER, tableName=FEDERATED_USER; dropDefaultValue columnName=TOTP, tableName=USER_ENTITY; dropColumn columnName=TOTP, tableName=USER_ENTITY; addColumn tableName=IDE...		\N	4.25.1	\N	\N	0169855467
2.4.0	bburke@redhat.com	META-INF/jpa-changelog-2.4.0.xml	2025-06-17 14:17:36.135136	32	EXECUTED	9:eac4ffb2a14795e5dc7b426063e54d88	customChange		\N	4.25.1	\N	\N	0169855467
2.5.0	bburke@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2025-06-17 14:17:36.141428	33	EXECUTED	9:54937c05672568c4c64fc9524c1e9462	customChange; modifyDataType columnName=USER_ID, tableName=OFFLINE_USER_SESSION		\N	4.25.1	\N	\N	0169855467
2.5.0-unicode-oracle	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2025-06-17 14:17:36.144738	34	MARK_RAN	9:3a32bace77c84d7678d035a7f5a8084e	modifyDataType columnName=DESCRIPTION, tableName=AUTHENTICATION_FLOW; modifyDataType columnName=DESCRIPTION, tableName=CLIENT_TEMPLATE; modifyDataType columnName=DESCRIPTION, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=DESCRIPTION,...		\N	4.25.1	\N	\N	0169855467
2.5.0-unicode-other-dbs	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2025-06-17 14:17:36.158245	35	EXECUTED	9:33d72168746f81f98ae3a1e8e0ca3554	modifyDataType columnName=DESCRIPTION, tableName=AUTHENTICATION_FLOW; modifyDataType columnName=DESCRIPTION, tableName=CLIENT_TEMPLATE; modifyDataType columnName=DESCRIPTION, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=DESCRIPTION,...		\N	4.25.1	\N	\N	0169855467
2.5.0-duplicate-email-support	slawomir@dabek.name	META-INF/jpa-changelog-2.5.0.xml	2025-06-17 14:17:36.162869	36	EXECUTED	9:61b6d3d7a4c0e0024b0c839da283da0c	addColumn tableName=REALM		\N	4.25.1	\N	\N	0169855467
2.5.0-unique-group-names	hmlnarik@redhat.com	META-INF/jpa-changelog-2.5.0.xml	2025-06-17 14:17:36.166698	37	EXECUTED	9:8dcac7bdf7378e7d823cdfddebf72fda	addUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	4.25.1	\N	\N	0169855467
2.5.1	bburke@redhat.com	META-INF/jpa-changelog-2.5.1.xml	2025-06-17 14:17:36.170893	38	EXECUTED	9:a2b870802540cb3faa72098db5388af3	addColumn tableName=FED_USER_CONSENT		\N	4.25.1	\N	\N	0169855467
3.0.0	bburke@redhat.com	META-INF/jpa-changelog-3.0.0.xml	2025-06-17 14:17:36.174773	39	EXECUTED	9:132a67499ba24bcc54fb5cbdcfe7e4c0	addColumn tableName=IDENTITY_PROVIDER		\N	4.25.1	\N	\N	0169855467
3.2.0-fix	keycloak	META-INF/jpa-changelog-3.2.0.xml	2025-06-17 14:17:36.176854	40	MARK_RAN	9:938f894c032f5430f2b0fafb1a243462	addNotNullConstraint columnName=REALM_ID, tableName=CLIENT_INITIAL_ACCESS		\N	4.25.1	\N	\N	0169855467
3.2.0-fix-with-keycloak-5416	keycloak	META-INF/jpa-changelog-3.2.0.xml	2025-06-17 14:17:36.17931	41	MARK_RAN	9:845c332ff1874dc5d35974b0babf3006	dropIndex indexName=IDX_CLIENT_INIT_ACC_REALM, tableName=CLIENT_INITIAL_ACCESS; addNotNullConstraint columnName=REALM_ID, tableName=CLIENT_INITIAL_ACCESS; createIndex indexName=IDX_CLIENT_INIT_ACC_REALM, tableName=CLIENT_INITIAL_ACCESS		\N	4.25.1	\N	\N	0169855467
3.2.0-fix-offline-sessions	hmlnarik	META-INF/jpa-changelog-3.2.0.xml	2025-06-17 14:17:36.185461	42	EXECUTED	9:fc86359c079781adc577c5a217e4d04c	customChange		\N	4.25.1	\N	\N	0169855467
3.2.0-fixed	keycloak	META-INF/jpa-changelog-3.2.0.xml	2025-06-17 14:17:36.215505	43	EXECUTED	9:59a64800e3c0d09b825f8a3b444fa8f4	addColumn tableName=REALM; dropPrimaryKey constraintName=CONSTRAINT_OFFL_CL_SES_PK2, tableName=OFFLINE_CLIENT_SESSION; dropColumn columnName=CLIENT_SESSION_ID, tableName=OFFLINE_CLIENT_SESSION; addPrimaryKey constraintName=CONSTRAINT_OFFL_CL_SES_P...		\N	4.25.1	\N	\N	0169855467
3.3.0	keycloak	META-INF/jpa-changelog-3.3.0.xml	2025-06-17 14:17:36.219555	44	EXECUTED	9:d48d6da5c6ccf667807f633fe489ce88	addColumn tableName=USER_ENTITY		\N	4.25.1	\N	\N	0169855467
authz-3.4.0.CR1-resource-server-pk-change-part1	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-06-17 14:17:36.224353	45	EXECUTED	9:dde36f7973e80d71fceee683bc5d2951	addColumn tableName=RESOURCE_SERVER_POLICY; addColumn tableName=RESOURCE_SERVER_RESOURCE; addColumn tableName=RESOURCE_SERVER_SCOPE		\N	4.25.1	\N	\N	0169855467
authz-3.4.0.CR1-resource-server-pk-change-part2-KEYCLOAK-6095	hmlnarik@redhat.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-06-17 14:17:36.228858	46	EXECUTED	9:b855e9b0a406b34fa323235a0cf4f640	customChange		\N	4.25.1	\N	\N	0169855467
authz-3.4.0.CR1-resource-server-pk-change-part3-fixed	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-06-17 14:17:36.231015	47	MARK_RAN	9:51abbacd7b416c50c4421a8cabf7927e	dropIndex indexName=IDX_RES_SERV_POL_RES_SERV, tableName=RESOURCE_SERVER_POLICY; dropIndex indexName=IDX_RES_SRV_RES_RES_SRV, tableName=RESOURCE_SERVER_RESOURCE; dropIndex indexName=IDX_RES_SRV_SCOPE_RES_SRV, tableName=RESOURCE_SERVER_SCOPE		\N	4.25.1	\N	\N	0169855467
authz-3.4.0.CR1-resource-server-pk-change-part3-fixed-nodropindex	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-06-17 14:17:36.247021	48	EXECUTED	9:bdc99e567b3398bac83263d375aad143	addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, tableName=RESOURCE_SERVER_POLICY; addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, tableName=RESOURCE_SERVER_RESOURCE; addNotNullConstraint columnName=RESOURCE_SERVER_CLIENT_ID, ...		\N	4.25.1	\N	\N	0169855467
authn-3.4.0.CR1-refresh-token-max-reuse	glavoie@gmail.com	META-INF/jpa-changelog-authz-3.4.0.CR1.xml	2025-06-17 14:17:36.25133	49	EXECUTED	9:d198654156881c46bfba39abd7769e69	addColumn tableName=REALM		\N	4.25.1	\N	\N	0169855467
3.4.0	keycloak	META-INF/jpa-changelog-3.4.0.xml	2025-06-17 14:17:36.264297	50	EXECUTED	9:cfdd8736332ccdd72c5256ccb42335db	addPrimaryKey constraintName=CONSTRAINT_REALM_DEFAULT_ROLES, tableName=REALM_DEFAULT_ROLES; addPrimaryKey constraintName=CONSTRAINT_COMPOSITE_ROLE, tableName=COMPOSITE_ROLE; addPrimaryKey constraintName=CONSTR_REALM_DEFAULT_GROUPS, tableName=REALM...		\N	4.25.1	\N	\N	0169855467
3.4.0-KEYCLOAK-5230	hmlnarik@redhat.com	META-INF/jpa-changelog-3.4.0.xml	2025-06-17 14:17:36.273305	51	EXECUTED	9:7c84de3d9bd84d7f077607c1a4dcb714	createIndex indexName=IDX_FU_ATTRIBUTE, tableName=FED_USER_ATTRIBUTE; createIndex indexName=IDX_FU_CONSENT, tableName=FED_USER_CONSENT; createIndex indexName=IDX_FU_CONSENT_RU, tableName=FED_USER_CONSENT; createIndex indexName=IDX_FU_CREDENTIAL, t...		\N	4.25.1	\N	\N	0169855467
3.4.1	psilva@redhat.com	META-INF/jpa-changelog-3.4.1.xml	2025-06-17 14:17:36.276953	52	EXECUTED	9:5a6bb36cbefb6a9d6928452c0852af2d	modifyDataType columnName=VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
3.4.2	keycloak	META-INF/jpa-changelog-3.4.2.xml	2025-06-17 14:17:36.28004	53	EXECUTED	9:8f23e334dbc59f82e0a328373ca6ced0	update tableName=REALM		\N	4.25.1	\N	\N	0169855467
3.4.2-KEYCLOAK-5172	mkanis@redhat.com	META-INF/jpa-changelog-3.4.2.xml	2025-06-17 14:17:36.282319	54	EXECUTED	9:9156214268f09d970cdf0e1564d866af	update tableName=CLIENT		\N	4.25.1	\N	\N	0169855467
4.0.0-KEYCLOAK-6335	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2025-06-17 14:17:36.286976	55	EXECUTED	9:db806613b1ed154826c02610b7dbdf74	createTable tableName=CLIENT_AUTH_FLOW_BINDINGS; addPrimaryKey constraintName=C_CLI_FLOW_BIND, tableName=CLIENT_AUTH_FLOW_BINDINGS		\N	4.25.1	\N	\N	0169855467
4.0.0-CLEANUP-UNUSED-TABLE	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2025-06-17 14:17:36.291413	56	EXECUTED	9:229a041fb72d5beac76bb94a5fa709de	dropTable tableName=CLIENT_IDENTITY_PROV_MAPPING		\N	4.25.1	\N	\N	0169855467
4.0.0-KEYCLOAK-6228	bburke@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2025-06-17 14:17:36.30284	57	EXECUTED	9:079899dade9c1e683f26b2aa9ca6ff04	dropUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHOGM8UEWRT, tableName=USER_CONSENT; dropNotNullConstraint columnName=CLIENT_ID, tableName=USER_CONSENT; addColumn tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHO...		\N	4.25.1	\N	\N	0169855467
4.0.0-KEYCLOAK-5579-fixed	mposolda@redhat.com	META-INF/jpa-changelog-4.0.0.xml	2025-06-17 14:17:36.346088	58	EXECUTED	9:139b79bcbbfe903bb1c2d2a4dbf001d9	dropForeignKeyConstraint baseTableName=CLIENT_TEMPLATE_ATTRIBUTES, constraintName=FK_CL_TEMPL_ATTR_TEMPL; renameTable newTableName=CLIENT_SCOPE_ATTRIBUTES, oldTableName=CLIENT_TEMPLATE_ATTRIBUTES; renameColumn newColumnName=SCOPE_ID, oldColumnName...		\N	4.25.1	\N	\N	0169855467
authz-4.0.0.CR1	psilva@redhat.com	META-INF/jpa-changelog-authz-4.0.0.CR1.xml	2025-06-17 14:17:36.358869	59	EXECUTED	9:b55738ad889860c625ba2bf483495a04	createTable tableName=RESOURCE_SERVER_PERM_TICKET; addPrimaryKey constraintName=CONSTRAINT_FAPMT, tableName=RESOURCE_SERVER_PERM_TICKET; addForeignKeyConstraint baseTableName=RESOURCE_SERVER_PERM_TICKET, constraintName=FK_FRSRHO213XCX4WNKOG82SSPMT...		\N	4.25.1	\N	\N	0169855467
authz-4.0.0.Beta3	psilva@redhat.com	META-INF/jpa-changelog-authz-4.0.0.Beta3.xml	2025-06-17 14:17:36.363897	60	EXECUTED	9:e0057eac39aa8fc8e09ac6cfa4ae15fe	addColumn tableName=RESOURCE_SERVER_POLICY; addColumn tableName=RESOURCE_SERVER_PERM_TICKET; addForeignKeyConstraint baseTableName=RESOURCE_SERVER_PERM_TICKET, constraintName=FK_FRSRPO2128CX4WNKOG82SSRFY, referencedTableName=RESOURCE_SERVER_POLICY		\N	4.25.1	\N	\N	0169855467
authz-4.2.0.Final	mhajas@redhat.com	META-INF/jpa-changelog-authz-4.2.0.Final.xml	2025-06-17 14:17:36.371677	61	EXECUTED	9:42a33806f3a0443fe0e7feeec821326c	createTable tableName=RESOURCE_URIS; addForeignKeyConstraint baseTableName=RESOURCE_URIS, constraintName=FK_RESOURCE_SERVER_URIS, referencedTableName=RESOURCE_SERVER_RESOURCE; customChange; dropColumn columnName=URI, tableName=RESOURCE_SERVER_RESO...		\N	4.25.1	\N	\N	0169855467
authz-4.2.0.Final-KEYCLOAK-9944	hmlnarik@redhat.com	META-INF/jpa-changelog-authz-4.2.0.Final.xml	2025-06-17 14:17:36.37573	62	EXECUTED	9:9968206fca46eecc1f51db9c024bfe56	addPrimaryKey constraintName=CONSTRAINT_RESOUR_URIS_PK, tableName=RESOURCE_URIS		\N	4.25.1	\N	\N	0169855467
4.2.0-KEYCLOAK-6313	wadahiro@gmail.com	META-INF/jpa-changelog-4.2.0.xml	2025-06-17 14:17:36.379371	63	EXECUTED	9:92143a6daea0a3f3b8f598c97ce55c3d	addColumn tableName=REQUIRED_ACTION_PROVIDER		\N	4.25.1	\N	\N	0169855467
4.3.0-KEYCLOAK-7984	wadahiro@gmail.com	META-INF/jpa-changelog-4.3.0.xml	2025-06-17 14:17:36.381562	64	EXECUTED	9:82bab26a27195d889fb0429003b18f40	update tableName=REQUIRED_ACTION_PROVIDER		\N	4.25.1	\N	\N	0169855467
4.6.0-KEYCLOAK-7950	psilva@redhat.com	META-INF/jpa-changelog-4.6.0.xml	2025-06-17 14:17:36.384557	65	EXECUTED	9:e590c88ddc0b38b0ae4249bbfcb5abc3	update tableName=RESOURCE_SERVER_RESOURCE		\N	4.25.1	\N	\N	0169855467
4.6.0-KEYCLOAK-8377	keycloak	META-INF/jpa-changelog-4.6.0.xml	2025-06-17 14:17:36.391179	66	EXECUTED	9:5c1f475536118dbdc38d5d7977950cc0	createTable tableName=ROLE_ATTRIBUTE; addPrimaryKey constraintName=CONSTRAINT_ROLE_ATTRIBUTE_PK, tableName=ROLE_ATTRIBUTE; addForeignKeyConstraint baseTableName=ROLE_ATTRIBUTE, constraintName=FK_ROLE_ATTRIBUTE_ID, referencedTableName=KEYCLOAK_ROLE...		\N	4.25.1	\N	\N	0169855467
4.6.0-KEYCLOAK-8555	gideonray@gmail.com	META-INF/jpa-changelog-4.6.0.xml	2025-06-17 14:17:36.394929	67	EXECUTED	9:e7c9f5f9c4d67ccbbcc215440c718a17	createIndex indexName=IDX_COMPONENT_PROVIDER_TYPE, tableName=COMPONENT		\N	4.25.1	\N	\N	0169855467
4.7.0-KEYCLOAK-1267	sguilhen@redhat.com	META-INF/jpa-changelog-4.7.0.xml	2025-06-17 14:17:36.399642	68	EXECUTED	9:88e0bfdda924690d6f4e430c53447dd5	addColumn tableName=REALM		\N	4.25.1	\N	\N	0169855467
4.7.0-KEYCLOAK-7275	keycloak	META-INF/jpa-changelog-4.7.0.xml	2025-06-17 14:17:36.408947	69	EXECUTED	9:f53177f137e1c46b6a88c59ec1cb5218	renameColumn newColumnName=CREATED_ON, oldColumnName=LAST_SESSION_REFRESH, tableName=OFFLINE_USER_SESSION; addNotNullConstraint columnName=CREATED_ON, tableName=OFFLINE_USER_SESSION; addColumn tableName=OFFLINE_USER_SESSION; customChange; createIn...		\N	4.25.1	\N	\N	0169855467
4.8.0-KEYCLOAK-8835	sguilhen@redhat.com	META-INF/jpa-changelog-4.8.0.xml	2025-06-17 14:17:36.41364	70	EXECUTED	9:a74d33da4dc42a37ec27121580d1459f	addNotNullConstraint columnName=SSO_MAX_LIFESPAN_REMEMBER_ME, tableName=REALM; addNotNullConstraint columnName=SSO_IDLE_TIMEOUT_REMEMBER_ME, tableName=REALM		\N	4.25.1	\N	\N	0169855467
authz-7.0.0-KEYCLOAK-10443	psilva@redhat.com	META-INF/jpa-changelog-authz-7.0.0.xml	2025-06-17 14:17:36.417646	71	EXECUTED	9:fd4ade7b90c3b67fae0bfcfcb42dfb5f	addColumn tableName=RESOURCE_SERVER		\N	4.25.1	\N	\N	0169855467
8.0.0-adding-credential-columns	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-06-17 14:17:36.423267	72	EXECUTED	9:aa072ad090bbba210d8f18781b8cebf4	addColumn tableName=CREDENTIAL; addColumn tableName=FED_USER_CREDENTIAL		\N	4.25.1	\N	\N	0169855467
8.0.0-updating-credential-data-not-oracle-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-06-17 14:17:36.427795	73	EXECUTED	9:1ae6be29bab7c2aa376f6983b932be37	update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL		\N	4.25.1	\N	\N	0169855467
8.0.0-updating-credential-data-oracle-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-06-17 14:17:36.430713	74	MARK_RAN	9:14706f286953fc9a25286dbd8fb30d97	update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL; update tableName=FED_USER_CREDENTIAL		\N	4.25.1	\N	\N	0169855467
8.0.0-credential-cleanup-fixed	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-06-17 14:17:36.442327	75	EXECUTED	9:2b9cc12779be32c5b40e2e67711a218b	dropDefaultValue columnName=COUNTER, tableName=CREDENTIAL; dropDefaultValue columnName=DIGITS, tableName=CREDENTIAL; dropDefaultValue columnName=PERIOD, tableName=CREDENTIAL; dropDefaultValue columnName=ALGORITHM, tableName=CREDENTIAL; dropColumn ...		\N	4.25.1	\N	\N	0169855467
8.0.0-resource-tag-support	keycloak	META-INF/jpa-changelog-8.0.0.xml	2025-06-17 14:17:36.447281	76	EXECUTED	9:91fa186ce7a5af127a2d7a91ee083cc5	addColumn tableName=MIGRATION_MODEL; createIndex indexName=IDX_UPDATE_TIME, tableName=MIGRATION_MODEL		\N	4.25.1	\N	\N	0169855467
9.0.0-always-display-client	keycloak	META-INF/jpa-changelog-9.0.0.xml	2025-06-17 14:17:36.451046	77	EXECUTED	9:6335e5c94e83a2639ccd68dd24e2e5ad	addColumn tableName=CLIENT		\N	4.25.1	\N	\N	0169855467
9.0.0-drop-constraints-for-column-increase	keycloak	META-INF/jpa-changelog-9.0.0.xml	2025-06-17 14:17:36.453322	78	MARK_RAN	9:6bdb5658951e028bfe16fa0a8228b530	dropUniqueConstraint constraintName=UK_FRSR6T700S9V50BU18WS5PMT, tableName=RESOURCE_SERVER_PERM_TICKET; dropUniqueConstraint constraintName=UK_FRSR6T700S9V50BU18WS5HA6, tableName=RESOURCE_SERVER_RESOURCE; dropPrimaryKey constraintName=CONSTRAINT_O...		\N	4.25.1	\N	\N	0169855467
9.0.0-increase-column-size-federated-fk	keycloak	META-INF/jpa-changelog-9.0.0.xml	2025-06-17 14:17:36.463512	79	EXECUTED	9:d5bc15a64117ccad481ce8792d4c608f	modifyDataType columnName=CLIENT_ID, tableName=FED_USER_CONSENT; modifyDataType columnName=CLIENT_REALM_CONSTRAINT, tableName=KEYCLOAK_ROLE; modifyDataType columnName=OWNER, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=CLIENT_ID, ta...		\N	4.25.1	\N	\N	0169855467
9.0.0-recreate-constraints-after-column-increase	keycloak	META-INF/jpa-changelog-9.0.0.xml	2025-06-17 14:17:36.46609	80	MARK_RAN	9:077cba51999515f4d3e7ad5619ab592c	addNotNullConstraint columnName=CLIENT_ID, tableName=OFFLINE_CLIENT_SESSION; addNotNullConstraint columnName=OWNER, tableName=RESOURCE_SERVER_PERM_TICKET; addNotNullConstraint columnName=REQUESTER, tableName=RESOURCE_SERVER_PERM_TICKET; addNotNull...		\N	4.25.1	\N	\N	0169855467
9.0.1-add-index-to-client.client_id	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-06-17 14:17:36.470521	81	EXECUTED	9:be969f08a163bf47c6b9e9ead8ac2afb	createIndex indexName=IDX_CLIENT_ID, tableName=CLIENT		\N	4.25.1	\N	\N	0169855467
9.0.1-KEYCLOAK-12579-drop-constraints	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-06-17 14:17:36.4716	82	MARK_RAN	9:6d3bb4408ba5a72f39bd8a0b301ec6e3	dropUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	4.25.1	\N	\N	0169855467
9.0.1-KEYCLOAK-12579-add-not-null-constraint	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-06-17 14:17:36.4759	83	EXECUTED	9:966bda61e46bebf3cc39518fbed52fa7	addNotNullConstraint columnName=PARENT_GROUP, tableName=KEYCLOAK_GROUP		\N	4.25.1	\N	\N	0169855467
9.0.1-KEYCLOAK-12579-recreate-constraints	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-06-17 14:17:36.477975	84	MARK_RAN	9:8dcac7bdf7378e7d823cdfddebf72fda	addUniqueConstraint constraintName=SIBLING_NAMES, tableName=KEYCLOAK_GROUP		\N	4.25.1	\N	\N	0169855467
9.0.1-add-index-to-events	keycloak	META-INF/jpa-changelog-9.0.1.xml	2025-06-17 14:17:36.482038	85	EXECUTED	9:7d93d602352a30c0c317e6a609b56599	createIndex indexName=IDX_EVENT_TIME, tableName=EVENT_ENTITY		\N	4.25.1	\N	\N	0169855467
map-remove-ri	keycloak	META-INF/jpa-changelog-11.0.0.xml	2025-06-17 14:17:36.485969	86	EXECUTED	9:71c5969e6cdd8d7b6f47cebc86d37627	dropForeignKeyConstraint baseTableName=REALM, constraintName=FK_TRAF444KK6QRKMS7N56AIWQ5Y; dropForeignKeyConstraint baseTableName=KEYCLOAK_ROLE, constraintName=FK_KJHO5LE2C0RAL09FL8CM9WFW9		\N	4.25.1	\N	\N	0169855467
map-remove-ri	keycloak	META-INF/jpa-changelog-12.0.0.xml	2025-06-17 14:17:36.491069	87	EXECUTED	9:a9ba7d47f065f041b7da856a81762021	dropForeignKeyConstraint baseTableName=REALM_DEFAULT_GROUPS, constraintName=FK_DEF_GROUPS_GROUP; dropForeignKeyConstraint baseTableName=REALM_DEFAULT_ROLES, constraintName=FK_H4WPD7W4HSOOLNI3H0SW7BTJE; dropForeignKeyConstraint baseTableName=CLIENT...		\N	4.25.1	\N	\N	0169855467
12.1.0-add-realm-localization-table	keycloak	META-INF/jpa-changelog-12.0.0.xml	2025-06-17 14:17:36.496335	88	EXECUTED	9:fffabce2bc01e1a8f5110d5278500065	createTable tableName=REALM_LOCALIZATIONS; addPrimaryKey tableName=REALM_LOCALIZATIONS		\N	4.25.1	\N	\N	0169855467
default-roles	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-06-17 14:17:36.502896	89	EXECUTED	9:fa8a5b5445e3857f4b010bafb5009957	addColumn tableName=REALM; customChange		\N	4.25.1	\N	\N	0169855467
default-roles-cleanup	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-06-17 14:17:36.508127	90	EXECUTED	9:67ac3241df9a8582d591c5ed87125f39	dropTable tableName=REALM_DEFAULT_ROLES; dropTable tableName=CLIENT_DEFAULT_ROLES		\N	4.25.1	\N	\N	0169855467
13.0.0-KEYCLOAK-16844	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-06-17 14:17:36.512199	91	EXECUTED	9:ad1194d66c937e3ffc82386c050ba089	createIndex indexName=IDX_OFFLINE_USS_PRELOAD, tableName=OFFLINE_USER_SESSION		\N	4.25.1	\N	\N	0169855467
map-remove-ri-13.0.0	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-06-17 14:17:36.517941	92	EXECUTED	9:d9be619d94af5a2f5d07b9f003543b91	dropForeignKeyConstraint baseTableName=DEFAULT_CLIENT_SCOPE, constraintName=FK_R_DEF_CLI_SCOPE_SCOPE; dropForeignKeyConstraint baseTableName=CLIENT_SCOPE_CLIENT, constraintName=FK_C_CLI_SCOPE_SCOPE; dropForeignKeyConstraint baseTableName=CLIENT_SC...		\N	4.25.1	\N	\N	0169855467
13.0.0-KEYCLOAK-17992-drop-constraints	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-06-17 14:17:36.519182	93	MARK_RAN	9:544d201116a0fcc5a5da0925fbbc3bde	dropPrimaryKey constraintName=C_CLI_SCOPE_BIND, tableName=CLIENT_SCOPE_CLIENT; dropIndex indexName=IDX_CLSCOPE_CL, tableName=CLIENT_SCOPE_CLIENT; dropIndex indexName=IDX_CL_CLSCOPE, tableName=CLIENT_SCOPE_CLIENT		\N	4.25.1	\N	\N	0169855467
13.0.0-increase-column-size-federated	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-06-17 14:17:36.526013	94	EXECUTED	9:43c0c1055b6761b4b3e89de76d612ccf	modifyDataType columnName=CLIENT_ID, tableName=CLIENT_SCOPE_CLIENT; modifyDataType columnName=SCOPE_ID, tableName=CLIENT_SCOPE_CLIENT		\N	4.25.1	\N	\N	0169855467
13.0.0-KEYCLOAK-17992-recreate-constraints	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-06-17 14:17:36.528631	95	MARK_RAN	9:8bd711fd0330f4fe980494ca43ab1139	addNotNullConstraint columnName=CLIENT_ID, tableName=CLIENT_SCOPE_CLIENT; addNotNullConstraint columnName=SCOPE_ID, tableName=CLIENT_SCOPE_CLIENT; addPrimaryKey constraintName=C_CLI_SCOPE_BIND, tableName=CLIENT_SCOPE_CLIENT; createIndex indexName=...		\N	4.25.1	\N	\N	0169855467
json-string-accomodation-fixed	keycloak	META-INF/jpa-changelog-13.0.0.xml	2025-06-17 14:17:36.534181	96	EXECUTED	9:e07d2bc0970c348bb06fb63b1f82ddbf	addColumn tableName=REALM_ATTRIBUTE; update tableName=REALM_ATTRIBUTE; dropColumn columnName=VALUE, tableName=REALM_ATTRIBUTE; renameColumn newColumnName=VALUE, oldColumnName=VALUE_NEW, tableName=REALM_ATTRIBUTE		\N	4.25.1	\N	\N	0169855467
14.0.0-KEYCLOAK-11019	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-06-17 14:17:36.539465	97	EXECUTED	9:24fb8611e97f29989bea412aa38d12b7	createIndex indexName=IDX_OFFLINE_CSS_PRELOAD, tableName=OFFLINE_CLIENT_SESSION; createIndex indexName=IDX_OFFLINE_USS_BY_USER, tableName=OFFLINE_USER_SESSION; createIndex indexName=IDX_OFFLINE_USS_BY_USERSESS, tableName=OFFLINE_USER_SESSION		\N	4.25.1	\N	\N	0169855467
14.0.0-KEYCLOAK-18286	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-06-17 14:17:36.54067	98	MARK_RAN	9:259f89014ce2506ee84740cbf7163aa7	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
14.0.0-KEYCLOAK-18286-revert	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-06-17 14:17:36.549037	99	MARK_RAN	9:04baaf56c116ed19951cbc2cca584022	dropIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
14.0.0-KEYCLOAK-18286-supported-dbs	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-06-17 14:17:36.553345	100	EXECUTED	9:60ca84a0f8c94ec8c3504a5a3bc88ee8	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
14.0.0-KEYCLOAK-18286-unsupported-dbs	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-06-17 14:17:36.554812	101	MARK_RAN	9:d3d977031d431db16e2c181ce49d73e9	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
KEYCLOAK-17267-add-index-to-user-attributes	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-06-17 14:17:36.559031	102	EXECUTED	9:0b305d8d1277f3a89a0a53a659ad274c	createIndex indexName=IDX_USER_ATTRIBUTE_NAME, tableName=USER_ATTRIBUTE		\N	4.25.1	\N	\N	0169855467
KEYCLOAK-18146-add-saml-art-binding-identifier	keycloak	META-INF/jpa-changelog-14.0.0.xml	2025-06-17 14:17:36.56428	103	EXECUTED	9:2c374ad2cdfe20e2905a84c8fac48460	customChange		\N	4.25.1	\N	\N	0169855467
15.0.0-KEYCLOAK-18467	keycloak	META-INF/jpa-changelog-15.0.0.xml	2025-06-17 14:17:36.569549	104	EXECUTED	9:47a760639ac597360a8219f5b768b4de	addColumn tableName=REALM_LOCALIZATIONS; update tableName=REALM_LOCALIZATIONS; dropColumn columnName=TEXTS, tableName=REALM_LOCALIZATIONS; renameColumn newColumnName=TEXTS, oldColumnName=TEXTS_NEW, tableName=REALM_LOCALIZATIONS; addNotNullConstrai...		\N	4.25.1	\N	\N	0169855467
17.0.0-9562	keycloak	META-INF/jpa-changelog-17.0.0.xml	2025-06-17 14:17:36.573326	105	EXECUTED	9:a6272f0576727dd8cad2522335f5d99e	createIndex indexName=IDX_USER_SERVICE_ACCOUNT, tableName=USER_ENTITY		\N	4.25.1	\N	\N	0169855467
18.0.0-10625-IDX_ADMIN_EVENT_TIME	keycloak	META-INF/jpa-changelog-18.0.0.xml	2025-06-17 14:17:36.577356	106	EXECUTED	9:015479dbd691d9cc8669282f4828c41d	createIndex indexName=IDX_ADMIN_EVENT_TIME, tableName=ADMIN_EVENT_ENTITY		\N	4.25.1	\N	\N	0169855467
18.0.15-30992-index-consent	keycloak	META-INF/jpa-changelog-18.0.15.xml	2025-06-17 14:17:36.58374	107	EXECUTED	9:80071ede7a05604b1f4906f3bf3b00f0	createIndex indexName=IDX_USCONSENT_SCOPE_ID, tableName=USER_CONSENT_CLIENT_SCOPE		\N	4.25.1	\N	\N	0169855467
19.0.0-10135	keycloak	META-INF/jpa-changelog-19.0.0.xml	2025-06-17 14:17:36.588958	108	EXECUTED	9:9518e495fdd22f78ad6425cc30630221	customChange		\N	4.25.1	\N	\N	0169855467
20.0.0-12964-supported-dbs	keycloak	META-INF/jpa-changelog-20.0.0.xml	2025-06-17 14:17:36.59332	109	EXECUTED	9:e5f243877199fd96bcc842f27a1656ac	createIndex indexName=IDX_GROUP_ATT_BY_NAME_VALUE, tableName=GROUP_ATTRIBUTE		\N	4.25.1	\N	\N	0169855467
20.0.0-12964-unsupported-dbs	keycloak	META-INF/jpa-changelog-20.0.0.xml	2025-06-17 14:17:36.594702	110	MARK_RAN	9:1a6fcaa85e20bdeae0a9ce49b41946a5	createIndex indexName=IDX_GROUP_ATT_BY_NAME_VALUE, tableName=GROUP_ATTRIBUTE		\N	4.25.1	\N	\N	0169855467
client-attributes-string-accomodation-fixed	keycloak	META-INF/jpa-changelog-20.0.0.xml	2025-06-17 14:17:36.600279	111	EXECUTED	9:3f332e13e90739ed0c35b0b25b7822ca	addColumn tableName=CLIENT_ATTRIBUTES; update tableName=CLIENT_ATTRIBUTES; dropColumn columnName=VALUE, tableName=CLIENT_ATTRIBUTES; renameColumn newColumnName=VALUE, oldColumnName=VALUE_NEW, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
21.0.2-17277	keycloak	META-INF/jpa-changelog-21.0.2.xml	2025-06-17 14:17:36.605225	112	EXECUTED	9:7ee1f7a3fb8f5588f171fb9a6ab623c0	customChange		\N	4.25.1	\N	\N	0169855467
21.1.0-19404	keycloak	META-INF/jpa-changelog-21.1.0.xml	2025-06-17 14:17:36.614922	113	EXECUTED	9:3d7e830b52f33676b9d64f7f2b2ea634	modifyDataType columnName=DECISION_STRATEGY, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=LOGIC, tableName=RESOURCE_SERVER_POLICY; modifyDataType columnName=POLICY_ENFORCE_MODE, tableName=RESOURCE_SERVER		\N	4.25.1	\N	\N	0169855467
21.1.0-19404-2	keycloak	META-INF/jpa-changelog-21.1.0.xml	2025-06-17 14:17:36.617202	114	MARK_RAN	9:627d032e3ef2c06c0e1f73d2ae25c26c	addColumn tableName=RESOURCE_SERVER_POLICY; update tableName=RESOURCE_SERVER_POLICY; dropColumn columnName=DECISION_STRATEGY, tableName=RESOURCE_SERVER_POLICY; renameColumn newColumnName=DECISION_STRATEGY, oldColumnName=DECISION_STRATEGY_NEW, tabl...		\N	4.25.1	\N	\N	0169855467
22.0.0-17484-updated	keycloak	META-INF/jpa-changelog-22.0.0.xml	2025-06-17 14:17:36.622936	115	EXECUTED	9:90af0bfd30cafc17b9f4d6eccd92b8b3	customChange		\N	4.25.1	\N	\N	0169855467
22.0.5-24031	keycloak	META-INF/jpa-changelog-22.0.0.xml	2025-06-17 14:17:36.624008	116	MARK_RAN	9:a60d2d7b315ec2d3eba9e2f145f9df28	customChange		\N	4.25.1	\N	\N	0169855467
23.0.0-12062	keycloak	META-INF/jpa-changelog-23.0.0.xml	2025-06-17 14:17:36.629181	117	EXECUTED	9:2168fbe728fec46ae9baf15bf80927b8	addColumn tableName=COMPONENT_CONFIG; update tableName=COMPONENT_CONFIG; dropColumn columnName=VALUE, tableName=COMPONENT_CONFIG; renameColumn newColumnName=VALUE, oldColumnName=VALUE_NEW, tableName=COMPONENT_CONFIG		\N	4.25.1	\N	\N	0169855467
23.0.0-17258	keycloak	META-INF/jpa-changelog-23.0.0.xml	2025-06-17 14:17:36.632721	118	EXECUTED	9:36506d679a83bbfda85a27ea1864dca8	addColumn tableName=EVENT_ENTITY		\N	4.25.1	\N	\N	0169855467
24.0.0-9758	keycloak	META-INF/jpa-changelog-24.0.0.xml	2025-06-17 14:17:36.640947	119	EXECUTED	9:502c557a5189f600f0f445a9b49ebbce	addColumn tableName=USER_ATTRIBUTE; addColumn tableName=FED_USER_ATTRIBUTE; createIndex indexName=USER_ATTR_LONG_VALUES, tableName=USER_ATTRIBUTE; createIndex indexName=FED_USER_ATTR_LONG_VALUES, tableName=FED_USER_ATTRIBUTE; createIndex indexName...		\N	4.25.1	\N	\N	0169855467
24.0.0-9758-2	keycloak	META-INF/jpa-changelog-24.0.0.xml	2025-06-17 14:17:36.646167	120	EXECUTED	9:bf0fdee10afdf597a987adbf291db7b2	customChange		\N	4.25.1	\N	\N	0169855467
24.0.0-26618-drop-index-if-present	keycloak	META-INF/jpa-changelog-24.0.0.xml	2025-06-17 14:17:36.649244	121	MARK_RAN	9:04baaf56c116ed19951cbc2cca584022	dropIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
24.0.0-26618-reindex	keycloak	META-INF/jpa-changelog-24.0.0.xml	2025-06-17 14:17:36.653891	122	EXECUTED	9:08707c0f0db1cef6b352db03a60edc7f	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
24.0.2-27228	keycloak	META-INF/jpa-changelog-24.0.2.xml	2025-06-17 14:17:36.658912	123	EXECUTED	9:eaee11f6b8aa25d2cc6a84fb86fc6238	customChange		\N	4.25.1	\N	\N	0169855467
24.0.2-27967-drop-index-if-present	keycloak	META-INF/jpa-changelog-24.0.2.xml	2025-06-17 14:17:36.660091	124	MARK_RAN	9:04baaf56c116ed19951cbc2cca584022	dropIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
24.0.2-27967-reindex	keycloak	META-INF/jpa-changelog-24.0.2.xml	2025-06-17 14:17:36.662682	125	MARK_RAN	9:d3d977031d431db16e2c181ce49d73e9	createIndex indexName=IDX_CLIENT_ATT_BY_NAME_VALUE, tableName=CLIENT_ATTRIBUTES		\N	4.25.1	\N	\N	0169855467
25.0.0-28265-tables	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.667504	126	EXECUTED	9:deda2df035df23388af95bbd36c17cef	addColumn tableName=OFFLINE_USER_SESSION; addColumn tableName=OFFLINE_CLIENT_SESSION		\N	4.25.1	\N	\N	0169855467
25.0.0-28265-index-creation	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.672053	127	EXECUTED	9:3e96709818458ae49f3c679ae58d263a	createIndex indexName=IDX_OFFLINE_USS_BY_LAST_SESSION_REFRESH, tableName=OFFLINE_USER_SESSION		\N	4.25.1	\N	\N	0169855467
25.0.0-28265-index-cleanup	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.67696	128	EXECUTED	9:8c0cfa341a0474385b324f5c4b2dfcc1	dropIndex indexName=IDX_OFFLINE_USS_CREATEDON, tableName=OFFLINE_USER_SESSION; dropIndex indexName=IDX_OFFLINE_USS_PRELOAD, tableName=OFFLINE_USER_SESSION; dropIndex indexName=IDX_OFFLINE_USS_BY_USERSESS, tableName=OFFLINE_USER_SESSION; dropIndex ...		\N	4.25.1	\N	\N	0169855467
25.0.0-28265-index-2-mysql	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.678432	129	MARK_RAN	9:b7ef76036d3126bb83c2423bf4d449d6	createIndex indexName=IDX_OFFLINE_USS_BY_BROKER_SESSION_ID, tableName=OFFLINE_USER_SESSION		\N	4.25.1	\N	\N	0169855467
25.0.0-28265-index-2-not-mysql	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.683019	130	EXECUTED	9:23396cf51ab8bc1ae6f0cac7f9f6fcf7	createIndex indexName=IDX_OFFLINE_USS_BY_BROKER_SESSION_ID, tableName=OFFLINE_USER_SESSION		\N	4.25.1	\N	\N	0169855467
25.0.0-org	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.692069	131	EXECUTED	9:5c859965c2c9b9c72136c360649af157	createTable tableName=ORG; addUniqueConstraint constraintName=UK_ORG_NAME, tableName=ORG; addUniqueConstraint constraintName=UK_ORG_GROUP, tableName=ORG; createTable tableName=ORG_DOMAIN		\N	4.25.1	\N	\N	0169855467
unique-consentuser	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.699655	132	EXECUTED	9:5857626a2ea8767e9a6c66bf3a2cb32f	customChange; dropUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHOGM8UEWRT, tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_LOCAL_CONSENT, tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_EXTERNAL_CONSENT, tableName=...		\N	4.25.1	\N	\N	0169855467
unique-consentuser-mysql	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.701034	133	MARK_RAN	9:b79478aad5adaa1bc428e31563f55e8e	customChange; dropUniqueConstraint constraintName=UK_JKUWUVD56ONTGSUHOGM8UEWRT, tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_LOCAL_CONSENT, tableName=USER_CONSENT; addUniqueConstraint constraintName=UK_EXTERNAL_CONSENT, tableName=...		\N	4.25.1	\N	\N	0169855467
25.0.0-28861-index-creation	keycloak	META-INF/jpa-changelog-25.0.0.xml	2025-06-17 14:17:36.705702	134	EXECUTED	9:b9acb58ac958d9ada0fe12a5d4794ab1	createIndex indexName=IDX_PERM_TICKET_REQUESTER, tableName=RESOURCE_SERVER_PERM_TICKET; createIndex indexName=IDX_PERM_TICKET_OWNER, tableName=RESOURCE_SERVER_PERM_TICKET		\N	4.25.1	\N	\N	0169855467
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
1000	f	\N	\N
\.


--
-- Data for Name: default_client_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.default_client_scope (realm_id, scope_id, default_scope) FROM stdin;
51ac782d-09fc-4a3b-a00f-1da1eee0183f	3f987e38-e5e4-4fe1-809e-6bee689f0c70	f
51ac782d-09fc-4a3b-a00f-1da1eee0183f	292aa59d-f810-4240-baea-8aad4bfa9f5a	t
51ac782d-09fc-4a3b-a00f-1da1eee0183f	20374da6-ed13-46cf-bac0-ed9dc1aeb942	t
51ac782d-09fc-4a3b-a00f-1da1eee0183f	fed08b42-bb27-41e2-9f6a-a91993d4a492	t
51ac782d-09fc-4a3b-a00f-1da1eee0183f	04a2f6e2-ba00-4938-84fe-07b5323d614a	t
51ac782d-09fc-4a3b-a00f-1da1eee0183f	7e4caceb-05bf-4c19-9ce0-7c13081027fa	f
51ac782d-09fc-4a3b-a00f-1da1eee0183f	4d36e12b-cff6-484d-931e-97bd7d7c50b5	f
51ac782d-09fc-4a3b-a00f-1da1eee0183f	f125d8bf-33a3-4770-ab94-007cfad48bc8	t
51ac782d-09fc-4a3b-a00f-1da1eee0183f	571ca0c8-ff4e-456b-99d3-8ca8202dcba4	t
51ac782d-09fc-4a3b-a00f-1da1eee0183f	4cafb182-98d6-4338-929c-85b8eb55063d	f
51ac782d-09fc-4a3b-a00f-1da1eee0183f	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e	t
51ac782d-09fc-4a3b-a00f-1da1eee0183f	8530c0d8-dd85-40b8-a290-fe30767b7eb0	t
51ac782d-09fc-4a3b-a00f-1da1eee0183f	fd19b833-02b2-4812-9205-031b0e7f2536	f
\.


--
-- Data for Name: event_entity; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.event_entity (id, client_id, details_json, error, ip_address, realm_id, session_id, event_time, type, user_id, details_json_long_value) FROM stdin;
\.


--
-- Data for Name: fed_user_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_attribute (id, name, user_id, realm_id, storage_provider_id, value, long_value_hash, long_value_hash_lower_case, long_value) FROM stdin;
\.


--
-- Data for Name: fed_user_consent; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_consent (id, client_id, user_id, realm_id, storage_provider_id, created_date, last_updated_date, client_storage_provider, external_client_id) FROM stdin;
\.


--
-- Data for Name: fed_user_consent_cl_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_consent_cl_scope (user_consent_id, scope_id) FROM stdin;
\.


--
-- Data for Name: fed_user_credential; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_credential (id, salt, type, created_date, user_id, realm_id, storage_provider_id, user_label, secret_data, credential_data, priority) FROM stdin;
\.


--
-- Data for Name: fed_user_group_membership; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_group_membership (group_id, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- Data for Name: fed_user_required_action; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_required_action (required_action, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- Data for Name: fed_user_role_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.fed_user_role_mapping (role_id, user_id, realm_id, storage_provider_id) FROM stdin;
\.


--
-- Data for Name: federated_identity; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.federated_identity (identity_provider, realm_id, federated_user_id, federated_username, token, user_id) FROM stdin;
\.


--
-- Data for Name: federated_user; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.federated_user (id, storage_provider_id, realm_id) FROM stdin;
\.


--
-- Data for Name: group_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.group_attribute (id, name, value, group_id) FROM stdin;
\.


--
-- Data for Name: group_role_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.group_role_mapping (role_id, group_id) FROM stdin;
\.


--
-- Data for Name: identity_provider; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.identity_provider (internal_id, enabled, provider_alias, provider_id, store_token, authenticate_by_default, realm_id, add_token_role, trust_email, first_broker_login_flow_id, post_broker_login_flow_id, provider_display_name, link_only) FROM stdin;
\.


--
-- Data for Name: identity_provider_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.identity_provider_config (identity_provider_id, value, name) FROM stdin;
\.


--
-- Data for Name: identity_provider_mapper; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.identity_provider_mapper (id, name, idp_alias, idp_mapper_name, realm_id) FROM stdin;
\.


--
-- Data for Name: idp_mapper_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.idp_mapper_config (idp_mapper_id, value, name) FROM stdin;
\.


--
-- Data for Name: keycloak_group; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.keycloak_group (id, name, parent_group, realm_id) FROM stdin;
\.


--
-- Data for Name: keycloak_role; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.keycloak_role (id, client_realm_constraint, client_role, description, name, realm_id, client, realm) FROM stdin;
6c57d161-f0dc-4487-bc83-51b3b1aec6d3	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f	${role_default-roles}	default-roles-master	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N	\N
56b4e5f2-0a8d-4fda-adbe-936237078d73	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f	${role_create-realm}	create-realm	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N	\N
74e7866f-c143-4815-af47-e323845f9008	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f	${role_admin}	admin	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N	\N
cc0839da-04a5-4301-80ad-517fbc36fdc0	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_create-client}	create-client	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
b14f5f96-9280-4cd8-8686-ff6557197060	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_view-realm}	view-realm	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
00dd09c9-c403-4cdb-b727-53376671bee2	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_view-users}	view-users	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
584f65ca-92e9-4fe0-9d3a-d880f02761b5	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_view-clients}	view-clients	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
f7fd0b0f-962b-4be0-820f-86bbb432dc64	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_view-events}	view-events	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
1a0a0ad3-cae3-46ad-bb3c-eead7b3c622b	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_view-identity-providers}	view-identity-providers	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
bea7bfa8-1dc6-4f3e-98d3-fb77987245c1	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_view-authorization}	view-authorization	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
a1425e73-97e2-4fe9-99ae-65635416c67a	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_manage-realm}	manage-realm	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
e90c7834-4231-4bfd-ab3f-681011fe3ce3	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_manage-users}	manage-users	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
1bab1ad4-9e1c-4e1e-94b6-ed36d35fe9ee	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_manage-clients}	manage-clients	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
79a066df-6274-4dba-b7f4-d6eccddc1eb6	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_manage-events}	manage-events	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
891cb223-1b78-4122-9df0-42d7193fe55d	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_manage-identity-providers}	manage-identity-providers	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
2cf8a32c-f54c-46cd-b2eb-57902d1f0cfb	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_manage-authorization}	manage-authorization	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
4eae8535-2b95-4e2f-bc63-73ad81f7c694	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_query-users}	query-users	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
c7f2b148-3a07-4042-b5f9-ce212ab5829a	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_query-clients}	query-clients	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
e67e3236-2ba3-4f2e-ba34-2cd08a8eafa7	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_query-realms}	query-realms	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
ce1560ea-95f5-4e2e-9622-98dde3d642a0	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_query-groups}	query-groups	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
3f792d68-0946-4029-8996-ac7170cc2985	8e05f3e4-050a-47a7-a684-4c5a06789b84	t	${role_view-profile}	view-profile	51ac782d-09fc-4a3b-a00f-1da1eee0183f	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
25e46347-0503-44d6-a154-44a98410d8f0	8e05f3e4-050a-47a7-a684-4c5a06789b84	t	${role_manage-account}	manage-account	51ac782d-09fc-4a3b-a00f-1da1eee0183f	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
b44cd622-93f8-4a4e-82e0-eee6041e14b6	8e05f3e4-050a-47a7-a684-4c5a06789b84	t	${role_manage-account-links}	manage-account-links	51ac782d-09fc-4a3b-a00f-1da1eee0183f	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
7824a758-6422-4ba1-8d67-4deb494679b0	8e05f3e4-050a-47a7-a684-4c5a06789b84	t	${role_view-applications}	view-applications	51ac782d-09fc-4a3b-a00f-1da1eee0183f	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
b214e2d5-600b-45e3-bb0a-9e1b3f5b45ba	8e05f3e4-050a-47a7-a684-4c5a06789b84	t	${role_view-consent}	view-consent	51ac782d-09fc-4a3b-a00f-1da1eee0183f	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
dc4f341c-1f2a-48c5-9db9-dfa08f95bb40	8e05f3e4-050a-47a7-a684-4c5a06789b84	t	${role_manage-consent}	manage-consent	51ac782d-09fc-4a3b-a00f-1da1eee0183f	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
ac4f8c43-6667-432d-8742-cba31b14a27d	8e05f3e4-050a-47a7-a684-4c5a06789b84	t	${role_view-groups}	view-groups	51ac782d-09fc-4a3b-a00f-1da1eee0183f	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
28854619-4fea-47d6-9861-122a139dbbdd	8e05f3e4-050a-47a7-a684-4c5a06789b84	t	${role_delete-account}	delete-account	51ac782d-09fc-4a3b-a00f-1da1eee0183f	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
1a2f9cf1-564d-4dc4-9947-e84938f0dfd9	21f6dbcc-da93-4221-869e-fe48ee713230	t	${role_read-token}	read-token	51ac782d-09fc-4a3b-a00f-1da1eee0183f	21f6dbcc-da93-4221-869e-fe48ee713230	\N
0b809845-e9a9-4dc0-a913-8b8ac17a9366	6a1524f5-16e1-4488-9d57-5a8266d81647	t	${role_impersonation}	impersonation	51ac782d-09fc-4a3b-a00f-1da1eee0183f	6a1524f5-16e1-4488-9d57-5a8266d81647	\N
d2648772-4961-44fa-93b7-621648897ea4	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f	${role_offline-access}	offline_access	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N	\N
b515f18e-7452-4128-b8a5-55cfeda6ee85	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f	${role_uma_authorization}	uma_authorization	51ac782d-09fc-4a3b-a00f-1da1eee0183f	\N	\N
e98d5b00-30eb-418e-af72-646656f8f86e	067ba614-f7df-4e80-b3a4-143b4601abff	t	\N	uma_protection	51ac782d-09fc-4a3b-a00f-1da1eee0183f	067ba614-f7df-4e80-b3a4-143b4601abff	\N
\.


--
-- Data for Name: migration_model; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.migration_model (id, version, update_time) FROM stdin;
y4xkl	25.0.6	1750169857
\.


--
-- Data for Name: offline_client_session; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.offline_client_session (user_session_id, client_id, offline_flag, "timestamp", data, client_storage_provider, external_client_id, version) FROM stdin;
884333bb-ce4c-4250-a368-eb74ec6f5288	76fbca71-34ed-42fc-9caf-7fa675e7c74c	0	1750169972	{"authMethod":"openid-connect","redirectUri":"https://auth-dev.frba.utn.edu.ar/admin/master/console/","notes":{"clientId":"76fbca71-34ed-42fc-9caf-7fa675e7c74c","iss":"https://auth-dev.frba.utn.edu.ar/realms/master","startedAt":"1750169897","response_type":"code","level-of-authentication":"-1","code_challenge_method":"S256","nonce":"d13a48ef-7d24-4003-82f4-84fece8391d9","response_mode":"query","scope":"openid","userSessionStartedAt":"1750169897","redirect_uri":"https://auth-dev.frba.utn.edu.ar/admin/master/console/","state":"5af7fe23-804d-41db-8d36-708cf1ea7a8b","code_challenge":"1H9XnZ1q59zMwe3s8aIdk1oILlpknrHmj0i20r1_9uQ"}}	local	local	2
8cb33daa-46b6-47a2-a3d3-fb1fbaaeca72	067ba614-f7df-4e80-b3a4-143b4601abff	0	1750172197	{"authMethod":"openid-connect","redirectUri":"https://sge-dev.frba.utn.edu.ar/api/auth/callback/keycloak","notes":{"clientId":"067ba614-f7df-4e80-b3a4-143b4601abff","iss":"https://auth-dev.frba.utn.edu.ar/realms/master","startedAt":"1750172028","response_type":"code","level-of-authentication":"-1","code_challenge_method":"S256","scope":"openid email profile","SSO_AUTH":"true","userSessionStartedAt":"1750172002","redirect_uri":"https://sge-dev.frba.utn.edu.ar/api/auth/callback/keycloak","state":"Ux4qt8BR43dy55XiXCDRv41cIvUIl_AaufXje_tvxLY","code_challenge":"F9evPr-Fx9ZhpSfxVRhs2qhWxrh2VyrR03O1C-5KFss"}}	local	local	1
8cb33daa-46b6-47a2-a3d3-fb1fbaaeca72	76fbca71-34ed-42fc-9caf-7fa675e7c74c	0	1750172332	{"authMethod":"openid-connect","redirectUri":"https://auth-dev.frba.utn.edu.ar/admin/master/console/","notes":{"clientId":"76fbca71-34ed-42fc-9caf-7fa675e7c74c","iss":"https://auth-dev.frba.utn.edu.ar/realms/master","startedAt":"1750172002","response_type":"code","level-of-authentication":"-1","code_challenge_method":"S256","nonce":"132ebecc-e6a7-4965-bb70-80f34fbff78c","response_mode":"query","scope":"openid","userSessionStartedAt":"1750172002","redirect_uri":"https://auth-dev.frba.utn.edu.ar/admin/master/console/","state":"3950f44f-d385-478e-9cf1-eddcc5b1ed02","code_challenge":"uSKiXjfGLNDrVTQMhLre2svMxjd0bfy89GYPLTWO-1c"}}	local	local	2
e00427e5-a4fd-4782-b909-eb5264f21274	067ba614-f7df-4e80-b3a4-143b4601abff	0	1750172366	{"authMethod":"openid-connect","redirectUri":"https://sge-dev.frba.utn.edu.ar/api/auth/callback/keycloak","notes":{"clientId":"067ba614-f7df-4e80-b3a4-143b4601abff","scope":"openid email profile","userSessionStartedAt":"1750172314","iss":"https://auth-dev.frba.utn.edu.ar/realms/master","startedAt":"1750172314","response_type":"code","level-of-authentication":"-1","code_challenge_method":"S256","redirect_uri":"https://sge-dev.frba.utn.edu.ar/api/auth/callback/keycloak","state":"jDUJpX4XnG-Jsw3gKXDE8PP-yNtr3Awsl2WuhEg3w2c","code_challenge":"IhqfUEp75EJMeU9jMcsdPsrMY79zS55WImSzgTcDcYU","SSO_AUTH":"true"}}	local	local	1
\.


--
-- Data for Name: offline_user_session; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.offline_user_session (user_session_id, user_id, realm_id, created_on, offline_flag, data, last_session_refresh, broker_session_id, version) FROM stdin;
884333bb-ce4c-4250-a368-eb74ec6f5288	c5dde975-1231-471a-bdd0-661f0272ef2e	51ac782d-09fc-4a3b-a00f-1da1eee0183f	1750169897	0	{"ipAddress":"172.18.2.2","authMethod":"openid-connect","rememberMe":false,"started":0,"notes":{"KC_DEVICE_NOTE":"eyJpcEFkZHJlc3MiOiIxNzIuMTguMi4yIiwib3MiOiJMaW51eCIsIm9zVmVyc2lvbiI6IlVua25vd24iLCJicm93c2VyIjoiQ2hyb21lLzEzNy4wLjAiLCJkZXZpY2UiOiJPdGhlciIsImxhc3RBY2Nlc3MiOjAsIm1vYmlsZSI6ZmFsc2V9","AUTH_TIME":"1750169897","authenticators-completed":"{\\"d1c74cda-910b-4f77-885f-4ab5ac40ab7b\\":1750169897}"},"state":"LOGGED_IN"}	1750169972	\N	2
8cb33daa-46b6-47a2-a3d3-fb1fbaaeca72	c5dde975-1231-471a-bdd0-661f0272ef2e	51ac782d-09fc-4a3b-a00f-1da1eee0183f	1750172002	0	{"ipAddress":"172.18.2.2","authMethod":"openid-connect","rememberMe":false,"started":0,"notes":{"KC_DEVICE_NOTE":"eyJpcEFkZHJlc3MiOiIxNzIuMTguMi4yIiwib3MiOiJMaW51eCIsIm9zVmVyc2lvbiI6IlVua25vd24iLCJicm93c2VyIjoiQ2hyb21lLzEzNy4wLjAiLCJkZXZpY2UiOiJPdGhlciIsImxhc3RBY2Nlc3MiOjAsIm1vYmlsZSI6ZmFsc2V9","AUTH_TIME":"1750172002","authenticators-completed":"{\\"d1c74cda-910b-4f77-885f-4ab5ac40ab7b\\":1750172002,\\"0a1272d6-808e-4d5d-9ca7-cd9f6ef33ce4\\":1750172197}"},"state":"LOGGED_IN"}	1750172332	\N	4
e00427e5-a4fd-4782-b909-eb5264f21274	73ea429c-0ba8-469d-bfdf-5879ccc975b6	51ac782d-09fc-4a3b-a00f-1da1eee0183f	1750172314	0	{"ipAddress":"172.18.2.2","authMethod":"openid-connect","rememberMe":false,"started":0,"notes":{"KC_DEVICE_NOTE":"eyJpcEFkZHJlc3MiOiIxNzIuMTguMi4yIiwib3MiOiJMaW51eCIsIm9zVmVyc2lvbiI6IlVua25vd24iLCJicm93c2VyIjoiQ2hyb21lLzEzNy4wLjAiLCJkZXZpY2UiOiJPdGhlciIsImxhc3RBY2Nlc3MiOjAsIm1vYmlsZSI6ZmFsc2V9","AUTH_TIME":"1750172314","authenticators-completed":"{\\"d1c74cda-910b-4f77-885f-4ab5ac40ab7b\\":1750172314,\\"0a1272d6-808e-4d5d-9ca7-cd9f6ef33ce4\\":1750172366}"},"state":"LOGGED_IN"}	1750172366	\N	1
\.


--
-- Data for Name: org; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.org (id, enabled, realm_id, group_id, name, description) FROM stdin;
\.


--
-- Data for Name: org_domain; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.org_domain (id, name, verified, org_id) FROM stdin;
\.


--
-- Data for Name: policy_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.policy_config (policy_id, name, value) FROM stdin;
475a9f6e-0774-4bd0-ad71-eca92e31555e	code	// by default, grants any permission associated with this policy\n$evaluation.grant();\n
b9044aec-0430-4062-96d2-2dcc098c1fe2	defaultResourceType	urn:sge:resources:default
\.


--
-- Data for Name: protocol_mapper; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.protocol_mapper (id, name, protocol, protocol_mapper_name, client_id, client_scope_id) FROM stdin;
864967ce-3bee-40ba-84e7-94ec4656e48f	docker-v2-allow-all-mapper	docker-v2	docker-v2-allow-all-mapper	8e05f3e4-050a-47a7-a684-4c5a06789b84	\N
898f6744-25de-4789-8856-b7cb52c5d2d3	docker-v2-allow-all-mapper	docker-v2	docker-v2-allow-all-mapper	a7664e11-c50b-44af-b8ec-2475f957af8e	\N
82866920-84d8-4b49-9d99-9a62515ecdde	audience resolve	openid-connect	oidc-audience-resolve-mapper	a7664e11-c50b-44af-b8ec-2475f957af8e	\N
d10b03f0-80bc-40ca-bfc8-ecee01c528da	docker-v2-allow-all-mapper	docker-v2	docker-v2-allow-all-mapper	21f6dbcc-da93-4221-869e-fe48ee713230	\N
e90a1bce-4cb7-4a94-9fdc-8c526e490f13	docker-v2-allow-all-mapper	docker-v2	docker-v2-allow-all-mapper	76fbca71-34ed-42fc-9caf-7fa675e7c74c	\N
5b4d5f6a-1a70-43d1-bc70-eb237ad7611a	locale	openid-connect	oidc-usermodel-attribute-mapper	76fbca71-34ed-42fc-9caf-7fa675e7c74c	\N
a071f9c8-f1f3-4004-9a0e-ceda4c2348ad	docker-v2-allow-all-mapper	docker-v2	docker-v2-allow-all-mapper	e7adb48f-23fe-4164-977d-a84eefbea310	\N
770a4a54-0f5a-49bc-9826-52912813ed7f	role list	saml	saml-role-list-mapper	\N	292aa59d-f810-4240-baea-8aad4bfa9f5a
489c0ac6-506b-44b3-a039-6bedd47fd23a	organization	saml	saml-organization-membership-mapper	\N	20374da6-ed13-46cf-bac0-ed9dc1aeb942
cd251579-9165-4e2c-8ec4-fff47e84c684	full name	openid-connect	oidc-full-name-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
503aac12-e176-4b39-a058-56e36d0eadf1	family name	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
cd2de220-56db-4708-9b3d-f12523ea54e6	given name	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
9488a3fb-b561-4825-8c7c-b251460aea49	middle name	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
16e40d32-b516-42de-9d9b-68fcc1ce306c	nickname	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
8bcba878-2a19-47cd-8bc9-1f3573bf3f41	username	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
3c44dd58-550b-4170-9a9b-12d3f7f81f69	profile	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
c7fc7ce6-2088-4d60-8a04-8f6b1a5d0ec0	picture	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
be0bb816-8b86-44d9-aa93-00a29978a320	website	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
041190c2-3700-4677-ba22-f5819f9565f5	gender	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
c33b620c-1e55-48a5-bcec-2b31e2d2f3b3	birthdate	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
132e325f-a3e1-40ea-8304-a7b12173adf5	zoneinfo	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
f544f691-5e05-4a5c-863c-4efb8aa373a3	locale	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
ef6c3def-bc70-4851-9a9a-ed86c39bcc07	updated at	openid-connect	oidc-usermodel-attribute-mapper	\N	fed08b42-bb27-41e2-9f6a-a91993d4a492
4b7d0885-8dd0-4c0c-9144-fd4d94b15e94	email	openid-connect	oidc-usermodel-attribute-mapper	\N	04a2f6e2-ba00-4938-84fe-07b5323d614a
12f8b4fb-5654-4e3c-92c8-8f389a14f955	email verified	openid-connect	oidc-usermodel-property-mapper	\N	04a2f6e2-ba00-4938-84fe-07b5323d614a
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	address	openid-connect	oidc-address-mapper	\N	7e4caceb-05bf-4c19-9ce0-7c13081027fa
7c46b9d1-fe08-46b0-a757-dd1dec6ee482	phone number	openid-connect	oidc-usermodel-attribute-mapper	\N	4d36e12b-cff6-484d-931e-97bd7d7c50b5
03a538b9-b174-4600-ac0e-13c3316a4dab	phone number verified	openid-connect	oidc-usermodel-attribute-mapper	\N	4d36e12b-cff6-484d-931e-97bd7d7c50b5
efaec084-d4ae-4299-8e53-a6768e69fbb9	realm roles	openid-connect	oidc-usermodel-realm-role-mapper	\N	f125d8bf-33a3-4770-ab94-007cfad48bc8
b6b07146-78b9-4266-8c6f-60b8c67a0b39	client roles	openid-connect	oidc-usermodel-client-role-mapper	\N	f125d8bf-33a3-4770-ab94-007cfad48bc8
4ea2f134-a016-45fd-a292-1088c24e735d	audience resolve	openid-connect	oidc-audience-resolve-mapper	\N	f125d8bf-33a3-4770-ab94-007cfad48bc8
60d5a782-9b6c-4e3f-8c4f-6c0c508cbf62	allowed web origins	openid-connect	oidc-allowed-origins-mapper	\N	571ca0c8-ff4e-456b-99d3-8ca8202dcba4
2170c77e-03db-4f18-b826-0625f4e4a536	upn	openid-connect	oidc-usermodel-attribute-mapper	\N	4cafb182-98d6-4338-929c-85b8eb55063d
7815b27c-672c-4624-a634-10a6e30f1d06	groups	openid-connect	oidc-usermodel-realm-role-mapper	\N	4cafb182-98d6-4338-929c-85b8eb55063d
0b3a1994-bc42-404a-8a90-eb8711c0a505	acr loa level	openid-connect	oidc-acr-mapper	\N	3ef5d036-145f-43a6-9efe-30b5ec4bcb0e
33289528-24db-444c-a7a9-3b03859c45af	auth_time	openid-connect	oidc-usersessionmodel-note-mapper	\N	8530c0d8-dd85-40b8-a290-fe30767b7eb0
7819afed-c2e7-414b-81d7-a814d7a64531	sub	openid-connect	oidc-sub-mapper	\N	8530c0d8-dd85-40b8-a290-fe30767b7eb0
11d9321e-67c1-4819-bc48-dc22ef6e6cef	organization	openid-connect	oidc-organization-membership-mapper	\N	fd19b833-02b2-4812-9205-031b0e7f2536
4151bf97-1a28-407f-9060-766827ab48eb	docker-v2-allow-all-mapper	docker-v2	docker-v2-allow-all-mapper	067ba614-f7df-4e80-b3a4-143b4601abff	\N
d3b03630-92cb-4430-b56c-fd675ec59996	Client ID	openid-connect	oidc-usersessionmodel-note-mapper	067ba614-f7df-4e80-b3a4-143b4601abff	\N
3e379c15-8294-43ab-83f8-64dc41fe58ff	Client Host	openid-connect	oidc-usersessionmodel-note-mapper	067ba614-f7df-4e80-b3a4-143b4601abff	\N
3b95c4dd-3ffb-4c86-bcc6-a75f50500a43	Client IP Address	openid-connect	oidc-usersessionmodel-note-mapper	067ba614-f7df-4e80-b3a4-143b4601abff	\N
\.


--
-- Data for Name: protocol_mapper_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.protocol_mapper_config (protocol_mapper_id, value, name) FROM stdin;
5b4d5f6a-1a70-43d1-bc70-eb237ad7611a	true	introspection.token.claim
5b4d5f6a-1a70-43d1-bc70-eb237ad7611a	true	userinfo.token.claim
5b4d5f6a-1a70-43d1-bc70-eb237ad7611a	locale	user.attribute
5b4d5f6a-1a70-43d1-bc70-eb237ad7611a	true	id.token.claim
5b4d5f6a-1a70-43d1-bc70-eb237ad7611a	true	access.token.claim
5b4d5f6a-1a70-43d1-bc70-eb237ad7611a	locale	claim.name
5b4d5f6a-1a70-43d1-bc70-eb237ad7611a	String	jsonType.label
770a4a54-0f5a-49bc-9826-52912813ed7f	false	single
770a4a54-0f5a-49bc-9826-52912813ed7f	Basic	attribute.nameformat
770a4a54-0f5a-49bc-9826-52912813ed7f	Role	attribute.name
041190c2-3700-4677-ba22-f5819f9565f5	true	introspection.token.claim
041190c2-3700-4677-ba22-f5819f9565f5	true	userinfo.token.claim
041190c2-3700-4677-ba22-f5819f9565f5	gender	user.attribute
041190c2-3700-4677-ba22-f5819f9565f5	true	id.token.claim
041190c2-3700-4677-ba22-f5819f9565f5	true	access.token.claim
041190c2-3700-4677-ba22-f5819f9565f5	gender	claim.name
041190c2-3700-4677-ba22-f5819f9565f5	String	jsonType.label
132e325f-a3e1-40ea-8304-a7b12173adf5	true	introspection.token.claim
132e325f-a3e1-40ea-8304-a7b12173adf5	true	userinfo.token.claim
132e325f-a3e1-40ea-8304-a7b12173adf5	zoneinfo	user.attribute
132e325f-a3e1-40ea-8304-a7b12173adf5	true	id.token.claim
132e325f-a3e1-40ea-8304-a7b12173adf5	true	access.token.claim
132e325f-a3e1-40ea-8304-a7b12173adf5	zoneinfo	claim.name
132e325f-a3e1-40ea-8304-a7b12173adf5	String	jsonType.label
16e40d32-b516-42de-9d9b-68fcc1ce306c	true	introspection.token.claim
16e40d32-b516-42de-9d9b-68fcc1ce306c	true	userinfo.token.claim
16e40d32-b516-42de-9d9b-68fcc1ce306c	nickname	user.attribute
16e40d32-b516-42de-9d9b-68fcc1ce306c	true	id.token.claim
16e40d32-b516-42de-9d9b-68fcc1ce306c	true	access.token.claim
16e40d32-b516-42de-9d9b-68fcc1ce306c	nickname	claim.name
16e40d32-b516-42de-9d9b-68fcc1ce306c	String	jsonType.label
3c44dd58-550b-4170-9a9b-12d3f7f81f69	true	introspection.token.claim
3c44dd58-550b-4170-9a9b-12d3f7f81f69	true	userinfo.token.claim
3c44dd58-550b-4170-9a9b-12d3f7f81f69	profile	user.attribute
3c44dd58-550b-4170-9a9b-12d3f7f81f69	true	id.token.claim
3c44dd58-550b-4170-9a9b-12d3f7f81f69	true	access.token.claim
3c44dd58-550b-4170-9a9b-12d3f7f81f69	profile	claim.name
3c44dd58-550b-4170-9a9b-12d3f7f81f69	String	jsonType.label
503aac12-e176-4b39-a058-56e36d0eadf1	true	introspection.token.claim
503aac12-e176-4b39-a058-56e36d0eadf1	true	userinfo.token.claim
503aac12-e176-4b39-a058-56e36d0eadf1	lastName	user.attribute
503aac12-e176-4b39-a058-56e36d0eadf1	true	id.token.claim
503aac12-e176-4b39-a058-56e36d0eadf1	true	access.token.claim
503aac12-e176-4b39-a058-56e36d0eadf1	family_name	claim.name
503aac12-e176-4b39-a058-56e36d0eadf1	String	jsonType.label
8bcba878-2a19-47cd-8bc9-1f3573bf3f41	true	introspection.token.claim
8bcba878-2a19-47cd-8bc9-1f3573bf3f41	true	userinfo.token.claim
8bcba878-2a19-47cd-8bc9-1f3573bf3f41	username	user.attribute
8bcba878-2a19-47cd-8bc9-1f3573bf3f41	true	id.token.claim
8bcba878-2a19-47cd-8bc9-1f3573bf3f41	true	access.token.claim
8bcba878-2a19-47cd-8bc9-1f3573bf3f41	preferred_username	claim.name
8bcba878-2a19-47cd-8bc9-1f3573bf3f41	String	jsonType.label
9488a3fb-b561-4825-8c7c-b251460aea49	true	introspection.token.claim
9488a3fb-b561-4825-8c7c-b251460aea49	true	userinfo.token.claim
9488a3fb-b561-4825-8c7c-b251460aea49	middleName	user.attribute
9488a3fb-b561-4825-8c7c-b251460aea49	true	id.token.claim
9488a3fb-b561-4825-8c7c-b251460aea49	true	access.token.claim
9488a3fb-b561-4825-8c7c-b251460aea49	middle_name	claim.name
9488a3fb-b561-4825-8c7c-b251460aea49	String	jsonType.label
be0bb816-8b86-44d9-aa93-00a29978a320	true	introspection.token.claim
be0bb816-8b86-44d9-aa93-00a29978a320	true	userinfo.token.claim
be0bb816-8b86-44d9-aa93-00a29978a320	website	user.attribute
be0bb816-8b86-44d9-aa93-00a29978a320	true	id.token.claim
be0bb816-8b86-44d9-aa93-00a29978a320	true	access.token.claim
be0bb816-8b86-44d9-aa93-00a29978a320	website	claim.name
be0bb816-8b86-44d9-aa93-00a29978a320	String	jsonType.label
c33b620c-1e55-48a5-bcec-2b31e2d2f3b3	true	introspection.token.claim
c33b620c-1e55-48a5-bcec-2b31e2d2f3b3	true	userinfo.token.claim
c33b620c-1e55-48a5-bcec-2b31e2d2f3b3	birthdate	user.attribute
c33b620c-1e55-48a5-bcec-2b31e2d2f3b3	true	id.token.claim
c33b620c-1e55-48a5-bcec-2b31e2d2f3b3	true	access.token.claim
c33b620c-1e55-48a5-bcec-2b31e2d2f3b3	birthdate	claim.name
c33b620c-1e55-48a5-bcec-2b31e2d2f3b3	String	jsonType.label
c7fc7ce6-2088-4d60-8a04-8f6b1a5d0ec0	true	introspection.token.claim
c7fc7ce6-2088-4d60-8a04-8f6b1a5d0ec0	true	userinfo.token.claim
c7fc7ce6-2088-4d60-8a04-8f6b1a5d0ec0	picture	user.attribute
c7fc7ce6-2088-4d60-8a04-8f6b1a5d0ec0	true	id.token.claim
c7fc7ce6-2088-4d60-8a04-8f6b1a5d0ec0	true	access.token.claim
c7fc7ce6-2088-4d60-8a04-8f6b1a5d0ec0	picture	claim.name
c7fc7ce6-2088-4d60-8a04-8f6b1a5d0ec0	String	jsonType.label
cd251579-9165-4e2c-8ec4-fff47e84c684	true	introspection.token.claim
cd251579-9165-4e2c-8ec4-fff47e84c684	true	userinfo.token.claim
cd251579-9165-4e2c-8ec4-fff47e84c684	true	id.token.claim
cd251579-9165-4e2c-8ec4-fff47e84c684	true	access.token.claim
cd2de220-56db-4708-9b3d-f12523ea54e6	true	introspection.token.claim
cd2de220-56db-4708-9b3d-f12523ea54e6	true	userinfo.token.claim
cd2de220-56db-4708-9b3d-f12523ea54e6	firstName	user.attribute
cd2de220-56db-4708-9b3d-f12523ea54e6	true	id.token.claim
cd2de220-56db-4708-9b3d-f12523ea54e6	true	access.token.claim
cd2de220-56db-4708-9b3d-f12523ea54e6	given_name	claim.name
cd2de220-56db-4708-9b3d-f12523ea54e6	String	jsonType.label
ef6c3def-bc70-4851-9a9a-ed86c39bcc07	true	introspection.token.claim
ef6c3def-bc70-4851-9a9a-ed86c39bcc07	true	userinfo.token.claim
ef6c3def-bc70-4851-9a9a-ed86c39bcc07	updatedAt	user.attribute
ef6c3def-bc70-4851-9a9a-ed86c39bcc07	true	id.token.claim
ef6c3def-bc70-4851-9a9a-ed86c39bcc07	true	access.token.claim
ef6c3def-bc70-4851-9a9a-ed86c39bcc07	updated_at	claim.name
ef6c3def-bc70-4851-9a9a-ed86c39bcc07	long	jsonType.label
f544f691-5e05-4a5c-863c-4efb8aa373a3	true	introspection.token.claim
f544f691-5e05-4a5c-863c-4efb8aa373a3	true	userinfo.token.claim
f544f691-5e05-4a5c-863c-4efb8aa373a3	locale	user.attribute
f544f691-5e05-4a5c-863c-4efb8aa373a3	true	id.token.claim
f544f691-5e05-4a5c-863c-4efb8aa373a3	true	access.token.claim
f544f691-5e05-4a5c-863c-4efb8aa373a3	locale	claim.name
f544f691-5e05-4a5c-863c-4efb8aa373a3	String	jsonType.label
12f8b4fb-5654-4e3c-92c8-8f389a14f955	true	introspection.token.claim
12f8b4fb-5654-4e3c-92c8-8f389a14f955	true	userinfo.token.claim
12f8b4fb-5654-4e3c-92c8-8f389a14f955	emailVerified	user.attribute
12f8b4fb-5654-4e3c-92c8-8f389a14f955	true	id.token.claim
12f8b4fb-5654-4e3c-92c8-8f389a14f955	true	access.token.claim
12f8b4fb-5654-4e3c-92c8-8f389a14f955	email_verified	claim.name
12f8b4fb-5654-4e3c-92c8-8f389a14f955	boolean	jsonType.label
4b7d0885-8dd0-4c0c-9144-fd4d94b15e94	true	introspection.token.claim
4b7d0885-8dd0-4c0c-9144-fd4d94b15e94	true	userinfo.token.claim
4b7d0885-8dd0-4c0c-9144-fd4d94b15e94	email	user.attribute
4b7d0885-8dd0-4c0c-9144-fd4d94b15e94	true	id.token.claim
4b7d0885-8dd0-4c0c-9144-fd4d94b15e94	true	access.token.claim
4b7d0885-8dd0-4c0c-9144-fd4d94b15e94	email	claim.name
4b7d0885-8dd0-4c0c-9144-fd4d94b15e94	String	jsonType.label
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	formatted	user.attribute.formatted
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	country	user.attribute.country
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	true	introspection.token.claim
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	postal_code	user.attribute.postal_code
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	true	userinfo.token.claim
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	street	user.attribute.street
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	true	id.token.claim
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	region	user.attribute.region
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	true	access.token.claim
b3cbdde3-d460-43fb-ade8-54a2d6deb2e1	locality	user.attribute.locality
03a538b9-b174-4600-ac0e-13c3316a4dab	true	introspection.token.claim
03a538b9-b174-4600-ac0e-13c3316a4dab	true	userinfo.token.claim
03a538b9-b174-4600-ac0e-13c3316a4dab	phoneNumberVerified	user.attribute
03a538b9-b174-4600-ac0e-13c3316a4dab	true	id.token.claim
03a538b9-b174-4600-ac0e-13c3316a4dab	true	access.token.claim
03a538b9-b174-4600-ac0e-13c3316a4dab	phone_number_verified	claim.name
03a538b9-b174-4600-ac0e-13c3316a4dab	boolean	jsonType.label
7c46b9d1-fe08-46b0-a757-dd1dec6ee482	true	introspection.token.claim
7c46b9d1-fe08-46b0-a757-dd1dec6ee482	true	userinfo.token.claim
7c46b9d1-fe08-46b0-a757-dd1dec6ee482	phoneNumber	user.attribute
7c46b9d1-fe08-46b0-a757-dd1dec6ee482	true	id.token.claim
7c46b9d1-fe08-46b0-a757-dd1dec6ee482	true	access.token.claim
7c46b9d1-fe08-46b0-a757-dd1dec6ee482	phone_number	claim.name
7c46b9d1-fe08-46b0-a757-dd1dec6ee482	String	jsonType.label
4ea2f134-a016-45fd-a292-1088c24e735d	true	introspection.token.claim
4ea2f134-a016-45fd-a292-1088c24e735d	true	access.token.claim
b6b07146-78b9-4266-8c6f-60b8c67a0b39	true	introspection.token.claim
b6b07146-78b9-4266-8c6f-60b8c67a0b39	true	multivalued
b6b07146-78b9-4266-8c6f-60b8c67a0b39	foo	user.attribute
b6b07146-78b9-4266-8c6f-60b8c67a0b39	true	access.token.claim
b6b07146-78b9-4266-8c6f-60b8c67a0b39	resource_access.${client_id}.roles	claim.name
b6b07146-78b9-4266-8c6f-60b8c67a0b39	String	jsonType.label
efaec084-d4ae-4299-8e53-a6768e69fbb9	true	introspection.token.claim
efaec084-d4ae-4299-8e53-a6768e69fbb9	true	multivalued
efaec084-d4ae-4299-8e53-a6768e69fbb9	foo	user.attribute
efaec084-d4ae-4299-8e53-a6768e69fbb9	true	access.token.claim
efaec084-d4ae-4299-8e53-a6768e69fbb9	realm_access.roles	claim.name
efaec084-d4ae-4299-8e53-a6768e69fbb9	String	jsonType.label
60d5a782-9b6c-4e3f-8c4f-6c0c508cbf62	true	introspection.token.claim
60d5a782-9b6c-4e3f-8c4f-6c0c508cbf62	true	access.token.claim
2170c77e-03db-4f18-b826-0625f4e4a536	true	introspection.token.claim
2170c77e-03db-4f18-b826-0625f4e4a536	true	userinfo.token.claim
2170c77e-03db-4f18-b826-0625f4e4a536	username	user.attribute
2170c77e-03db-4f18-b826-0625f4e4a536	true	id.token.claim
2170c77e-03db-4f18-b826-0625f4e4a536	true	access.token.claim
2170c77e-03db-4f18-b826-0625f4e4a536	upn	claim.name
2170c77e-03db-4f18-b826-0625f4e4a536	String	jsonType.label
7815b27c-672c-4624-a634-10a6e30f1d06	true	introspection.token.claim
7815b27c-672c-4624-a634-10a6e30f1d06	true	multivalued
7815b27c-672c-4624-a634-10a6e30f1d06	foo	user.attribute
7815b27c-672c-4624-a634-10a6e30f1d06	true	id.token.claim
7815b27c-672c-4624-a634-10a6e30f1d06	true	access.token.claim
7815b27c-672c-4624-a634-10a6e30f1d06	groups	claim.name
7815b27c-672c-4624-a634-10a6e30f1d06	String	jsonType.label
0b3a1994-bc42-404a-8a90-eb8711c0a505	true	introspection.token.claim
0b3a1994-bc42-404a-8a90-eb8711c0a505	true	id.token.claim
0b3a1994-bc42-404a-8a90-eb8711c0a505	true	access.token.claim
33289528-24db-444c-a7a9-3b03859c45af	AUTH_TIME	user.session.note
33289528-24db-444c-a7a9-3b03859c45af	true	introspection.token.claim
33289528-24db-444c-a7a9-3b03859c45af	true	id.token.claim
33289528-24db-444c-a7a9-3b03859c45af	true	access.token.claim
33289528-24db-444c-a7a9-3b03859c45af	auth_time	claim.name
33289528-24db-444c-a7a9-3b03859c45af	long	jsonType.label
7819afed-c2e7-414b-81d7-a814d7a64531	true	introspection.token.claim
7819afed-c2e7-414b-81d7-a814d7a64531	true	access.token.claim
11d9321e-67c1-4819-bc48-dc22ef6e6cef	true	introspection.token.claim
11d9321e-67c1-4819-bc48-dc22ef6e6cef	true	id.token.claim
11d9321e-67c1-4819-bc48-dc22ef6e6cef	true	access.token.claim
3b95c4dd-3ffb-4c86-bcc6-a75f50500a43	clientAddress	user.session.note
3b95c4dd-3ffb-4c86-bcc6-a75f50500a43	true	introspection.token.claim
3b95c4dd-3ffb-4c86-bcc6-a75f50500a43	true	id.token.claim
3b95c4dd-3ffb-4c86-bcc6-a75f50500a43	true	access.token.claim
3b95c4dd-3ffb-4c86-bcc6-a75f50500a43	clientAddress	claim.name
3b95c4dd-3ffb-4c86-bcc6-a75f50500a43	String	jsonType.label
3e379c15-8294-43ab-83f8-64dc41fe58ff	clientHost	user.session.note
3e379c15-8294-43ab-83f8-64dc41fe58ff	true	introspection.token.claim
3e379c15-8294-43ab-83f8-64dc41fe58ff	true	id.token.claim
3e379c15-8294-43ab-83f8-64dc41fe58ff	true	access.token.claim
3e379c15-8294-43ab-83f8-64dc41fe58ff	clientHost	claim.name
3e379c15-8294-43ab-83f8-64dc41fe58ff	String	jsonType.label
d3b03630-92cb-4430-b56c-fd675ec59996	client_id	user.session.note
d3b03630-92cb-4430-b56c-fd675ec59996	true	introspection.token.claim
d3b03630-92cb-4430-b56c-fd675ec59996	true	id.token.claim
d3b03630-92cb-4430-b56c-fd675ec59996	true	access.token.claim
d3b03630-92cb-4430-b56c-fd675ec59996	client_id	claim.name
d3b03630-92cb-4430-b56c-fd675ec59996	String	jsonType.label
\.


--
-- Data for Name: realm; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm (id, access_code_lifespan, user_action_lifespan, access_token_lifespan, account_theme, admin_theme, email_theme, enabled, events_enabled, events_expiration, login_theme, name, not_before, password_policy, registration_allowed, remember_me, reset_password_allowed, social, ssl_required, sso_idle_timeout, sso_max_lifespan, update_profile_on_soc_login, verify_email, master_admin_client, login_lifespan, internationalization_enabled, default_locale, reg_email_as_username, admin_events_enabled, admin_events_details_enabled, edit_username_allowed, otp_policy_counter, otp_policy_window, otp_policy_period, otp_policy_digits, otp_policy_alg, otp_policy_type, browser_flow, registration_flow, direct_grant_flow, reset_credentials_flow, client_auth_flow, offline_session_idle_timeout, revoke_refresh_token, access_token_life_implicit, login_with_email_allowed, duplicate_emails_allowed, docker_auth_flow, refresh_token_max_reuse, allow_user_managed_access, sso_max_lifespan_remember_me, sso_idle_timeout_remember_me, default_role) FROM stdin;
51ac782d-09fc-4a3b-a00f-1da1eee0183f	60	300	60	\N	\N	\N	t	f	0	\N	master	0	\N	f	f	f	f	EXTERNAL	1800	36000	f	f	6a1524f5-16e1-4488-9d57-5a8266d81647	1800	f	\N	f	f	f	f	0	1	30	6	HmacSHA1	totp	cdeaae08-a1c6-46f6-8cec-69ae3373fff5	741decd3-e736-40ee-b40a-acd222a24d9f	678977e2-181e-4146-abf1-cfcae6a381f7	eea94b0c-adbd-4710-98dc-e652240a621c	d08d84e3-c24b-4c70-a7ac-bf2640440458	2592000	f	900	t	f	36d36bf8-016c-47d6-87cc-3d3d03c1eb71	0	f	0	0	6c57d161-f0dc-4487-bc83-51b3b1aec6d3
\.


--
-- Data for Name: realm_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_attribute (name, realm_id, value) FROM stdin;
_browser_header.contentSecurityPolicyReportOnly	51ac782d-09fc-4a3b-a00f-1da1eee0183f	
_browser_header.xContentTypeOptions	51ac782d-09fc-4a3b-a00f-1da1eee0183f	nosniff
_browser_header.referrerPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	no-referrer
_browser_header.xRobotsTag	51ac782d-09fc-4a3b-a00f-1da1eee0183f	none
_browser_header.xFrameOptions	51ac782d-09fc-4a3b-a00f-1da1eee0183f	SAMEORIGIN
_browser_header.contentSecurityPolicy	51ac782d-09fc-4a3b-a00f-1da1eee0183f	frame-src 'self'; frame-ancestors 'self'; object-src 'none';
_browser_header.xXSSProtection	51ac782d-09fc-4a3b-a00f-1da1eee0183f	1; mode=block
_browser_header.strictTransportSecurity	51ac782d-09fc-4a3b-a00f-1da1eee0183f	max-age=31536000; includeSubDomains
bruteForceProtected	51ac782d-09fc-4a3b-a00f-1da1eee0183f	false
permanentLockout	51ac782d-09fc-4a3b-a00f-1da1eee0183f	false
maxTemporaryLockouts	51ac782d-09fc-4a3b-a00f-1da1eee0183f	0
maxFailureWaitSeconds	51ac782d-09fc-4a3b-a00f-1da1eee0183f	900
minimumQuickLoginWaitSeconds	51ac782d-09fc-4a3b-a00f-1da1eee0183f	60
waitIncrementSeconds	51ac782d-09fc-4a3b-a00f-1da1eee0183f	60
quickLoginCheckMilliSeconds	51ac782d-09fc-4a3b-a00f-1da1eee0183f	1000
maxDeltaTimeSeconds	51ac782d-09fc-4a3b-a00f-1da1eee0183f	43200
failureFactor	51ac782d-09fc-4a3b-a00f-1da1eee0183f	30
realmReusableOtpCode	51ac782d-09fc-4a3b-a00f-1da1eee0183f	false
firstBrokerLoginFlowId	51ac782d-09fc-4a3b-a00f-1da1eee0183f	2b9c9003-02c3-4680-a9b6-a6a6f380cd3e
displayName	51ac782d-09fc-4a3b-a00f-1da1eee0183f	Keycloak
displayNameHtml	51ac782d-09fc-4a3b-a00f-1da1eee0183f	<div class="kc-logo-text"><span>Keycloak</span></div>
defaultSignatureAlgorithm	51ac782d-09fc-4a3b-a00f-1da1eee0183f	RS256
offlineSessionMaxLifespanEnabled	51ac782d-09fc-4a3b-a00f-1da1eee0183f	false
offlineSessionMaxLifespan	51ac782d-09fc-4a3b-a00f-1da1eee0183f	5184000
\.


--
-- Data for Name: realm_default_groups; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_default_groups (realm_id, group_id) FROM stdin;
\.


--
-- Data for Name: realm_enabled_event_types; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_enabled_event_types (realm_id, value) FROM stdin;
\.


--
-- Data for Name: realm_events_listeners; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_events_listeners (realm_id, value) FROM stdin;
51ac782d-09fc-4a3b-a00f-1da1eee0183f	jboss-logging
\.


--
-- Data for Name: realm_localizations; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_localizations (realm_id, locale, texts) FROM stdin;
\.


--
-- Data for Name: realm_required_credential; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_required_credential (type, form_label, input, secret, realm_id) FROM stdin;
password	password	t	t	51ac782d-09fc-4a3b-a00f-1da1eee0183f
\.


--
-- Data for Name: realm_smtp_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_smtp_config (realm_id, value, name) FROM stdin;
\.


--
-- Data for Name: realm_supported_locales; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.realm_supported_locales (realm_id, value) FROM stdin;
\.


--
-- Data for Name: redirect_uris; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.redirect_uris (client_id, value) FROM stdin;
8e05f3e4-050a-47a7-a684-4c5a06789b84	/realms/master/account/*
a7664e11-c50b-44af-b8ec-2475f957af8e	/realms/master/account/*
76fbca71-34ed-42fc-9caf-7fa675e7c74c	/admin/master/console/*
067ba614-f7df-4e80-b3a4-143b4601abff	https://sge-dev.frba.utn.edu.ar/*
\.


--
-- Data for Name: required_action_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.required_action_config (required_action_id, value, name) FROM stdin;
\.


--
-- Data for Name: required_action_provider; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.required_action_provider (id, alias, name, realm_id, enabled, default_action, provider_id, priority) FROM stdin;
85930daf-ef81-45f9-9b50-0e959980bc63	VERIFY_EMAIL	Verify Email	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	VERIFY_EMAIL	50
0f1d3251-2a96-4d67-a086-da60bedcd633	UPDATE_PROFILE	Update Profile	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	UPDATE_PROFILE	40
a1c77f8e-2571-49bd-9a1b-2d77c5fb2116	CONFIGURE_TOTP	Configure OTP	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	CONFIGURE_TOTP	10
9c25e941-09d9-4889-8592-5e6f201d72ec	UPDATE_PASSWORD	Update Password	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	UPDATE_PASSWORD	30
b8e61b5f-21d4-40ac-b9b1-96cdfbc4d090	TERMS_AND_CONDITIONS	Terms and Conditions	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f	f	TERMS_AND_CONDITIONS	20
d48dd20b-a17a-43c7-902f-7a700f881708	delete_account	Delete Account	51ac782d-09fc-4a3b-a00f-1da1eee0183f	f	f	delete_account	60
b7db9755-a817-4099-be06-c43f2abc2d56	delete_credential	Delete Credential	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	delete_credential	100
3ec8e44c-60fc-470c-afa2-4f1a767c66bb	update_user_locale	Update User Locale	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	update_user_locale	1000
8d9817eb-6d15-454a-9396-be7f7bdbdcea	UPDATE_EMAIL	Update Email	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	UPDATE_EMAIL	70
ab52afd6-0b40-4d3c-81cf-803a779d58ff	CONFIGURE_RECOVERY_AUTHN_CODES	Recovery Authentication Codes	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	CONFIGURE_RECOVERY_AUTHN_CODES	70
74857410-cf5c-4f1d-a2c7-cdce88c6ac8f	webauthn-register	Webauthn Register	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	webauthn-register	70
24306c91-d49b-46f8-8dfe-1ad8f4987edf	webauthn-register-passwordless	Webauthn Register Passwordless	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	webauthn-register-passwordless	80
38dec8cb-7e8e-4706-9535-cc5a9c58e173	VERIFY_PROFILE	Verify Profile	51ac782d-09fc-4a3b-a00f-1da1eee0183f	t	f	VERIFY_PROFILE	90
\.


--
-- Data for Name: resource_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_attribute (id, name, value, resource_id) FROM stdin;
\.


--
-- Data for Name: resource_policy; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_policy (resource_id, policy_id) FROM stdin;
\.


--
-- Data for Name: resource_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_scope (resource_id, scope_id) FROM stdin;
\.


--
-- Data for Name: resource_server; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server (id, allow_rs_remote_mgmt, policy_enforce_mode, decision_strategy) FROM stdin;
067ba614-f7df-4e80-b3a4-143b4601abff	t	0	1
\.


--
-- Data for Name: resource_server_perm_ticket; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server_perm_ticket (id, owner, requester, created_timestamp, granted_timestamp, resource_id, scope_id, resource_server_id, policy_id) FROM stdin;
\.


--
-- Data for Name: resource_server_policy; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server_policy (id, name, description, type, decision_strategy, logic, resource_server_id, owner) FROM stdin;
475a9f6e-0774-4bd0-ad71-eca92e31555e	Default Policy	A policy that grants access only for users within this realm	js	0	0	067ba614-f7df-4e80-b3a4-143b4601abff	\N
b9044aec-0430-4062-96d2-2dcc098c1fe2	Default Permission	A permission that applies to the default resource type	resource	1	0	067ba614-f7df-4e80-b3a4-143b4601abff	\N
\.


--
-- Data for Name: resource_server_resource; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server_resource (id, name, type, icon_uri, owner, resource_server_id, owner_managed_access, display_name) FROM stdin;
7fe779e3-2cc8-4083-83ba-1fabad467f85	Default Resource	urn:sge:resources:default	\N	067ba614-f7df-4e80-b3a4-143b4601abff	067ba614-f7df-4e80-b3a4-143b4601abff	f	\N
\.


--
-- Data for Name: resource_server_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_server_scope (id, name, icon_uri, resource_server_id, display_name) FROM stdin;
\.


--
-- Data for Name: resource_uris; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.resource_uris (resource_id, value) FROM stdin;
7fe779e3-2cc8-4083-83ba-1fabad467f85	/*
\.


--
-- Data for Name: role_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.role_attribute (id, role_id, name, value) FROM stdin;
\.


--
-- Data for Name: scope_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.scope_mapping (client_id, role_id) FROM stdin;
a7664e11-c50b-44af-b8ec-2475f957af8e	ac4f8c43-6667-432d-8742-cba31b14a27d
a7664e11-c50b-44af-b8ec-2475f957af8e	25e46347-0503-44d6-a154-44a98410d8f0
\.


--
-- Data for Name: scope_policy; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.scope_policy (scope_id, policy_id) FROM stdin;
\.


--
-- Data for Name: user_attribute; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_attribute (name, value, user_id, id, long_value_hash, long_value_hash_lower_case, long_value) FROM stdin;
\.


--
-- Data for Name: user_consent; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_consent (id, client_id, user_id, created_date, last_updated_date, client_storage_provider, external_client_id) FROM stdin;
\.


--
-- Data for Name: user_consent_client_scope; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_consent_client_scope (user_consent_id, scope_id) FROM stdin;
\.


--
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_entity (id, email, email_constraint, email_verified, enabled, federation_link, first_name, last_name, realm_id, username, created_timestamp, service_account_client_link, not_before) FROM stdin;
c5dde975-1231-471a-bdd0-661f0272ef2e	\N	054be047-9e74-45d3-9115-85781309e3e2	f	t	\N	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	dev	1750169858524	\N	0
7cf9b315-a3f4-496e-bb22-b10bb61e726d	\N	d3336e82-9960-4438-a938-d466d7568585	f	t	\N	\N	\N	51ac782d-09fc-4a3b-a00f-1da1eee0183f	service-account-sge	1750169923457	067ba614-f7df-4e80-b3a4-143b4601abff	0
73ea429c-0ba8-469d-bfdf-5879ccc975b6	admin@gmail.com	admin@gmail.com	f	t	\N	admin	admin	51ac782d-09fc-4a3b-a00f-1da1eee0183f	admin	1750172009898	\N	0
\.


--
-- Data for Name: user_federation_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_federation_config (user_federation_provider_id, value, name) FROM stdin;
\.


--
-- Data for Name: user_federation_mapper; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_federation_mapper (id, name, federation_provider_id, federation_mapper_type, realm_id) FROM stdin;
\.


--
-- Data for Name: user_federation_mapper_config; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_federation_mapper_config (user_federation_mapper_id, value, name) FROM stdin;
\.


--
-- Data for Name: user_federation_provider; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_federation_provider (id, changed_sync_period, display_name, full_sync_period, last_sync, priority, provider_name, realm_id) FROM stdin;
\.


--
-- Data for Name: user_group_membership; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_group_membership (group_id, user_id) FROM stdin;
\.


--
-- Data for Name: user_required_action; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_required_action (user_id, required_action) FROM stdin;
\.


--
-- Data for Name: user_role_mapping; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_role_mapping (role_id, user_id) FROM stdin;
6c57d161-f0dc-4487-bc83-51b3b1aec6d3	c5dde975-1231-471a-bdd0-661f0272ef2e
74e7866f-c143-4815-af47-e323845f9008	c5dde975-1231-471a-bdd0-661f0272ef2e
6c57d161-f0dc-4487-bc83-51b3b1aec6d3	7cf9b315-a3f4-496e-bb22-b10bb61e726d
e98d5b00-30eb-418e-af72-646656f8f86e	7cf9b315-a3f4-496e-bb22-b10bb61e726d
6c57d161-f0dc-4487-bc83-51b3b1aec6d3	73ea429c-0ba8-469d-bfdf-5879ccc975b6
\.


--
-- Data for Name: user_session; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_session (id, auth_method, ip_address, last_session_refresh, login_username, realm_id, remember_me, started, user_id, user_session_state, broker_session_id, broker_user_id) FROM stdin;
\.


--
-- Data for Name: user_session_note; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.user_session_note (user_session, name, value) FROM stdin;
\.


--
-- Data for Name: username_login_failure; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.username_login_failure (realm_id, username, failed_login_not_before, last_failure, last_ip_failure, num_failures) FROM stdin;
\.


--
-- Data for Name: web_origins; Type: TABLE DATA; Schema: public; Owner: keycloak
--

COPY public.web_origins (client_id, value) FROM stdin;
76fbca71-34ed-42fc-9caf-7fa675e7c74c	+
067ba614-f7df-4e80-b3a4-143b4601abff	https://sge-dev.frba.utn.edu.ar
\.


--
-- Name: username_login_failure CONSTRAINT_17-2; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.username_login_failure
    ADD CONSTRAINT "CONSTRAINT_17-2" PRIMARY KEY (realm_id, username);


--
-- Name: org_domain ORG_DOMAIN_pkey; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.org_domain
    ADD CONSTRAINT "ORG_DOMAIN_pkey" PRIMARY KEY (id, name);


--
-- Name: org ORG_pkey; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.org
    ADD CONSTRAINT "ORG_pkey" PRIMARY KEY (id);


--
-- Name: keycloak_role UK_J3RWUVD56ONTGSUHOGM184WW2-2; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT "UK_J3RWUVD56ONTGSUHOGM184WW2-2" UNIQUE (name, client_realm_constraint);


--
-- Name: client_auth_flow_bindings c_cli_flow_bind; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_auth_flow_bindings
    ADD CONSTRAINT c_cli_flow_bind PRIMARY KEY (client_id, binding_name);


--
-- Name: client_scope_client c_cli_scope_bind; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_client
    ADD CONSTRAINT c_cli_scope_bind PRIMARY KEY (client_id, scope_id);


--
-- Name: client_initial_access cnstr_client_init_acc_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_initial_access
    ADD CONSTRAINT cnstr_client_init_acc_pk PRIMARY KEY (id);


--
-- Name: realm_default_groups con_group_id_def_groups; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT con_group_id_def_groups UNIQUE (group_id);


--
-- Name: broker_link constr_broker_link_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.broker_link
    ADD CONSTRAINT constr_broker_link_pk PRIMARY KEY (identity_provider, user_id);


--
-- Name: client_user_session_note constr_cl_usr_ses_note; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_user_session_note
    ADD CONSTRAINT constr_cl_usr_ses_note PRIMARY KEY (client_session, name);


--
-- Name: component_config constr_component_config_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.component_config
    ADD CONSTRAINT constr_component_config_pk PRIMARY KEY (id);


--
-- Name: component constr_component_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT constr_component_pk PRIMARY KEY (id);


--
-- Name: fed_user_required_action constr_fed_required_action; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_required_action
    ADD CONSTRAINT constr_fed_required_action PRIMARY KEY (required_action, user_id);


--
-- Name: fed_user_attribute constr_fed_user_attr_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_attribute
    ADD CONSTRAINT constr_fed_user_attr_pk PRIMARY KEY (id);


--
-- Name: fed_user_consent constr_fed_user_consent_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_consent
    ADD CONSTRAINT constr_fed_user_consent_pk PRIMARY KEY (id);


--
-- Name: fed_user_credential constr_fed_user_cred_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_credential
    ADD CONSTRAINT constr_fed_user_cred_pk PRIMARY KEY (id);


--
-- Name: fed_user_group_membership constr_fed_user_group; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_group_membership
    ADD CONSTRAINT constr_fed_user_group PRIMARY KEY (group_id, user_id);


--
-- Name: fed_user_role_mapping constr_fed_user_role; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_role_mapping
    ADD CONSTRAINT constr_fed_user_role PRIMARY KEY (role_id, user_id);


--
-- Name: federated_user constr_federated_user; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.federated_user
    ADD CONSTRAINT constr_federated_user PRIMARY KEY (id);


--
-- Name: realm_default_groups constr_realm_default_groups; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT constr_realm_default_groups PRIMARY KEY (realm_id, group_id);


--
-- Name: realm_enabled_event_types constr_realm_enabl_event_types; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_enabled_event_types
    ADD CONSTRAINT constr_realm_enabl_event_types PRIMARY KEY (realm_id, value);


--
-- Name: realm_events_listeners constr_realm_events_listeners; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_events_listeners
    ADD CONSTRAINT constr_realm_events_listeners PRIMARY KEY (realm_id, value);


--
-- Name: realm_supported_locales constr_realm_supported_locales; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_supported_locales
    ADD CONSTRAINT constr_realm_supported_locales PRIMARY KEY (realm_id, value);


--
-- Name: identity_provider constraint_2b; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT constraint_2b PRIMARY KEY (internal_id);


--
-- Name: client_attributes constraint_3c; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_attributes
    ADD CONSTRAINT constraint_3c PRIMARY KEY (client_id, name);


--
-- Name: event_entity constraint_4; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.event_entity
    ADD CONSTRAINT constraint_4 PRIMARY KEY (id);


--
-- Name: federated_identity constraint_40; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.federated_identity
    ADD CONSTRAINT constraint_40 PRIMARY KEY (identity_provider, user_id);


--
-- Name: realm constraint_4a; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm
    ADD CONSTRAINT constraint_4a PRIMARY KEY (id);


--
-- Name: client_session_role constraint_5; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_role
    ADD CONSTRAINT constraint_5 PRIMARY KEY (client_session, role_id);


--
-- Name: user_session constraint_57; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_session
    ADD CONSTRAINT constraint_57 PRIMARY KEY (id);


--
-- Name: user_federation_provider constraint_5c; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_provider
    ADD CONSTRAINT constraint_5c PRIMARY KEY (id);


--
-- Name: client_session_note constraint_5e; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_note
    ADD CONSTRAINT constraint_5e PRIMARY KEY (client_session, name);


--
-- Name: client constraint_7; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT constraint_7 PRIMARY KEY (id);


--
-- Name: client_session constraint_8; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT constraint_8 PRIMARY KEY (id);


--
-- Name: scope_mapping constraint_81; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_mapping
    ADD CONSTRAINT constraint_81 PRIMARY KEY (client_id, role_id);


--
-- Name: client_node_registrations constraint_84; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_node_registrations
    ADD CONSTRAINT constraint_84 PRIMARY KEY (client_id, name);


--
-- Name: realm_attribute constraint_9; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_attribute
    ADD CONSTRAINT constraint_9 PRIMARY KEY (name, realm_id);


--
-- Name: realm_required_credential constraint_92; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_required_credential
    ADD CONSTRAINT constraint_92 PRIMARY KEY (realm_id, type);


--
-- Name: keycloak_role constraint_a; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT constraint_a PRIMARY KEY (id);


--
-- Name: admin_event_entity constraint_admin_event_entity; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.admin_event_entity
    ADD CONSTRAINT constraint_admin_event_entity PRIMARY KEY (id);


--
-- Name: authenticator_config_entry constraint_auth_cfg_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authenticator_config_entry
    ADD CONSTRAINT constraint_auth_cfg_pk PRIMARY KEY (authenticator_id, name);


--
-- Name: authentication_execution constraint_auth_exec_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT constraint_auth_exec_pk PRIMARY KEY (id);


--
-- Name: authentication_flow constraint_auth_flow_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_flow
    ADD CONSTRAINT constraint_auth_flow_pk PRIMARY KEY (id);


--
-- Name: authenticator_config constraint_auth_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authenticator_config
    ADD CONSTRAINT constraint_auth_pk PRIMARY KEY (id);


--
-- Name: client_session_auth_status constraint_auth_status_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_auth_status
    ADD CONSTRAINT constraint_auth_status_pk PRIMARY KEY (client_session, authenticator);


--
-- Name: user_role_mapping constraint_c; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_role_mapping
    ADD CONSTRAINT constraint_c PRIMARY KEY (role_id, user_id);


--
-- Name: composite_role constraint_composite_role; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT constraint_composite_role PRIMARY KEY (composite, child_role);


--
-- Name: client_session_prot_mapper constraint_cs_pmp_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_prot_mapper
    ADD CONSTRAINT constraint_cs_pmp_pk PRIMARY KEY (client_session, protocol_mapper_id);


--
-- Name: identity_provider_config constraint_d; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider_config
    ADD CONSTRAINT constraint_d PRIMARY KEY (identity_provider_id, name);


--
-- Name: policy_config constraint_dpc; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.policy_config
    ADD CONSTRAINT constraint_dpc PRIMARY KEY (policy_id, name);


--
-- Name: realm_smtp_config constraint_e; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_smtp_config
    ADD CONSTRAINT constraint_e PRIMARY KEY (realm_id, name);


--
-- Name: credential constraint_f; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.credential
    ADD CONSTRAINT constraint_f PRIMARY KEY (id);


--
-- Name: user_federation_config constraint_f9; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_config
    ADD CONSTRAINT constraint_f9 PRIMARY KEY (user_federation_provider_id, name);


--
-- Name: resource_server_perm_ticket constraint_fapmt; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT constraint_fapmt PRIMARY KEY (id);


--
-- Name: resource_server_resource constraint_farsr; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT constraint_farsr PRIMARY KEY (id);


--
-- Name: resource_server_policy constraint_farsrp; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT constraint_farsrp PRIMARY KEY (id);


--
-- Name: associated_policy constraint_farsrpap; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT constraint_farsrpap PRIMARY KEY (policy_id, associated_policy_id);


--
-- Name: resource_policy constraint_farsrpp; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT constraint_farsrpp PRIMARY KEY (resource_id, policy_id);


--
-- Name: resource_server_scope constraint_farsrs; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT constraint_farsrs PRIMARY KEY (id);


--
-- Name: resource_scope constraint_farsrsp; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT constraint_farsrsp PRIMARY KEY (resource_id, scope_id);


--
-- Name: scope_policy constraint_farsrsps; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT constraint_farsrsps PRIMARY KEY (scope_id, policy_id);


--
-- Name: user_entity constraint_fb; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT constraint_fb PRIMARY KEY (id);


--
-- Name: user_federation_mapper_config constraint_fedmapper_cfg_pm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper_config
    ADD CONSTRAINT constraint_fedmapper_cfg_pm PRIMARY KEY (user_federation_mapper_id, name);


--
-- Name: user_federation_mapper constraint_fedmapperpm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT constraint_fedmapperpm PRIMARY KEY (id);


--
-- Name: fed_user_consent_cl_scope constraint_fgrntcsnt_clsc_pm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.fed_user_consent_cl_scope
    ADD CONSTRAINT constraint_fgrntcsnt_clsc_pm PRIMARY KEY (user_consent_id, scope_id);


--
-- Name: user_consent_client_scope constraint_grntcsnt_clsc_pm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent_client_scope
    ADD CONSTRAINT constraint_grntcsnt_clsc_pm PRIMARY KEY (user_consent_id, scope_id);


--
-- Name: user_consent constraint_grntcsnt_pm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT constraint_grntcsnt_pm PRIMARY KEY (id);


--
-- Name: keycloak_group constraint_group; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT constraint_group PRIMARY KEY (id);


--
-- Name: group_attribute constraint_group_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT constraint_group_attribute_pk PRIMARY KEY (id);


--
-- Name: group_role_mapping constraint_group_role; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.group_role_mapping
    ADD CONSTRAINT constraint_group_role PRIMARY KEY (role_id, group_id);


--
-- Name: identity_provider_mapper constraint_idpm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider_mapper
    ADD CONSTRAINT constraint_idpm PRIMARY KEY (id);


--
-- Name: idp_mapper_config constraint_idpmconfig; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.idp_mapper_config
    ADD CONSTRAINT constraint_idpmconfig PRIMARY KEY (idp_mapper_id, name);


--
-- Name: migration_model constraint_migmod; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.migration_model
    ADD CONSTRAINT constraint_migmod PRIMARY KEY (id);


--
-- Name: offline_client_session constraint_offl_cl_ses_pk3; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.offline_client_session
    ADD CONSTRAINT constraint_offl_cl_ses_pk3 PRIMARY KEY (user_session_id, client_id, client_storage_provider, external_client_id, offline_flag);


--
-- Name: offline_user_session constraint_offl_us_ses_pk2; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.offline_user_session
    ADD CONSTRAINT constraint_offl_us_ses_pk2 PRIMARY KEY (user_session_id, offline_flag);


--
-- Name: protocol_mapper constraint_pcm; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT constraint_pcm PRIMARY KEY (id);


--
-- Name: protocol_mapper_config constraint_pmconfig; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper_config
    ADD CONSTRAINT constraint_pmconfig PRIMARY KEY (protocol_mapper_id, name);


--
-- Name: redirect_uris constraint_redirect_uris; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.redirect_uris
    ADD CONSTRAINT constraint_redirect_uris PRIMARY KEY (client_id, value);


--
-- Name: required_action_config constraint_req_act_cfg_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.required_action_config
    ADD CONSTRAINT constraint_req_act_cfg_pk PRIMARY KEY (required_action_id, name);


--
-- Name: required_action_provider constraint_req_act_prv_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.required_action_provider
    ADD CONSTRAINT constraint_req_act_prv_pk PRIMARY KEY (id);


--
-- Name: user_required_action constraint_required_action; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_required_action
    ADD CONSTRAINT constraint_required_action PRIMARY KEY (required_action, user_id);


--
-- Name: resource_uris constraint_resour_uris_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_uris
    ADD CONSTRAINT constraint_resour_uris_pk PRIMARY KEY (resource_id, value);


--
-- Name: role_attribute constraint_role_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.role_attribute
    ADD CONSTRAINT constraint_role_attribute_pk PRIMARY KEY (id);


--
-- Name: user_attribute constraint_user_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_attribute
    ADD CONSTRAINT constraint_user_attribute_pk PRIMARY KEY (id);


--
-- Name: user_group_membership constraint_user_group; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_group_membership
    ADD CONSTRAINT constraint_user_group PRIMARY KEY (group_id, user_id);


--
-- Name: user_session_note constraint_usn_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_session_note
    ADD CONSTRAINT constraint_usn_pk PRIMARY KEY (user_session, name);


--
-- Name: web_origins constraint_web_origins; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.web_origins
    ADD CONSTRAINT constraint_web_origins PRIMARY KEY (client_id, value);


--
-- Name: databasechangeloglock databasechangeloglock_pkey; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT databasechangeloglock_pkey PRIMARY KEY (id);


--
-- Name: client_scope_attributes pk_cl_tmpl_attr; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_attributes
    ADD CONSTRAINT pk_cl_tmpl_attr PRIMARY KEY (scope_id, name);


--
-- Name: client_scope pk_cli_template; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT pk_cli_template PRIMARY KEY (id);


--
-- Name: resource_server pk_resource_server; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server
    ADD CONSTRAINT pk_resource_server PRIMARY KEY (id);


--
-- Name: client_scope_role_mapping pk_template_scope; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_role_mapping
    ADD CONSTRAINT pk_template_scope PRIMARY KEY (scope_id, role_id);


--
-- Name: default_client_scope r_def_cli_scope_bind; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT r_def_cli_scope_bind PRIMARY KEY (realm_id, scope_id);


--
-- Name: realm_localizations realm_localizations_pkey; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_localizations
    ADD CONSTRAINT realm_localizations_pkey PRIMARY KEY (realm_id, locale);


--
-- Name: resource_attribute res_attr_pk; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_attribute
    ADD CONSTRAINT res_attr_pk PRIMARY KEY (id);


--
-- Name: keycloak_group sibling_names; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_group
    ADD CONSTRAINT sibling_names UNIQUE (realm_id, parent_group, name);


--
-- Name: identity_provider uk_2daelwnibji49avxsrtuf6xj33; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT uk_2daelwnibji49avxsrtuf6xj33 UNIQUE (provider_alias, realm_id);


--
-- Name: client uk_b71cjlbenv945rb6gcon438at; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT uk_b71cjlbenv945rb6gcon438at UNIQUE (realm_id, client_id);


--
-- Name: client_scope uk_cli_scope; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope
    ADD CONSTRAINT uk_cli_scope UNIQUE (realm_id, name);


--
-- Name: user_entity uk_dykn684sl8up1crfei6eckhd7; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT uk_dykn684sl8up1crfei6eckhd7 UNIQUE (realm_id, email_constraint);


--
-- Name: user_consent uk_external_consent; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT uk_external_consent UNIQUE (client_storage_provider, external_client_id, user_id);


--
-- Name: resource_server_resource uk_frsr6t700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT uk_frsr6t700s9v50bu18ws5ha6 UNIQUE (name, owner, resource_server_id);


--
-- Name: resource_server_perm_ticket uk_frsr6t700s9v50bu18ws5pmt; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT uk_frsr6t700s9v50bu18ws5pmt UNIQUE (owner, requester, resource_server_id, resource_id, scope_id);


--
-- Name: resource_server_policy uk_frsrpt700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT uk_frsrpt700s9v50bu18ws5ha6 UNIQUE (name, resource_server_id);


--
-- Name: resource_server_scope uk_frsrst700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT uk_frsrst700s9v50bu18ws5ha6 UNIQUE (name, resource_server_id);


--
-- Name: user_consent uk_local_consent; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT uk_local_consent UNIQUE (client_id, user_id);


--
-- Name: org uk_org_group; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.org
    ADD CONSTRAINT uk_org_group UNIQUE (group_id);


--
-- Name: org uk_org_name; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.org
    ADD CONSTRAINT uk_org_name UNIQUE (realm_id, name);


--
-- Name: realm uk_orvsdmla56612eaefiq6wl5oi; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm
    ADD CONSTRAINT uk_orvsdmla56612eaefiq6wl5oi UNIQUE (name);


--
-- Name: user_entity uk_ru8tt6t700s9v50bu18ws5ha6; Type: CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT uk_ru8tt6t700s9v50bu18ws5ha6 UNIQUE (realm_id, username);


--
-- Name: fed_user_attr_long_values; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX fed_user_attr_long_values ON public.fed_user_attribute USING btree (long_value_hash, name);


--
-- Name: fed_user_attr_long_values_lower_case; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX fed_user_attr_long_values_lower_case ON public.fed_user_attribute USING btree (long_value_hash_lower_case, name);


--
-- Name: idx_admin_event_time; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_admin_event_time ON public.admin_event_entity USING btree (realm_id, admin_event_time);


--
-- Name: idx_assoc_pol_assoc_pol_id; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_assoc_pol_assoc_pol_id ON public.associated_policy USING btree (associated_policy_id);


--
-- Name: idx_auth_config_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_auth_config_realm ON public.authenticator_config USING btree (realm_id);


--
-- Name: idx_auth_exec_flow; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_auth_exec_flow ON public.authentication_execution USING btree (flow_id);


--
-- Name: idx_auth_exec_realm_flow; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_auth_exec_realm_flow ON public.authentication_execution USING btree (realm_id, flow_id);


--
-- Name: idx_auth_flow_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_auth_flow_realm ON public.authentication_flow USING btree (realm_id);


--
-- Name: idx_cl_clscope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_cl_clscope ON public.client_scope_client USING btree (scope_id);


--
-- Name: idx_client_att_by_name_value; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_client_att_by_name_value ON public.client_attributes USING btree (name, substr(value, 1, 255));


--
-- Name: idx_client_id; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_client_id ON public.client USING btree (client_id);


--
-- Name: idx_client_init_acc_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_client_init_acc_realm ON public.client_initial_access USING btree (realm_id);


--
-- Name: idx_client_session_session; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_client_session_session ON public.client_session USING btree (session_id);


--
-- Name: idx_clscope_attrs; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_clscope_attrs ON public.client_scope_attributes USING btree (scope_id);


--
-- Name: idx_clscope_cl; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_clscope_cl ON public.client_scope_client USING btree (client_id);


--
-- Name: idx_clscope_protmap; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_clscope_protmap ON public.protocol_mapper USING btree (client_scope_id);


--
-- Name: idx_clscope_role; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_clscope_role ON public.client_scope_role_mapping USING btree (scope_id);


--
-- Name: idx_compo_config_compo; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_compo_config_compo ON public.component_config USING btree (component_id);


--
-- Name: idx_component_provider_type; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_component_provider_type ON public.component USING btree (provider_type);


--
-- Name: idx_component_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_component_realm ON public.component USING btree (realm_id);


--
-- Name: idx_composite; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_composite ON public.composite_role USING btree (composite);


--
-- Name: idx_composite_child; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_composite_child ON public.composite_role USING btree (child_role);


--
-- Name: idx_defcls_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_defcls_realm ON public.default_client_scope USING btree (realm_id);


--
-- Name: idx_defcls_scope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_defcls_scope ON public.default_client_scope USING btree (scope_id);


--
-- Name: idx_event_time; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_event_time ON public.event_entity USING btree (realm_id, event_time);


--
-- Name: idx_fedidentity_feduser; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fedidentity_feduser ON public.federated_identity USING btree (federated_user_id);


--
-- Name: idx_fedidentity_user; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fedidentity_user ON public.federated_identity USING btree (user_id);


--
-- Name: idx_fu_attribute; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_attribute ON public.fed_user_attribute USING btree (user_id, realm_id, name);


--
-- Name: idx_fu_cnsnt_ext; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_cnsnt_ext ON public.fed_user_consent USING btree (user_id, client_storage_provider, external_client_id);


--
-- Name: idx_fu_consent; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_consent ON public.fed_user_consent USING btree (user_id, client_id);


--
-- Name: idx_fu_consent_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_consent_ru ON public.fed_user_consent USING btree (realm_id, user_id);


--
-- Name: idx_fu_credential; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_credential ON public.fed_user_credential USING btree (user_id, type);


--
-- Name: idx_fu_credential_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_credential_ru ON public.fed_user_credential USING btree (realm_id, user_id);


--
-- Name: idx_fu_group_membership; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_group_membership ON public.fed_user_group_membership USING btree (user_id, group_id);


--
-- Name: idx_fu_group_membership_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_group_membership_ru ON public.fed_user_group_membership USING btree (realm_id, user_id);


--
-- Name: idx_fu_required_action; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_required_action ON public.fed_user_required_action USING btree (user_id, required_action);


--
-- Name: idx_fu_required_action_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_required_action_ru ON public.fed_user_required_action USING btree (realm_id, user_id);


--
-- Name: idx_fu_role_mapping; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_role_mapping ON public.fed_user_role_mapping USING btree (user_id, role_id);


--
-- Name: idx_fu_role_mapping_ru; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_fu_role_mapping_ru ON public.fed_user_role_mapping USING btree (realm_id, user_id);


--
-- Name: idx_group_att_by_name_value; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_group_att_by_name_value ON public.group_attribute USING btree (name, ((value)::character varying(250)));


--
-- Name: idx_group_attr_group; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_group_attr_group ON public.group_attribute USING btree (group_id);


--
-- Name: idx_group_role_mapp_group; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_group_role_mapp_group ON public.group_role_mapping USING btree (group_id);


--
-- Name: idx_id_prov_mapp_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_id_prov_mapp_realm ON public.identity_provider_mapper USING btree (realm_id);


--
-- Name: idx_ident_prov_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_ident_prov_realm ON public.identity_provider USING btree (realm_id);


--
-- Name: idx_keycloak_role_client; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_keycloak_role_client ON public.keycloak_role USING btree (client);


--
-- Name: idx_keycloak_role_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_keycloak_role_realm ON public.keycloak_role USING btree (realm);


--
-- Name: idx_offline_uss_by_broker_session_id; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_offline_uss_by_broker_session_id ON public.offline_user_session USING btree (broker_session_id, realm_id);


--
-- Name: idx_offline_uss_by_last_session_refresh; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_offline_uss_by_last_session_refresh ON public.offline_user_session USING btree (realm_id, offline_flag, last_session_refresh);


--
-- Name: idx_offline_uss_by_user; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_offline_uss_by_user ON public.offline_user_session USING btree (user_id, realm_id, offline_flag);


--
-- Name: idx_perm_ticket_owner; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_perm_ticket_owner ON public.resource_server_perm_ticket USING btree (owner);


--
-- Name: idx_perm_ticket_requester; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_perm_ticket_requester ON public.resource_server_perm_ticket USING btree (requester);


--
-- Name: idx_protocol_mapper_client; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_protocol_mapper_client ON public.protocol_mapper USING btree (client_id);


--
-- Name: idx_realm_attr_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_attr_realm ON public.realm_attribute USING btree (realm_id);


--
-- Name: idx_realm_clscope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_clscope ON public.client_scope USING btree (realm_id);


--
-- Name: idx_realm_def_grp_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_def_grp_realm ON public.realm_default_groups USING btree (realm_id);


--
-- Name: idx_realm_evt_list_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_evt_list_realm ON public.realm_events_listeners USING btree (realm_id);


--
-- Name: idx_realm_evt_types_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_evt_types_realm ON public.realm_enabled_event_types USING btree (realm_id);


--
-- Name: idx_realm_master_adm_cli; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_master_adm_cli ON public.realm USING btree (master_admin_client);


--
-- Name: idx_realm_supp_local_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_realm_supp_local_realm ON public.realm_supported_locales USING btree (realm_id);


--
-- Name: idx_redir_uri_client; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_redir_uri_client ON public.redirect_uris USING btree (client_id);


--
-- Name: idx_req_act_prov_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_req_act_prov_realm ON public.required_action_provider USING btree (realm_id);


--
-- Name: idx_res_policy_policy; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_policy_policy ON public.resource_policy USING btree (policy_id);


--
-- Name: idx_res_scope_scope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_scope_scope ON public.resource_scope USING btree (scope_id);


--
-- Name: idx_res_serv_pol_res_serv; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_serv_pol_res_serv ON public.resource_server_policy USING btree (resource_server_id);


--
-- Name: idx_res_srv_res_res_srv; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_srv_res_res_srv ON public.resource_server_resource USING btree (resource_server_id);


--
-- Name: idx_res_srv_scope_res_srv; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_res_srv_scope_res_srv ON public.resource_server_scope USING btree (resource_server_id);


--
-- Name: idx_role_attribute; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_role_attribute ON public.role_attribute USING btree (role_id);


--
-- Name: idx_role_clscope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_role_clscope ON public.client_scope_role_mapping USING btree (role_id);


--
-- Name: idx_scope_mapping_role; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_scope_mapping_role ON public.scope_mapping USING btree (role_id);


--
-- Name: idx_scope_policy_policy; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_scope_policy_policy ON public.scope_policy USING btree (policy_id);


--
-- Name: idx_update_time; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_update_time ON public.migration_model USING btree (update_time);


--
-- Name: idx_us_sess_id_on_cl_sess; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_us_sess_id_on_cl_sess ON public.offline_client_session USING btree (user_session_id);


--
-- Name: idx_usconsent_clscope; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usconsent_clscope ON public.user_consent_client_scope USING btree (user_consent_id);


--
-- Name: idx_usconsent_scope_id; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usconsent_scope_id ON public.user_consent_client_scope USING btree (scope_id);


--
-- Name: idx_user_attribute; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_attribute ON public.user_attribute USING btree (user_id);


--
-- Name: idx_user_attribute_name; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_attribute_name ON public.user_attribute USING btree (name, value);


--
-- Name: idx_user_consent; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_consent ON public.user_consent USING btree (user_id);


--
-- Name: idx_user_credential; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_credential ON public.credential USING btree (user_id);


--
-- Name: idx_user_email; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_email ON public.user_entity USING btree (email);


--
-- Name: idx_user_group_mapping; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_group_mapping ON public.user_group_membership USING btree (user_id);


--
-- Name: idx_user_reqactions; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_reqactions ON public.user_required_action USING btree (user_id);


--
-- Name: idx_user_role_mapping; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_role_mapping ON public.user_role_mapping USING btree (user_id);


--
-- Name: idx_user_service_account; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_user_service_account ON public.user_entity USING btree (realm_id, service_account_client_link);


--
-- Name: idx_usr_fed_map_fed_prv; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usr_fed_map_fed_prv ON public.user_federation_mapper USING btree (federation_provider_id);


--
-- Name: idx_usr_fed_map_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usr_fed_map_realm ON public.user_federation_mapper USING btree (realm_id);


--
-- Name: idx_usr_fed_prv_realm; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_usr_fed_prv_realm ON public.user_federation_provider USING btree (realm_id);


--
-- Name: idx_web_orig_client; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX idx_web_orig_client ON public.web_origins USING btree (client_id);


--
-- Name: user_attr_long_values; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX user_attr_long_values ON public.user_attribute USING btree (long_value_hash, name);


--
-- Name: user_attr_long_values_lower_case; Type: INDEX; Schema: public; Owner: keycloak
--

CREATE INDEX user_attr_long_values_lower_case ON public.user_attribute USING btree (long_value_hash_lower_case, name);


--
-- Name: client_session_auth_status auth_status_constraint; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_auth_status
    ADD CONSTRAINT auth_status_constraint FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: identity_provider fk2b4ebc52ae5c3b34; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider
    ADD CONSTRAINT fk2b4ebc52ae5c3b34 FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: client_attributes fk3c47c64beacca966; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_attributes
    ADD CONSTRAINT fk3c47c64beacca966 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: federated_identity fk404288b92ef007a6; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.federated_identity
    ADD CONSTRAINT fk404288b92ef007a6 FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: client_node_registrations fk4129723ba992f594; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_node_registrations
    ADD CONSTRAINT fk4129723ba992f594 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: client_session_note fk5edfb00ff51c2736; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_note
    ADD CONSTRAINT fk5edfb00ff51c2736 FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: user_session_note fk5edfb00ff51d3472; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_session_note
    ADD CONSTRAINT fk5edfb00ff51d3472 FOREIGN KEY (user_session) REFERENCES public.user_session(id);


--
-- Name: client_session_role fk_11b7sgqw18i532811v7o2dv76; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_role
    ADD CONSTRAINT fk_11b7sgqw18i532811v7o2dv76 FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: redirect_uris fk_1burs8pb4ouj97h5wuppahv9f; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.redirect_uris
    ADD CONSTRAINT fk_1burs8pb4ouj97h5wuppahv9f FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: user_federation_provider fk_1fj32f6ptolw2qy60cd8n01e8; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_provider
    ADD CONSTRAINT fk_1fj32f6ptolw2qy60cd8n01e8 FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: client_session_prot_mapper fk_33a8sgqw18i532811v7o2dk89; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session_prot_mapper
    ADD CONSTRAINT fk_33a8sgqw18i532811v7o2dk89 FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: realm_required_credential fk_5hg65lybevavkqfki3kponh9v; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_required_credential
    ADD CONSTRAINT fk_5hg65lybevavkqfki3kponh9v FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: resource_attribute fk_5hrm2vlf9ql5fu022kqepovbr; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_attribute
    ADD CONSTRAINT fk_5hrm2vlf9ql5fu022kqepovbr FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: user_attribute fk_5hrm2vlf9ql5fu043kqepovbr; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_attribute
    ADD CONSTRAINT fk_5hrm2vlf9ql5fu043kqepovbr FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: user_required_action fk_6qj3w1jw9cvafhe19bwsiuvmd; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_required_action
    ADD CONSTRAINT fk_6qj3w1jw9cvafhe19bwsiuvmd FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: keycloak_role fk_6vyqfe4cn4wlq8r6kt5vdsj5c; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.keycloak_role
    ADD CONSTRAINT fk_6vyqfe4cn4wlq8r6kt5vdsj5c FOREIGN KEY (realm) REFERENCES public.realm(id);


--
-- Name: realm_smtp_config fk_70ej8xdxgxd0b9hh6180irr0o; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_smtp_config
    ADD CONSTRAINT fk_70ej8xdxgxd0b9hh6180irr0o FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: realm_attribute fk_8shxd6l3e9atqukacxgpffptw; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_attribute
    ADD CONSTRAINT fk_8shxd6l3e9atqukacxgpffptw FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: composite_role fk_a63wvekftu8jo1pnj81e7mce2; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT fk_a63wvekftu8jo1pnj81e7mce2 FOREIGN KEY (composite) REFERENCES public.keycloak_role(id);


--
-- Name: authentication_execution fk_auth_exec_flow; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT fk_auth_exec_flow FOREIGN KEY (flow_id) REFERENCES public.authentication_flow(id);


--
-- Name: authentication_execution fk_auth_exec_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_execution
    ADD CONSTRAINT fk_auth_exec_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: authentication_flow fk_auth_flow_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authentication_flow
    ADD CONSTRAINT fk_auth_flow_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: authenticator_config fk_auth_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.authenticator_config
    ADD CONSTRAINT fk_auth_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: client_session fk_b4ao2vcvat6ukau74wbwtfqo1; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_session
    ADD CONSTRAINT fk_b4ao2vcvat6ukau74wbwtfqo1 FOREIGN KEY (session_id) REFERENCES public.user_session(id);


--
-- Name: user_role_mapping fk_c4fqv34p1mbylloxang7b1q3l; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_role_mapping
    ADD CONSTRAINT fk_c4fqv34p1mbylloxang7b1q3l FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: client_scope_attributes fk_cl_scope_attr_scope; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_attributes
    ADD CONSTRAINT fk_cl_scope_attr_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);


--
-- Name: client_scope_role_mapping fk_cl_scope_rm_scope; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_scope_role_mapping
    ADD CONSTRAINT fk_cl_scope_rm_scope FOREIGN KEY (scope_id) REFERENCES public.client_scope(id);


--
-- Name: client_user_session_note fk_cl_usr_ses_note; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_user_session_note
    ADD CONSTRAINT fk_cl_usr_ses_note FOREIGN KEY (client_session) REFERENCES public.client_session(id);


--
-- Name: protocol_mapper fk_cli_scope_mapper; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT fk_cli_scope_mapper FOREIGN KEY (client_scope_id) REFERENCES public.client_scope(id);


--
-- Name: client_initial_access fk_client_init_acc_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.client_initial_access
    ADD CONSTRAINT fk_client_init_acc_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: component_config fk_component_config; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.component_config
    ADD CONSTRAINT fk_component_config FOREIGN KEY (component_id) REFERENCES public.component(id);


--
-- Name: component fk_component_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT fk_component_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: realm_default_groups fk_def_groups_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_default_groups
    ADD CONSTRAINT fk_def_groups_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: user_federation_mapper_config fk_fedmapper_cfg; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper_config
    ADD CONSTRAINT fk_fedmapper_cfg FOREIGN KEY (user_federation_mapper_id) REFERENCES public.user_federation_mapper(id);


--
-- Name: user_federation_mapper fk_fedmapperpm_fedprv; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT fk_fedmapperpm_fedprv FOREIGN KEY (federation_provider_id) REFERENCES public.user_federation_provider(id);


--
-- Name: user_federation_mapper fk_fedmapperpm_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_mapper
    ADD CONSTRAINT fk_fedmapperpm_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: associated_policy fk_frsr5s213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT fk_frsr5s213xcx4wnkog82ssrfy FOREIGN KEY (associated_policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: scope_policy fk_frsrasp13xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT fk_frsrasp13xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog82sspmt; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog82sspmt FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- Name: resource_server_resource fk_frsrho213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_resource
    ADD CONSTRAINT fk_frsrho213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog83sspmt; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog83sspmt FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: resource_server_perm_ticket fk_frsrho213xcx4wnkog84sspmt; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrho213xcx4wnkog84sspmt FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- Name: associated_policy fk_frsrpas14xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.associated_policy
    ADD CONSTRAINT fk_frsrpas14xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: scope_policy fk_frsrpass3xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_policy
    ADD CONSTRAINT fk_frsrpass3xcx4wnkog82ssrfy FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- Name: resource_server_perm_ticket fk_frsrpo2128cx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_perm_ticket
    ADD CONSTRAINT fk_frsrpo2128cx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: resource_server_policy fk_frsrpo213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_policy
    ADD CONSTRAINT fk_frsrpo213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- Name: resource_scope fk_frsrpos13xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT fk_frsrpos13xcx4wnkog82ssrfy FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: resource_policy fk_frsrpos53xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT fk_frsrpos53xcx4wnkog82ssrfy FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: resource_policy fk_frsrpp213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_policy
    ADD CONSTRAINT fk_frsrpp213xcx4wnkog82ssrfy FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: resource_scope fk_frsrps213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_scope
    ADD CONSTRAINT fk_frsrps213xcx4wnkog82ssrfy FOREIGN KEY (scope_id) REFERENCES public.resource_server_scope(id);


--
-- Name: resource_server_scope fk_frsrso213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_server_scope
    ADD CONSTRAINT fk_frsrso213xcx4wnkog82ssrfy FOREIGN KEY (resource_server_id) REFERENCES public.resource_server(id);


--
-- Name: composite_role fk_gr7thllb9lu8q4vqa4524jjy8; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.composite_role
    ADD CONSTRAINT fk_gr7thllb9lu8q4vqa4524jjy8 FOREIGN KEY (child_role) REFERENCES public.keycloak_role(id);


--
-- Name: user_consent_client_scope fk_grntcsnt_clsc_usc; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent_client_scope
    ADD CONSTRAINT fk_grntcsnt_clsc_usc FOREIGN KEY (user_consent_id) REFERENCES public.user_consent(id);


--
-- Name: user_consent fk_grntcsnt_user; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_consent
    ADD CONSTRAINT fk_grntcsnt_user FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: group_attribute fk_group_attribute_group; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT fk_group_attribute_group FOREIGN KEY (group_id) REFERENCES public.keycloak_group(id);


--
-- Name: group_role_mapping fk_group_role_group; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.group_role_mapping
    ADD CONSTRAINT fk_group_role_group FOREIGN KEY (group_id) REFERENCES public.keycloak_group(id);


--
-- Name: realm_enabled_event_types fk_h846o4h0w8epx5nwedrf5y69j; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_enabled_event_types
    ADD CONSTRAINT fk_h846o4h0w8epx5nwedrf5y69j FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: realm_events_listeners fk_h846o4h0w8epx5nxev9f5y69j; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_events_listeners
    ADD CONSTRAINT fk_h846o4h0w8epx5nxev9f5y69j FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: identity_provider_mapper fk_idpm_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider_mapper
    ADD CONSTRAINT fk_idpm_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: idp_mapper_config fk_idpmconfig; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.idp_mapper_config
    ADD CONSTRAINT fk_idpmconfig FOREIGN KEY (idp_mapper_id) REFERENCES public.identity_provider_mapper(id);


--
-- Name: web_origins fk_lojpho213xcx4wnkog82ssrfy; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.web_origins
    ADD CONSTRAINT fk_lojpho213xcx4wnkog82ssrfy FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: scope_mapping fk_ouse064plmlr732lxjcn1q5f1; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.scope_mapping
    ADD CONSTRAINT fk_ouse064plmlr732lxjcn1q5f1 FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: protocol_mapper fk_pcm_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper
    ADD CONSTRAINT fk_pcm_realm FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: credential fk_pfyr0glasqyl0dei3kl69r6v0; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.credential
    ADD CONSTRAINT fk_pfyr0glasqyl0dei3kl69r6v0 FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: protocol_mapper_config fk_pmconfig; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.protocol_mapper_config
    ADD CONSTRAINT fk_pmconfig FOREIGN KEY (protocol_mapper_id) REFERENCES public.protocol_mapper(id);


--
-- Name: default_client_scope fk_r_def_cli_scope_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.default_client_scope
    ADD CONSTRAINT fk_r_def_cli_scope_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: required_action_provider fk_req_act_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.required_action_provider
    ADD CONSTRAINT fk_req_act_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: resource_uris fk_resource_server_uris; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.resource_uris
    ADD CONSTRAINT fk_resource_server_uris FOREIGN KEY (resource_id) REFERENCES public.resource_server_resource(id);


--
-- Name: role_attribute fk_role_attribute_id; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.role_attribute
    ADD CONSTRAINT fk_role_attribute_id FOREIGN KEY (role_id) REFERENCES public.keycloak_role(id);


--
-- Name: realm_supported_locales fk_supported_locales_realm; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.realm_supported_locales
    ADD CONSTRAINT fk_supported_locales_realm FOREIGN KEY (realm_id) REFERENCES public.realm(id);


--
-- Name: user_federation_config fk_t13hpu1j94r2ebpekr39x5eu5; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_federation_config
    ADD CONSTRAINT fk_t13hpu1j94r2ebpekr39x5eu5 FOREIGN KEY (user_federation_provider_id) REFERENCES public.user_federation_provider(id);


--
-- Name: user_group_membership fk_user_group_user; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.user_group_membership
    ADD CONSTRAINT fk_user_group_user FOREIGN KEY (user_id) REFERENCES public.user_entity(id);


--
-- Name: policy_config fkdc34197cf864c4e43; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.policy_config
    ADD CONSTRAINT fkdc34197cf864c4e43 FOREIGN KEY (policy_id) REFERENCES public.resource_server_policy(id);


--
-- Name: identity_provider_config fkdc4897cf864c4e43; Type: FK CONSTRAINT; Schema: public; Owner: keycloak
--

ALTER TABLE ONLY public.identity_provider_config
    ADD CONSTRAINT fkdc4897cf864c4e43 FOREIGN KEY (identity_provider_id) REFERENCES public.identity_provider(internal_id);


--
-- PostgreSQL database dump complete
--

