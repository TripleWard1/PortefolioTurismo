interface PillProps {
  label: string;
  type?: 'default' | 'outline' | 'active' | 'strategy';
}

export default function Pill({ label, type = 'default' }: PillProps) {
  // Estilos adaptados para o novo design claro e imersivo
  const styles = {
    default:
      'bg-white/80 backdrop-blur-md text-slate-500 border-slate-100 shadow-sm hover:border-blue-200 hover:text-blue-600',
    outline:
      'bg-transparent text-slate-400 border-slate-200 hover:bg-blue-50/50 hover:border-blue-300',
    active:
      'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 animate-pulse-slow',
    strategy:
      'bg-slate-900 text-white border-slate-900 shadow-md group-hover:bg-blue-600 transition-colors duration-500',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-4 py-1.5 rounded-full 
        text-[9px] font-black uppercase tracking-[0.2em] 
        border transition-all duration-300 
        cursor-default select-none
        hover:scale-110 active:scale-95
        ${styles[type]}
      `}
    >
      {/* Adicionei um pequeno ponto decorativo para dar mais detalhe técnico */}
      {type === 'active' && (
        <span className="w-1 h-1 bg-white rounded-full mr-2 shadow-[0_0_5px_white]" />
      )}
      {label}
    </span>
  );
}
