import { gateFailure, getSubmissions, type Submission } from '@/lib/admin-sample';

function Stat({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div className="bg-mist p-5">
      <p className="text-[0.75rem] uppercase tracking-[0.08em] text-accent">{label}</p>
      <p className="mt-1.5 text-[1.9rem] leading-none">{value}</p>
      <p className="mt-1.5 text-[0.85rem] text-muted">{note}</p>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border border-rule p-5">
      <h3 className="text-[0.95rem] font-medium">{title}</h3>
      <ul className="mt-3 grid gap-1.5 text-[0.9rem] text-body">
        {items.length === 0 ? <li className="text-muted">Nothing yet.</li> : null}
        {items.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </section>
  );
}

export default async function AdminDashboardPage() {
  const rows: Submission[] = await getSubmissions();
  const grants = rows.filter((s) => s.form === 'Grant');
  const investments = rows.filter((s) => s.form === 'Investment');
  const screenedOut = rows.filter((s) => gateFailure(s) !== null);
  const passing = rows.filter((s) => gateFailure(s) === null);

  const byGeography = rows.reduce<Record<string, number>>((acc, s) => {
    acc[s.geography] = (acc[s.geography] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto grid max-w-container gap-10 px-6 py-10">
      <header>
        <p className="text-[0.75rem] uppercase tracking-[0.08em] text-accent">Submissions</p>
        <h1 className="mt-2 text-[2.2rem] leading-tight">Survey results</h1>
        <p className="mt-3 max-w-measure text-body">
          Everything that has come in through the two public surveys, with the hard gates already
          applied. Scoring and diligence stay in the internal system.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total" value={rows.length} note="Across both surveys" />
        <Stat label="Grants" value={grants.length}
          note={`${grants.filter((s) => gateFailure(s)).length} fail the board requirement`} />
        <Stat label="Investments" value={investments.length}
          note={`${investments.filter((s) => gateFailure(s)).length} outside the tier`} />
        <Stat label="Worth reading" value={passing.length} note="Pass the hard gates" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <List title="Screened out by a hard gate"
          items={screenedOut.map((s) => `${s.name} — ${gateFailure(s)}`)} />
        <List title="Ready for a conversation"
          items={passing.map((s) => `${s.name} — ${s.note}`)} />
        <List title="Where they are from"
          items={Object.entries(byGeography).map(([g, n]) => `${g} — ${n}`)} />
      </div>

      <section>
        <h2 className="text-[0.95rem] font-medium">All submissions</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left text-[0.9rem]">
            <thead>
              <tr className="border-b border-rule text-[0.75rem] uppercase tracking-[0.08em] text-accent">
                <th className="py-2 pr-4 font-medium">Ref</th>
                <th className="py-2 pr-4 font-medium">Survey</th>
                <th className="py-2 pr-4 font-medium">Applicant</th>
                <th className="py-2 pr-4 font-medium">Received</th>
                <th className="py-2 pr-4 font-medium">Geography</th>
                <th className="py-2 pr-4 font-medium">Ask or tier</th>
                <th className="py-2 pr-4 font-medium">Founder capital</th>
                <th className="py-2 font-medium">Gate</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => {
                const failure = gateFailure(s);
                return (
                  <tr key={s.id} className="border-b border-rule/60 align-top">
                    <td className="py-3 pr-4 tabular-nums">{s.id}</td>
                    <td className="py-3 pr-4">{s.form}</td>
                    <td className="py-3 pr-4">
                      <div>{s.name}</div>
                      <div className="text-[0.8rem] text-muted">{s.contact}</div>
                    </td>
                    <td className="py-3 pr-4 tabular-nums text-[0.85rem]">{s.received}</td>
                    <td className="py-3 pr-4">{s.geography}</td>
                    <td className="py-3 pr-4">{s.ask ?? s.tier}</td>
                    <td className={`py-3 pr-4 ${s.personalCapital === 'No' ? 'font-medium text-ink' : 'text-muted'}`}>
                      {s.form === 'Investment' ? s.personalCapital : '—'}
                    </td>
                    <td className="py-3">
                      {failure
                        ? <span className="rounded-full bg-teal-deep px-2.5 py-0.5 text-[0.75rem] text-paper">Screened out</span>
                        : <span className="rounded-full border border-teal px-2.5 py-0.5 text-[0.75rem] text-accent">Passes</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[0.85rem] text-muted">
          Invented records for layout. Leadership demographics and faith alignment are collected on the
          forms but are screening taxonomy and are not shown. The scoring rubric, exclusion screens and
          reference checks stay in the diligence system.
        </p>
      </section>
    </div>
  );
}
