-- Si le fournisseur d'IA ne répond pas, la question réservée est rendue à l'élève.
create or replace function public.release_ai_request_for(p_user uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  update public.ai_usage set requests = requests - 1
  where user_id = p_user and usage_day = current_date and requests > 0;
end $$;

revoke all on function public.release_ai_request_for(uuid) from public, anon, authenticated;
grant execute on function public.release_ai_request_for(uuid) to service_role;
