import './App.css';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import PupazzaPage from './PupazzaPage';
import SlotNav from './SlotNav';
import TimeSeriesChart from './TimeSeriesChart';

function StatCard({ label, value, detail, changeLabel, change, points, chartColor }) {
  const isUp = change.trim().startsWith('+');
  return (
    <article className="stat-card">
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-detail">{detail}</p>
      <div className="stat-card-trend-row">
        <div className="trend-meta">
          <p className="trend-meta-label">{changeLabel}</p>
          <span className={`trend-pill ${isUp ? 'trend-up' : 'trend-down'}`}>{change}</span>
        </div>
      </div>
      <div className="stat-chart">
        <TimeSeriesChart points={points} color={chartColor || '#67e8f9'} />
      </div>
    </article>
  );
}

function InfoList({ title, items }) {
  return (
    <section className="info-block">
      <h3 className="info-title">{title}</h3>
      <ul className="info-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function TrendBoard({ rows }) {
  return (
    <section className="trend-board">
      <div className="trend-board-head">
        <h3 className="info-title">Trend Board</h3>
        <p className="trend-board-note">Linea = andamento 7 giorni</p>
      </div>
      <div className="trend-rows">
        {rows.map((row) => (
          <article className="trend-row" key={row.asset}>
            <div>
              <p className="trend-asset">{row.asset}</p>
              <p className="trend-price">{row.price}</p>
            </div>
            <div className="trend-row-chart">
              <TimeSeriesChart points={row.points} compact showCaption={false} />
            </div>
            <p className={`trend-change ${row.change.startsWith('+') ? 'trend-up' : 'trend-down'}`}>
              <span>{row.changeLabel}</span>
              {row.change}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Dashboard() {
  const cryptoCatalog = {
    USDT: {
      symbol: 'USDT',
      title: 'Tether Core',
      tone: '#22c55e',
      floatSymbol: '₮',
      banners: ['Stable liquidity', 'Settlement backbone', 'Cross-chain rail'],
      stats: [
        {
          label: 'Treasury Reserve',
          value: '$83.4B',
          detail: 'Reserve backing for circulating USDT',
          changeLabel: '24h change',
          change: '+1.2%',
          points: [12, 15, 14, 18, 20, 24, 23],
        },
        {
          label: 'Transfer Volume',
          value: '$56.9B',
          detail: 'Total transfer value across top chains',
          changeLabel: '24h change',
          change: '+3.8%',
          points: [10, 12, 18, 14, 22, 27, 29],
        },
        {
          label: 'Peg Stability',
          value: '99.98%',
          detail: 'Average peg adherence in 72h window',
          changeLabel: '72h delta',
          change: '+0.04%',
          points: [97, 98, 98.5, 99, 98.8, 99.5, 99.8],
        },
      ],
    },
    BTC: {
      symbol: 'BTC',
      title: 'Bitcoin Prime',
      tone: '#f59e0b',
      floatSymbol: '₿',
      banners: ['Store of value', 'Macro signal', 'High-liquidity pair'],
      stats: [
        {
          label: 'Spot Price',
          value: '$69,480',
          detail: 'Weighted average from major exchanges',
          changeLabel: '24h change',
          change: '+1.4%',
          points: [55, 58, 57, 60, 62, 65, 69],
        },
        {
          label: 'Open Interest',
          value: '$18.2B',
          detail: 'Perpetual + futures aggregated',
          changeLabel: '24h change',
          change: '+2.3%',
          points: [22, 24, 25, 27, 26, 30, 34],
        },
        {
          label: 'Volatility Index',
          value: '44.1',
          detail: 'Implied volatility normalized index',
          changeLabel: '7d change',
          change: '-1.7%',
          points: [51, 50, 48, 47, 46, 45, 44],
        },
      ],
    },
    ETH: {
      symbol: 'ETH',
      title: 'Ethereum Flow',
      tone: '#60a5fa',
      floatSymbol: 'Ξ',
      banners: ['Smart-contract layer', 'Staking yield', 'L2 demand proxy'],
      stats: [
        {
          label: 'Spot Price',
          value: '$3,540',
          detail: 'Weighted average from top markets',
          changeLabel: '24h change',
          change: '+0.9%',
          points: [32, 34, 33, 34, 36, 35, 37],
        },
        {
          label: 'Staking Ratio',
          value: '27.8%',
          detail: 'Share of supply currently staked',
          changeLabel: '30d change',
          change: '+0.6%',
          points: [24, 24.5, 25, 25.8, 26.3, 27.1, 27.8],
        },
        {
          label: 'Gas Pressure',
          value: '36 gwei',
          detail: 'Median base fee across sessions',
          changeLabel: '24h change',
          change: '-4.2%',
          points: [48, 47, 45, 43, 40, 38, 36],
        },
      ],
    },
    SOL: {
      symbol: 'SOL',
      title: 'Solana Velocity',
      tone: '#a78bfa',
      floatSymbol: '◎',
      banners: ['Fast execution', 'Retail momentum', 'DEX activity'],
      stats: [
        {
          label: 'Spot Price',
          value: '$182',
          detail: 'Composite spot benchmark',
          changeLabel: '24h change',
          change: '+2.7%',
          points: [10, 11, 12, 14, 16, 15, 19],
        },
        {
          label: 'Transactions/s',
          value: '2,390',
          detail: 'Observed processed tx throughput',
          changeLabel: '24h change',
          change: '+5.1%',
          points: [1300, 1450, 1600, 1700, 1900, 2100, 2390],
        },
        {
          label: 'DEX Volume',
          value: '$2.3B',
          detail: 'Daily decentralized exchange volume',
          changeLabel: '24h change',
          change: '+7.4%',
          points: [1.3, 1.4, 1.55, 1.8, 2.0, 2.1, 2.3],
        },
      ],
    },
  };

  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const activeCrypto = cryptoCatalog[selectedCrypto];

  return (
    <>
      <div className={`crypto-backdrop crypto-bg-${selectedCrypto.toLowerCase()}`} aria-hidden="true">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <span key={item} className={`crypto-symbol sym-${item}`}>
            {activeCrypto.floatSymbol}
          </span>
        ))}
      </div>

      <main className="dashboard-container">
        <div className="minimal-icon" aria-hidden="true">
          <span />
        </div>
        <h1 className="dashboard-title">Crypto test dashboard</h1>
        <button className="wallet-button" type="button">
          Connetti Wallet {selectedCrypto}
        </button>

        <section className="dashboard-controls">
          <div className="selection-group">
            <p className="selection-title">Select crypto</p>
            <div className="selector-row">
              {Object.values(cryptoCatalog).map((crypto) => (
                <button
                  key={crypto.symbol}
                  type="button"
                  className={`selector-chip ${selectedCrypto === crypto.symbol ? 'selector-chip-active' : ''}`}
                  style={{ '--accent': crypto.tone }}
                  onClick={() => setSelectedCrypto(crypto.symbol)}
                >
                  {crypto.symbol}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="banner-grid">
          {activeCrypto.banners.map((banner) => (
            <article key={banner} className="banner-card">
              <p className="banner-kicker">{activeCrypto.title}</p>
              <h3>{banner}</h3>
            </article>
          ))}
        </section>

        <p className="selection-state">
          Active crypto: <strong>{activeCrypto.symbol}</strong>
        </p>

        <section className="stats-grid">
          {activeCrypto.stats.map((item) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              detail={item.detail}
              changeLabel={item.changeLabel}
              change={item.change}
              points={item.points}
              chartColor={activeCrypto.tone}
            />
          ))}
        </section>

        <SlotNav />
      </main>
    </>
  );
}

function Page({ title, description, stats, highlights, trendRows }) {
  return (
    <main className="dashboard-container page-container">
      <h2 className="page-title">{title}</h2>
      <p className="page-description">{description}</p>

      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
            changeLabel={stat.changeLabel}
            change={stat.change}
            points={stat.points}
          />
        ))}
      </section>

      <section className="info-grid">
        {highlights.map((block) => (
          <InfoList key={block.title} title={block.title} items={block.items} />
        ))}
      </section>
      <TrendBoard rows={trendRows} />

      <SlotNav />
      <Link to="/" className="slot-link back-link">
        Torna alla Dashboard
      </Link>
    </main>
  );
}

function SettingsPage() {
  const initialSettings = {
    enforce2FA: true,
    sessionTimeout: '30m',
    ipAllowlist: '10.12.4.8\n10.12.4.9',
    dailyTransferLimit: 250000,
    multisigThreshold: 50000,
    allowedChains: ['Ethereum', 'Tron'],
    freezeOnRisk: true,
    emailAlerts: true,
    slackWebhook: 'https://hooks.slack.com/services/ops/live',
    alertSeverity: 'High',
    defaultRoute: 'Dashboard',
    defaultRange: '7d',
    compactMode: false,
  };

  const [form, setForm] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(initialSettings);

  function updateField(key, value) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleChain(chain) {
    setSaved(false);
    setForm((prev) => ({
      ...prev,
      allowedChains: prev.allowedChains.includes(chain)
        ? prev.allowedChains.filter((item) => item !== chain)
        : [...prev.allowedChains, chain],
    }));
  }

  return (
    <main className="dashboard-container page-container">
      <h2 className="page-title">System Settings</h2>
      <p className="page-description">Configura sicurezza, limiti operativi e preferenze dashboard.</p>

      <section className="settings-grid">
        <article className="settings-card">
          <h3 className="settings-title">Sicurezza account</h3>
          <label className="field-row">
            <span>Enforce 2FA</span>
            <input type="checkbox" checked={form.enforce2FA} onChange={(e) => updateField('enforce2FA', e.target.checked)} />
          </label>
          <label className="field-stack">
            <span>Session timeout</span>
            <select value={form.sessionTimeout} onChange={(e) => updateField('sessionTimeout', e.target.value)}>
              <option value="15m">15 minuti</option>
              <option value="30m">30 minuti</option>
              <option value="1h">1 ora</option>
              <option value="4h">4 ore</option>
            </select>
          </label>
          <label className="field-stack">
            <span>IP allowlist</span>
            <textarea value={form.ipAllowlist} onChange={(e) => updateField('ipAllowlist', e.target.value)} rows={3} />
          </label>
        </article>

        <article className="settings-card">
          <h3 className="settings-title">Wallet e operativita</h3>
          <label className="field-stack">
            <span>Daily transfer limit (USDT)</span>
            <input
              type="number"
              value={form.dailyTransferLimit}
              onChange={(e) => updateField('dailyTransferLimit', Number(e.target.value))}
            />
          </label>
          <label className="field-stack">
            <span>Require multisig over (USDT)</span>
            <input
              type="number"
              value={form.multisigThreshold}
              onChange={(e) => updateField('multisigThreshold', Number(e.target.value))}
            />
          </label>
          <label className="field-row">
            <span>Freeze withdrawals on risk alert</span>
            <input type="checkbox" checked={form.freezeOnRisk} onChange={(e) => updateField('freezeOnRisk', e.target.checked)} />
          </label>
          <div className="field-stack">
            <span>Allowed chains</span>
            <div className="chain-options">
              {['Ethereum', 'Tron', 'Solana', 'BSC'].map((chain) => (
                <label key={chain} className="chip">
                  <input
                    type="checkbox"
                    checked={form.allowedChains.includes(chain)}
                    onChange={() => toggleChain(chain)}
                  />
                  {chain}
                </label>
              ))}
            </div>
          </div>
        </article>

        <article className="settings-card">
          <h3 className="settings-title">Notifiche e preferenze</h3>
          <label className="field-row">
            <span>Email alerts</span>
            <input type="checkbox" checked={form.emailAlerts} onChange={(e) => updateField('emailAlerts', e.target.checked)} />
          </label>
          <label className="field-stack">
            <span>Slack webhook URL</span>
            <input type="text" value={form.slackWebhook} onChange={(e) => updateField('slackWebhook', e.target.value)} />
          </label>
          <label className="field-stack">
            <span>Alert severity</span>
            <select value={form.alertSeverity} onChange={(e) => updateField('alertSeverity', e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </label>
          <label className="field-stack">
            <span>Default route</span>
            <select value={form.defaultRoute} onChange={(e) => updateField('defaultRoute', e.target.value)}>
              <option value="Dashboard">Dashboard</option>
              <option value="Wallet">Wallet</option>
              <option value="Markets">Markets</option>
              <option value="Settings">Settings</option>
            </select>
          </label>
          <label className="field-stack">
            <span>Default time range</span>
            <select value={form.defaultRange} onChange={(e) => updateField('defaultRange', e.target.value)}>
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="30d">30d</option>
            </select>
          </label>
          <label className="field-row">
            <span>Compact mode</span>
            <input type="checkbox" checked={form.compactMode} onChange={(e) => updateField('compactMode', e.target.checked)} />
          </label>
        </article>
      </section>

      <div className="settings-actions">
        <span className={`settings-status ${hasChanges ? 'status-pending' : 'status-ok'}`}>
          {saved ? 'Impostazioni salvate' : hasChanges ? 'Modifiche non salvate' : 'Nessuna modifica in sospeso'}
        </span>
        <button
          className="slot-link settings-save"
          type="button"
          onClick={() => setSaved(true)}
          disabled={!hasChanges}
        >
          Salva modifiche
        </button>
      </div>

      <SlotNav />
      <Link to="/" className="slot-link back-link">
        Torna alla Dashboard
      </Link>
    </main>
  );
}

function getRouteClass(pathname) {
  if (pathname === '/wallet') return 'theme-wallet';
  if (pathname === '/markets') return 'theme-markets';
  if (pathname === '/settings') return 'theme-settings';
  if (pathname === '/idee') return 'theme-ideas';
  return 'theme-dashboard';
}

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('route-fade-in');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('route-fade-out');
    }
  }, [location, displayLocation]);

  const walletData = {
    title: 'Wallet Vault',
    description: 'Panoramica wallet con liquidita, movimenti recenti e stato sicurezza.',
    stats: [
      {
        label: 'Available USDT',
        value: '2,430,540',
        detail: 'Saldo distribuito su 4 chain operative',
        changeLabel: 'Variazione 24h',
        change: '+2.1%',
        points: [18, 19, 22, 24, 21, 25, 27],
      },
      {
        label: 'Pending Settlements',
        value: '14 tx',
        detail: 'Conferma media in 42 secondi',
        changeLabel: 'Riduzione 24h',
        change: '-8.4%',
        points: [28, 26, 24, 20, 18, 16, 14],
      },
      {
        label: 'Hot Wallet Risk',
        value: 'LOW',
        detail: 'Multi-sig attivo con policy 3/5',
        changeLabel: 'Riduzione rischio 7g',
        change: '-12%',
        points: [20, 19, 17, 14, 12, 10, 8],
      },
    ],
    highlights: [
      {
        title: 'Ultimi movimenti',
        items: ['+120,000 USDT inbound (Tron)', '-48,500 USDT outbound (Ethereum)', '+9,200 USDT fee refund'],
      },
      {
        title: 'Azioni consigliate',
        items: ['Ribilancia 8% verso wallet cold', 'Conferma chiavi backup Q2', 'Riduci limite daily su wallet team'],
      },
    ],
    trendRows: [
      { asset: 'USDT / TRX', price: '$1.0002', changeLabel: '24h', change: '+0.02%', points: [10, 11, 12, 12, 13, 12, 13] },
      { asset: 'USDT / ETH', price: '$0.9998', changeLabel: '24h', change: '-0.01%', points: [14, 14, 13, 12, 12, 11, 11] },
      { asset: 'USDT / SOL', price: '$1.0004', changeLabel: '24h', change: '+0.05%', points: [8, 8, 9, 10, 10, 11, 12] },
    ],
  };

  const marketsData = {
    title: 'Market Watch',
    description: 'Sintesi mercato crypto con indicatori utili per decisioni rapide.',
    stats: [
      {
        label: 'BTC Spot',
        value: '$69,480',
        detail: 'Prezzo spot medio su principali exchange',
        changeLabel: 'Variazione 24h',
        change: '+1.4%',
        points: [55, 58, 57, 60, 62, 65, 69],
      },
      {
        label: 'ETH Spot',
        value: '$3,540',
        detail: 'Prezzo spot medio su principali exchange',
        changeLabel: 'Variazione 24h',
        change: '+0.9%',
        points: [32, 34, 33, 34, 36, 35, 37],
      },
      {
        label: 'USDT Dominance',
        value: '6.8%',
        detail: 'Peso su market cap totale crypto',
        changeLabel: 'Variazione 7g',
        change: '+0.2%',
        points: [6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.8],
      },
    ],
    highlights: [
      {
        title: 'Trend monitorati',
        items: ['Volatilita in calo su major pair', 'Funding rate stabile su BTC perpetual', 'Spread exchange sotto 0.12%'],
      },
      {
        title: 'Watchlist operativa',
        items: ['BTC/USDT breakout area 70k', 'ETH/USDT supporto area 3.4k', 'Solvibilita stablecoin: monitor green'],
      },
    ],
    trendRows: [
      { asset: 'BTC / USDT', price: '$69,480', changeLabel: '24h', change: '+1.4%', points: [22, 24, 25, 27, 26, 30, 34] },
      { asset: 'ETH / USDT', price: '$3,540', changeLabel: '24h', change: '+0.9%', points: [18, 18, 20, 21, 20, 22, 23] },
      { asset: 'SOL / USDT', price: '$182', changeLabel: '24h', change: '+2.7%', points: [10, 11, 12, 14, 16, 15, 19] },
    ],
  };

  return (
    <div className={`App ${getRouteClass(location.pathname)}`}>
      <div
        className={`route-stage ${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === 'route-fade-out') {
            setDisplayLocation(location);
            setTransitionStage('route-fade-in');
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<Page {...walletData} />} />
          <Route path="/markets" element={<Page {...marketsData} />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/idee" element={<PupazzaPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
