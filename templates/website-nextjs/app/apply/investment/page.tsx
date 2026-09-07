'use client';

import { useRef, useState } from 'react';
import { investmentApplicationSchema } from '@/lib/schemas';
import { TextField, TextAreaField, ChoiceField, Honeypot } from '@/components/form-controls';
import { ErrorSummary, type SummaryItem } from '@/components/error-summary';
import { FormHeader, SectionProgress, Submitted, SubmitFailed } from '@/components/form-shell';

const LABELS: Record<string, string> = {
  entityName: 'Company or fund name',
  primaryContact: 'Primary contact',
  email: 'Email',
  stage: 'Stage',
  revenue: 'Trailing revenue',
  postRevenue: 'Post-revenue',
  returnTier: 'Return tier',
  personalCapital: 'Your own capital in the deal',
  institutionalCoInvestors: 'Institutional co-investors',
  communityCoInvestors: 'Community and local co-investors',
  leadership: 'Leadership',
  distributionMechanism: 'Distribution mechanism',
  pathToReturn: 'Path to returning capital',
  structure: 'Legal structure',
  domicile: 'Domicile',
  redemptiveStrategy: 'Strategy on the spectrum',
  redemptiveOperations: 'Operations on the spectrum',
  redemptiveLeadership: 'Leadership on the spectrum',
  redemptiveNotes: 'Why you placed yourself there',
  impactWhoBenefits: 'Who benefits',
  impactEvidence: 'How it is evidenced',
  impactBeneficiaryVoice: 'What beneficiaries would say'
};

const SECTIONS: Array<{ title: string; fields: string[] }> = [
  { title: 'Who you are', fields: ['entityName', 'primaryContact', 'email', 'stage', 'revenue', 'postRevenue'] },
  { title: 'Returns and capital', fields: ['returnTier', 'personalCapital', 'institutionalCoInvestors', 'communityCoInvestors', 'leadership'] },
  { title: 'Structure', fields: ['distributionMechanism', 'pathToReturn', 'structure', 'domicile'] },
  { title: 'The redemptive lens', fields: ['redemptiveStrategy', 'redemptiveOperations', 'redemptiveLeadership', 'redemptiveNotes', 'impactWhoBenefits', 'impactEvidence', 'impactBeneficiaryVoice'] }
];

const SPECTRUM = [
  { value: 'exploitative', label: 'Exploitative', note: 'The gain comes at someone’s expense — a supplier, an employee, a customer who does not have a real choice.' },
  { value: 'ethical', label: 'Ethical', note: 'Nobody is harmed. Fair wages, honest terms, clean compliance. This is where most good companies sit.' },
  { value: 'redemptive', label: 'Redemptive', note: 'The business gives up something it did not have to give — margin, control, ownership — so that the people it touches gain.' }
];

