export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #e0e7ef',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: '#F4F7FB',
        fontSize: '12px',
        color: '#90A4AE',
      }}
    >
      <span>© Антошина Елизавета · ЕАБР · 2026 · ИНН 773135593234</span>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a href="/#/privacy-policy" style={{ color: '#90A4AE', textDecoration: 'underline' }}>
          Политика обработки ПДн
        </a>
        <a href="/#/terms" style={{ color: '#90A4AE', textDecoration: 'underline' }}>
          Условия использования
        </a>
        <a href="https://ea-brmed.ru" target="_blank" rel="noopener" style={{ color: '#90A4AE' }}>
          ea-brmed.ru
        </a>
      </div>
    </footer>
  )
}
