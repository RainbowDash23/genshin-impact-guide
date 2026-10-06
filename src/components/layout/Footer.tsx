// ─────────────────────────────────────────────────────────────
//  components/layout/Footer.tsx
//  Pie de página de nivel agencia top con créditos de HoYoverse,
//  descargo de responsabilidad oficial y estado del almacenamiento.
// ─────────────────────────────────────────────────────────────


export function Footer() {
  return (
    <footer className="mt-24 border-t border-border-subtle bg-surface-raised/75 backdrop-blur-xl py-12 text-sm text-fg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border-subtle">

          <div className="flex items-center gap-3">

            <div>
              <span className="font-display font-bold text-fg tracking-wider block">
                GENSHIN QUEST GUIDE
              </span>
              <span className="text-[11px] text-fg-subtle">
                Bitácora no oficial para expedicionarios de Teyvat
              </span>
            </div>
          </div>


        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-fg-subtle text-center sm:text-left">
          <p>
            Genshin Impact™ y todos sus contenidos, arte, nombres y emblemas son marcas registradas de Cognosphere PTE. LTD. / miHoYo. Proyecto de tributo y portafolio interactivo.
          </p>
          <p className="flex-shrink-0 font-medium">
            Teyvat Explorer Edition · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
