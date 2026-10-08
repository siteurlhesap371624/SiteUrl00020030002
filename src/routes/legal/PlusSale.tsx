import { Callout, LegalPage, LegalTable, List, MailLink, Section } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { CONTROLLER, LEGAL_UPDATED, LEGAL_VERSIONS, PLUS_OFFER } from '@/content/legal/entity'

const TOC = [
  { id: 'on-bilgilendirme', title: 'Ön bilgilendirme formu' },
  { id: 'satis-sozlesmesi', title: 'Mesafeli satış sözleşmesi' },
]

export default function PlusSale() {
  const sellerRows = [
    ['Satıcı ve hizmet sağlayıcı', `${CONTROLLER.person} (${CONTROLLER.tradeName}, ${CONTROLLER.brand})`],
    ['Adres', CONTROLLER.postalAddress || CONTROLLER.city],
    ['E-posta (iletişim, şikâyet ve iade talepleri)', CONTROLLER.email],
    ['İnternet sitesi', CONTROLLER.website],
    ['Ödemeye aracılık eden', 'Google Play (Google LLC); ödeme Google Play hesabınız üzerinden tahsil edilir'],
  ]

  return (
    <>
      <SeoHead title="Plus satış sözleşmesi" path="/plus-satis-sozlesmesi" />
      <LegalPage
        title="Plus ön bilgilendirme formu ve mesafeli satış sözleşmesi"
        lastUpdated={LEGAL_UPDATED}
        version={LEGAL_VERSIONS.terms}
        toc={TOC}
        intro={
          <p>
            Bu metin, Marul AI Plus’ın satın alınmasından önce 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve
            Mesafeli Sözleşmeler Yönetmeliği uyarınca verilmesi gereken bilgileri ve satın almayla kurulan sözleşmenin
            hükümlerini içerir. Satın alma işlemini onaylamanız, bu bilgileri edindiğinizi teyit ettiğiniz anlamına
            gelir.
          </p>
        }
      >
        <Section id="on-bilgilendirme" number={1} title="Ön bilgilendirme formu">
          <LegalTable caption="Satıcı bilgileri" head={['Bilgi', 'Değer']} rows={sellerRows} />
          <List
            items={[
              <><strong className="text-fg">Hizmetin temel nitelikleri:</strong> {PLUS_OFFER.features.join('; ')}. Haklar, satın alındığı Marul AI hesabına tanımlanır ve hem web sitesinde hem Android uygulamasında geçerlidir. Sınırsız olarak belirtilen haklara, hizmetin güvenliği ve adil kullanım amacıyla teknik hız sınırları uygulanır.</>,
              <><strong className="text-fg">Toplam fiyat:</strong> Satın alma anında Google Play ödeme ekranında gösterilen, tüm vergiler dahil tutardır. Bu metnin yayım tarihinde fiyat {PLUS_OFFER.price} TL’dir. Tek seferlik ödemedir; tekrar eden bir ödeme, otomatik yenileme, kurulum veya teslimat ücreti yoktur.</>,
              <><strong className="text-fg">Ödeme:</strong> Ödeme, Google Play hesabınızda tanımlı ödeme yöntemiyle Google tarafından tahsil edilir. Kart bilgileriniz Marul AI’a iletilmez.</>,
              <><strong className="text-fg">İfa:</strong> Plus, ödemenin Google Play tarafından onaylanmasıyla birlikte hesabınızda hemen etkinleşir. Hesabınız açık kaldığı ve hizmet sunulduğu sürece geçerlidir.</>,
              <><strong className="text-fg">Cayma hakkı:</strong> Plus, elektronik ortamda anında ifa edilen ve onayınızla hemen ifasına başlanan bir hizmettir. Bu nedenle Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinin birinci fıkrasının (ğ) ve (h) bentleri uyarınca cayma hakkınız bulunmamaktadır.</>,
              <><strong className="text-fg">Teknik gereksinimler:</strong> Plus’ı satın almak için Google Play hizmetlerine sahip bir Android cihaz ve Marul AI uygulaması gerekir. Haklar, güncel bir internet tarayıcısı veya Android uygulaması ile kullanılır ve internet bağlantısı gerektirir.</>,
              <><strong className="text-fg">Şikâyet ve iade:</strong> Talep ve şikâyetlerinizi yukarıdaki e-posta adresine iletebilirsiniz. Google Play’in iade süreci üzerinden de iade talep edebilirsiniz. Kanundan doğan haklarınız saklıdır.</>,
              <><strong className="text-fg">Uyuşmazlık:</strong> Ticaret Bakanlığınca her yıl ilan edilen parasal sınırlar dahilinde tüketici hakem heyetine, bu sınırları aşan uyuşmazlıklarda arabulucuya başvurduktan sonra tüketici mahkemesine başvurabilirsiniz.</>,
            ]}
          />
        </Section>

        <Section id="satis-sozlesmesi" number={2} title="Mesafeli satış sözleşmesi">
          <List
            ordered
            items={[
              <><strong className="text-fg">Taraflar:</strong> Satıcı, yukarıda bilgileri yer alan Marul AI; alıcı, Plus’ı kendi Marul AI hesabı için satın alan kullanıcıdır.</>,
              <><strong className="text-fg">Konu:</strong> Alıcının Marul AI hesabına, ön bilgilendirme formunda nitelikleri belirtilen Plus haklarının tanımlanmasıdır.</>,
              <><strong className="text-fg">Bedel ve ödeme:</strong> Bedel, satın alma anında gösterilen vergiler dahil tutardır ve Google Play aracılığıyla tek seferde ödenir.</>,
              <><strong className="text-fg">İfa ve süre:</strong> Satıcı, ödemenin onaylanmasından sonra Plus haklarını alıcının hesabına derhal tanımlar. Haklar, hesap açık kaldığı ve hizmet sunulduğu sürece geçerlidir. Hizmetin tamamen sona erdirilmesi halinde bu durum en az 30 gün önceden duyurulur ve alıcının kanundan doğan hakları saklıdır.</>,
              <><strong className="text-fg">Cayma hakkı:</strong> Hizmet elektronik ortamda anında ifa edildiğinden ve ifasına alıcının onayıyla başlandığından alıcının cayma hakkı bulunmamaktadır.</>,
              <><strong className="text-fg">Ayıplı ifa:</strong> Plus hakları hesaba tanımlanmazsa veya ilan edilen nitelikleri taşımazsa alıcı, 6502 sayılı Kanun’un 15. maddesindeki seçimlik haklarını kullanabilir. Bu durumda e-posta ile başvurmanız yeterlidir.</>,
              <><strong className="text-fg">Değişiklik:</strong> Plus hakları, Kullanım Koşulları’nın 11. maddesinde sayılan haklı sebepler olmadıkça alıcının aleyhine daraltılmaz.</>,
              <><strong className="text-fg">Diğer hükümler:</strong> Bu sözleşmede düzenlenmeyen hususlarda{' '}<a className="text-fg hover:underline" href="/sartlar">Kullanım Koşulları</a> uygulanır. Kişisel verilerin işlenmesi{' '}<a className="text-fg hover:underline" href="/kvkk">KVKK Aydınlatma Metni</a>’nde açıklanmıştır.</>,
              <><strong className="text-fg">Yetki:</strong> Uyuşmazlıklarda tüketici hakem heyetleri ve tüketici mahkemeleri yetkilidir.</>,
            ]}
          />
          <Callout>
            <p>
              Bu sözleşmenin bir kopyasını bu sayfadan yazdırarak veya PDF olarak kaydederek saklayabilirsiniz. Talep
              etmeniz halinde <MailLink email={CONTROLLER.email} subject="Plus sözleşme kopyası" /> adresinden e-posta
              ile de gönderilir.
            </p>
          </Callout>
        </Section>
      </LegalPage>
    </>
  )
}
