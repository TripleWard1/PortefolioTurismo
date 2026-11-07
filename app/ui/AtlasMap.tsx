'use client';

import { useLang } from './LanguageContext';
import { BRAGA, MISSIONS, distanceKm } from './projects';

/* Projeção equiretangular centrada na Europa ocidental */
const W = 1000;
const H = 660;
const LON0 = -13, LON1 = 13, LAT0 = 34, LAT1 = 56;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => H - ((lat - LAT0) / (LAT1 - LAT0)) * H;

export const MISSION_POINTS = MISSIONS.map((m) => ({ ...m, km: distanceKm(BRAGA, m) }));

export default function AtlasMap({
  ativo,
  hot,
  setHot,
  onOpen,
}: {
  ativo: boolean;
  hot: string | null;
  setHot: (id: string | null) => void;
  onOpen: (id: string) => void;
}) {
  const { lang, t } = useLang();
  const bx = px(BRAGA.lon);
  const by = py(BRAGA.lat);

  const pts = MISSION_POINTS.map((m) => {
    const fora = m.lon < LON0; // Arkansas fica fora do enquadramento
    const x = fora ? 26 : px(m.lon);
    const y = fora ? by + 160 : py(m.lat);
    const mx = (bx + x) / 2;
    const my = (by + y) / 2 - Math.hypot(x - bx, y - by) * 0.3;
    return { ...m, x, y, fora, d: `M${bx},${by} Q${mx},${my} ${x},${y}` };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label={t('Mapa das missões a partir de Braga', 'Map of missions from Braga')}>
      <defs>
        <pattern id="pontos" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(242,238,231,0.08)" />
        </pattern>
        <radialGradient id="brilho">
          <stop offset="0%" stopColor="#ff2a2a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff2a2a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#pontos)" />

      {[-10, -5, 0, 5, 10].map((lon) => (
        <g key={lon}>
          <line x1={px(lon)} x2={px(lon)} y1={0} y2={H} stroke="rgba(242,238,231,0.06)" />
          <text x={px(lon) + 6} y={H - 10} fill="rgba(242,238,231,0.3)" fontSize="11" fontFamily="var(--font-mono)">
            {Math.abs(lon)}°{lon < 0 ? 'W' : lon > 0 ? 'E' : ''}
          </text>
        </g>
      ))}
      {[35, 40, 45, 50, 55].map((lat) => (
        <g key={lat}>
          <line x1={0} x2={W} y1={py(lat)} y2={py(lat)} stroke="rgba(242,238,231,0.06)" />
          <text x={8} y={py(lat) - 6} fill="rgba(242,238,231,0.3)" fontSize="11" fontFamily="var(--font-mono)">
            {lat}°N
          </text>
        </g>
      ))}

      <circle cx={bx} cy={by} r="130" fill="url(#brilho)" />

      {pts.map((p, i) => {
        const on = hot === p.id;
        return (
          <path
            key={p.id}
            d={p.d}
            fill="none"
            stroke={on ? '#ff2a2a' : 'rgba(242,238,231,0.42)'}
            strokeWidth={on ? 2.2 : 1.1}
            pathLength={1}
            strokeDasharray={p.fora ? '0.012 0.012' : '1'}
            style={{
              strokeDashoffset: p.fora ? 0 : ativo ? 0 : 1,
              opacity: p.fora && !ativo ? 0 : 1,
              transition: `stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1) ${0.5 + i * 0.15}s, opacity .8s ${0.5 + i * 0.15}s, stroke .3s, stroke-width .3s`,
            }}
          />
        );
      })}

      {pts.map((p, i) => {
        const on = hot === p.id;
        // Gante e Bruxelas distam 50 km: etiquetas em lados opostos
        const esq = p.id === 'fiets-wandelbeurs-gante';
        const dy = esq ? -8 : 4;
        return (
          <g
            key={p.id}
            className="cursor-pointer"
            onMouseEnter={() => setHot(p.id)}
            onMouseLeave={() => setHot(null)}
            onClick={() => onOpen(p.id)}
            style={{ opacity: ativo ? 1 : 0, transition: `opacity .6s ${1.2 + i * 0.15}s` }}
          >
            <circle cx={p.x} cy={p.y} r="20" fill="transparent" />
            <circle cx={p.x} cy={p.y} r={on ? 7 : 4.5} fill={on ? '#ff2a2a' : '#f2eee7'} style={{ transition: 'r .3s, fill .3s' }} />
            <text x={esq ? p.x - 14 : p.x + 14} y={p.y + dy} textAnchor={esq ? 'end' : 'start'} fill={on ? '#ff2a2a' : '#f2eee7'} fontSize="17" fontFamily="var(--font-sans)" fontWeight="500">
              {p.fora ? `← ${p.city[lang]}` : p.city[lang]}
            </text>
            <text x={esq ? p.x - 14 : p.x + 14} y={p.y + dy + 17} textAnchor={esq ? 'end' : 'start'} fill="rgba(242,238,231,0.42)" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1.2">
              {p.km.toLocaleString('pt-PT')} KM
            </text>
          </g>
        );
      })}

      <g>
        <circle cx={bx} cy={by} r="10" fill="none" stroke="#ff2a2a">
          <animate attributeName="r" values="8;28" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={bx} cy={by} r="6.5" fill="#ff2a2a" />
        <text x={bx - 16} y={by + 7} textAnchor="end" fill="#f2eee7" fontSize="24" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="-0.5">
          Braga
        </text>
      </g>
    </svg>
  );
}
