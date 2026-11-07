'use client';

import { useRouter } from 'next/navigation';
import { useLang } from './LanguageContext';
import { useInView } from './hooks';
import { BRAGA, MISSIONS, distanceKm } from './projects';

/* Projeção equiretangular centrada na Europa ocidental */
const W = 1000;
const H = 620;
const LON0 = -13, LON1 = 13, LAT0 = 35, LAT1 = 56;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => H - ((lat - LAT0) / (LAT1 - LAT0)) * H;

export const MISSION_POINTS = MISSIONS.map((m) => ({ ...m, km: distanceKm(BRAGA, m) }));

export default function AtlasMap({ hot = null, setHot = () => {} }: { hot?: string | null; setHot?: (id: string | null) => void }) {
  const { lang, t } = useLang();
  const router = useRouter();
  const [ref, ativo] = useInView<HTMLDivElement>(0.35);
  const bx = px(BRAGA.lon);
  const by = py(BRAGA.lat);

  const pts = MISSION_POINTS.map((m) => {
    const fora = m.lon < LON0; // Arkansas fica fora do enquadramento
    const x = fora ? 26 : px(m.lon);
    const y = fora ? by + 150 : py(m.lat);
    const mx = (bx + x) / 2;
    const my = (by + y) / 2 - Math.hypot(x - bx, y - by) * 0.3;
    return { ...m, x, y, fora, d: `M${bx},${by} Q${mx},${my} ${x},${y}` };
  });

  return (
    <div ref={ref} className="rounded-xl border border-line bg-card overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label={t('Mapa das missões a partir de Braga', 'Map of missions from Braga')}>
        <defs>
          <pattern id="grelha-pontos" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(26,29,33,0.08)" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grelha-pontos)" />
        {[-10, -5, 0, 5, 10].map((lon) => (
          <g key={lon}>
            <line x1={px(lon)} x2={px(lon)} y1={0} y2={H} stroke="rgba(26,29,33,0.07)" />
            <text x={px(lon) + 6} y={H - 10} fill="rgba(26,29,33,0.4)" fontSize="11">
              {Math.abs(lon)}°{lon < 0 ? 'W' : lon > 0 ? 'E' : ''}
            </text>
          </g>
        ))}
        {[40, 45, 50, 55].map((lat) => (
          <g key={lat}>
            <line x1={0} x2={W} y1={py(lat)} y2={py(lat)} stroke="rgba(26,29,33,0.07)" />
            <text x={8} y={py(lat) - 6} fill="rgba(26,29,33,0.4)" fontSize="11">
              {lat}°N
            </text>
          </g>
        ))}

        {pts.map((p, i) => {
          const on = hot === p.id;
          return (
            <path
              key={p.id}
              d={p.d}
              fill="none"
              stroke="#0e5a6b"
              strokeOpacity={on ? 1 : 0.55}
              strokeWidth={on ? 2.4 : 1.3}
              pathLength={1}
              strokeDasharray={p.fora ? '0.012 0.012' : '1'}
              style={{
                strokeDashoffset: p.fora ? 0 : ativo ? 0 : 1,
                opacity: p.fora && !ativo ? 0 : 1,
                transition: `stroke-dashoffset 1.5s cubic-bezier(.22,1,.36,1) ${0.2 + i * 0.14}s, opacity .8s ${0.2 + i * 0.14}s, stroke-width .3s, stroke-opacity .3s`,
              }}
            />
          );
        })}

        {pts.map((p, i) => {
          const on = hot === p.id;
          const esq = p.id === 'fiets-wandelbeurs-gante'; // Gante e Bruxelas distam 50 km
          const dy = esq ? -8 : 4;
          return (
            <g
              key={p.id}
              className="cursor-pointer"
              onMouseEnter={() => setHot(p.id)}
              onMouseLeave={() => setHot(null)}
              onClick={() => router.push(`/projetos/${p.id}`)}
              style={{ opacity: ativo ? 1 : 0, transition: `opacity .6s ${0.9 + i * 0.14}s` }}
            >
              <circle cx={p.x} cy={p.y} r="20" fill="transparent" />
              <circle cx={p.x} cy={p.y} r={on ? 7 : 5} fill={on ? '#0e5a6b' : '#1a1d21'} style={{ transition: 'r .3s, fill .3s' }} />
              <text x={esq ? p.x - 14 : p.x + 14} y={p.y + dy} textAnchor={esq ? 'end' : 'start'} fill={on ? '#0e5a6b' : '#1a1d21'} fontSize="18" fontFamily="var(--font-serif)">
                {p.fora ? `← ${p.city[lang]}` : p.city[lang]}
              </text>
              <text x={esq ? p.x - 14 : p.x + 14} y={p.y + dy + 17} textAnchor={esq ? 'end' : 'start'} fill="rgba(26,29,33,0.5)" fontSize="11" letterSpacing="0.8">
                {p.km.toLocaleString('pt-PT')} km
              </text>
            </g>
          );
        })}

        <g>
          <circle cx={bx} cy={by} r="10" fill="none" stroke="#0e5a6b">
            <animate attributeName="r" values="8;26" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.7;0" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx={bx} cy={by} r="7" fill="#0e5a6b" />
          <text x={bx - 16} y={by + 7} textAnchor="end" fill="#1a1d21" fontSize="24" fontFamily="var(--font-serif)" fontWeight="500">
            Braga
          </text>
        </g>
      </svg>
    </div>
  );
}
