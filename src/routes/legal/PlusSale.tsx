import { Callout, LegalPage, LegalTable, List, MailLink, Section } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { CONTROLLER, LEGAL_UPDATED, LEGAL_VERSIONS, PLUS_OFFER } from '@/content/legal/entity'

const TOC = [
  { id: 'on-bilgilendirme', title: 'Ön bilgilendirme formu' },
  { id: 'satis-sozlesmesi', title: 'Mesafeli satış sözleşmesi' },
]

export default function PlusSale() {
  const sellerRows = [
    ['Sağlayıcı (satıcı)', `${CONTROLLER.person} (gerçek kişi; ${CONTROLLER.brand} hizmeti ${CONTROLLER.tradeName} proje adıyla sunulur)`],
    ['MERSİS numarası', 'Bulunmamaktadır. Sağlayıcı gerçek kişidir ve ticaret siciline kayıtlı değildir.'],
    ['Yerleşim yeri', CONTROLLER.postalAddress || CONTROLLER.city],
    ...(CONTROLLER.postalAddress ? [] : [['Posta adresi', 'Posta yoluyla yapılacak bildirimler ve tebligat için posta adresi, e-posta ile talep edilmesi halinde bildirilir.']]),
    ['E-posta (iletişim, şikâyet ve iade talepleri)', CONTROLLER.email],
    ['İnternet sitesi', CONTROLLER.website],
    ['Aracı hizmet sağlayıcı ve ödeme', 'Google Play (Google LLC). Ödeme, Google Play hesabınız üzerinden Google tarafından tahsil edilir. Google Play Hizmet Şartları uyarınca Google Commerce Limited bu satışta sağlayıcı adına aracı olarak hareket edebilir.'],
  ]

  return (
    <>
      <SeoHead title="Plus satış sözleşmesi" path="/plus-satis-sozlesmesi" />
      <LegalPage
        title="Plus ön bilgilendirme formu ve mesafeli satış sözleşmesi"
        lastUpdated={LEGAL_UPDATED}
        version={LEGAL_VERSIONS.plus}
        toc={TOC}
        intro={
          <p>
            Bu metin, Marul AI Plus’ın satın alınmasından önce 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve
            Mesafeli Sözleşmeler Yönetmeliği uyarınca verilmesi gereken bilgileri ve satın almayla kurulan sözleşmenin
            hükümlerini içerir. Satın alma ekranında bu bilgileri edindiğinizi ayrı bir onay kutucuğuyla teyit etmeniz
            istenir; teyit verilmeden satın alma başlatılamaz.
          </p>
        }
      >
        <Section id="on-bilgilendirme" number={1} title="Ön bilgilendirme formu">
          <LegalTable caption="Satıcı bilgileri" head={['Bilgi', 'Değer']} rows={sellerRows} />
          <List
            items={[
              <><strong className="text-fg">Hizmetin temel nitelikleri:</strong> {PLUS_OFFER.features.join('; ')}. Haklar, satın alındığı Marul AI hesabına tanımlanır ve hem web sitesinde hem Android uygulamasında geçerlidir. Sınırsız olarak belirtilen haklara, hizmetin güvenliği ve adil kullanım amacıyla teknik hız sınırları uygulanır.</>,
              <><strong className="text-fg">Toplam fiyat:</strong> Satın alma anında Google Play ödeme ekranında gösterilen, tüm vergiler dahil tutardır. Bu sözleşme sürümünün yayım tarihinde fiyat {PLUS_OFFER.price} TL’dir. Tek seferlik ödemedir; tekrar eden bir ödeme, otomatik yenileme, kurulum veya teslimat ücreti yoktur.</>,
              <><strong className="text-fg">Ödeme:</strong> Ödeme, Google Play hesabınızda tanımlı ödeme yöntemiyle Google tarafından tahsil edilir. Fiyata dahil KDV, Google tarafından hesaplanır ve ödenir; satın alma makbuzu Google Play tarafından Google hesabınızın e-posta adresine gönderilir. Kart bilgileriniz Marul AI’a iletilmez.</>,
              <><strong className="text-fg">Sözleşmenin kurulması:</strong> Uygulamadaki satın alma öncesi bilgilendirme ekranında iki onay kutusunu işaretleyip “Ödemeye geç” düğmesine bastığınızda Google Play ödeme ekranı açılır. Sözleşme, bu ekranda ödemeyi onaylamanız ve Google Play’in ödemeyi kabul etmesiyle kurulur. Ödemeyi onaylamadan önce bilgilerinizi kontrol edebilir, ekranı kapatarak işlemden vazgeçebilirsiniz.</>,
              <><strong className="text-fg">İfa:</strong> Plus, ödemenin Google Play tarafından onaylanmasıyla birlikte hesabınızda hemen etkinleşir. Hesabınız açık kaldığı ve hizmet sunulduğu sürece geçerlidir. Google Play üzerinden iadesi yapılan veya iptal edilen satın alımlarda Plus hakkı hesaptan otomatik olarak kaldırılır.</>,
              <><strong className="text-fg">Cayma hakkı:</strong> Plus, cayma süresi dolmadan açık onayınızla ifasına başlanan ve elektronik ortamda anında ifa edilen bir hizmettir. Bu nedenle Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinin birinci fıkrasının (h) ve (ğ) bentleri uyarınca cayma hakkınız bulunmamaktadır.</>,
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
              <><strong className="text-fg">Taraflar:</strong> Satıcı (sağlayıcı), yukarıda bilgileri yer alan {CONTROLLER.person}; alıcı, Plus’ı kendi Marul AI hesabı için satın alan kullanıcıdır.</>,
              <><strong className="text-fg">Konu:</strong> Alıcının Marul AI hesabına, ön bilgilendirme formunda nitelikleri belirtilen Plus haklarının tanımlanmasıdır.</>,
              <><strong className="text-fg">Bedel ve ödeme:</strong> Bedel, satın alma anında gösterilen vergiler dahil tutardır ve Google Play aracılığıyla tek seferde ödenir.</>,
              <><strong className="text-fg">İfa ve süre:</strong> Satıcı, ödemenin onaylanmasından sonra Plus haklarını alıcının hesabına derhal tanımlar. Haklar, hesap açık kaldığı ve hizmet sunulduğu sürece geçerlidir. Google Play üzerinden iadesi yapılan veya iptal edilen satın alımlarda Plus hakkı hesaptan otomatik olarak kaldırılır. Plus bedeli 24 aylık kullanım süresi esas alınarak belirlenmiştir; bu süre dolmadan hizmetin tamamen sona erdirilmesi, hesabın satıcı tarafından haklı bir sebep olmaksızın kapatılması veya alıcının aleyhine olan bir koşul değişikliğini onaylamaması halinde, talep üzerine bedelin kullanılmayan aylara isabet eden kısmı iade edilir. Hizmetin sona erdirilmesi en az 30 gün önceden duyurulur.</>,
              <><strong className="text-fg">Cayma hakkı:</strong> Hizmetin ifasına cayma süresi dolmadan alıcının açık onayıyla başlandığından ve hizmet elektronik ortamda anında ifa edildiğinden alıcının cayma hakkı bulunmamaktadır.</>,
              <><strong className="text-fg">Ayıplı ifa:</strong> Plus hakları hesaba tanımlanmazsa veya ilan edilen nitelikleri taşımazsa alıcı, 6502 sayılı Kanun’un 15. maddesindeki seçimlik haklarını kullanabilir. Bu durumda e-posta ile başvurmanız yeterlidir.</>,
              <><strong className="text-fg">Değişiklik:</strong> Plus hakları, Kullanım Koşulları’nın 11. maddesinde sayılan haklı sebepler olmadıkça alıcının aleyhine daraltılmaz.</>,
              <><strong className="text-fg">Diğer hükümler:</strong> Bu sözleşmede düzenlenmeyen hususlarda{' '}<a className="text-fg hover:underline" href="/sartlar">Kullanım Koşulları</a> uygulanır. Kişisel verilerin işlenmesi{' '}<a className="text-fg hover:underline" href="/kvkk">KVKK Aydınlatma Metni</a>’nde açıklanmıştır.</>,
              <><strong className="text-fg">Yetki:</strong> Uyuşmazlıklarda tüketici hakem heyetleri ve tüketici mahkemeleri görevlidir; alıcı başvurusunu yerleşim yerindeki veya işlemin yapıldığı yerdeki merciye yapabilir.</>,
            ]}
          />
          <Callout>
            <p>
              Ön bilgilendirme formunun ve bu sözleşmenin satın alma anındaki metni, satın alma teyidi e-postasıyla
              kayıtlı e-posta adresinize gönderilir. Sözleşme metni işlem tarihinden itibaren 10 yıl saklanır ve bu süre
              içinde talep etmeniz halinde <MailLink email={CONTROLLER.email} subject="Plus sözleşme kopyası" />{' '}
              adresinden size yeniden iletilir. Bu sayfayı yazdırarak veya PDF olarak kaydederek de saklayabilirsiniz.
            </p>
          </Callout>
        </Section>
      </LegalPage>
    </>
  )
}
