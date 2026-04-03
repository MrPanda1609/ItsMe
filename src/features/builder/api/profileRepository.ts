import { supabase } from '../../../lib/supabase';
import { createDefaultProfileData, mergeProfileDataWithDefaults, normalizePlan, userStatusFromPlan } from '../config/defaultProfileData';
import type { ProfileData, UserPlan, UserStatus } from '../types';

interface ProfileRow {
  user_id: string;
  plan: UserPlan;
  draft_profile: unknown;
  published_profile: unknown;
}

interface PublicProfileRow {
  user_id: string;
  plan: UserPlan;
  published_profile: unknown;
}

export interface BuilderProfilePayload {
  userId: string;
  draftProfileData: ProfileData;
  publishedProfileData: ProfileData;
  userStatus: UserStatus;
  plan: UserPlan;
}

const TEST_ADMIN_EMAILS = (import.meta.env.VITE_TEST_ADMIN_EMAILS ?? '')
  .split(',')
  .map((item: string) => item.trim().toLowerCase())
  .filter(Boolean);

const assertSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase chưa được cấu hình. Vui lòng thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY.');
  }

  return supabase;
};

const resolvePlanForEmail = (email: string | undefined, fallbackPlan: UserPlan): UserPlan => {
  if (email && TEST_ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
    return 'admin';
  }

  return normalizePlan(fallbackPlan);
};

const mapProfileRow = (row: ProfileRow, email?: string): BuilderProfilePayload => {
  const plan = resolvePlanForEmail(email, row.plan);

  return {
    userId: row.user_id,
    draftProfileData: mergeProfileDataWithDefaults(row.draft_profile),
    publishedProfileData: mergeProfileDataWithDefaults(row.published_profile),
    userStatus: userStatusFromPlan(plan),
    plan,
  };
};

export async function ensureOwnProfile(userId: string, email?: string): Promise<BuilderProfilePayload> {
  const client = assertSupabase();
  const { data: existingRow, error: existingError } = await client
    .from('profiles')
    .select('user_id, plan, draft_profile, published_profile')
    .eq('user_id', userId)
    .maybeSingle<ProfileRow>();

  if (existingError) {
    throw existingError;
  }

  if (existingRow) {
    const nextPlan = resolvePlanForEmail(email, existingRow.plan);

    if (nextPlan !== existingRow.plan) {
      const { data: updatedRow, error: updateError } = await client
        .from('profiles')
        .update({ plan: nextPlan })
        .eq('user_id', userId)
        .select('user_id, plan, draft_profile, published_profile')
        .single<ProfileRow>();

      if (updateError) {
        throw updateError;
      }

      return mapProfileRow(updatedRow, email);
    }

    return mapProfileRow(existingRow, email);
  }

  const nextDefaultProfile = createDefaultProfileData();
  const nextPlan = resolvePlanForEmail(email, 'free');
  const { data: createdRow, error: createError } = await client
    .from('profiles')
    .insert({
      user_id: userId,
      plan: nextPlan,
      draft_profile: nextDefaultProfile,
      published_profile: nextDefaultProfile,
    })
    .select('user_id, plan, draft_profile, published_profile')
    .single<ProfileRow>();

  if (createError) {
    throw createError;
  }

  return mapProfileRow(createdRow, email);
}

export async function saveDraftProfile(userId: string, profileData: ProfileData) {
  const client = assertSupabase();
  const { error } = await client.from('profiles').update({ draft_profile: profileData }).eq('user_id', userId);

  if (error) {
    throw error;
  }
}

export async function publishProfile(userId: string, profileData: ProfileData) {
  const client = assertSupabase();
  const { data, error } = await client
    .from('profiles')
    .update({ draft_profile: profileData, published_profile: profileData })
    .eq('user_id', userId)
    .select('user_id, plan, draft_profile, published_profile')
    .single<ProfileRow>();

  if (error) {
    throw error;
  }

  return mapProfileRow(data);
}

export async function getPublicProfile(userId: string) {
  const client = assertSupabase();
  const { data, error } = await client.rpc('get_public_profile', { requested_user_id: userId });

  if (error) {
    throw error;
  }

  const row = Array.isArray(data) ? (data[0] as PublicProfileRow | undefined) : (data as PublicProfileRow | null);

  if (!row) {
    return null;
  }

  const plan = normalizePlan(row.plan);

  return {
    userId: row.user_id,
    publishedProfileData: mergeProfileDataWithDefaults(row.published_profile),
    userStatus: userStatusFromPlan(plan),
    plan,
  };
}
