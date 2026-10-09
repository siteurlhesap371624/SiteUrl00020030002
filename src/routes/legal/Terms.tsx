import { Callout, LegalPage, List, MailLink, Section, SubSection } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { CONTROLLER, LEGAL_UPDATED, LEGAL_VERSIONS } from '@/content/legal/entity'

const TOC = [
  { id: 'taraflar', title: 'Taraflar ve tanımlar' },
  { id: 'kurulus', title: 'Sözleşmenin kurulması ve kapsamı' },
  { id: 'ehliyet', title: 'Yaş ve ehliyet' },
  { id: 'hesap', title: 'Hesap ve güvenlik' },
  { id: 'yapay-zeka', title: 'Hizmetin kapsamı ve yapay zeka çıktıları' },
  { id: 'kurallar', title: 'Kullanım kuralları ve yasaklar' },
  { id: 'icerik', title: 'Kullanıcı içeriği ve lisans' },
  { id: 'fikri-mulkiyet', title: 'Fikri mülkiyet' },
  { id: 'sosyal', title: 'Sosyal (forum) bölümü' },
  { id: 'plus', title: 'Ücretsiz kullanım, Plus ve ödemeler' },
  { id: 'degisiklik-hizmet', title: 'Hizmette değişiklik ve kesintiler' },
  { id: 'fesih', title: 'Askıya alma ve sona erme' },
  { id: 'sorumluluk', title: 'Sorumluluk' },
  { id: 'kullanici-sorumlulugu', title: 'Kullanıcının sorumluluğu ve tazmin' },
  { id: 'tacir', title: 'Tüketici sıfatı taşımayan kullanıcılar' },
  { id: 'kisisel-veri', title: 'Kişisel veriler' },
  { id: 'bildirim', title: 'Bildirimler' },
  { id: 'kosul-degisikligi', title: 'Koşulların değiştirilmesi' },
  { id: 'delil', title: 'Kayıtlar ve delil' },
  { id: 'mucbir', title: 'Mücbir sebepler' },
  { id: 'hukuk', title: 'Uygulanacak hukuk ve uyuşmazlıklar' },
  { id: 'son', title: 'Son hükümler' },
]

