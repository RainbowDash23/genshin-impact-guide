// ─────────────────────────────────────────────────────────────
//  hooks/useQuestFilter.ts
//  Encapsula toda la lógica de filtrado.
//  useMemo evita recalcular si los datos no cambiaron.
// ─────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react';
import type { Quest } from '../types/quest';

export function useQuestFilter(quests: Quest[]) {
  const [search, setSearch]   = useState('');
  const [zone, setZone]       = useState('all');

  const filtered = useMemo(() => {
    return quests.filter(q => {
      const matchSearch =
        q.name.toLowerCase().includes(search.toLowerCase()) ||
        q.location.toLowerCase().includes(search.toLowerCase()) ||
        q.zone.toLowerCase().includes(search.toLowerCase());
      const matchZone = zone === 'all' || q.zone === zone;
      return matchSearch && matchZone;
    });
  }, [quests, search, zone]);

  const reset = () => { setSearch(''); setZone('all'); };

  return { search, zone, filtered, setSearch, setZone, reset };
}
