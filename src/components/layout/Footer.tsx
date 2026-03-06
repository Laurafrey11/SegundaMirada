import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-brand-petrol-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-brand-silver text-sm">
            © {currentYear} {t('common.brand', 'Segunda Mirada')}. Todos los derechos reservados.
          </span>
        </div>
        
        <div className="flex gap-6">
          <Link to="/terms" className="text-brand-silver hover:text-brand-aqua text-sm transition-colors">
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
