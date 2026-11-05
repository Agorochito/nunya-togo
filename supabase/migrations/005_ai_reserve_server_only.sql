-- Le quota d'IA n'est plus appelable par les élèves : seule la fonction serveur nunya-aide (rôle service_role)
-- réserve une demande, après avoir vérifié la session de l'élève auprès de Supabase Auth.
create or replace function public.reserve_ai_request_for(p_user uuid) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  n integer;
  lim private.ai_limits;
  total integer;
begin
  if p_user is null then
    raise exception 'authentication required';
  end if;
  select * into lim from private.ai_limits where id;
  -- Verrou de transaction : deux demandes simultanées ne dépassent pas le plafond global.
  perform pg_advisory_xact_lock(hashtext('nunya-ai-global'));
  select coalesce(sum(requests), 0) into total from public.ai_usage where usage_day = current_date;
  if total >= lim.global_daily then
    raise exception 'global quota reached';
  end if;
  insert into public.ai_usage (user_id, usage_day, requests)
  values (p_user, current_date, 1)
  on conflict (user_id, usage_day) do update
    set requests = public.ai_usage.requests + 1
    where public.ai_usage.requests < lim.per_user_daily
  returning requests into n;
  if n is null then
    raise exception 'daily quota reached';
  end if;
  return lim.per_user_daily - n;
end $$;

revoke all on function public.reserve_ai_request_for(uuid) from public, anon, authenticated;
grant execute on function public.reserve_ai_request_for(uuid) to service_role;

-- L'ancienne fonction appelable par les élèves est retirée.
drop function if exists public.reserve_ai_request();
