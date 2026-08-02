
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

@keyframes scanSweep {
  0%   { transform: translateY(0); opacity: 0; }
  4%   { opacity: 1; }
  92%  { opacity: 1; }
  100% { transform: translateY(268px); opacity: 0; }
}
@keyframes flagIn {
  to { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .scan-line { animation: none !important; opacity: 0.6 !important; }
  .flag-reveal { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

const ink = '#1F2D28';
const paper = '#EDEAE1';
const paperRaised = '#F5F3EC';
const green = '#2F6F4E';
const red = '#B23A2E';
const amber = '#C08A2E';
const rule = '#C9C4B6';

const serif = "'Source Serif 4', Georgia, serif";
const mono = "'IBM Plex Mono', ui-monospace, monospace";
const sans = "'Inter', system-ui, sans-serif";

function LedgerDemo() {
  const rows = [
    { je: 'JE-1001', memo: 'June assessment — Unit 101', amt: '350.00', flag: null },
    { je: 'JE-1002', memo: 'June assessment — Unit 102', amt: '349.00', flag: 'mismatch', label: 'Debit ≠ Credit · off by $1.00' },
    { je: 'JE-1004', memo: 'June assessment — Unit 104', amt: '350.00', flag: null },
    { je: 'JE-1004b', memo: 'June assessment — Unit 104', amt: '350.00', flag: 'duplicate', label: 'Same unit charged twice' },
    { je: 'JE-1008', memo: 'June management fee — 10%', amt: '210.00', flag: 'fee', label: 'Expected $245.00 at contract rate' },
  ];

  const flagColor = { mismatch: red, duplicate: amber, fee: red };
  const flagText = { mismatch: 'UNBALANCED', duplicate: 'DUPLICATE', fee: 'FEE MISMATCH' };

  return (
    <div style={{
      position: 'relative',
      background: paperRaised,
      border: `1px solid ${rule}`,
      borderRadius: 3,
      padding: '20px 0',
      overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(31,45,40,0.04)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px 14px',
        borderBottom: `1px solid ${rule}`,
        marginBottom: 4,
        fontFamily: mono,
        fontSize: 11,
        letterSpacing: '0.08em',
        color: '#6b6659',
        textTransform: 'uppercase',
      }}>
        <span>Journal Entry</span>
        <span>Amount</span>
      </div>

      {rows.map((r, i) => (
        <div key={i} style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          padding: '10px 20px',
          fontFamily: mono,
          fontSize: 13,
          borderBottom: i < rows.length - 1 ? `1px dashed ${rule}` : 'none',
        }}>
          <span style={{ color: ink }}>
            <span style={{ color: '#8a8473', marginRight: 10 }}>{r.je}</span>
            {r.memo}
          </span>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            {r.flag && (
              <span
                className="flag-reveal"
                style={{
                  opacity: 0,
                  transform: 'translateX(6px)',
                  animation: `flagIn 0.4s ease-out ${0.9 + i * 0.55}s forwards`,
                  fontFamily: sans,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: '#fff',
                  background: flagColor[r.flag],
                  padding: '2px 7px',
                  borderRadius: 2,
                  whiteSpace: 'nowrap',
                }}
                title={r.label}
              >
                {flagText[r.flag]}
              </span>
            )}
            <span style={{ color: r.flag ? flagColor[r.flag] : ink, fontWeight: r.flag ? 600 : 400 }}>
              ${r.amt}
            </span>
          </span>
        </div>
      ))}

      {/* scanning sweep line */}
      <div
        className="scan-line"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 42,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${green}, transparent)`,
          boxShadow: `0 0 8px 1px ${green}`,
          animation: 'scanSweep 3.6s ease-in-out infinite',
        }}
      />
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: green,
      marginBottom: 14,
    }}>
      {children}
    </div>
  );
}

export default function WatchdogLanding() {
  return (
    <div style={{ background: paper, minHeight: '100%', color: ink, fontFamily: sans }}>
      <style>{FONT_IMPORT}</style>

      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '22px 32px', borderBottom: `1px solid ${rule}`,
        maxWidth: 1040, margin: '0 auto',
      }}>
        <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 600 }}>
          Reconciliation Watchdog
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: '#6b6659' }}>
          for HOA &amp; property management companies
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1040, margin: '0 auto', padding: '64px 32px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Eyebrow>Before the owner statements go out</Eyebrow>
            <h1 style={{
              fontFamily: serif, fontWeight: 600, fontSize: 40, lineHeight: 1.15,
              margin: '0 0 20px', color: ink,
            }}>
              Every ledger tells a story.<br />Make sure yours doesn't have a mistake in it.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4a463c', margin: '0 0 28px', maxWidth: 440 }}>
              Reconciliation Watchdog reads your Buildium or AppFolio export and flags
              unbalanced entries, duplicate payments, and management fee mismatches —
              in minutes, not a slow afternoon of manual cross-checking.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <a href="mailto:hello@reconciliationwatchdog.com?subject=Sample%20export%20request"
                 style={{
                   fontFamily: sans, fontWeight: 600, fontSize: 14, color: '#fff',
                   background: ink, padding: '13px 22px', borderRadius: 3,
                   textDecoration: 'none', display: 'inline-block',
                 }}>
                Send me a sample export →
              </a>
              <span style={{ fontSize: 13, color: '#8a8473' }}>No signup. Just reply with a CSV.</span>
            </div>
          </div>

          <LedgerDemo />
        </div>
      </section>

      {/* Problem */}
      <section style={{ maxWidth: 1040, margin: '0 auto', padding: '8px 32px 64px' }}>
        <div style={{
          borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`,
          padding: '40px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
        }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 28, color: red, marginBottom: 6 }}>$1</div>
            <p style={{ fontSize: 14, color: '#4a463c', lineHeight: 1.5, margin: 0 }}>
              off can hide behind a rounding error until an owner asks why their
              statement doesn't add up.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 28, color: amber, marginBottom: 6 }}>2×</div>
            <p style={{ fontSize: 14, color: '#4a463c', lineHeight: 1.5, margin: 0 }}>
              charged. Duplicate entries slip through when exports get re-imported
              or split across journal entries.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 28, color: red, marginBottom: 6 }}>%</div>
            <p style={{ fontSize: 14, color: '#4a463c', lineHeight: 1.5, margin: 0 }}>
              off contract. A management fee that quietly drifts from the agreed
              rate, month over month, unnoticed.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 1040, margin: '0 auto', padding: '0 32px 72px' }}>
        <Eyebrow>How a check actually runs</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 8 }}>
          {[
            { n: '01', t: 'Export', d: 'Pull your monthly GL or owner-statement export from Buildium or AppFolio, as-is — no reformatting needed.' },
            { n: '02', t: 'Scan', d: 'The watchdog checks every journal entry for balance, cross-references duplicates, and verifies fees against contract rate.' },
            { n: '03', t: 'Flag', d: 'A clean, color-coded report tells you exactly what to look at, before it reaches an owner\u2019s inbox.' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: mono, fontSize: 13, color: '#8a8473', marginBottom: 10 }}>{s.n}</div>
              <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{s.t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4a463c', margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section style={{ background: ink, color: paper, padding: '52px 32px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 24, marginBottom: 8 }}>
              Have last month's export handy?
            </div>
            <p style={{ fontSize: 14, color: '#c9c4b6', margin: 0, maxWidth: 440 }}>
              Send it over — real numbers or anonymized, doesn't matter — and I'll run
              it and send back exactly what it finds.
            </p>
          </div>
          <a href="mailto:hello@reconciliationwatchdog.com?subject=Sample%20export%20request"
             style={{
               fontFamily: sans, fontWeight: 600, fontSize: 14, color: ink,
               background: paper, padding: '14px 24px', borderRadius: 3,
               textDecoration: 'none', whiteSpace: 'nowrap',
             }}>
            Email your export →
          </a>
        </div>
      </section>
    </div>
  );
}
