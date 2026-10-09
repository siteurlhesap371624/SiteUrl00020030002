import { LegalPage, LegalTable, List, MailLink, Section } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { CONTROLLER, CONTROLLER_LINE, LEGAL_UPDATED, LEGAL_VERSIONS } from '@/content/legal/entity'
import { DOMESTIC_RECIPIENTS, RECIPIENTS_ABROAD } from '@/content/legal/data'

const TOC = [
  { id: 'veri-sorumlusu', title: 'Veri sorumlusu' },
  { id: 'isleme', title: 'İşlenen veriler, amaçlar ve hukuki sebepler' },
  { id: 'yontem', title: 'Toplama yöntemi' },
  { id: 'aktarim', title: 'Aktarım' },
  { id: 'saklama', title: 'Saklama ve imha' },
  { id: 'haklar', title: 'Haklarınız' },
  { id: 'basvuru', title: 'Başvuru yöntemi' },
]

export default function Kvkk() {
  return (
    <>
      <SeoHead title="KVKK aydınlatma metni" path="/kvkk" />
      <LegalPage
        title="KVKK aydınlatma metni"
        lastUpdated={LEGAL_UPDATED}
        version={LEGAL_VERSIONS.privacy}
        toc={TOC}
        intro={
          <p>
            Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (KVKK) 10. maddesi ve Aydınlatma
            Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, Marul AI
            hizmetlerini kullanan kişileri bilgilendirmek amacıyla hazırlanmıştır. Daha ayrıntılı ve sade anlatım için{' '}
            <a className="text-fg hover:underline" href="/gizlilik">Gizlilik Politikası</a>’na bakabilirsiniz.
          </p>
        }
      >
        <Section id="veri-sorumlusu" number={1} title="Veri sorumlusu">
          <p>
            Kişisel verileriniz, veri sorumlusu sıfatıyla {CONTROLLER_LINE} tarafından işlenmektedir.
          </p>
          <List
            items={[
              <>E-posta: <MailLink email={CONTROLLER.email} /></>,
              <>İnternet sitesi: {CONTROLLER.website}</>,
              CONTROLLER.postalAddress ? <>Adres: {CONTROLLER.postalAddress}</> : <>Konum: {CONTROLLER.city}</>,
            ]}
          />
        </Section>

        <Section id="isleme" number={2} title="İşlenen veriler, amaçlar ve hukuki sebepler">
          <LegalTable
            caption="Kişisel veri kategorileri, işleme amaçları ve hukuki sebepler"
            head={['Veri kategorisi', 'Veriler', 'İşleme amaçları', 'Hukuki sebep (KVKK md. 5 ve 6)']}
            rows={[
              ['Kimlik', 'Ad soyad; Sosyal bölüm kullanıcı adı', 'Üyelik kaydı, hesabın yönetimi, kişiselleştirilmiş hitap, Sosyal bölümde paylaşımların sahibinin gösterilmesi', '(c) Sözleşmenin kurulması ve ifası'],
              ['İletişim', 'E-posta adresi', 'Üyelik, e-posta doğrulama, şifre sıfırlama, hizmet ve sözleşme değişikliklerine ilişkin bildirimler, taleplerin yanıtlanması', '(c) Sözleşmenin kurulması ve ifası; (ç) hukuki yükümlülük'],
              ['Müşteri işlem', 'Sohbet mesajları ve yanıtlar, sohbet başlıkları, kişiselleştirme talimatı, agent görevleri, arama sorguları, üretilen dosyalar, kullanım istatistikleri, satın alma anahtarı ve sipariş bilgisi', 'Yapay zeka hizmetinin sunulması, sohbet geçmişinin saklanması, agent görevlerinin yürütülmesi, Plus haklarının doğrulanması ve tanımlanması, kullanım sınırlarının uygulanması', '(c) Sözleşmenin kurulması ve ifası'],
              ['Sosyal bölüm içerikleri ve görseller', 'Paylaşımlar, yanıtlar, beğeniler, yüklenen görseller, bildirimler', 'Sosyal bölümün işletilmesi, içeriklerin yayımlanması, topluluk kurallarının uygulanması', '(c) Sözleşmenin kurulması ve ifası; (f) meşru menfaat'],
              ['İşlem güvenliği', 'IP adresi, tarayıcı ve cihaz bilgisi, oturum anahtarı kimliği, şifre özeti, bot koruma doğrulama sonucu, hız sınırı sayaçları, hata kayıtları', 'Bilgi güvenliğinin sağlanması, kötüye kullanımın, spam’in ve yetkisiz erişimin önlenmesi, hataların tespiti', '(f) Meşru menfaat; (ç) hukuki yükümlülük'],
              ['Hukuki işlem', 'Onay kayıtları, moderasyon kayıtları, KVKK başvuruları ve yazışmalar', 'Sözleşmenin ve onayların ispatı, hukuki uyuşmazlıkların yönetimi, yetkili makam taleplerinin karşılanması, başvuruların yanıtlanması', '(e) Bir hakkın tesisi, kullanılması veya korunması; (ç) hukuki yükümlülük'],
              ['Trafik bilgisi', 'Sosyal bölümdeki paylaşım işlemlerine ait IP adresi, bağlantı noktası, zaman ve işlem türü', '5651 sayılı Kanun’un 5. maddesindeki yer sağlayıcı yükümlülüğünün yerine getirilmesi', '(a) Kanunlarda açıkça öngörülmesi; (ç) hukuki yükümlülük'],
              ['Satın alma işlem kayıtları', 'Sipariş numarası, ürün, tarih, satın alma anahtarının ve e-posta adresinin geri döndürülemez özetleri', '6563 sayılı Kanun’un 11. maddesinin üçüncü fıkrasındaki kayıt saklama yükümlülüğü; satın alımın başka bir hesapta kullanılmasının önlenmesi ve aynı e-posta adresiyle açılan yeni hesaba geri yüklenmesi', '(a) Kanunlarda açıkça öngörülmesi; (c) sözleşmenin ifası; (ç) hukuki yükümlülük; (f) meşru menfaat'],
              ['Model geliştirme', 'Açık rıza vermeniz halinde sohbet içerikleri', 'Yedikule ve sonraki Marul AI dil modellerinin anonim hale getirilmiş veriyle eğitimi ve değerlendirilmesi', 'KVKK md. 5/1 uyarınca açık rıza'],
              ['Özel nitelikli veriler', 'Sohbetlere kendi isteğinizle yazdığınız sağlık, inanç ve benzeri veriler', 'Yalnızca size yanıt üretilmesi ve sohbet geçmişinizin saklanması', 'KVKK md. 6/3-a uyarınca açık rıza'],
            ]}
          />
          <p>
            Özel nitelikli kişisel verilerinizi sizden talep etmiyoruz ve sohbetlerde paylaşmamanızı öneriyoruz. Açık
            rızaya dayanan işlemler{' '}
            <a className="text-fg hover:underline" href="/acik-riza">Açık Rıza Metni</a>’nde ayrıca açıklanmıştır ve
            isteğe bağlıdır.
          </p>
        </Section>

        <Section id="yontem" number={3} title="Toplama yöntemi">
          <p>
            Kişisel verileriniz; internet sitemiz ve Android uygulamamız üzerinden
            doldurduğunuz formlar, gönderdiğiniz mesajlar ve yüklediğiniz içerikler, Google ile giriş yapmanız halinde
            Google’dan alınan bilgiler, Google Play üzerinden yapılan satın alma bildirimleri, e-posta yazışmaları ve
            hizmeti kullanırken sistemlerimiz tarafından otomatik olarak oluşturulan kayıtlar aracılığıyla, elektronik
            ortamda, kısmen veya tamamen otomatik yollarla toplanır.
          </p>
        </Section>

        <Section id="aktarim" number={4} title="Aktarım">
          <p>
            Kişisel verileriniz, yukarıdaki amaçların gerçekleştirilmesi için gerekli olduğu ölçüde aşağıdaki
            alıcı gruplarına aktarılır:
          </p>
          <LegalTable
            caption="Yurt dışındaki alıcılar"
            head={['Alıcı', 'Konum', 'Aktarım amacı']}
            rows={RECIPIENTS_ABROAD.map((r) => [r.name, r.location, r.role])}
          />
          <List items={DOMESTIC_RECIPIENTS.map((r) => <><strong className="text-fg">{r.name}:</strong> {r.role}</>)} />
          <p>
            Yurt dışındaki sağlayıcılara aktarım hizmetin sunulması (KVKK md. 5/2-c) ve güvenliğinin sağlanması
            (KVKK md. 5/2-f) amaçlarıyla yapılır. Kişisel Verileri Koruma Kurulu ABD için yeterlilik kararı
            vermemiştir; bu nedenle yurt dışına iletilen verileriniz Türkiye’deki koruma düzeyini sağlamayabilecek bir
            hukuk düzeninde işlenebilir. Veri işleyen sıfatıyla çalışan sağlayıcılar (Groq, Cloudflare, Resend, ngrok)
            verileri bizim adımıza, kendi hizmet şartları çerçevesinde ve yalnızca hizmetin sunulması amacıyla
            işler. Google, GitHub ve arama motorları kendilerine iletilen verileri kendi
            adlarına veri sorumlusu olarak işler; arama sorgularına kimlik bilgileriniz eklenmez. Hangi verinin hangi sağlayıcıya, hangi durumda aktarıldığı ile geçmişte kullanılan hizmetler Gizlilik
            Politikası’nda ayrıntılı olarak açıklanmıştır.
          </p>
        </Section>

        <Section id="saklama" number={5} title="Saklama ve imha">
          <p>
            Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen süreler boyunca
            saklanır; sürelerin sona ermesiyle silinir, yok edilir veya anonim hale getirilir. Veri türlerine göre
            saklama süreleri Gizlilik Politikası’ndaki tabloda yer alır.
          </p>
        </Section>

        <Section id="haklar" number={6} title="Haklarınız">
          <p>KVKK’nın 11. maddesi uyarınca veri sorumlusuna başvurarak;</p>
          <List
            items={[
              'Kişisel verilerinizin işlenip işlenmediğini öğrenme,',
              'Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,',
              'Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,',
              'Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,',
              'Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,',
              'KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,',
              'Düzeltme, silme veya yok etme işlemlerinin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,',
              'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,',
              'Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
            ]}
          />
          <p>haklarına sahipsiniz. Açık rızanıza dayanan işlemler bakımından rızanızı dilediğiniz zaman geri alabilirsiniz.</p>
        </Section>

        <Section id="basvuru" number={7} title="Başvuru yöntemi">
          <p>
            Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca başvurunuzu Türkçe olarak aşağıdaki
            yöntemlerden biriyle iletebilirsiniz:
          </p>
          <List
            items={[
              <>Hesabınızda kayıtlı e-posta adresinizden <MailLink email={CONTROLLER.email} subject="KVKK başvurusu" /> adresine e-posta göndererek,</>,
              'Hesabınız yoksa veya kayıtlı e-posta adresinize erişemiyorsanız, güvenli elektronik imza ya da mobil imza ile imzaladığınız başvuruyu aynı e-posta adresine ileterek,',
              CONTROLLER.postalAddress
                ? `Islak imzalı yazılı başvurunuzu ${CONTROLLER.postalAddress} adresine posta yoluyla göndererek veya elden teslim ederek.`
                : 'Islak imzalı yazılı başvurunuzu posta yoluyla göndererek; posta adresimizi yukarıdaki e-posta adresinden öğrenebilirsiniz.',
            ]}
          />
          <p>
            Başvurunuzda adınız, soyadınız, yazılı başvurularda imzanız, T.C. kimlik numaranız (yabancılar için uyruk
            ve pasaport numarası), tebligata esas yerleşim yeri veya iş yeri adresiniz, varsa bildirime esas e-posta
            adresiniz ve telefon numaranız ile talep konunuzun bulunması gerekir. Kimliğinizi doğrulayabilmemiz için ek
            bilgi isteyebiliriz.
          </p>
          <p>
            Başvurunuz, talebin niteliğine göre en kısa sürede ve en geç 30 gün içinde sonuçlandırılır. Başvurular
            kural olarak ücretsizdir; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulu tarafından belirlenen
            tarifedeki ücret alınabilir. Başvurunuzun reddedilmesi, verilen cevabı yetersiz bulmanız veya süresinde
            cevap verilmemesi hâlinde; cevabı öğrendiğiniz tarihten itibaren 30 gün ve her hâlde başvuru tarihinden
            itibaren 60 gün içinde Kişisel Verileri Koruma Kurulu’na şikâyette bulunabilirsiniz.
          </p>
        </Section>
      </LegalPage>
    </>
  )
}
