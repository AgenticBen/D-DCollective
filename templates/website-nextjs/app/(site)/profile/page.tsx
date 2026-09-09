'use client';

import { useRef, useState } from 'react';
import { profileSubmissionSchema } from '@/lib/schemas';
import { TextField, TextAreaField, ChoiceField, FileField, Honeypot } from '@/components/form-controls';
import { ErrorSummary, type SummaryItem } from '@/components/error-summary';
import { FormHeader, Submitted, SubmitFailed } from '@/components/form-shell';
import { Note, buttonStyle } from '@/components/ds';

/**
 * The page a changemaker is sent a link to. It is how the consent rule is
 * actually kept: the description arrives in their own words, and consent is
 * theirs to tick rather than ours to record on their behalf.
 *
 * A submission lands unpublished. Consent lets the profile render; Eric and
 * Michele decide when it does. Both are needed, and this page says so plainly
 * rather than implying the form puts them on the website.
 */
const LABELS: Record<string, string> = {
  name: 'Your name',
  email: 'Your email',
  role: 'The line under your name',
  bio: 'How you would describe your work',
  affiliation: 'Organization',
  affiliationUrl: 'Organization website',
  photo: 'Photograph',
  photoAlt: 'Describing the photograph',
  consent: 'Permission to publish'
};

export default function ProfilePage() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [state, setState] = useState<'editing' | 'sending' | 'sent' | 'failed'>('editing');
  const summaryRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLDivElement>(null);

  function showErrors(errors: Record<string, string[]>) {
    setFieldErrors(errors);
    setSummary(
      Object.entries(errors).map(([name, messages]) => ({
        name,
        label: LABELS[name] ?? name,
        message: messages[0]
      }))
    );
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const fields = Object.fromEntries(
      [...form.entries()].filter(([key]) => key !== 'photo').map(([key, value]) => [key, String(value)])
    );

    const parsed = profileSubmissionSchema.safeParse(fields);
    if (!parsed.success) {
      showErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    setFieldErrors({});
    setSummary([]);
    setState('sending');

    try {
      const response = await fetch('/api/profile', { method: 'POST', body: form });
      if (response.status === 422) {
        const body = await response.json();
        setState('editing');
        showErrors(body.fieldErrors ?? {});
        return;
      }
      if (!response.ok) throw new Error('rejected');
      setState('sent');
    } catch {
      setState('failed');
      requestAnimationFrame(() => failRef.current?.focus());
    }
  }

  if (state === 'sent') {
    return (
      <Submitted>
        <p>Thank you — your profile is with us, in your words.</p>
        <p className="mt-4">
          It is not on the website yet. Eric and Michele read each one before it goes up, and you will hear
          from them before it does. If you want to change anything, or take it down later, reply to the
          person who sent you this link and it comes down.
        </p>
      </Submitted>
    );
  }

  return (
    <>
      <FormHeader
        eyebrow="Changemakers"
        title="Your profile, in your words"
        lede="We would rather publish how you describe your work than how we describe it. This takes about five minutes."
      >
        <div className="mt-6 max-w-measure">
          <Note label="Nothing publishes on its own:">
            Ticking the box below is your permission — without it we publish nothing. It is not the same as
            going live: Eric and Michele review each profile first, and you will hear from them before yours
            appears. You can change or withdraw it at any time.
          </Note>
        </div>
      </FormHeader>

      <form noValidate onSubmit={onSubmit} className="mx-auto w-full max-w-[820px] px-7 pb-20">
        <ErrorSummary ref={summaryRef} items={summary} />
        {state === 'failed' ? <SubmitFailed onRetry={() => setState('editing')} /> : null}

        <Honeypot />

        <fieldset className="grid gap-[18px]">
          <legend className="pb-1" style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)' }}>You</legend>
          <TextField
            name="name" label={LABELS.name} required errors={fieldErrors}
            hint="As you would like it to read on the card."
          />
          <TextField
            name="email" type="email" label={LABELS.email} required errors={fieldErrors}
            hint="So we can reach you about the profile. It is never published."
          />
          <TextField
            name="role" label={LABELS.role} errors={fieldErrors}
            placeholder="Founder · Aruwa Capital"
            hint="A short line: a role, a course of study, what you are building. Leave it blank if you would rather not."
          />
          <TextAreaField
            name="bio" label={LABELS.bio} required errors={fieldErrors} rows={5}
            hint="Two or three sentences, in the first person or the third — whichever sounds like you. About 600 characters."
          />
        </fieldset>

        <fieldset className="mt-9 grid gap-[18px]">
          <legend className="pb-1" style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)' }}>Your organization</legend>
          <TextField
            name="affiliation" label={LABELS.affiliation} errors={fieldErrors}
            hint="If you are with one. It appears under your card, linked to your website."
          />
          <TextField
            name="affiliationUrl" type="url" label={LABELS.affiliationUrl} errors={fieldErrors}
            placeholder="https://"
          />
        </fieldset>

        <fieldset className="mt-9 grid gap-[18px]">
          <legend className="pb-1" style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)' }}>Your photograph</legend>
          <FileField
            name="photo" label={LABELS.photo} errors={fieldErrors} accept="image/jpeg,image/png,image/webp"
            hint="A portrait you are happy to have published. JPEG, PNG or WebP, up to 4MB. Taller than it is wide works best. Send one later if you would rather — the card holds a space for it."
          />
          <TextField
            name="photoAlt" label={LABELS.photoAlt} errors={fieldErrors}
            hint="A line describing the picture, read aloud to visitors using a screen reader. We write one if you leave this blank."
          />
        </fieldset>

        <fieldset className="mt-9 grid gap-[18px]">
          <legend className="pb-1" style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)' }}>Permission</legend>
          <ChoiceField
            name="consent"
            label={LABELS.consent}
            required
            errors={fieldErrors}
            options={[
              {
                value: 'yes',
                label: 'D+D Collective may publish what I have written here, with my name and photograph.',
                note: 'You can withdraw this at any time by replying to the person who sent you the link.'
              }
            ]}
          />
        </fieldset>

        <div className="mt-9">
          <button
            type="submit"
            disabled={state === 'sending'}
            style={{ ...buttonStyle('primary'), opacity: state === 'sending' ? 0.6 : 1 }}
          >
            {state === 'sending' ? 'Sending' : 'Send my profile'}
          </button>
        </div>
      </form>
    </>
  );
}
