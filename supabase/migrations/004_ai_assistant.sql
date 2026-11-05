-- Nunya Aide (IA open source) : quota par élève et plafond quotidien global.
-- Les élèves utilisent une session anonyme Supabase : aucune donnée personnelle, aucune question n'est stockée.
-- Seul un compteur de demandes par jour est conservé (public.ai_usage).

-- Réglages modifiables sans nouvelle migration (schéma privé, non exposé par l'API).
create table if not exists private.ai_limits (
  id boolean primary key default true check (id),
  per_user_daily integer not null default 15 check (per_user_daily between 0 and 500),
  global_daily integer not null default 300 check (global_daily between 0 and 100000)
);
insert into private.ai_limits (id) values (true) on conflict (id) do nothing;
revoke all on private.ai_limits from public, anon, authenticated;

-- Réserve une demande : refuse si l'élève ou l'ensemble de Nunya a atteint la limite du jour.
-- Renvoie le nombre de questions restantes pour l'élève.
create or replace function public.reserve_ai_request() returns integer
language plpgsql security definer set search_path = '' as $$
declare
  n integer;
  lim private.ai_limits;
  total integer;
begin
  if auth.uid() is null then
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
  values (auth.uid(), current_date, 1)
  on conflict (user_id, usage_day) do update
    set requests = public.ai_usage.requests + 1
    where public.ai_usage.requests < lim.per_user_daily
  returning requests into n;
  if n is null then
    raise exception 'daily quota reached';
  end if;
  return lim.per_user_daily - n;
end $$;

revoke all on function public.reserve_ai_request() from public, anon;
grant execute on function public.reserve_ai_request() to authenticated;

-- Le compteur sert aussi à mesurer l'usage : index pour le total du jour.
create index if not exists ai_usage_day_idx on public.ai_usage (usage_day);
