"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import styles from './pricing.module.css';

const RETENTION_MULT = { 30: 1, 90: 1.3, 180: 1.6, 365: 2 } as const;
type RetentionDays = keyof typeof RETENTION_MULT;

const fmt = (n: number) => n.toLocaleString('en-US');

export default function Calculator() {
  const [queriesK, setQueriesK] = useState(250);
  const [seats, setSeats] = useState(3);
  const [retention, setRetention] = useState<RetentionDays>(90);
  const [displayPrice, setDisplayPrice] = useState(0);
  const displayPriceRef = useRef(0);

  const price = useMemo(() => {
    const queryCost = Math.max(0, queriesK - 10) * 0.15;
    const seatCost = Math.max(0, seats - 1) * 20;
    return Math.round((queryCost + seatCost) * RETENTION_MULT[retention]);
  }, [queriesK, seats, retention]);

  const annualPrice = Math.round(price * 12 * 0.8);

  useEffect(() => {
    const from = displayPriceRef.current;
    const to = price;
    if (from === to) return;
    let raf = 0;
    const start = performance.now();
    const dur = 600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (to - from) * eased);
      setDisplayPrice(v);
      displayPriceRef.current = v;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [price]);

  return (
    <div className={styles.calc} role="region" aria-label="Pricing calculator">
      <div className={styles.calcRow}>
        <label htmlFor="queries">
          <span>Monthly queries</span>
          <span className={styles.val}>{fmt(queriesK * 1000)}</span>
        </label>
        <input
          id="queries"
          type="range"
          min="10"
          max="5000"
          step="10"
          value={queriesK}
          onChange={(e) => setQueriesK(Number(e.target.value))}
          aria-label="Monthly queries"
        />
      </div>

      <div className={styles.calcRow}>
        <label htmlFor="seats">
          <span>Seats</span>
          <span className={styles.val}>{seats}</span>
        </label>
        <input
          id="seats"
          type="range"
          min="1"
          max="50"
          step="1"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          aria-label="Number of seats"
        />
      </div>

      <div className={styles.calcRow}>
        <label>
          <span>Data retention</span>
          <span className={styles.val}>{retention} days</span>
        </label>
        <div className={styles.seg} role="radiogroup" aria-label="Data retention">
          {[30, 90, 180, 365].map((d) => (
            <button
              key={d}
              role="radio"
              aria-checked={retention === d}
              className={retention === d ? styles.on : ''}
              onClick={() => setRetention(d as RetentionDays)}
              type="button"
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className={styles.priceBox}>
        <div className={styles.amount}>
          <span className={styles.sym}>$</span>
          <span>{fmt(displayPrice)}</span>
          <span className={styles.unit}>/ mo</span>
        </div>
        <p className={styles.detail}>
          <strong>{fmt(queriesK * 1000)}</strong> queries · <strong>{seats}</strong> {seats === 1 ? 'seat' : 'seats'} ·{' '}
          <strong>{retention}d</strong> retention.
          <br />
          Annual: <strong>${fmt(annualPrice)}</strong>/yr (save 20%). Pause or change anytime.
        </p>
        <div className={styles.live}>
          <span className={styles.pulse} /> Live estimate · no card required
        </div>
      </div>
    </div>
  );
}
