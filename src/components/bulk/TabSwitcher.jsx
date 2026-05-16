import { useTranslation } from 'react-i18next'
import './TabSwitcher.css'

export default function TabSwitcher({ activeTab, onTabChange }) {
  const { t } = useTranslation()

  return (
    <div className="tab-switcher" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'chef'}
        className={['tab-switcher__tab', activeTab === 'chef' ? 'tab-switcher__tab--active' : ''].filter(Boolean).join(' ')}
        onClick={() => onTabChange('chef')}
      >
        🎩 {t('bulk_order.tab_chef')}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'custom'}
        className={['tab-switcher__tab', activeTab === 'custom' ? 'tab-switcher__tab--active' : ''].filter(Boolean).join(' ')}
        onClick={() => onTabChange('custom')}
      >
        🎨 {t('bulk_order.tab_custom')}
      </button>
    </div>
  )
}
