'use client';

import { useEffect, useState } from 'react';

/* Hora local de Braga, atualizada a cada meio minuto. Só aparece depois de montar,
   para não haver diferença entre o servidor e o navegador. */
export default function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      setNow(new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'Europe/Lisbon' }).format(new Date()));
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? '--:--'}</span>;
}
