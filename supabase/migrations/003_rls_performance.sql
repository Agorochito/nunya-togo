-- Appliquée au projet Supabase « nunya » le 3 novembre 2026.
-- Performances RLS : auth.uid() évalué une fois par requête, une seule politique de lecture par table, index sur les clés étrangères.
alter policy staff_own_read on public.staff_roles using (user_id = (select auth.uid()));
alter policy own_profile on public.profiles using (id = (select auth.uid())) with check (id = (select auth.uid()));
alter policy usage_own_read on public.ai_usage using (user_id = (select auth.uid()));
do $$ declare t text; begin foreach t in array array['placement_results','progress','skill_mastery','review_schedule','downloads','feedback','badges','notes','learning_events'] loop
  execute format('alter policy owner_records on public.%I using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))',t);
end loop; end $$;
do $$ declare t text; begin foreach t in array array['domains','pathways','levels','modules','chapters','steps','exercises','placement_questions'] loop
  execute format('drop policy if exists reviewer_write on public.%I',t);
  execute format('create policy reviewer_insert on public.%I for insert to authenticated with check ((select private.is_reviewer()))',t);
  execute format('create policy reviewer_update on public.%I for update to authenticated using ((select private.is_reviewer())) with check ((select private.is_reviewer()))',t);
  execute format('create policy reviewer_delete on public.%I for delete to authenticated using ((select private.is_reviewer()))',t);
end loop; end $$;
create index if not exists chapters_module_id_idx on public.chapters(module_id);
create index if not exists chapters_reviewer_idx on public.chapters(reviewer);
create index if not exists classes_organization_id_idx on public.classes(organization_id);
create index if not exists exercises_chapter_id_idx on public.exercises(chapter_id);
create index if not exists exercises_reviewer_idx on public.exercises(reviewer);
create index if not exists levels_pathway_id_idx on public.levels(pathway_id);
create index if not exists modules_level_id_idx on public.modules(level_id);
create index if not exists pathways_domain_id_idx on public.pathways(domain_id);
create index if not exists steps_chapter_id_idx on public.steps(chapter_id);
