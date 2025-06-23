--
-- PostgreSQL database dump
--

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 17rc1

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
-- Name: items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    description text,
    cover_image text,
    additional_images text[]
);


--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.items (id, name, type, description, cover_image, additional_images) FROM stdin;
4	Vintage Car	Electronics	A Car with their own aura	/uploads/coverImage-1750571319280.png	{/uploads/additionalImages-1750571319286.png,/uploads/additionalImages-1750571319319.png}
5	Icon Car	Sports Gear	This is 1960 iconic car,Raj's the actor drove this	/uploads/coverImage-1750571420648.jpg	{/uploads/additionalImages-1750571420721.jpg}
6	hello	Books	hello world	/uploads/coverImage-1750571723750.png	{/uploads/additionalImages-1750571723768.png}
7	hello good	Books	Nice book	/uploads/coverImage-1750572858774.png	{/uploads/additionalImages-1750572858779.png,/uploads/additionalImages-1750572858781.png}
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.items_id_seq', 7, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

