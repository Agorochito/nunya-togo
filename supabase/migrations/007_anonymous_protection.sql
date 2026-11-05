-- Protections avant d'ouvrir les connexions anonymes de Nunya Aide.
-- Une session anonyme reçoit le rôle « authenticated » : sans ces règles, n'importe quel visiteur pourrait remplir
-- les tables de synchronisation (encore inutilisées par le site) avec des données de taille illimitée.

-- 1. Les sessions anonymes ne lisent ni n'écrivent les tables de synchronisation ni les profils.
--    Politique restrictive : elle s'ajoute aux politiques existantes (chacun ne voit que ses lignes) sans les remplacer.
do $$ declare t text; begin foreach t in array array['placement_results','progress','skill_mastery','review_schedule','downloads','feedback','badges','notes','learning_events','profiles'] loop
  execute format('drop policy if exists no_anonymous on public.%I', t);
  execute format('create policy no_anonymous on public.%I as restrictive for all to authenticated using ((select coalesce((auth.jwt()->>''is_anonymous'')::boolean, false)) = false) with check ((select coalesce((auth.jwt()->>''is_anonymous'')::boolean, false)) = false)', t);
end loop; end $$;

-- 2. Un enregistrement synchronisé ne dépasse pas 32 Ko.
do $$ declare t text; begin foreach t in array array['placement_results','progress','skill_mastery','review_schedule','downloads','feedback','badges','notes','learning_events'] loop
  execute format('alter table public.%I drop constraint if exists %I', t, t || '_payload_size');
  execute format('alter table public.%I add constraint %I check (pg_column_size(payload) <= 32768)', t, t || '_payload_size');
end loop; end $$;

-- 3. Chaque nuit, suppression des comptes anonymes créés il y a plus de 30 jours et sans session active depuis 30 jours
--    (création, mise à jour ou renouvellement de session) ; leur compteur ai_usage part avec eux (on delete cascade).
create extension if not exists pg_cron;
select cron.unschedule(jobid) from cron.job where jobname = 'nunya-anonymous-cleanup';
select cron.schedule('nunya-anonymous-cleanup', '17 3 * * *',
  $job$delete from auth.users u where u.is_anonymous and u.created_at < now() - interval '30 days'
    and not exists (select 1 from auth.sessions s where s.user_id = u.id
      and greatest(s.created_at, s.updated_at, s.refreshed_at at time zone 'UTC') > now() - interval '30 days')$job$);
