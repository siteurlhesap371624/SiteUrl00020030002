import { Callout, LegalPage, LegalTable, List, MailLink, Section, SubSection } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { CONTROLLER, CONTROLLER_LINE, LEGAL_UPDATED, LEGAL_VERSIONS } from '@/content/legal/entity'
import { DOMESTIC_RECIPIENTS, PAST_RECIPIENTS, RECIPIENTS_ABROAD, RETENTION } from '@/content/legal/data'

const TOC = [
  { id: 'ozet', title: 'Kısaca' },
  { id: 'sorumlu', title: 'Veri sorumlusu ve kapsam' },
  { id: 'veriler', title: 'Hangi verileri işliyoruz' },
  { id: 'amaclar', title: 'Verileri ne için kullanıyoruz' },
  { id: 'yapay-zeka', title: 'Yapay zeka modelleri ve mesajlarınız' },
  { id: 'android', title: 'Android uygulaması' },
  { id: 'egitim', title: 'Model geliştirme' },
  { id: 'aktarim', title: 'Kimlerle paylaşıyoruz' },
  { id: 'gecmis', title: 'Geçmişte kullanılan hizmetler' },
  { id: 'saklama', title: 'Ne kadar saklıyoruz' },
  { id: 'guvenlik', title: 'Güvenlik' },
  { id: 'otomatik', title: 'Otomatik kararlar' },
  { id: 'cocuklar', title: 'Çocuklar' },
  { id: 'haklar', title: 'Haklarınız ve hesap silme' },
  { id: 'ihlal', title: 'Veri ihlali' },
  { id: 'degisiklik', title: 'Değişiklikler ve iletişim' },
]