export default function Terms() {
  return (
    <>
      <SeoHead title="Kullanım koşulları" path="/sartlar" />
      <LegalPage
        title="Kullanım koşulları"
        lastUpdated={LEGAL_UPDATED}
        version={LEGAL_VERSIONS.terms}
        toc={TOC}
        intro={
          <>
            <p>
              Bu Kullanım Koşulları, Marul AI hizmetlerinden yararlanmanıza ilişkin olarak sizinle aramızdaki
              sözleşmedir. Lütfen dikkatle okuyun. Hesap oluştururken veya güncellenen koşulların onay ekranında ilgili
              kutucuğu işaretlediğinizde bu koşulları kabul etmiş olursunuz.
            </p>
            <Callout title="Özellikle dikkatinize sunduğumuz hükümler">
              <List
                items={[
                  'Yapay zeka yanıtları hatalı, eksik veya güncel olmayan bilgi içerebilir; yanıtları doğrulamak ve kullanımından doğan sonuçlar sizin sorumluluğunuzdadır (madde 5).',
                  'Yüklediğiniz, yazdığınız ve paylaştığınız içerikten ve bu içeriğin üçüncü kişilerin haklarına uygunluğundan siz sorumlusunuz (madde 6, 7 ve 9).',
                  'Sorumluluğumuz kanuna ve kusura dayanır; çıktıları doğrulamadan kullanmanızdan doğan zararlar size aittir (madde 13) ve kusurlu davranışınızdan doğan zararları tazmin etmeyi kabul edersiniz (madde 14).',
                  'Plus, satın alındığı anda etkinleşen dijital bir hizmettir; cayma hakkına ilişkin istisna madde 10’da açıklanmıştır.',
                ]}
              />
            </Callout>
          </>
        }
      >
        <Section id="taraflar" number={1} title="Taraflar ve tanımlar">
          <p>
            Bu sözleşmenin bir tarafı, {CONTROLLER.tradeName} adıyla faaliyet gösteren ve {CONTROLLER.brand} hizmetinin
            sahibi ve işleteni olan {CONTROLLER.person}’tur (bundan sonra “Marul AI”, “biz” veya “hizmet sağlayıcı”).
            İletişim adresimiz <MailLink email={CONTROLLER.email} />’dir. Diğer taraf, hizmete internet sitesi veya
            Android uygulaması üzerinden erişen gerçek kişidir (bundan sonra “kullanıcı” veya “siz”).
          </p>
          <List
            items={[
              <><strong className="text-fg">Hizmet:</strong> marulai.com.tr, api.marulai.com.tr ve Marul AI Android uygulaması üzerinden sunulan yapay zeka sohbet, agent (web araştırması, dosya üretimi ve benzeri çok adımlı görevler), Sosyal (forum) bölümü ve bunlarla ilgili tüm hizmetler.</>,
              <><strong className="text-fg">Misafir kullanıcı:</strong> Hesap oluşturmadan, sınırlı sayıda soruyla hizmeti deneyen kullanıcı.</>,
              <><strong className="text-fg">Girdi:</strong> Hizmete gönderdiğiniz mesajlar, görev metinleri, kişiselleştirme talimatları, dosyalar, görseller ve Sosyal bölümdeki paylaşımlarınız.</>,
              <><strong className="text-fg">Çıktı:</strong> Yapay zeka modellerinin girdilerinize karşılık ürettiği yanıtlar, özetler, kodlar, tablolar ve diğer dosyalar.</>,
              <><strong className="text-fg">Plus:</strong> Google Play üzerinden tek seferlik ödemeyle satın alınan ve hesabınıza ek kullanım hakları tanıyan dijital hizmet.</>,
            ]}
          />
        </Section>

        <Section id="kurulus" number={2} title="Sözleşmenin kurulması ve kapsamı">
          <p>
            Sözleşme; kayıt ekranında, Google ile ilk girişinizde veya güncellenen koşulların onay ekranında, önceden
            işaretlenmemiş onay kutucuğunu işaretleyip işlemi tamamlamanızla elektronik ortamda kurulur. Onayınızın
            tarihi, metnin sürümü, IP adresiniz ve onayın verildiği kanal ispat amacıyla kayıt altına alınır. Bu
            metnin güncel hali her zaman bu sayfada yayımlanır; sayfayı yazdırabilir veya PDF olarak
            kaydedebilirsiniz. Önceki sürümler <a className="text-fg hover:underline" href="/yasal-arsiv">yasal metin arşivinde</a> yayımlanır.
          </p>
          <p>
            Misafir kullanıcılar için bu koşullar, sohbet ekranındaki bilgilendirmeyle dikkatlerine sunulduktan sonra
            ilk mesajın gönderilmesiyle, misafir kullanıma uygulanabilen hükümleriyle sınırlı olarak geçerli olur.
          </p>
          <p>
            <a className="text-fg hover:underline" href="/gizlilik">Gizlilik Politikası</a>,{' '}
            <a className="text-fg hover:underline" href="/kvkk">KVKK Aydınlatma Metni</a> ve{' '}
            <a className="text-fg hover:underline" href="/cerez-politikasi">Çerez Politikası</a> kişisel verilerinizin
            işlenmesine ilişkin bilgilendirme metinleridir; sözleşme hükmü niteliği taşımaz. Model geliştirmeye
            ilişkin <a className="text-fg hover:underline" href="/acik-riza">açık rıza</a> bu sözleşmeden bağımsızdır
            ve isteğe bağlıdır.
          </p>
        </Section>

        <Section id="ehliyet" number={3} title="Yaş ve ehliyet">
          <List
            items={[
              'Hizmeti 18 yaşını doldurmuş ve ayırt etme gücüne sahip kişiler kullanabilir.',
              '13 ile 18 yaş arasındaki kişiler hizmeti yalnızca veli veya vasilerinin onayı ve gözetimi altında kullanabilir ve hesap oluşturmadan önce bu onayı almakla yükümlüdür. Onay bulunmadığı anlaşılan hesaplar, veli veya vasinin talebi üzerine kapatılır.',
              '13 yaşından küçük kişilerin hizmeti kullanması ve hesap oluşturması yasaktır.',
              'Sosyal (forum) bölümünü yalnızca 15 yaşını doldurmuş kullanıcılar kullanabilir.',
              '18 yaşından küçükler Plus satın alma işlemini yalnızca veli veya vasilerinin onayıyla yapabilir. Veli veya vasi onayı olmadan yapılmış bir satın alma için veli veya vasinin talebi üzerine iade sağlanır.',
              'Yaşınıza ilişkin beyanınızın doğru olmasından siz sorumlusunuz. Gerçeğe aykırı beyanda bulunulduğunu tespit edersek hesabı askıya alabilir veya kapatabiliriz.',
            ]}
          />
        </Section>

        <Section id="hesap" number={4} title="Hesap ve güvenlik">
          <List
            items={[
              'Kayıt sırasında doğru, güncel ve size ait bilgiler vermeniz gerekir. Başkası adına veya başkasına ait e-posta adresiyle hesap açamazsınız.',
              'Hesabınız kişiseldir; başkasına devredilemez, satılamaz, kiralanamaz veya ortak kullanıma açılamaz.',
              'Şifrenizin ve oturum açtığınız cihazların güvenliğinden siz sorumlusunuz. Hesabınızda yetkisiz bir işlem fark ederseniz derhal şifrenizi değiştirmeli ve bize bildirmelisiniz.',
              'Hesabınızın yetkisiz kişilerce kullanılmasından doğan zararlardan kendi kusurunuz oranında sorumlusunuz.',
              'Kullanım sınırlarını aşmak amacıyla birden fazla hesap açmak yasaktır.',
            ]}
          />
        </Section>

        <Section id="yapay-zeka" number={5} title="Hizmetin kapsamı ve yapay zeka çıktılarının niteliği">
          <p>
            Marul AI bir yapay zeka hizmetidir. Yanıtlar, kendi geliştirdiğimiz Yedikule modeli ve açık kaynak Qwen3.6
            modeli gibi dil modelleri tarafından otomatik olarak üretilir; bir insan tarafından yazılmaz veya
            gönderilmeden önce kontrol edilmez.
          </p>
          <List
            items={[
              'Çıktılar hatalı, eksik, güncel olmayan, yanıltıcı, tutarsız veya taraflı olabilir. Modeller gerçekte var olmayan bilgi, kaynak, kişi, kanun maddesi veya bağlantı üretebilir.',
              'Agent modunda yapılan web araştırmaları üçüncü kişilerin internet sitelerine dayanır. Bu sitelerin içeriği tarafımızca doğrulanmaz; doğruluğu ve güncelliği ilgili site sahiplerinin sorumluluğundadır.',
              'Çıktılar tıbbi, hukuki, mali, yatırım, psikolojik, mühendislik veya diğer herhangi bir mesleki tavsiye yerine geçmez. Sağlığınızı, hukuki durumunuzu, mal varlığınızı veya güvenliğinizi etkileyebilecek kararlar için yetkin bir uzmana danışmalısınız. Acil durumlarda 112’yi arayın.',
              'Çıktıları kullanmadan, yayımlamadan, başkalarıyla paylaşmadan veya bunlara dayanarak karar vermeden önce doğruluğunu ve uygunluğunu kendiniz kontrol etmekle yükümlüsünüz. Çıktıların kullanımı ve bu kullanımın sonuçları sizin sorumluluğunuzdadır.',
              'Üretilen kodları, betikleri, formülleri ve dosyaları gerçek sistemlerde kullanmadan önce güvenli bir ortamda incelemeli ve test etmelisiniz.',
              'Güvenlik filtreleri bazı istekleri reddedebilir veya yanıtları sınırlayabilir. Filtreler kusursuz değildir; uygunsuz bir çıktıyla karşılaşırsanız bize bildirmenizi rica ederiz.',
              'Yedikule deneysel bir modeldir ve zaman zaman kullanılamayabilir. Hizmette sunulan modelleri, sürümlerini ve sağlayıcılarını değiştirebiliriz.',
              'Ücretsiz ve misafir kullanım, mevcut kapasite ölçüsünde ve en iyi çaba esasıyla sunulur; belirli bir erişilebilirlik süresi veya yanıt hızı taahhüdü içermez.',
              'Sohbet geçmişi ve agent tarafından üretilen dosyalar, Gizlilik Politikası’nda belirtilen süreler boyunca saklanır. Önemli içeriklerin bir kopyasını kendiniz saklamanızı öneririz.',
              'Mevzuatın gerektirmesi halinde yapay zeka ile üretilen içeriklere bunu belirten etiket veya işaret ekleyebiliriz.',
            ]}
          />
        </Section>

        <Section id="kurallar" number={6} title="Kullanım kuralları ve yasaklar">
          <p>Hizmeti yalnızca hukuka ve bu koşullara uygun biçimde kullanabilirsiniz. Özellikle aşağıdakiler yasaktır:</p>
          <List
            items={[
              'Türkiye Cumhuriyeti mevzuatına aykırı içerik üretmek, istemek veya yaymak; suç işlemek, suça teşvik etmek veya suçu övmek',
              'Çocukların istismarına ilişkin her türlü içerik; müstehcenlik, şiddet veya nefret içeren, ayrımcı, tehdit edici ya da taciz edici içerik',
              'Silah, patlayıcı, uyuşturucu üretimi, zararlı yazılım geliştirme, bilişim sistemlerine yetkisiz erişim, dolandırıcılık veya kimlik avı gibi zarar verici faaliyetlere yönelik kullanım',
              'Başkalarının kişilik haklarını, özel hayatını, ticari sırlarını, fikri ve sınai mülkiyet haklarını ihlal etmek',
              'Başkalarına ait kişisel verileri hukuki bir dayanak olmaksızın hizmete girmek, işlemek veya ifşa etmek',
              'Başka bir kişi, kurum veya Marul AI yetkilisiymiş gibi davranmak; çıktıları insan tarafından yazılmış gibi sunarak başkalarını yanıltmak',
              'Hizmetin güvenlik önlemlerini, hız ve kullanım sınırlarını, bot korumasını veya model güvenlik filtrelerini aşmaya çalışmak',
              'Hizmete otomatik araçlarla (bot, kazıyıcı, betik) erişmek, aşırı yük bindirmek, tersine mühendislik yapmak veya modelleri ya da sistem talimatlarını kopyalamaya çalışmak',
              'Hizmete erişimi ücret karşılığında veya ücretsiz olarak üçüncü kişilere yeniden satmak, kiralamak veya sunmak',
              'İstenmeyen ticari ileti (spam), reklam veya yanıltıcı içerik yaymak',
              'Seçimleri, kamuoyunu veya piyasaları yanıltmaya yönelik toplu içerik üretmek',
              'Agent ve web araması özelliklerini belirli kişiler hakkında bilgi toplamak, bu kişileri izlemek veya profillerini çıkarmak amacıyla kullanmak',
            ]}
          />
          <p>
            Sağlık, din, etnik köken, siyasi düşünce gibi özel nitelikli kişisel verilerinizi ve başkalarına ait
            kişisel verileri sohbetlerde paylaşmamanızı öneririz. Bu tür verileri kendi isteğinizle paylaşmanız
            halinde ne şekilde işlendiği Gizlilik Politikası’nda açıklanmıştır.
          </p>
        </Section>

        <Section id="icerik" number={7} title="Kullanıcı içeriği ve lisans">
          <SubSection title="Girdileriniz">
            <p>
              Girdileriniz üzerindeki haklarınız size aittir. Hizmete gönderdiğiniz her girdi için gerekli tüm hak,
              izin ve onaylara sahip olduğunuzu ve girdilerinizin üçüncü kişilerin fikri mülkiyet, kişilik ve kişisel
              veri haklarını ihlal etmediğini beyan ve taahhüt edersiniz.
            </p>
            <p>
              Hizmeti sunabilmemiz için her girdiyi gönderdiğiniz anda, o girdi bakımından bize; saklama ve
              yedekleme amacıyla çoğaltma, teknik gereklilikler ölçüsünde biçimini dönüştürme ve yanıt üretilmesi için
              yapay zeka modellerine ve Gizlilik Politikası’nda belirtilen hizmet sağlayıcılara iletme izni verirsiniz.
              Bu izin yalnızca hizmetin size sunulması, güvenliğinin sağlanması ve hukuki yükümlülüklerin yerine
              getirilmesi amacıyla, münhasır olmayan ve bedelsiz olarak verilir; girdiyi veya hesabınızı sildiğinizde
              sona erer.
            </p>
            <p>
              Girdileriniz ve çıktılarınız, ayrıca açık rıza vermediğiniz sürece model geliştirme amacıyla
              kullanılmaz.
            </p>
          </SubSection>
          <SubSection title="Çıktılar">
            <p>
              Mevzuatın izin verdiği ölçüde çıktılar üzerinde size karşı hak iddia etmeyiz; çıktıları bu koşullara ve
              hukuka uygun olmak kaydıyla ticari amaçlar dahil dilediğiniz gibi kullanabilirsiniz.
              Yapay zeka tarafından üretilen içeriklerin fikir ve sanat eseri niteliği taşıyıp taşımadığı mevzuata
              göre değerlendirilir. Benzer girdilere başka kullanıcılara da aynı veya benzer çıktılar üretilebilir.
              Çıktıların üçüncü kişilerin haklarını ihlal etmediğini garanti etmeyiz; bir çıktıyı kullanmadan önce bu
              hususu kontrol etmek sizin sorumluluğunuzdadır.
            </p>
          </SubSection>
        </Section>

        <Section id="fikri-mulkiyet" number={8} title="Fikri mülkiyet">
          <p>
            Marul AI adı ve logosu, internet sitesi ve uygulamanın tasarımı, yazılımı, sistem talimatları ve
            hizmetin diğer tüm unsurları üzerindeki haklar bize veya lisans verenlerimize aittir. Bu sözleşme size
            hizmeti kişisel olarak kullanma hakkı dışında bir hak vermez. Yedikule model ağırlıkları Hugging Face
            üzerinde ayrı bir açık lisansla yayımlanır; bu ağırlıkların kullanımı o lisansa tabidir.
          </p>
        </Section>

        <Section id="sosyal" number={9} title="Sosyal (forum) bölümü">
          <List
            items={[
              'Sosyal bölüm, yapay zeka hizmetimize eşlik eden ikincil bir topluluk özelliğidir. Burada yaptığınız paylaşımlar, yanıtlar ve yüklediğiniz görseller herkese açık olarak yayımlanır ve kullanıcı adınızla birlikte görüntülenir. Paylaşmadan önce kişisel bilgi içerip içermediğini kontrol edin.',
              'Paylaşımlarınızın içerik sağlayıcısı sizsiniz ve 5651 sayılı Kanun uyarınca paylaştığınız içerikten bizzat sorumlusunuz. Biz, kullanıcı paylaşımları bakımından yer sağlayıcı, kendi sayfalarımız ve duyurularımız bakımından içerik sağlayıcıyız.',
              'Paylaşımları önceden kontrol etme veya hukuka aykırı bir faaliyetin olup olmadığını araştırma yükümlülüğümüz yoktur. Bize bildirilen içeriği inceler, mevzuata veya topluluk kurallarına aykırı bulduğumuz içeriği yayından kaldırırız.',
              'Topluluk kuralları gereğince hakaret, taciz, tehdit, nefret söylemi, başkalarının özel hayatını ifşa eden veya izinsiz çekilmiş görüntüleri içeren paylaşımlar, spam, reklam, yanıltıcı içerik, başkalarına ait kişisel veriler ve telif hakkı ihlali yasaktır. Kullanıcı adınız başkasını taklit edemez, yanıltıcı veya uygunsuz olamaz.',
              'Paylaşımlarınızın yayımlanabilmesi için her içeriği yüklediğiniz anda, o içerik bakımından bize; içeriğin sunucularımızda saklanması, yedeklenmesi, önbelleğe alınması ve küçük görsellerinin oluşturulması amacıyla çoğaltma (FSEK md. 22), Sosyal bölümde ve paylaşım bağlantılarında gösterilmesi amacıyla umuma iletim (FSEK md. 25) ve yalnızca teknik gereklilikler ölçüsünde biçim ve boyut değişikliği yapma (FSEK md. 21) haklarını, münhasır olmayan ve bedelsiz olarak tanırsınız. Bu izin, içeriği veya hesabınızı sildiğinizde sona erer. Sildiğiniz içerik yayından hemen kaldırılır, hukuki taleplere yanıt verebilmek amacıyla kaldırma tarihinden itibaren 1 yıl saklanır ve süre sonunda silinir; hesabınızı sildiğinizde ise derhal silinir. Yedeklerdeki kopyalar en geç 30 gün içinde silinir. İçerikleriniz pazarlamada veya model eğitiminde kullanılmaz.',
              'Bir paylaşımın hukuka aykırı olduğunu veya haklarınızı ihlal ettiğini düşünüyorsanız paylaşımdaki “Bildir” seçeneğini kullanabilir ya da içeriğin adresini, gerekçenizi ve iletişim bilgilerinizi e-posta ile bize iletebilirsiniz. Bildirimleri en geç 48 saat içinde incelemeyi hedefleriz. Gerekçeli telif hakkı bildirimlerinde ilgili içerik en geç 3 gün içinde yayından kaldırılır.',
              'Mahkeme ve yetkili idari makam kararları, mevzuatta öngörülen süreler içinde uygulanır. Resmi bildirimler İletişim sayfasındaki e-posta adresine yapılabilir.',
              'Kurallara aykırı içerikleri kaldırabilir, ilgili hesabın Sosyal bölüme veya hizmetin tamamına erişimini 12. maddede sayılan haklı sebeplerle geçici ya da kalıcı olarak kısıtlayabiliriz. İçeriği kaldırılan kullanıcıya, mümkün olan hallerde gerekçe bildirilir ve e-posta ile itiraz imkânı tanınır.',
            ]}
          />
        </Section>

        <Section id="plus" number={10} title="Ücretsiz kullanım, Plus ve ödemeler">
          <SubSection title="Ücretsiz ve misafir kullanım">
            <p>
              Ücretsiz ve misafir kullanımın sınırları (mesaj sayısı, agent görevi sayısı ve benzerleri) fiyatlandırma
              sayfasında ve uygulamada ilan edilir. Ücretsiz hizmetin kapsamını ve sınırlarını yalnızca 11. maddede
              sayılan sebeplerle değiştirebiliriz; değişiklikler fiyatlandırma sayfasında ilan edilir.
            </p>
          </SubSection>
          <SubSection title="Plus">
            <List
              items={[
                'Plus şu anda yalnızca Android uygulaması içinden, Google Play üzerinden tek seferlik ödemeyle satın alınabilir. Otomatik olarak yenilenmez ve tekrar eden bir ödeme içermez. Satış fiyatı, vergiler dahil olarak satın alma anında gösterilen tutardır.',
                'Plus’ın satıcısı ve hizmet sağlayıcısı Marul AI’dır. Ödeme, Google Play aracılığıyla Google tarafından tahsil edilir; kart veya ödeme bilgileriniz bize iletilmez. Satın alma işlemi ayrıca Google Play Hizmet Şartları’na tabidir.',
                'Plus’ın sağladığı haklar satın alma anında ilan edilen haklardır. “Sınırsız” olarak ifade edilen haklar; hizmetin güvenliği ve diğer kullanıcıların adil kullanımı için uygulanan teknik hız sınırları ve kötüye kullanım önlemleri saklı kalmak kaydıyla sunulur.',
                'Plus, satın alındığı hesaba tanımlanır, başka bir hesaba devredilemez ve hesabınız açık kaldığı ve hizmet sunulduğu sürece geçerlidir. Hesabınızı silmeniz halinde Plus hakkınız sona erer; silmeden önce bir iade talebiniz varsa bize yazabilirsiniz.',
                'Plus, cayma süresi dolmadan açık onayınızla ifasına başlanan ve elektronik ortamda anında ifa edilen bir hizmettir. Bu nedenle Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinin birinci fıkrasının (h) ve (ğ) bentleri uyarınca cayma hakkı bulunmamaktadır. Satın alma öncesinde bu konudaki açık onayınız ayrıca alınır.',
                'Plus haklarını, aşağıdaki 11. maddede sayılan haklı sebepler olmadıkça aleyhinize daraltmayız. Haklı bir sebeple esaslı bir daraltma gerekirse bunu en az 30 gün önceden bildiririz; bu durumda kanundan doğan haklarınız saklıdır ve talebiniz üzerine kullanılmayan süreye isabet eden bedel aşağıdaki esasla iade edilir.',
                'Plus bedeli 24 aylık kullanım süresi esas alınarak belirlenmiştir. Bu süre dolmadan hizmeti tamamen sona erdirmemiz, hesabınızı haklı bir sebep olmaksızın kapatmamız veya aleyhinize olan bir koşul değişikliğini onaylamamanız halinde, talebiniz üzerine bedelin kullanılmayan aylara isabet eden kısmı size iade edilir.',
                'Plus ile ilgili iade ve şikâyet taleplerinizi Google Play’in iade süreci üzerinden veya doğrudan bize e-posta ile iletebilirsiniz. Tüketici olarak kanundan doğan haklarınız saklıdır.',
                <>Plus’a ilişkin ön bilgilendirme formu ve mesafeli satış sözleşmesi{' '}<a className="text-fg hover:underline" href="/plus-satis-sozlesmesi">ayrı bir sayfada</a> yayımlanır ve bu koşulların ayrılmaz parçasıdır.</>,
                'Hizmeti tamamen sona erdirmeye karar vermemiz halinde bunu en az 30 gün önceden duyururuz ve yukarıdaki esasla iade yaparız.',
              ]}
            />
          </SubSection>
        </Section>

        <Section id="degisiklik-hizmet" number={11} title="Hizmette değişiklik ve kesintiler">
          <p>Hizmetin özelliklerini, modellerini, sağlayıcılarını ve kullanım sınırlarını yalnızca şu haklı sebeplerle değiştirebiliriz:</p>
          <List
            items={[
              'Mevzuat değişikliği, mahkeme veya idari makam kararı',
              'Hizmetin, kullanıcıların veya sistemlerimizin güvenliğinin gerektirmesi; kötüye kullanımın önlenmesi',
              'Model, altyapı veya ödeme sağlayıcılarımızın hizmetini sonlandırması ya da koşullarını veya fiyatlarını değiştirmesi',
              'Yeni özellik eklenmesi, mevcut bir özelliğin eşdeğer veya daha iyi bir özellikle değiştirilmesi',
              'Kullanımı çok düşük kalan bir özelliğin sürdürülmesinin makul olmaması',
            ]}
          />
          <p>
            Ücretli haklarınızı etkileyen değişikliklerde 10. maddedeki güvenceler uygulanır. Hizmet; planlı bakım,
            güncelleme, arıza veya kontrolümüz dışındaki altyapı sorunları nedeniyle geçici olarak kesintiye
            uğrayabilir. Planlı bakımları mümkün olduğunca önceden duyururuz.
          </p>
        </Section>

        <Section id="fesih" number={12} title="Askıya alma ve sona erme">
          <List
            items={[
              'Hesabınızı dilediğiniz zaman, uygulama veya web üzerinden kalıcı olarak silerek bu sözleşmeyi sona erdirebilirsiniz.',
              'Şu haklı sebeplerden birinin varlığı halinde hesabınızı veya bir özelliğe erişiminizi geçici olarak askıya alabilir ya da kalıcı olarak kapatabiliriz: mevzuata aykırı kullanım; 6. maddedeki yasakların veya topluluk kurallarının ihlali; hizmetin veya diğer kullanıcıların güvenliğini tehlikeye atan davranış; spam, otomatik erişim veya kullanım sınırlarını aşmaya yönelik kötüye kullanım; ödeme veya iade süreçlerinin kötüye kullanılması; yetkili makamların talebi.',
              'Ağır olmayan ihlallerde önce uyarıda bulunuruz. Acil müdahale gerektiren haller dışında kararın gerekçesini size bildirir, e-posta ile yapacağınız itirazı değerlendiririz.',
              'Hesabınızın kapatılması halinde kanundan doğan iade haklarınız saklıdır. Hesabınızı haklı bir sebep olmaksızın kapatmamız gerekirse bunu en az 30 gün önceden bildiririz; Plus satın aldıysanız kullanılmayan süreye isabet eden bedel 10. maddedeki esasla iade edilir.',
              '24 ay boyunca hiç giriş yapılmayan ücretsiz hesapları, kayıtlı e-posta adresine bildirim gönderip en az 30 gün süre verdikten sonra kapatabiliriz.',
              'Sözleşmenin sona ermesi halinde verileriniz Gizlilik Politikası’nda belirtilen sürelerde silinir. Niteliği gereği sona ermeden sonra da uygulanması gereken hükümler (özellikle 7, 13, 14, 15, 19 ve 21. maddeler) geçerliliğini korur.',
            ]}
          />
        </Section>

        <Section id="sorumluluk" number={13} title="Sorumluluk">
          <List
            items={[
              'Sorumluluğumuz kanuna göre belirlenir ve kusurumuza dayanır. Hizmetin ve çıktıların niteliği 5. maddede tanımlanmıştır; çıktıların bu maddede açıklanan nitelikleri taşıması, hizmetin sözleşmeye aykırı olduğu anlamına gelmez.',
              'Çıktıları doğrulamadan kullanmanız veya çıktılara dayanarak karar vermeniz sonucunda doğan zararlar, 5. madde uyarınca sizin sorumluluğunuzdadır; bu zararların doğmasında kusurumuz bulunması hali saklıdır.',
              'Kusurumuz bulunmayan hallerde; özellikle sizin veya üçüncü kişilerin kusurundan, cihazınızdaki veya internet bağlantınızdaki sorunlardan, şifrenizin sizin kusurunuzla başkalarınca ele geçirilmesinden ve kusurumuz olmaksızın üçüncü taraf altyapı hizmetlerinde (ör. Google, Groq, Cloudflare) yaşanan kesinti ve hatalardan doğan zararlardan sorumlu değiliz. Yardımcı kişilerimizin ve altyapı sağlayıcılarımızın fiillerinden 6098 sayılı Türk Borçlar Kanunu’nun 116. maddesi uyarınca sorumluluğumuz saklıdır.',
              'Bu madde; kastımız veya ağır kusurumuz, kişilerin hayatına, vücut bütünlüğüne veya sağlığına verilen zararlar, kişisel verilerin korunmasına ilişkin kanuni yükümlülüklerimiz ve tüketici olarak 6502 sayılı Kanun’dan doğan haklarınız bakımından sorumluluğumuzu sınırlamaz.',
              'Tüketici sıfatı taşımayan kullanıcılar bakımından ayrıca 15. madde uygulanır.',
            ]}
          />
        </Section>

        <Section id="kullanici-sorumlulugu" number={14} title="Kullanıcının sorumluluğu ve tazmin">
          <p>
            Girdilerinizden, Sosyal bölümdeki paylaşımlarınızdan, çıktıları kullanma biçiminizden ve hizmeti bu
            koşullara veya mevzuata aykırı kullanmanızdan doğan hukuki, idari ve cezai sorumluluk size aittir. Hukuka
            aykırı içeriğiniz veya kullanımınız nedeniyle üçüncü kişilere ve bize verdiğiniz zarardan, kusurunuz
            oranında genel hükümlere göre sorumlusunuz. Bu nedenle üçüncü kişilere veya kamu kurumlarına ödemek
            zorunda kaldığımız tutarlar için 6098 sayılı Türk Borçlar Kanunu’nun 61 ve 62. maddeleri kapsamındaki rücu
            hakkımız saklıdır. Böyle bir talep olduğunda sizi bilgilendiririz ve savunmamıza katılmanıza imkân
            tanırız.
          </p>
        </Section>

        <Section id="tacir" number={15} title="Tüketici sıfatı taşımayan kullanıcılar">
          <p>
            Hizmeti ticari veya mesleki amaçlarla kullanan ve tüketici sıfatı taşımayan kullanıcılar bakımından,
            kastımız veya ağır kusurumuz ile kişilerin hayatına, vücut bütünlüğüne veya sağlığına verilen zararlar
            saklı kalmak kaydıyla:
          </p>
          <List
            items={[
              'Hafif kusurdan doğan sorumluluğumuz kaldırılmıştır.',
              'Kâr kaybı, iş kesintisi, veri kaybı, itibar kaybı ve diğer dolaylı zararlardan sorumlu değiliz.',
              'Toplam sorumluluğumuz, zarara yol açan olaydan önceki 12 ay içinde Marul AI için ödediğiniz toplam bedelle sınırlıdır.',
              'Yardımcı kişilerimizin ve altyapı sağlayıcılarımızın fiillerinden doğan sorumluluğumuz, kanunun izin verdiği ölçüde kaldırılmıştır.',
            ]}
          />
        </Section>

        <Section id="kisisel-veri" number={16} title="Kişisel veriler">
          <p>
            Kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması Kanunu’na uygun olarak işlenir. Ayrıntılar{' '}
            <a className="text-fg hover:underline" href="/kvkk">KVKK Aydınlatma Metni</a>,{' '}
            <a className="text-fg hover:underline" href="/gizlilik">Gizlilik Politikası</a> ve{' '}
            <a className="text-fg hover:underline" href="/cerez-politikasi">Çerez Politikası</a>’nda yer alır.
          </p>
        </Section>

        <Section id="bildirim" number={17} title="Bildirimler">
          <p>
            Size yapacağımız bildirimler kayıtlı e-posta adresinize, uygulama veya site içinde ya da bu sayfada
            yapılır. E-posta adresinizi güncel tutmak sizin sorumluluğunuzdadır. Bize yapacağınız bildirimleri{' '}
            <MailLink email={CONTROLLER.email} /> adresine iletebilirsiniz.
          </p>
        </Section>

        <Section id="kosul-degisikligi" number={18} title="Koşulların değiştirilmesi">
          <List
            items={[
              'Bu koşulları yalnızca 11. maddede sayılan haklı sebeplerle veya hizmetteki değişikliklerin gerektirdiği ölçüde güncelleyebiliriz.',
              'Aleyhinize olan değişiklikleri, yürürlüğe girmesinden en az 30 gün önce kayıtlı e-posta adresinize ve uygulama ya da site içinde bildiririz. Kanunun veya bir makam kararının daha kısa süre öngördüğü haller saklıdır.',
              'Güncellenen koşullar, hesabınıza giriş yaptığınızda gösterilen onay ekranında onaylamanızla sizin için yürürlüğe girer. Güncel koşulları onaylamadan hesabınızla hizmeti kullanmaya devam edemezsiniz; dilerseniz hesabınızı silebilirsiniz. Onaylayıncaya veya hesabınızı silinceye kadar önceki sürüm sizin için geçerliliğini korur.',
              'Yalnızca lehinize olan, yazım veya açıklık sağlamaya yönelik ya da kanunun zorunlu kıldığı değişiklikler yayımlandıkları tarihte yürürlüğe girer.',
              'Misafir kullanıcılar için güncel sürüm, yayımlandıktan sonraki ilk kullanımda uygulanır.',
            ]}
          />
        </Section>

        <Section id="delil" number={19} title="Kayıtlar ve delil">
          <p>
            Bu sözleşmeden doğabilecek uyuşmazlıklarda onay kayıtlarımız, veritabanı ve sunucu kayıtlarımız ile
            elektronik yazışmalar, 6100 sayılı Hukuk Muhakemeleri Kanunu çerçevesinde delil olarak kullanılabilir. Bu
            hüküm, karşı delil sunma hakkınızı ortadan kaldırmaz.
          </p>
        </Section>

        <Section id="mucbir" number={20} title="Mücbir sebepler">
          <p>
            Deprem, sel ve yangın gibi doğal afetler; salgın; savaş ve terör olayları; genel grev; geniş çaplı elektrik
            veya internet kesintisi; büyük ölçekli siber saldırılar; resmi makam kararları ve kusurumuz bulunmaksızın
            altyapı veya hizmet sağlayıcılarımızın hizmet dışı kalması mücbir sebep sayılır. Mücbir sebebin devam ettiği
            süre boyunca bundan etkilenen yükümlülüklerimizi yerine getirememekten sorumlu olmayız. Mücbir sebep
            nedeniyle uzun süreli kesinti yaşanması halinde Plus kullanıcılarının kanundan doğan hakları saklıdır.
          </p>
        </Section>

        <Section id="hukuk" number={21} title="Uygulanacak hukuk ve uyuşmazlıklar">
          <p>
            Bu sözleşmeye Türkiye Cumhuriyeti hukuku uygulanır. Bir sorun yaşadığınızda{' '}
            <MailLink email={CONTROLLER.email} /> adresinden bize ulaşabilirsiniz; bu yol isteğe bağlıdır ve
            aşağıdaki başvuru haklarınızı kullanmanızın ön şartı değildir.
          </p>
          <p>
            Tüketici sıfatıyla hareket ettiğiniz uyuşmazlıklarda, Ticaret Bakanlığınca her yıl ilan edilen parasal
            sınırlar dahilinde yerleşim yerinizdeki veya işlemin yapıldığı yerdeki tüketici hakem heyetine, bu
            sınırları aşan uyuşmazlıklarda arabulucuya başvurduktan sonra tüketici mahkemelerine başvurabilirsiniz.
            Türkiye dışında yaşayan tüketiciler bakımından, yaşadıkları ülkenin emredici tüketici koruma hükümleri
            saklıdır.
          </p>
          <p>
            Hizmet sağlayıcının da tacir sıfatını taşıdığı hallerde, tacir veya kamu tüzel kişisi olan kullanıcılarla
            doğacak uyuşmazlıklarda 6100 sayılı Hukuk Muhakemeleri Kanunu’nun 17. maddesi uyarınca İstanbul Merkez
            (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </Section>

        <Section id="son" number={22} title="Son hükümler">
          <List
            items={[
              'Bu koşulların herhangi bir hükmünün geçersiz sayılması, diğer hükümlerin geçerliliğini etkilemez; geçersiz hüküm, amacına en yakın geçerli hükümle uygulanır.',
              'Bir hakkımızı kullanmamamız veya geç kullanmamız, o haktan feragat ettiğimiz anlamına gelmez.',
              'Bu sözleşmeden doğan haklarınızı ve yükümlülüklerinizi önceden yazılı onayımız olmadan devredemezsiniz. Hizmetin bir şirkete veya başka bir kişiye devredilmesi halinde sözleşme, haklarınızı azaltmamak ve size önceden bildirimde bulunmak kaydıyla devralan tarafından sürdürülebilir.',
              `Bu koşullar ${LEGAL_UPDATED} tarihinde yayımlanmıştır (sürüm ${LEGAL_VERSIONS.terms}).`,
            ]}
          />
        </Section>
      </LegalPage>
    </>
  )
}
