'use client';

import { useRef, useState } from 'react';
import { grantApplicationSchema } from '@/lib/schemas';
import { TextField, TextAreaField, ChoiceField, Honeypot } from '@/components/form-controls';
import { ErrorSummary, type SummaryItem } from '@/components/error-summary';
import { FormHeader, Submitted, SubmitFailed } from '@/components/form-shell';

const LABELS: Record<string, string> = {
  organizationName: 'Organization name',
  primaryContact: 'Primary contact',
  email: 'Email',
  irsStatus: 'Tax status',
  ein: 'EIN',
  boardComposition: 'Board and senior leadership composition',
  leadershipBackground: 'Leadership background',
  faithAlignment: 'Faith alignment',
  geography: 'Geography served',
  populations: 'Populations served',
  leadershipPathways: 'How the work expands leadership pathways',
  lever: 'Closest fit',
  budgetSize: 'Annual budget',
  orgCharacter: 'Grassroots or institutional',
  requestAmount: 'Amount requested',
  requestPurpose: 'Purpose',
  requestTiming: 'Timing',
  firstGift: 'First gift'
};

export default function GrantFormPage() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [state, setState] = useState<'editing' | 'sending' | 'sent' | 'failed'>('editing');
  const summaryRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLDivElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      geography: form.getAll('geography'),
      populations: form.getAll('populations')
    };

    const parsed = grantApplicationSchema.safeParse(payload);
    if (!parsed.success) {
      const { fieldErrors: errors } = parsed.error.flatten();
      setFieldErrors(errors as Record<string, string[]>);
      setSummary(
        Object.entries(errors).map(([name, messages]) => ({
          name,
          label: LABELS[name] ?? name,
          message: (messages as string[])[0]
        }))
      );
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setFieldErrors({});
    setSummary([]);
    setState('sending');

    try {
      const response = await fetch('/api/apply/grants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
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
        <p>Your answers are with us. Nothing else is needed from you now.</p>
        <p className="mt-4">
          We read every submission. We reply only where there is a fit, so no reply is not a verdict on your
          work — it usually means our geography or our levers are wrong for it this year.
        </p>
      </Submitted>
    );
  }

  return (
    <>
      <FormHeader title="Grant screening">
        <p className="mt-8 max-w-measure text-ink/85">
          Ten short answers. This is a first gate rather than an application, and you will hear back only if
          there is a fit.
        </p>
      </FormHeader>

      <form noValidate onSubmit={onSubmit} className="mx-auto max-w-6xl px-6 pb-20">
        <ErrorSummary ref={summaryRef} items={summary} />
        {state === 'failed' ? <SubmitFailed onRetry={() => setState('editing')} /> : null}

        <Honeypot />

        <fieldset className="divide-y divide-rule border-t border-rule">
          <legend className="pb-4 font-display text-[1.6rem] leading-tight">The organization</legend>
          <TextField name="organizationName" label={LABELS.organizationName} required errors={fieldErrors} />
          <TextField name="primaryContact" label={LABELS.primaryContact} required errors={fieldErrors} />
          <TextField name="email" type="email" label={LABELS.email} required errors={fieldErrors} />
          <ChoiceField
            name="irsStatus"
            label={LABELS.irsStatus}
            required
            errors={fieldErrors}
            options={[
              { value: '501c3', label: '501(c)(3)' },
              { value: 'fiscally-sponsored', label: 'Fiscally sponsored' },
              { value: 'other', label: 'Something else' }
            ]}
          />
          <TextField name="ein" label={LABELS.ein} required errors={fieldErrors} />
          <TextField name="budgetSize" label={LABELS.budgetSize} hint="Total annual operating budget, approximately." required errors={fieldErrors} />
          <ChoiceField
            name="orgCharacter"
            label={LABELS.orgCharacter}
            required
            errors={fieldErrors}
            options={[
              { value: 'grassroots', label: 'Grassroots' },
              { value: 'institutional', label: 'Institutional' }
            ]}
          />
        </fieldset>

        <fieldset className="mt-14 divide-y divide-rule border-t border-rule">
          <legend className="pb-4 font-display text-[1.6rem] leading-tight">Leadership</legend>
          <p className="max-w-measure border-l-2 border-teal-ink bg-field px-5 py-4 text-ink/85">
            A diverse board and/or leadership team is a hard requirement here, not a preference. If that is
            not yet true of your organization, this is the point to stop.
          </p>
          <TextAreaField
            name="boardComposition"
            label={LABELS.boardComposition}
            hint="Numbers are fine. Tell us who sits on the board and who holds senior roles."
            required
            errors={fieldErrors}
            rows={4}
          />
          <ChoiceField
            name="leadershipBackground"
            label={LABELS.leadershipBackground}
            hint="Self-reported."
            required
            errors={fieldErrors}
            options={[
              { value: 'poc-led', label: 'Led by people of colour' },
              { value: 'women-led', label: 'Women-led' },
              { value: 'neither', label: 'Neither' }
            ]}
          />
          <ChoiceField
            name="faithAlignment"
            label={LABELS.faithAlignment}
            required
            errors={fieldErrors}
            options={[
              { value: 'faith-led', label: 'Faith-led' },
              { value: 'faith-integrated', label: 'Faith-integrated' },
              { value: 'none', label: 'No faith alignment' }
            ]}
          />
        </fieldset>

        <fieldset className="mt-14 divide-y divide-rule border-t border-rule">
          <legend className="pb-4 font-display text-[1.6rem] leading-tight">The work</legend>
          <ChoiceField
            name="geography"
            label={LABELS.geography}
            multiple
            required
            errors={fieldErrors}
            options={[
              { value: 'charlotte-nc', label: 'Charlotte and North Carolina' },
              { value: 'east-africa', label: 'East Africa' },
              { value: 'us', label: 'Elsewhere in the United States' },
              { value: 'international', label: 'International' }
            ]}
          />
          <ChoiceField
            name="populations"
            label={LABELS.populations}
            multiple
            required
            errors={fieldErrors}
            options={[
              { value: 'women', label: 'Women' },
              { value: 'people-of-colour', label: 'People of colour' },
              { value: 'blind-or-visually-impaired', label: 'People who are blind or visually impaired' },
              { value: 'children', label: 'Children' },
              { value: 'marginalized-communities', label: 'Marginalized communities' }
            ]}
          />
          <TextAreaField
            name="leadershipPathways"
            label={LABELS.leadershipPathways}
            hint="A few sentences. We are looking for how the work widens the path by which people come to lead."
            required
            errors={fieldErrors}
            rows={5}
          />
          <ChoiceField
            name="lever"
            label={LABELS.lever}
            hint="Which of the three we fund is closest."
            required
            errors={fieldErrors}
            options={[
              { value: 'scholarships', label: 'Scholarships and educational support' },
              { value: 'empowerment', label: 'Empowerment' },
              { value: 'capacity', label: 'Building capacity' }
            ]}
          />
        </fieldset>

        <fieldset className="mt-14 divide-y divide-rule border-t border-rule">
          <legend className="pb-4 font-display text-[1.6rem] leading-tight">The request</legend>
          <TextField name="requestAmount" label={LABELS.requestAmount} required errors={fieldErrors} />
          <TextAreaField name="requestPurpose" label={LABELS.requestPurpose} hint="What the money would do." required errors={fieldErrors} rows={3} />
          <TextField name="requestTiming" label={LABELS.requestTiming} hint="When you need it, and whether that is movable." required errors={fieldErrors} />
          <ChoiceField
            name="firstGift"
            label={LABELS.firstGift}
            hint="Would this be the first time we have given to you?"
            required
            errors={fieldErrors}
            options={[
              { value: 'yes', label: 'Yes, this would be a first gift' },
              { value: 'no', label: 'No, we have received a gift before' }
            ]}
          />
        </fieldset>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <button
            type="submit"
            disabled={state === 'sending'}
            className="border border-ink bg-ink px-6 py-3 text-[1rem] text-paper disabled:opacity-60"
          >
            {state === 'sending' ? 'Sending' : 'Send'}
          </button>
          <p className="text-[0.9rem] text-ink/65">You will hear back only if there is a fit.</p>
        </div>
      </form>
    </>
  );
}
