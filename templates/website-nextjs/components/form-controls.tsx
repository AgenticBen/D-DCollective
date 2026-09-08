'use client';

import { useId } from 'react';

type FieldErrors = Record<string, string[] | undefined>;

const labelClass = 'block text-[0.95rem] font-medium';
const hintClass = 'mt-1 block max-w-measure text-[0.9rem] text-muted';
const controlClass =
  'mt-3 block w-full max-w-[38rem] rounded-none border border-rule bg-paper px-3 py-2 text-[1rem] text-ink placeholder:text-muted focus:border-accent';
const errorClass = 'mt-2 block max-w-measure text-[0.9rem] text-ink';

function ErrorText({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages || messages.length === 0) return null;
  return (
    <strong id={id} className={errorClass}>
      <span className="mr-2 border-b border-teal pb-[1px]">Needs attention</span>
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

export function TextField({
  name, label, hint, errors, required, type = 'text', placeholder, defaultValue
}: BaseFieldProps & { type?: string; placeholder?: string; defaultValue?: string }) {
  const { messages, errorId, hintId, invalid } = useFieldIds(name, errors);
  return (
    <div className="py-5">
      <label className={labelClass} htmlFor={name}>
        {label}{required ? <span className="ml-2 text-[0.85rem] font-normal text-muted">required</span> : null}
      </label>
      {hint ? <span className={hintClass} id={hintId}>{hint}</span> : null}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={invalid || undefined}
        aria-describedby={[hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(' ') || undefined}
        className={controlClass}
      />
      <ErrorText id={errorId} messages={messages} />
    </div>
  );
}

export function TextAreaField({
  name, label, hint, errors, required, rows = 4, placeholder
}: BaseFieldProps & { rows?: number; placeholder?: string }) {
  const { messages, errorId, hintId, invalid } = useFieldIds(name, errors);
  return (
    <div className="py-5">
      <label className={labelClass} htmlFor={name}>
        {label}{required ? <span className="ml-2 text-[0.85rem] font-normal text-muted">required</span> : null}
      </label>
      {hint ? <span className={hintClass} id={hintId}>{hint}</span> : null}
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={[hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(' ') || undefined}
        className={controlClass + ' leading-relaxed'}
      />
      <ErrorText id={errorId} messages={messages} />
    </div>
  );
}

export type Choice = { value: string; label: string; note?: string };

export function ChoiceField({
  name, label, hint, errors, required, options, multiple = false
}: BaseFieldProps & { options: Choice[]; multiple?: boolean }) {
  const { messages, errorId, hintId, invalid } = useFieldIds(name, errors);
  return (
    <fieldset
      className="py-5"
      aria-invalid={invalid || undefined}
      aria-describedby={[hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(' ') || undefined}
    >
      <legend className={labelClass}>
        {label}{required ? <span className="ml-2 text-[0.85rem] font-normal text-muted">required</span> : null}
      </legend>
      {hint ? <span className={hintClass} id={hintId}>{hint}</span> : null}
      <div className="mt-3 max-w-[38rem] border-t border-rule">
        {options.map((o) => (
          <label key={o.value} className="flex cursor-pointer gap-3 border-b border-rule py-3">
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={o.value}
              className="mt-[0.35rem] h-4 w-4 shrink-0 accent-[var(--teal-deep)]"
            />
            <span>
              <span className="block">{o.label}</span>
              {o.note ? <span className="mt-1 block text-[0.9rem] text-muted">{o.note}</span> : null}
            </span>
          </label>
        ))}
      </div>
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
