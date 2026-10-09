import { LegalPage, LegalTable, List, MailLink, Section } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { CONTROLLER, LEGAL_UPDATED, LEGAL_VERSIONS } from '@/content/legal/entity'

const TOC = [
  { id: 'nedir', title: 'Çerez ve yerel depolama nedir' },
  { id: 'kullandiklarimiz', title: 'Kullandığımız teknolojiler' },
  { id: 'kullanmadiklarimiz', title: 'Kullanmadığımız teknolojiler' },
  { id: 'hukuki-sebep', title: 'Hukuki sebep' },
  { id: 'gecmis', title: 'Önceki site sürümü' },
  { id: 'yonetim', title: 'Tercihlerinizi yönetme' },
  { id: 'mobil', title: 'Android uygulaması' },
  { id: 'degisiklik', title: 'Değişiklikler ve iletişim' },
]

export default function Cookies() {
  return (
    <>
      <SeoHead title="Çerez politikası" path="/cerez-politikasi" />
      <LegalPage
        title="Çerez ve yerel depolama politikası"
        lastUpdated={LEGAL_UPDATED}
        version={LEGAL_VERSIONS.privacy}
        toc={TOC}
        intro={
          <p>
            Bu politika, marulai.com.tr adresini ziyaret ettiğinizde tarayıcınızda hangi bilgilerin saklandığını ve
            neden saklandığını açıklar. Kısaca: reklam, analiz veya izleme amaçlı çerez kullanmıyoruz. Yalnızca
            hizmetin çalışması ve güvenliği için zorunlu olan kayıtları kullanıyoruz; bu nedenle sitemizde çerez
            onay penceresi bulunmaz.
          </p>
        }
      >
        <Section id="nedir" number={1} title="Çerez ve yerel depolama nedir">
          <p>
            Çerezler, ziyaret ettiğiniz internet sitesinin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Yerel
            depolama (localStorage) ve oturum depolama (sessionStorage) ise tarayıcının her site için ayırdığı ve
            yalnızca o sitenin okuyabildiği saklama alanlarıdır. Bu politikada bu teknolojilerin tamamı birlikte ele
            alınır.
          </p>
        </Section>

        <Section id="kullandiklarimiz" number={2} title="Kullandığımız teknolojiler">
          <p>Aşağıdaki kayıtların tamamı hizmetin sunulması için zorunludur.</p>
          <LegalTable
            caption="Kullanılan çerez ve yerel depolama kayıtları"
            head={['Kayıt', 'Tür ve sağlayıcı', 'Amaç', 'Saklama süresi']}
            rows={[
              ['marul.auth.token', 'Yerel depolama, Marul AI', 'Oturumunuzu açık tutan imzalı oturum anahtarı', 'Çıkış yapana veya oturum süresi dolana kadar'],
              ['marul.auth.user', 'Yerel depolama, Marul AI', 'Adınızın ve e-posta adresinizin arayüzde gösterilmesi', 'Çıkış yapana kadar'],
              ['marul.guest.chats, marul.guest.left', 'Yerel depolama, Marul AI', 'Misafir sohbetlerinin ve kalan soru hakkının yalnızca cihazınızda tutulması', 'Siz silene kadar'],
              ['marul.chat.model, marul.chat.mode', 'Yerel depolama, Marul AI', 'Seçtiğiniz modelin ve yanıt modunun hatırlanması', 'Siz silene kadar'],
              ['marul.ui.sidebarCollapsed', 'Yerel depolama, Marul AI', 'Kenar çubuğu görünüm tercihinin hatırlanması', 'Siz silene kadar'],
              ['marul.oauth.state, marul.oauth.redirect', 'Oturum depolama, Marul AI', 'Google ile girişte sahte istekleri engelleyen güvenlik değeri ve dönüş adresi', 'Sekme kapatılana kadar'],
              ['marul.gate.token', 'Yerel depolama, Marul AI', 'Misafir sohbetinde güvenlik doğrulamasını tamamladığınızı gösteren imzalı anahtar', '24 saat'],
              ['marul.registration', 'Oturum depolama, Marul AI', 'E-posta doğrulamasının kaydı başlattığınız tarayıcıda tamamlandığını gösteren güvenlik değeri', 'Doğrulama tamamlanana veya sekme kapatılana kadar'],
              ['Cloudflare Turnstile', 'Üçüncü taraf, Cloudflare, Inc.', 'Giriş, kayıt ve şifre sıfırlama formlarında ve misafir sohbetinde otomatik (bot) istekleri ayırt etmek', 'Cloudflare’in kendi politikalarına göre'],
              ['Cloudflare güvenlik çerezleri (ör. __cf_bm)', 'Üçüncü taraf, Cloudflare, Inc.', 'Sitemize ve sunucumuza gelen kötü amaçlı trafiği ayırt etmek; Cloudflare gerekli gördüğünde ayarlar', 'Genellikle 30 dakika'],
            ]}
          />
          <p>
            Google ile giriş yapmayı seçerseniz, giriş işlemi Google’ın kendi sayfasında gerçekleşir ve Google kendi
            alan adında kendi çerezlerini kullanır. Bu çerezler Google’ın gizlilik politikasına tabidir.
          </p>
        </Section>

        <Section id="kullanmadiklarimiz" number={3} title="Kullanmadığımız teknolojiler">
          <List
            items={[
              'Google Analytics veya benzeri ziyaretçi analizi araçları',
              'Reklam, yeniden hedefleme veya dönüşüm ölçümü çerezleri',
              'Sosyal medya izleme pikselleri',
              'Sizi siteler arasında takip eden veya profil çıkaran herhangi bir teknoloji',
            ]}
          />
          <p>
            Sitemizin yazı tipleri kendi sunucumuzdan yüklenir; bu nedenle sayfaları görüntülemeniz yazı tipi
            sağlayıcılarına bilgi aktarmaz.
          </p>
        </Section>

        <Section id="hukuki-sebep" number={4} title="Hukuki sebep">
          <p>
            Yukarıdaki kayıtlar, talep ettiğiniz hizmetin sunulması için zorunlu olduğundan 6698 sayılı Kişisel
            Verilerin Korunması Kanunu’nun 5. maddesinin ikinci fıkrasının (c) bendi (sözleşmenin kurulması ve ifası)
            ve güvenlik amaçlı olanlar bakımından (f) bendi (meşru menfaat) kapsamında kullanılır. Kişisel Verileri
            Koruma Kurumu’nun çerez uygulamalarına ilişkin rehberi uyarınca zorunlu çerezler için açık rıza
            alınması gerekmez.
          </p>
        </Section>

        <Section id="gecmis" number={5} title="Önceki site sürümü">
          <p>
            Mayıs 2026’dan önce yayında olan önceki site sürümünde Google Analytics (ziyaret istatistikleri), Google
            AdSense (reklam) ve Cloudflare Web Analytics hizmetleri kullanılıyordu; Google hizmetleri tarayıcıya çerez
            yerleştiriyordu. Önceki sürüm ayrıca oturum için 7 gün geçerli çerezler (__mt, __mu) ve yerel depolama
            kayıtları kullanıyordu. Bu araçlar mevcut siteden tamamen kaldırılmıştır ve mevcut site, önceki sürümün
            tarayıcınızda kalmış olabilecek kendi kayıtlarını ilk ziyaretinizde otomatik olarak siler. O dönemde
            Google tarafından toplanan veriler Google’ın kendi saklama ayarlarına tabidir.
          </p>
        </Section>

        <Section id="yonetim" number={6} title="Tercihlerinizi yönetme">
          <p>
            Tarayıcınızın ayarlarından çerezleri ve site verilerini dilediğiniz zaman silebilir veya
            engelleyebilirsiniz. Marul AI kayıtlarını silerseniz oturumunuz kapanır ve cihazınızdaki misafir
            sohbetleri kaybolur; hesabınıza bağlı sohbetleriniz sunucumuzda saklanmaya devam eder. Zorunlu kayıtları
            engellemeniz halinde giriş yapma ve sohbet gibi özellikler çalışmayabilir.
          </p>
        </Section>

        <Section id="mobil" number={7} title="Android uygulaması">
          <p>
            Android uygulaması kendi çerezini kullanmaz. Oturum anahtarınız, adınız, e-posta adresiniz ve model
            tercihleriniz cihazınızın uygulamaya ayrılmış alanında, cihaz anahtarıyla şifrelenmiş olarak tutulur ve
            uygulamayı kaldırdığınızda silinir. Giriş, kayıt ve şifre sıfırlama ekranlarındaki Cloudflare Turnstile doğrulaması
            uygulama içindeki bir web görünümünde çalışır ve Cloudflare’in kendi kayıtlarını kullanabilir.
          </p>
        </Section>

        <Section id="degisiklik" number={8} title="Değişiklikler ve iletişim">
          <p>
            Zorunlu olmayan bir çerez veya benzeri teknoloji kullanmaya başlamamız halinde bunu bu politikada
            açıklar ve kullanmadan önce açık rızanızı alırız. Sorularınız için{' '}
            <MailLink email={CONTROLLER.email} subject="Çerez politikası" /> adresine yazabilirsiniz.
          </p>
        </Section>
      </LegalPage>
    </>
  )
}
