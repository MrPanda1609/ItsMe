import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { useBuilderStore } from '../store/useBuilderStore';
import { BuilderPanelSection } from './BuilderPanelSection';
import { ImageUploadField } from './ImageUploadField';

export function ProfileInfoPanel() {
  const avatar = useBuilderStore((state) => state.profileData.avatar);
  const displayName = useBuilderStore((state) => state.profileData.displayName);
  const bio = useBuilderStore((state) => state.profileData.bio);
  const selectedFont = useBuilderStore((state) => state.profileData.selectedFont);
  const setProfileField = useBuilderStore((state) => state.setProfileField);

  return (
    <div className="space-y-5">
      <BuilderPanelSection
        eyebrow="Profile Info"
        title="Creator identity"
        description="Upload the avatar and tune the core copy. Every keystroke syncs directly into Zustand for the live preview."
      >
        <div className="space-y-5">
          <ImageUploadField
            label="Avatar"
            hint="Instant preview uses URL.createObjectURL() so the builder updates without waiting for upload."
            value={avatar}
            onChange={(value) => setProfileField('avatar', value)}
            placeholder="Avatar preview"
            imageClassName="rounded-[28px]"
          />

            <div className="grid gap-4">
              <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium text-slate-700">
                 Display Name
               </label>
              <Input
                id="displayName"
                value={displayName}
                maxLength={50}
                placeholder="Your creator name"
                onChange={(event) => setProfileField('displayName', event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium text-slate-700">
                Bio
              </label>
              <Textarea
                id="bio"
                rows={5}
                maxLength={180}
                value={bio}
                placeholder="Tell followers what you review, where you post, or how to book a collab."
                onChange={(event) => setProfileField('bio', event.target.value)}
              />
            </div>
          </div>
        </div>
      </BuilderPanelSection>

      <BuilderPanelSection
        title="Tone preview"
        description="Step 2 keeps this simple: typography choice is shown here while the real mobile composition lands in Step 3."
      >
        <div
          className="rounded-[28px] border border-rose-100 bg-[linear-gradient(180deg,#fff7fb_0%,#ffffff_100%)] p-5"
          style={{ fontFamily: selectedFont.family }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500">Current font</p>
          <p className="mt-3 text-2xl text-slate-900">{displayName || 'Your creator name'}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{bio || 'Your profile bio will appear here.'}</p>
        </div>
      </BuilderPanelSection>
    </div>
  );
}
