/** Visible reminder that /admin has no authentication yet. Remove with the demo. */
export function AdminDemoNotice() {
  return (
    <div className="border border-rule bg-field px-4 py-3 text-[0.85rem] text-ink/80">
      <strong className="font-medium">Demonstration access.</strong> Sign-in accepts anything and no
      password is checked, and the submissions below are invented. Replace this with Supabase Auth
      before attaching a custom domain or storing a real application.
    </div>
  );
}
