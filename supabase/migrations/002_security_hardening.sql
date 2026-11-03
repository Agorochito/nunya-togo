-- Appliquée au projet Supabase « nunya » (eu-west-3) le 3 novembre 2026, après l'audit de sécurité.
-- 1. is_reviewer() sert uniquement aux politiques RLS : on la déplace dans un schéma non exposé par l'API.
create schema if not exists private;
create or replace function private.is_reviewer() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.staff_roles where user_id=auth.uid() and role in ('admin','reviewer')); $$;
revoke all on function private.is_reviewer() from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.is_reviewer() to anon, authenticated;
do $$ declare t text; begin foreach t in array array['domains','pathways','levels','modules','chapters','steps','exercises','placement_questions'] loop
  execute format('drop policy if exists approved_read on public.%I',t);
  execute format('drop policy if exists reviewer_write on public.%I',t);
  execute format('create policy approved_read on public.%I for select using (status = ''validé'' or (select private.is_reviewer()))',t);
  execute format('create policy reviewer_write on public.%I for all to authenticated using ((select private.is_reviewer())) with check ((select private.is_reviewer()))',t);
end loop; end $$;
drop function public.is_reviewer();
-- 2. Le quota d'IA ne peut être réservé que par un utilisateur connecté.
revoke execute on function public.reserve_ai_request() from anon;
