/** Hotel PMS product map, drawn from the codebase rather than captured from client screens. */
const surfaces = [
  { name: "Back office", who: "Managers, front desk", note: "Rooms, rates, billing, night audit, point of sale, inventory, reports, and the front-desk board" },
  { name: "Staff app", who: "Front desk, housekeeping", note: "Reservations, room status, cleaning and maintenance tasks, built to work offline" },
  { name: "Booking site", who: "Guests", note: "Search, a 30-minute hold, hosted payment, booking status" },
  { name: "Platform panel", who: "Operator", note: "Onboarding hotel groups and their plans" },
];
const integrations = ["Channex", "Razorpay · Stripe", "WhatsApp", "Xero"];

export function SystemMap({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`sysmap${detailed ? " sysmap-detailed" : ""}`}>
      <ul aria-label="Surfaces" className="sysmap-row">
        {surfaces.map((s) => (
          <li key={s.name}>
            <strong>{s.name}</strong>
            <span>{s.who}</span>
            {detailed && <small>{s.note}</small>}
          </li>
        ))}
      </ul>
      <div className="sysmap-bus">One API <span>shared services and permissions</span></div>
      <div className="sysmap-bus">PostgreSQL <span>row-level security for each hotel group</span></div>
      <ul aria-label="Integrations" className="sysmap-row sysmap-integrations">
        {integrations.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}
