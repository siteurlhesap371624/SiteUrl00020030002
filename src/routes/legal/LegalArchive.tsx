import { Callout, LegalPage, Section } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { LEGAL_UPDATED } from '@/content/legal/entity'
import { ARCHIVED_DOCUMENTS } from '@/content/legal/archive'

const TOC = ARCHIVED_DOCUMENTS.map((doc) => ({ id: `arsiv-${doc.key}`, title: `${doc.title} (${doc.date})` }))

export default function LegalArchive() {
  return (
    <>
      <SeoHead title="Yasal metin arşivi" path="/yasal-arsiv" />
      <LegalPage
        title="Yasal metin arşivi"
        lastUpdated={LEGAL_UPDATED}
        toc={TOC}
        intro={
          <>
            <p>
              Bu sayfada yasal metinlerimizin önceki sürümleri, yayımlandıkları haliyle saklanır. Güncel metinlere sayfanın
              üstündeki bağlantılardan ulaşabilirsiniz.
            </p>
            <Callout>
              <p>
                8 Ekim 2026’dan önce hesap oluşturmuş ve güncel Kullanım Koşulları’nı henüz onaylamamış kullanıcılar
                için, onaylayana veya hesaplarını silene kadar aşağıdaki önceki Kullanım Şartları geçerliliğini korur.
                Kişisel verilerin işlenmesine ilişkin güncel bilgilendirme ise herkes için güncel Gizlilik Politikası ve
                KVKK Aydınlatma Metni’dir.
              </p>
            </Callout>
          </>
        }
      >
        {ARCHIVED_DOCUMENTS.map((doc, index) => (
          <Section
            key={doc.key}
            id={`arsiv-${doc.key}`}
            number={index + 1}
            title={`${doc.title} · ${doc.date} (sürüm ${doc.version})`}
          >
            {doc.intro ? <p>{doc.intro}</p> : null}
            {doc.sections.map((section) => (
              <div key={section.title} className="space-y-1.5 pt-1">
                <h3 className="text-[16.5px] font-semibold text-fg">{section.title}</h3>
                {section.items.map((item, itemIndex) => (
                  <p key={itemIndex} className={item.startsWith('• ') ? 'pl-4' : undefined}>
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </Section>
        ))}
      </LegalPage>
    </>
  )
}
