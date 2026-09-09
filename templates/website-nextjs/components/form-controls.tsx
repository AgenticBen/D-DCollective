'use client';

import { useId, type CSSProperties } from 'react';

/**
 * Form controls in the design system's shape: an uppercase accent label with a
 * "· required" suffix, the shared input skin, and the hint sitting under the
 * control rather than above it. ChoiceGroup options are selectable cards, which
 * is what makes the long investment survey scannable.
 */

type FieldErrors = Record<string, string[] | undefined>;

const inputSkin: CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-tile)',
  color: 'var(--text-strong)', background: 'var(--surface-card)',
  border: 'var(--border-1)', borderRadius: 'var(--radius-note)',
  padding: '10px 12px', outline: 'none'
};

const labelStyle: CSSProperties = {
  fontSize: 'var(--fs-micro)', fontWeight: 'var(--fw-medium)',
  letterSpacing: 'var(--ls-label)', textTransform: 'uppercase',
  color: 'var(--text-accent)'
};

const hintStyle: CSSProperties = { fontSize: 13, color: 'var(--text-muted)' };

function Required() {
  return <span style={{ color: 'var(--muted)', letterSpacing: 0 }}> · required</span>;
}

function ErrorText({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages || messages.length === 0) return null;
  return (
    <strong id={id} style={{ fontSize: 'var(--fs-meta)', color: 'var(--warn-ink)' }}>
      <span style={{ borderBottom: '1px solid var(--warn-line)', paddingBottom: 1, marginRight: 8 }}>
        Needs attention
      </span>
      {messages[0]}
    </strong>
  );
}

export type BaseFieldProps = {
  name: string;
  label: string;
  hint?: string;
  errors?: FieldErrors;
  required?: boolean;
};

function useFieldIds(name: string, errors?: FieldErrors) {
  const messages = errors?.[name];
  const errorId = name + '-error';
  const hintId = name + '-hint';
  return { messages, errorId, hintId, invalid: Boolean(messages && messages.length) };
}

const fieldWrap: CSSProperties = { display: 'grid', gap: 6 };

export function TextField({
  name, label, hint, errors, required, type = 'text', placeholder, defaultValue
}: BaseFieldProps & { type?: string; placeholder?: string; defaultValue?: string }) {
  const { messages, errorId, hintId, invalid } = useFieldIds(name, errors);
  return (
    <div style={fieldWrap}>
      <label style={labelStyle} htmlFor={name}>{label}{required ? <Required /> : null}</label>
      <input
        id={name} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue}
        aria-invalid={invalid || undefined}
        aria-describedby={[hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(' ') || undefined}
        style={{ ...inputSkin, borderColor: invalid ? 'var(--warn-line)' : undefined }}
      />
      {hint ? <div style={hintStyle} id={hintId}>{hint}</div> : null}
      <ErrorText id={errorId} messages={messages} />
    </div>
  );
}

export function TextAreaField({
  name, label, hint, errors, required, rows = 4, placeholder
}: BaseFieldProps & { rows?: number; placeholder?: string }) {
  const { messages, errorId, hintId, invalid } = useFieldIds(name, errors);
  return (
    <div style={fieldWrap}>
      <label style={labelStyle} htmlFor={name}>{label}{required ? <Required /> : null}</label>
      <textarea
        id={name} name={name} rows={rows} placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={[hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(' ') || undefined}
        style={{
          ...inputSkin, lineHeight: 'var(--lh-body)', resize: 'vertical',
          borderColor: invalid ? 'var(--warn-line)' : undefined
        }}
      />
      {hint ? <div style={hintStyle} id={hintId}>{hint}</div> : null}
      <ErrorText id={errorId} messages={messages} />
    </div>
  );
}

export function FileField({
  name, label, hint, errors, required, accept
}: BaseFieldProps & { accept?: string }) {
  const { messages, errorId, hintId, invalid } = useFieldIds(name, errors);
  return (
    <div style={fieldWrap}>
      <label style={labelStyle} htmlFor={name}>{label}{required ? <Required /> : null}</label>
      <input
        id={name} name={name} type="file" accept={accept}
        aria-invalid={invalid || undefined}
        aria-describedby={[hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(' ') || undefined}
        className="file:mr-3 file:cursor-pointer file:rounded-note file:border-0 file:bg-mist file:px-3 file:py-1.5 file:text-inherit"
        style={{
          ...inputSkin, padding: '8px 10px',
          borderColor: invalid ? 'var(--warn-line)' : undefined
        }}
      />
      {hint ? <div style={hintStyle} id={hintId}>{hint}</div> : null}
      <ErrorText id={errorId} messages={messages} />
    </div>
  );
}

export type Choice = { value: string; label: string; note?: string };

export function ChoiceField({
  name, label, hint, errors, required, options, multiple = false, columns
}: BaseFieldProps & { options: Choice[]; multiple?: boolean; columns?: number }) {
  const { messages, errorId, hintId, invalid } = useFieldIds(name, errors);
  /* One column when any option carries a note, otherwise pack them tighter. */
  const cols = columns ?? (options.some((o) => o.note) ? 1 : Math.min(3, options.length));

  return (
    <fieldset
      style={fieldWrap}
      aria-invalid={invalid || undefined}
      aria-describedby={[hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(' ') || undefined}
    >
      <legend style={labelStyle}>{label}{required ? <Required /> : null}</legend>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`, marginTop: 2 }}
      >
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-start gap-2.5 rounded-note border transition-colors has-[:checked]:border-teal has-[:checked]:bg-mist"
            style={{ fontSize: 'var(--fs-tile)', padding: '9px 12px', borderColor: 'var(--border-hairline)', background: 'var(--surface-card)' }}
          >
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={o.value}
              className="mt-[0.3rem] h-4 w-4 shrink-0 accent-[var(--teal-deep)]"
            />
            <span>
              <span className="block">{o.label}</span>
              {o.note ? <span className="mt-1 block text-[0.85rem] text-muted">{o.note}</span> : null}
            </span>
          </label>
        ))}
      </div>
      {hint ? <div style={hintStyle} id={hintId}>{hint}</div> : null}
      <ErrorText id={errorId} messages={messages} />
    </fieldset>
  );
}

/** Hidden from people, visible to bots. Never remove the label. */
export function Honeypot() {
  const id = useId();
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