export default function InvestmentFormPage() {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [section, setSection] = useState(0);
  const [state, setState] = useState<'editing' | 'sending' | 'sent' | 'failed'>('editing');
  const summaryRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const collect = () => {
    if (!formRef.current) return values;
    const form = new FormData(formRef.current);
    return {
      ...values,
      ...Object.fromEntries(form.entries()),
      leadership: form.getAll('leadership').length ? form.getAll('leadership') : (values.leadership ?? [])
    };
  };

  const showErrors = (errors: Record<string, string[]>, only?: string[]) => {
    const scoped = only
      ? Object.fromEntries(Object.entries(errors).filter(([k]) => only.includes(k)))
      : errors;
    setFieldErrors(scoped as Record<string, string[]>);
    setSummary(
      Object.entries(scoped).map(([name, messages]) => ({
        name,
        label: LABELS[name] ?? name,
        message: (messages as string[])[0]
      }))
    );
    requestAnimationFrame(() => summaryRef.current?.focus());
    return Object.keys(scoped).length > 0;
  };

  function advance() {
    const next = collect();
    setValues(next);
    const parsed = investmentApplicationSchema.safeParse(next);
    const errors = parsed.success ? {} : (parsed.error.flatten().fieldErrors as Record<string, string[]>);
    if (showErrors(errors, SECTIONS[section].fields)) return;
    setFieldErrors({});
    setSummary([]);
    setSection((s) => Math.min(s + 1, SECTIONS.length - 1));
  }

  function goBack() {
    setValues(collect());
    setFieldErrors({});
    setSummary([]);
    setSection((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = collect();
    const parsed = investmentApplicationSchema.safeParse(payload);
    if (!parsed.success) {
      showErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    setFieldErrors({});
    setSummary([]);
    setState('sending');
    try {
      const response = await fetch('/api/apply/investment', {
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
          We read everything that comes in and reply only where there is a fit. Most of what we pass on is
          a question of stage, geography or timing rather than the quality of the business.
        </p>
      </Submitted>
    );
  }

  const isLast = section === SECTIONS.length - 1;

  return (
    <>
      <FormHeader title="Investment pre-qualification">
        <p className="mt-8 max-w-measure text-ink/85">
          Four short sections. This is a first gate rather than a data room, and you will hear back only if
          there is a fit.
        </p>
      </FormHeader>

      <SectionProgress sections={SECTIONS.map((s) => s.title)} current={section} />

      <form ref={formRef} noValidate onSubmit={onSubmit} className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <ErrorSummary ref={summaryRef} items={summary} />
        {state === 'failed' ? <SubmitFailed onRetry={() => setState('editing')} /> : null}

        <Honeypot />

        <h2 className="font-display text-[1.6rem] leading-tight">
          {SECTIONS[section].title}
          <span className="sr-only">{', section ' + (section + 1) + ' of ' + SECTIONS.length}</span>
        </h2>

        {section === 0 ? (
          <div className="mt-6 divide-y divide-rule border-t border-rule">
            <TextField name="entityName" label={LABELS.entityName} required errors={fieldErrors} />
            <TextField name="primaryContact" label={LABELS.primaryContact} required errors={fieldErrors} />
            <TextField name="email" type="email" label={LABELS.email} required errors={fieldErrors} />
            <div className="py-5">
              <p className="max-w-measure border-l-2 border-teal-ink bg-field px-5 py-4 text-ink/85">
                Our angel and programme-related tier is post-revenue only. If you are pre-revenue, we are not
                the right first call, and there is no point filling in the rest of this. Come back when you
                have revenue and we will read it properly.
              </p>
            </div>
            <ChoiceField
              name="postRevenue"
              label={LABELS.postRevenue}
              required
              errors={fieldErrors}
              options={[
                { value: 'yes', label: 'Post-revenue' },
                { value: 'no', label: 'Pre-revenue' }
              ]}
            />
            <TextField name="stage" label={LABELS.stage} hint="Seed, Series A, first close, second fund, and so on." required errors={fieldErrors} />
            <TextField name="revenue" label={LABELS.revenue} hint="Trailing twelve months, approximately. Write none if there is none." required errors={fieldErrors} />
          </div>
        ) : null}

        {section === 1 ? (
          <div className="mt-6 divide-y divide-rule border-t border-rule">
            <ChoiceField
              name="returnTier"
              label={LABELS.returnTier}
              required
              errors={fieldErrors}
              options={[
                { value: 'market-or-above', label: 'Market or above', note: '8% IRR and up.' },
                { value: 'below-market', label: 'Below market', note: 'Between 0 and 7%.' },
                { value: 'angel-pri', label: 'Angel or programme-related', note: 'Philanthropic capital, post-revenue only.' }
              ]}
            />
            <TextField
              name="personalCapital"
              label={LABELS.personalCapital}
              hint="An amount or a percentage. This is the answer we weigh most heavily, so please be specific."
              required
              errors={fieldErrors}
            />
            <TextAreaField
              name="institutionalCoInvestors"
              label={LABELS.institutionalCoInvestors}
              hint="Funds, family offices, DFIs. Write none if there are none."
              required
              errors={fieldErrors}
              rows={3}
            />
            <TextAreaField
              name="communityCoInvestors"
              label={LABELS.communityCoInvestors}
              hint="People and institutions from the place the work happens. Write none if there are none."
              required
              errors={fieldErrors}
              rows={3}
            />
            <ChoiceField
              name="leadership"
              label={LABELS.leadership}
              hint="Self-reported. Select any that apply, or none."
              multiple
              errors={fieldErrors}
              options={[
                { value: 'poc-led', label: 'Led by people of colour' },
                { value: 'women-led', label: 'Women-led' },
                { value: 'faith-led', label: 'Faith-led' }
              ]}
            />
          </div>
        ) : null}

        {section === 2 ? (
          <div className="mt-6 divide-y divide-rule border-t border-rule">
            <TextAreaField
              name="distributionMechanism"
              label={LABELS.distributionMechanism}
              hint="How money actually comes back: dividends, a sale, a redemption right, loan repayment."
              required
              errors={fieldErrors}
              rows={3}
            />
            <TextAreaField
              name="pathToReturn"
              label={LABELS.pathToReturn}
              hint="What has to be true for capital to return inside about five years."
              required
              errors={fieldErrors}
              rows={3}
            />
            <TextField name="structure" label={LABELS.structure} hint="LLC, LP, C-corp, and the instrument you are raising." required errors={fieldErrors} />
            <TextField
              name="domicile"
              label={LABELS.domicile}
              hint="Where the entity is registered. Deals outside the United States generally need a US-domiciled intermediary."
              required
              errors={fieldErrors}
            />
          </div>
        ) : null}

        {section === 3 ? (
          <div className="mt-6 divide-y divide-rule border-t border-rule">
            <div className="py-5">
              <h3 className="font-display text-[1.25rem] leading-tight">The spectrum</h3>
              <p className="mt-3 max-w-measure text-ink/85">
                We read three parts of a business — strategy, operations and leadership — along one line.
                Exploitative means the gain comes at someone’s expense. Ethical means nobody is harmed.
                Redemptive means the business deliberately gives up something it did not have to give, so
                that the people it touches gain. Most honest answers are ethical in some rows and redemptive
                in one, and saying so is more useful to us than claiming all three.
              </p>
            </div>
            <ChoiceField name="redemptiveStrategy" label={LABELS.redemptiveStrategy} required errors={fieldErrors} options={SPECTRUM} />
            <ChoiceField name="redemptiveOperations" label={LABELS.redemptiveOperations} required errors={fieldErrors} options={SPECTRUM} />
            <ChoiceField name="redemptiveLeadership" label={LABELS.redemptiveLeadership} required errors={fieldErrors} options={SPECTRUM} />
            <TextAreaField name="redemptiveNotes" label={LABELS.redemptiveNotes} required errors={fieldErrors} rows={4} />
            <TextAreaField
              name="impactWhoBenefits"
              label={LABELS.impactWhoBenefits}
              hint="Name the people, not the category."
              required
              errors={fieldErrors}
              rows={3}
            />
            <TextAreaField
              name="impactEvidence"
              label={LABELS.impactEvidence}
              hint="What you measure, and what you would accept as evidence that you were wrong."
              required
              errors={fieldErrors}
              rows={3}
            />
            <TextAreaField
              name="impactBeneficiaryVoice"
              label={LABELS.impactBeneficiaryVoice}
              hint="In their words, as close as you can get."
              required
              errors={fieldErrors}
              rows={3}
            />
          </div>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center gap-6">
          {section > 0 ? (
            <button type="button" onClick={goBack} className="border border-rule px-6 py-3 text-[1rem]">
              Back
            </button>
          ) : null}
          {isLast ? (
            <button
              type="submit"
              disabled={state === 'sending'}
              className="border border-ink bg-ink px-6 py-3 text-[1rem] text-paper disabled:opacity-60"
            >
              {state === 'sending' ? 'Sending' : 'Send'}
            </button>
          ) : (
            <button type="button" onClick={advance} className="border border-ink bg-ink px-6 py-3 text-[1rem] text-paper">
              Continue
            </button>
          )}
          <p className="text-[0.9rem] text-ink/65">
            {isLast ? 'You will hear back only if there is a fit.' : 'Section ' + (section + 1) + ' of ' + SECTIONS.length}
          </p>
        </div>
      </form>
    </>
  );
}