export default function Privacy() {
  return (
    <>
      <SeoHead title="Gizlilik politikası" path="/gizlilik" />
      <LegalPage
        title="Gizlilik politikası"
        lastUpdated={LEGAL_UPDATED}
        version={LEGAL_VERSIONS.privacy}
        toc={TOC}
        intro={
          <p>
            Bu politika; Marul AI internet sitesini, Android uygulamasını ve bunlara bağlı hizmetleri kullandığınızda
            hangi kişisel verileri işlediğimizi, neden işlediğimizi, kimlere aktardığımızı, ne kadar sakladığımızı ve
            haklarınızı açıklar. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki resmi
            bilgilendirmemiz <a className="text-fg hover:underline" href="/kvkk">KVKK Aydınlatma Metni</a>’nde yer alır.
          </p>
        }
      >
        <Section id="ozet" number={1} title="Kısaca">
          <Callout>
            <List
              items={[
                'Verilerinizi satmıyoruz, reklam amacıyla kullanmıyor ve reklam ağlarıyla paylaşmıyoruz.',
                'Sitede analiz, reklam veya izleme çerezi bulunmuyor.',
                'Mesajlarınız, yanıt üretilebilmesi için seçtiğiniz modele iletilir. Qwen3.6 ABD’deki Groq altyapısında, Yedikule ise kontrolümüzdeki bir bilgisayarda çalışır.',
                'Sohbetleriniz yalnızca ayrıca açık rıza verirseniz model geliştirmede kullanılır; bu seçenek varsayılan olarak kapalıdır.',
                'Hesabınızı uygulama veya web üzerinden dilediğiniz zaman kalıcı olarak silebilirsiniz.',
              ]}
            />
          </Callout>
        </Section>

        <Section id="sorumlu" number={2} title="Veri sorumlusu ve kapsam">
          <p>
            Veri sorumlusu {CONTROLLER_LINE}. Bize <MailLink email={CONTROLLER.email} /> adresinden
            ulaşabilirsiniz.
          </p>
          <p>
            Bu politika marulai.com.tr, api.marulai.com.tr, Marul AI Android uygulaması ve Sosyal (forum) bölümü
            için geçerlidir. Bağlantı verdiğimiz üçüncü taraf sitelerin (ör. Hugging Face, Google Play, sosyal medya
            hesaplarımız) veri uygulamaları kendi politikalarına tabidir.
          </p>
        </Section>

        <Section id="veriler" number={3} title="Hangi verileri işliyoruz">
          <LegalTable
            caption="İşlenen kişisel veri kategorileri"
            head={['Kategori', 'Veriler', 'Nasıl toplanır']}
            rows={[
              ['Hesap', 'Ad soyad, e-posta adresi, şifrenin geri döndürülemez özeti, Google ile girişte Google hesap kimliği, kayıt tarihi, son kullanım tarihi', 'Kayıt formu, Google ile giriş'],
              ['Sohbet', 'Mesajlarınız, model yanıtları, sohbet başlıkları, seçilen model ve mod, kişiselleştirme talimatınız, mesaj ve token kullanım istatistikleri', 'Hizmeti kullanmanızla'],
              ['Agent ve web araması', 'Görev metinleri, modelin oluşturduğu arama sorguları, okunan sayfa adresleri ve içerikleri, üretilen dosyalar', 'Agent veya web araması özelliğini kullanmanızla'],
              ['Sosyal bölüm', 'Kullanıcı adı, paylaşımlar, yanıtlar, beğeniler, yüklenen görseller, yaptığınız bildirimler, moderasyon kayıtları', 'Sosyal bölümü kullanmanızla'],
              ['Satın alma', 'Google Play satın alma anahtarı, sipariş numarası, ürün ve durum bilgisi. Kart bilgileriniz bize iletilmez.', 'Android uygulaması ve Google Play'],
              ['Teknik ve güvenlik', 'IP adresi, tarayıcı ve cihaz bilgisi, istek zamanı, oturum anahtarı kimliği, bot koruma doğrulama sonucu, hata kayıtları', 'Otomatik olarak, hizmeti kullandığınızda'],
              ['Onay kayıtları', 'Onayladığınız metin ve sürümü, onay tarihi, IP adresi, tarayıcı bilgisi, e-posta adresinizin geri döndürülemez özeti', 'Kayıt ve onay ekranları'],
              ['İletişim', 'Bize gönderdiğiniz e-postalar ve ekleri', 'E-posta'],
            ]}
          />
          <SubSection title="Misafir kullanım">
            <p>
              Hesap açmadan kullandığınızda mesajlarınız yalnızca yanıt üretilmesi için sunucumuza ve seçtiğiniz
              modele iletilir, sunucumuzda kaydedilmez. Misafir sohbet geçmişi yalnızca cihazınızda tutulur.
              Kötüye kullanımı önlemek için IP adresiniz kısa süreli sayaçlarda işlenir.
            </p>
          </SubSection>
          <SubSection title="Özel nitelikli kişisel veriler">
            <p>
              Sağlık, din, etnik köken, siyasi düşünce, cinsel hayat veya biyometrik veri gibi özel nitelikli
              kişisel verileri sizden talep etmiyoruz ve sohbetlerde paylaşmamanızı öneriyoruz. Bu tür verileri
              kendi isteğinizle paylaşmak isterseniz{' '}
              <a className="text-fg hover:underline" href="/acik-riza#ozel-nitelikli">isteğe bağlı açık rızanızı</a>{' '}
              verebilirsiniz; bu durumda veriler yalnızca size yanıt üretilmesi ve sohbet geçmişinizin saklanması
              amacıyla işlenir, başka bir amaçla kullanılmaz, sınıflandırılmaz, profil çıkarmak için
              değerlendirilmez ve model geliştirmede kullanılmaz.
            </p>
            <p>
              Sistemimiz özel nitelikli kişisel verileri otomatik olarak tespit etmez ve ayırmaz; yazdığınız her
              mesaj, rıza verip vermemenizden bağımsız olarak aynı şekilde saklanır ve seçtiğiniz modele iletilir.
              Açık rıza vermediyseniz bu tür verileri yazmamanızı rica ederiz. Yazdığınızı fark ederseniz ilgili
              sohbeti dilediğiniz an silebilir veya silinmesini bizden talep edebilirsiniz; talebiniz üzerine sohbet
              derhal silinir.
            </p>
          </SubSection>
        </Section>

        <Section id="amaclar" number={4} title="Verileri ne için kullanıyoruz">
          <List
            items={[
              'Hesabınızı oluşturmak, kimliğinizi doğrulamak ve oturumunuzu yönetmek',
              'Mesajlarınıza yanıt üretmek, sohbet geçmişinizi saklamak ve cihazlarınız arasında eşitlemek',
              'Agent görevlerini yürütmek, web araması yapmak ve istediğiniz dosyaları üretmek',
              'Sosyal bölümü işletmek, paylaşımları yayımlamak ve topluluk kurallarını uygulamak',
              'Plus satın alımlarını doğrulamak ve hesabınıza tanımlamak',
              'Kullanım sınırlarını uygulamak, kötüye kullanımı, spam’i ve saldırıları önlemek, hizmetin güvenliğini sağlamak',
              'Hataları tespit etmek ve hizmetin çalışmasını izlemek',
              'Talep ve şikâyetlerinizi yanıtlamak, sizi hizmetteki önemli değişiklikler hakkında bilgilendirmek',
              'Hukuki yükümlülüklerimizi yerine getirmek, yetkili makamların taleplerini karşılamak ve haklarımızı korumak',
              'Açık rıza vermeniz halinde dil modellerimizi geliştirmek',
            ]}
          />
          <p>Size pazarlama e-postası göndermiyoruz. Bunu ileride yapmak istersek önceden onayınızı alırız.</p>
        </Section>

        <Section id="yapay-zeka" number={5} title="Yapay zeka modelleri ve mesajlarınız">
          <List
            items={[
              <><strong className="text-fg">Yedikule:</strong> Kendi geliştirdiğimiz bu model, kontrolümüzdeki bir bilgisayarda çalışır. Mesajlarınız modele şifreli bir tünel hizmeti (ngrok) üzerinden iletilir ve Groq’a gönderilmez. İçerik iletim sırasında ngrok sunucularında çözülerek iletilir ve orada saklanmaz.</>,
              <><strong className="text-fg">Qwen3.6:</strong> Açık kaynak bu model, ABD merkezli Groq, Inc. altyapısında çalıştırılır. Mesajınız, sohbet geçmişinin modele verilen bölümü, adınız ve kişiselleştirme talimatınız yanıt üretilmesi için Groq’a iletilir. Bu sohbetlerin başlıkları da Groq üzerinden üretilir. Qwen3.6 yanıt veremediğinde yanıt, aynı Groq altyapısında çalışan yedek açık kaynak modellerle üretilebilir.</>,
              <><strong className="text-fg">Agent ve web araması:</strong> Model, isteğinize göre arama sorguları oluşturabilir ve internet sayfalarını okuyabilir. Sorgular kendi arama altyapımız üzerinden arama motorlarına, gerektiğinde Brave Search veya Tavily’ye iletilir; sayfalar sunucumuz tarafından getirilir. Sorgulara adınız, e-posta adresiniz, hesap bilgileriniz ve IP adresiniz eklenmez, ancak sorguların içeriği mesajınızdan türetilebilir. Arama motorları sorguları kendi adlarına veri sorumlusu olarak işler; bu nedenle mesajlarınıza ve görevlerinize kişisel veri yazmamanızı rica ederiz.</>,
            ]}
          />
          <p>
            Groq ve ngrok, kendilerine iletilen verileri yalnızca hizmetin sunulması amacıyla, veri işleyen olarak
            bizim adımıza işler. Mesajlarınıza başkalarına ait kişisel veri, şifre, banka bilgisi veya gizli bilgi
            yazmamanızı öneririz.
          </p>
        </Section>

        <Section id="android" number={6} title="Android uygulaması">
          <List
            items={[
              'Sesli kullanım: Mikrofon izni verip sesli modu kullanırsanız konuşmanız, cihazınızda varsayılan olarak tanımlı konuşma tanıma servisi (çoğu cihazda Google) tarafından metne dönüştürülür. Ses kaydınız bize iletilmez; yalnızca metne dönüştürülmüş hali mesaj olarak gönderilir. Yanıtların sesli okunması cihazınızdaki metin okuma motoruyla yapılır.',
              'Oturum anahtarınız ve tercihleriniz cihazınızda şifrelenmiş olarak saklanır ve cihaz yedeklerine dahil edilmez.',
              'Plus satın alımları Google Play Faturalandırma sistemiyle yapılır; ödeme bilgileriniz Google tarafından işlenir ve bize iletilmez.',
              'Uygulama reklam, analiz veya hata izleme yazılımı içermez.',
            ]}
          />
        </Section>

        <Section id="egitim" number={7} title="Model geliştirme">
          <p>
            Sohbetleriniz, yalnızca <a className="text-fg hover:underline" href="/acik-riza">Açık Rıza Metni</a> ile
            ayrıca açık rıza vermeniz halinde ve bu metinde açıklanan şekilde, anonim hale getirildikten sonra
            Yedikule ve sonraki Marul AI modellerinin geliştirilmesinde kullanılır. Rıza vermemeniz hizmetten
            yararlanmanızı etkilemez ve rızanızı dilediğiniz zaman geri alabilirsiniz. Rıza vermemiş kullanıcıların
            sohbetleri, geçmiş sohbetler dahil, bu amaçla kullanılmaz.
          </p>
        </Section>

        <Section id="aktarim" number={8} title="Kimlerle paylaşıyoruz">
          <p>
            Kişisel verilerinizi yalnızca hizmeti sunabilmek için gereken hizmet sağlayıcılarına, aşağıda belirtilen
            amaçlarla ve gerekli olduğu ölçüde aktarırız. Groq, Inc., Cloudflare, Inc., Resend ve ngrok, Inc. veri
            işleyen olarak bizim adımıza ve yazılı talimatlarımız doğrultusunda çalışır. Google LLC, GitHub, Inc. ve
            arama motorları ise kendilerine iletilen verileri kendi adlarına veri sorumlusu olarak işler.
          </p>
          <SubSection title="Yurt dışındaki hizmet sağlayıcılar">
            <LegalTable
              caption="Yurt dışındaki hizmet sağlayıcılar"
              head={['Sağlayıcı', 'Konum', 'Amaç', 'Aktarılan veriler', 'Ne zaman']}
              rows={RECIPIENTS_ABROAD.map((r) => [r.name, r.location, r.role, r.data, r.when])}
            />
            <p>
              Bu aktarımlar hizmetin sunulması (KVKK md. 5/2-c) ve güvenliğinin sağlanması (KVKK md. 5/2-f)
              amaçlarıyla yapılır. Kişisel Verileri Koruma Kurulu ABD için yeterlilik kararı vermemiştir. Veri
              işleyen sağlayıcılarla KVKK’nın 9. maddesi uyarınca Kurulca ilan edilen standart sözleşmeler imzalanır
              ve imza tarihinden itibaren beş iş günü içinde Kurula bildirilir. Google ile giriş, Google Play
              ödemesi ve sitemizin barındırılması sırasında yapılan aktarımlar, sizinle kurduğumuz sözleşmenin ifası
              için zorunlu olan ve sizin işleminizle başlayan aktarımlardır. Arama motorlarıyla standart sözleşme
              imzalanması mümkün olmadığından arama sorgularına kimlik bilgileriniz eklenmez. Sağlayıcı bazında güncel
              durumu bize başvurarak öğrenebilirsiniz. Yurt dışına aktarılan verilerinize ilişkin haklarınızı her
              durumda bize karşı kullanabilirsiniz.
            </p>
            <p>
              Google ile giriş yaptığınızda ve Google Play üzerinden ödeme yaptığınızda bilgilerinizi doğrudan
              Google’a iletirsiniz; bu işlemler Google’ın kendi gizlilik politikasına tabidir. Google ile girişte
              Google, e-posta adresinizi, adınızı ve Google hesap kimliğinizi bize iletir.
            </p>
          </SubSection>
          <SubSection title="Yurt içindeki alıcılar">
            <List items={DOMESTIC_RECIPIENTS.map((r) => <><strong className="text-fg">{r.name}:</strong> {r.role}</>)} />
          </SubSection>
          <p>
            Hizmetin tamamının veya bir bölümünün bir şirkete ya da başka bir kişiye devredilmesi halinde verileriniz,
            bu politikadaki güvencelerle birlikte devralan tarafa aktarılabilir; bu durumda sizi önceden
            bilgilendiririz.
          </p>
        </Section>

        <Section id="gecmis" number={9} title="Geçmişte kullanılan hizmetler">
          <p>
            Şeffaflık amacıyla, artık kullanmadığımız ancak geçmişte verilerinizin aktarıldığı hizmetleri de
            listeliyoruz:
          </p>
          <LegalTable
            caption="Geçmişte kullanılan hizmetler"
            head={['Sağlayıcı', 'Konum', 'Amaç', 'Aktarılan veriler', 'Durum']}
            rows={PAST_RECIPIENTS.map((r) => [r.name, r.location, r.role, r.data, r.when])}
          />
        </Section>

        <Section id="saklama" number={10} title="Ne kadar saklıyoruz">
          <p>
            Verilerinizi işleme amacının gerektirdiği süre boyunca ve mevzuatta öngörülen süreler kadar saklarız.
            Süre dolduğunda veriler silinir, yok edilir veya anonim hale getirilir.
          </p>
          <LegalTable
            caption="Saklama süreleri"
            head={['Veri', 'Saklama süresi']}
            rows={RETENTION.map((r) => [r.data, r.period])}
          />
        </Section>

        <Section id="guvenlik" number={11} title="Güvenlik">
          <List
            items={[
              'Site, uygulama ve sunucumuz arasındaki tüm iletişim HTTPS ile şifrelenir.',
              'Şifreler geri döndürülemez özet (hash) olarak saklanır; düz metin şifre tutulmaz.',
              'Oturum anahtarları imzalıdır ve süreyle sınırlıdır; çıkış yaptığınızda geçersiz kılınır.',
              'Sunucumuza yalnızca şifreli ve kimlik doğrulamalı bağlantılarla, yetkili kişi tarafından erişilir.',
              'Giriş ve kayıt formları otomatik saldırılara karşı bot koruması ve hız sınırlarıyla korunur.',
              'Agent özelliğinin internetten sayfa getirmesi, iç ağa ve özel adreslere erişimi engelleyen kontrollerle sınırlandırılmıştır.',
            ]}
          />
          <p>
            Hiçbir sistem tamamen güvenli değildir. Şifrenizi başka hizmetlerde kullanmamanızı ve şüpheli bir durumda
            derhal değiştirmenizi öneririz.
          </p>
        </Section>

        <Section id="otomatik" number={12} title="Otomatik kararlar">
          <p>
            Mesaj ve görev sınırları, hız sınırları, spam önleme kontrolleri ve Cloudflare Turnstile bot doğrulaması
            otomatik olarak uygulanır; sınır aşıldığında veya doğrulama başarısız olduğunda işleminiz geçici olarak
            reddedilebilir. Sosyal bölümdeki erişim kısıtlamaları yönetici
            kararıyla uygulanır. Bu işlemlerin aleyhinize bir sonuç doğurduğunu düşünüyorsanız KVKK’nın 11. maddesi
            uyarınca itiraz edebilirsiniz.
          </p>
        </Section>

        <Section id="cocuklar" number={13} title="Çocuklar">
          <p>
            Hizmet 13 yaşından küçükler için tasarlanmamıştır ve 13 yaşından küçüklerin hesap oluşturması yasaktır. 13
            ile 18 yaş arasındaki kullanıcılar hizmeti yalnızca veli veya vasilerinin onayıyla kullanabilir. 13
            yaşından küçük bir çocuğa ait veri işlediğimizi fark etmemiz veya bu yönde bildirim almamız halinde ilgili
            hesabı ve verileri sileriz. Sosyal (forum) bölümü yalnızca 15 yaşını doldurmuş kullanıcılara açıktır.
          </p>
        </Section>

        <Section id="haklar" number={14} title="Haklarınız ve hesap silme">
          <p>
            KVKK’nın 11. maddesi kapsamındaki haklarınızı (bilgi talep etme, düzeltme, silme, itiraz, zararın
            giderilmesini talep etme ve diğerleri) ve başvuru usulünü{' '}
            <a className="text-fg hover:underline" href="/kvkk">KVKK Aydınlatma Metni</a>’nde ayrıntılı olarak
            bulabilirsiniz. Başvurularınızı en geç 30 gün içinde sonuçlandırırız. Başvurular kural olarak
            ücretsizdir; işlemin ayrıca bir maliyet gerektirmesi halinde Kurulca belirlenen tarifedeki ücret
            alınabilir.
          </p>
          <SubSection title="Hesabınızı nasıl silersiniz">
            <List
              items={[
                'Web: Sohbet ekranında sol menüdeki “Plan ve hesap” bölümünü açın ve “Hesabımı sil” seçeneğini kullanın.',
                'Android: Profil ekranındaki “Hesabımı sil” seçeneğini kullanın.',
                <>E-posta: Kayıtlı e-posta adresinizden <MailLink email={CONTROLLER.email} subject="Hesap silme talebi" /> adresine yazın; talebiniz en geç 30 gün içinde yerine getirilir.</>,
              ]}
            />
            <p>
              Hesabınızı sildiğinizde hesap bilgileriniz, sohbetleriniz, kişiselleştirme talimatınız, agent kayıtlarınız,
              çalışma alanı dosyalarınız, Sosyal bölüm profiliniz, paylaşımlarınız ve Plus durumunuz derhal silinir.
              Kanunen saklanması zorunlu olan satın alma işlem kayıtları ve trafik bilgileri, olası uyuşmazlıklarda
              ispat için gereken onay, moderasyon ve silme kayıtları ise yukarıdaki tabloda belirtilen süreler boyunca
              saklanır ve süre sonunda silinir. Silinen veriler sunucu kayıtlarından ve yedeklerden en geç 30 gün
              içinde temizlenir.
            </p>
          </SubSection>
          <p>
            Haklarınızın ihlal edildiğini düşünüyorsanız Kişisel Verileri Koruma Kurulu’na şikâyette bulunabilirsiniz.
          </p>
        </Section>

        <Section id="ihlal" number={15} title="Veri ihlali">
          <p>
            Kişisel verilerinizin kanuni olmayan yollarla başkaları tarafından elde edildiğini öğrenmemiz halinde,
            durumu mevzuatta öngörülen sürede Kişisel Verileri Koruma Kurulu’na ve etkilenen kullanıcılara bildiririz.
          </p>
        </Section>

        <Section id="degisiklik" number={16} title="Değişiklikler ve iletişim">
          <p>
            Bu politikayı veri işleme faaliyetlerimizdeki değişikliklere göre güncelleriz. Güncel sürüm her zaman bu
            sayfada yayımlanır; önemli değişiklikleri ayrıca e-posta veya uygulama içi bildirimle duyururuz.
            Sorularınız için <MailLink email={CONTROLLER.email} subject="Gizlilik" /> adresine yazabilirsiniz.
          </p>
        </Section>
      </LegalPage>
    </>
  )
}
