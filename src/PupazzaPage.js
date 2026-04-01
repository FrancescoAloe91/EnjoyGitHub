import { Link } from 'react-router-dom';
import SlotNav from './SlotNav';

const ideaBlocks = [
  {
    title: 'Dashboard',
    points: [
      'Modalita confronto tra due crypto affiancate.',
      'Alert visivo quando la variazione 24h supera soglia.',
      'Toggle rapido per timeframe 24h / 7g / 30g.',
    ],
  },
  {
    title: 'Wallet',
    points: [
      'Semaforo rischio per ogni chain supportata.',
      'Stima fee dinamica prima di ogni trasferimento.',
      'Cronologia movimenti con filtri per asset e rete.',
    ],
  },
  {
    title: 'Markets',
    points: [
      'Watchlist personale con livelli di prezzo target.',
      'Trend board con priorita segnali (alto/medio/basso).',
      'Notifica breakout su coppie BTC/USDT, ETH/USDT, SOL/USDT.',
    ],
  },
  {
    title: 'Settings',
    points: [
      'Template profilo: Conservative / Balanced / Aggressive.',
      'Salvataggio automatico su localStorage per preferenze UI.',
      'Pannello audit con ultimo sync e stato integrazioni.',
    ],
  },
];

export default function PupazzaPage() {
  return (
    <main className="dashboard-container page-container ideas-page">
      <h2 className="ideas-title">IDEE</h2>
      <p className="ideas-subtitle">Roadmap rapida con spunti concreti presi dal progetto</p>
      <div className="ideas-stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`idea-star s-${i}`}>
            *
          </span>
        ))}
      </div>
      <section className="ideas-grid">
        {ideaBlocks.map((block) => (
          <article key={block.title} className="idea-card">
            <h3>{block.title}</h3>
            <ul>
              {block.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <SlotNav />
      <Link to="/" className="slot-link back-link">
        Torna alla Dashboard
      </Link>
    </main>
  );
}
