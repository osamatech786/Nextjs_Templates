import { Fraunces, JetBrains_Mono } from 'next/font/google';
import Calculator from './calculator';
import styles from './pricing.module.css';
import './tokens.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'NexusAI — Pricing',
};

const includedItems = [
  {
    tag: 'Warehouse',
    title: 'Natural-language SQL on every warehouse',
    note: 'Snowflake, BigQuery, Postgres, Redshift, Databricks',
  },
  {
    tag: 'Provenance',
    title: 'Source-cited answers',
    note: 'Every response links back to the row and column it pulled from',
  },
  {
    tag: 'Audit',
    title: 'Full audit log, exportable',
    note: 'SOC 2 Type II · ISO 27001 · HIPAA available',
  },
  {
    tag: 'Access',
    title: 'SSO, SCIM, role-based access',
    note: 'Okta, Azure AD, Google Workspace, JumpCloud',
  },
  {
    tag: 'Workflow',
    title: 'Versioned dashboards',
    note: 'Git-backed. Branch, review, ship queries like code.',
  },
  {
    tag: 'Reliability',
    title: '99.95% uptime SLA',
    note: 'Public status page · credits issued automatically',
  },
];

const compareRows = [
  ['Pricing model', 'Per query', 'Per seat', 'Per token'],
  ['Time to first query', '3 minutes', '2–6 weeks', '1–4 weeks'],
  ['Cited answers (row + column)', 'Every response', '—', 'Add-on'],
  ['Row-level audit log', 'Built in', 'Enterprise tier', 'Build it yourself'],
  ['Hallucination guardrails', 'Schema-locked', '—', 'DIY'],
  ['SOC 2 + SSO on day one', 'All plans', 'Enterprise only', '—'],
  ['Data leaves your VPC', 'Never', 'Varies', 'Often'],
];

const faqs = [
  {
    q: 'What counts as a query?',
    a: 'A single natural-language question that returns results from your warehouse. Re-running the same question against the same schema within five minutes counts as one. Failed queries, schema inspections, and dashboard loads don\'t count.',
  },
  {
    q: 'Can I switch retention later?',
    a: 'Yes — change retention any time from settings. Going longer starts a fresh retention window on new data; old data is purged per your previous setting.',
  },
  {
    q: 'Do you offer annual contracts?',
    a: 'Annual billing saves 20% and is paid up-front or quarterly. Above 2M queries/month we also offer committed-use discounts with custom terms.',
  },
  {
    q: 'What happens if I exceed my estimate?',
    a: 'We never cut you off mid-month. You\'ll get a heads-up email at 80% and 100%, and overage is billed at the same per-query rate as your plan. You can set a hard cap if you\'d prefer.',
  },
  {
    q: 'Is there a free tier?',
    a: '10,000 queries per month, one seat, 30-day retention. No card required. The first 1,000 queries don\'t even need an account — try it from the docs.',
  },
];

export default function SaasPricingPage() {
  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>

      <main id="main" className={`${fraunces.variable} ${jetbrains.variable}`}>
        <div className={styles.page}>
          {/* Top bar */}
          <header className={styles.topbar}>
            <div className={styles.wordmark}>
              NexusAI<span className={styles.dot}>.</span>
            </div>
            <nav className={styles.topnav} aria-label="Primary">
              <a href="#">Product</a>
              <a href="#">Docs</a>
              <a href="#" className={styles.active}>
                Pricing
              </a>
              <a href="#">Customers</a>
            </nav>
            <a href="#" className={styles.topcta}>
              Start free →
            </a>
          </header>

          {/* Hero + Calculator */}
          <section className={`${styles.wrap} ${styles.hero}`}>
            <div>
              <div className={styles.eyebrow}>Pricing / no tiers, no surprises</div>
              <h1 className={styles.heroH1}>
                One price.
                <br />
                <em>What you query.</em>
              </h1>
              <p className={styles.lede}>
                NexusAI charges by the query your team runs, not by the seat you might fill. Move the dials — the
                number on the right is what you'd pay this month.
              </p>
            </div>

            <Calculator />
          </section>

          {/* Included */}
          <section className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionEyebrow}>Included on every plan</div>
            <h2 className={styles.sectionTitle}>
              Everything you need to query production data. Nothing held back for the next tier.
            </h2>

            <div className={styles.inclGrid}>
              {includedItems.map((item) => (
                <div key={item.tag} className={styles.inclItem}>
                  <div className={styles.tag}>{item.tag}</div>
                  <div className={styles.txt}>
                    {item.title}
                    <span className={styles.note}>{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison */}
          <section className={`${styles.wrap} ${styles.section} ${styles.compare}`}>
            <div className={styles.sectionEyebrow}>How we compare</div>
            <h2 className={styles.sectionTitle}>Why teams switch from legacy BI and DIY LLMs.</h2>

            <table>
              <thead>
                <tr>
                  <th></th>
                  <th className={styles.us}>NexusAI</th>
                  <th>Legacy BI</th>
                  <th>DIY LLMs</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(([row, us, bi, llm]) => (
                  <tr key={row}>
                    <td>{row}</td>
                    <td className={styles.us}>{us}</td>
                    <td className={styles.dim}>{bi}</td>
                    <td className={styles.dim}>{llm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* FAQ */}
          <section className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.faqGrid}>
              <div>
                <div className={styles.sectionEyebrow}>FAQ</div>
                <h2 className={styles.sectionTitle}>Things teams ask before signing.</h2>
              </div>
              <div className={styles.faqList}>
                {faqs.map((f, i) => (
                  <details key={f.q} className={styles.faqItem} open={i === 0}>
                    <summary>
                      {f.q} <span className={styles.sign}>+</span>
                    </summary>
                    <p className={styles.answer}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA strip */}
          <section className={`${styles.wrap} ${styles.ctaStrip}`}>
            <h3>
              Skip the demo call. Query your warehouse in <em>three minutes.</em>
            </h3>
            <a href="#" className={styles.big}>
              Start free <span className={styles.arr}>→</span>
            </a>
          </section>

          {/* Footer */}
          <footer className={`${styles.wrap} ${styles.footer}`}>
            <div className={styles.footGrid}>
              <div className={styles.footBrand}>
                <span className={styles.wordmark}>
                  NexusAI<span className={styles.dot}>.</span>
                </span>
                <p>
                  Natural-language queries on production data. Cited, audited, schema-locked. Built for data teams
                  that ship.
                </p>
              </div>
              <div className={styles.footCol}>
                <h4>Product</h4>
                <ul>
                  <li>
                    <a href="#">Features</a>
                  </li>
                  <li>
                    <a href="#">Integrations</a>
                  </li>
                  <li>
                    <a href="#">Changelog</a>
                  </li>
                  <li>
                    <a href="#">Status</a>
                  </li>
                </ul>
              </div>
              <div className={styles.footCol}>
                <h4>Resources</h4>
                <ul>
                  <li>
                    <a href="#">Docs</a>
                  </li>
                  <li>
                    <a href="#">API reference</a>
                  </li>
                  <li>
                    <a href="#">Security</a>
                  </li>
                  <li>
                    <a href="#">SOC 2 report</a>
                  </li>
                </ul>
              </div>
              <div className={styles.footCol}>
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Customers</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.footBottom}>
              <span>© 2026 NexusAI Labs, Inc.</span>
              <span>SOC 2 Type II · ISO 27001 · HIPAA available</span>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
