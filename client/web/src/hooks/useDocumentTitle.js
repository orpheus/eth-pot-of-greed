import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useDocumentTitle (text) {
  const { t } = useTranslation()
  useEffect(() => {
    let title = t('app.title')
    if (text) {
      title = `${text} - ${t('app.title')}`
    }
    window.document.title = title
  }, [text, t])
}
