import { Callout, LegalPage, List, MailLink, Section, SubSection } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { CONTROLLER, CONTROLLER_LINE, LEGAL_UPDATED, LEGAL_VERSIONS } from '@/content/legal/entity'

const TOC = [
  { id: 'genel', title: 'Bu metnin niteliği' },
  { id: 'egitim', title: 'Model geliştirme için açık rıza' },
  { id: 'ozel-nitelikli', title: 'Özel nitelikli kişisel veriler için açık rıza' },
  { id: 'geri-alma', title: 'Rızanın geri alınması' },
  { id: 'haklar', title: 'Haklarınız' },
]

export default function ExplicitConsent() {
  return (
    <>
      <SeoHead title="Açık rıza metni" path="/acik-riza" />
      <LegalPage
        title="Açık rıza metni"
        lastUpdated={LEGAL_UPDATED}
        version={LEGAL_VERSIONS.training}
        toc={TOC}
        intro={
          <p>
            Bu metin, Marul AI hizmetlerinde isteğe bağlı olarak verebileceğiniz iki ayrı açık rızanın kapsamını
            açıklar. Her rıza ayrı ayrı verilir ve ayrı ayrı geri alınabilir.
          </p>
        }
      >
        <Section id="genel" number={1} title="Bu metnin niteliği">
          <Callout>
            <p>
              Açık rıza vermek hizmetten yararlanmanın şartı değildir. Rıza vermemeniz hiçbir özelliğe, plana veya
              hakka erişiminizi etkilemez. Verdiğiniz rızayı dilediğiniz zaman, verdiğiniz kadar kolay biçimde geri
              alabilirsiniz.
            </p>
          </Callout>
          <p>
            Veri sorumlusu {CONTROLLER_LINE}. İletişim: <MailLink email={CONTROLLER.email} />. Bu metin 6698 sayılı
            Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında hazırlanmıştır. Hizmetin sunulması için yapılan diğer
            işlemler açık rızaya değil, <a className="text-fg hover:underline" href="/kvkk">KVKK Aydınlatma Metni</a>’nde
            belirtilen diğer hukuki sebeplere dayanır ve bu metnin konusu değildir.
          </p>
          <p>
            Rızalar; kayıt ekranında, güncellenen koşulların onay ekranında veya hesabınızdaki gizlilik tercihlerinde,
            her biri için ayrı ve önceden işaretlenmemiş seçimle verilir. Rızanın tarihi, metin sürümü ve verildiği
            kanal ispat amacıyla kayıt altına alınır.
          </p>
          <p>
            Bu metindeki açık rızalar yalnızca 18 yaşını doldurmuş kullanıcılar tarafından verilebilir. 18 yaşından
            küçükseniz bu rızaları vermeyiniz; 18 yaşından küçük olduğunuzu öğrenmemiz halinde verdiğiniz rızalar
            geçersiz sayılır ve sohbetleriniz model geliştirmede kullanılmaz.
          </p>
        </Section>

        <Section id="egitim" number={2} title="Model geliştirme için açık rıza">
          <SubSection title="Kapsam">
            <p>
              Hesabınızla yaptığınız sohbetlerde gönderdiğiniz mesajlar ile modellerin bu mesajlara verdiği yanıtlar,
              agent modunda verdiğiniz görev metinleri ve bu görevlerin metin çıktıları. Adınız, e-posta adresiniz, şifre
              özetiniz, IP adresiniz, ödeme bilgileriniz, Sosyal (forum) bölümündeki paylaşımlarınız, yüklediğiniz
              görseller ve misafir olarak cihazınızda tutulan sohbetler bu rızanın kapsamında değildir.
            </p>
          </SubSection>
          <SubSection title="Amaç">
            <p>
              Yedikule ve sonraki Marul AI dil modellerinin Türkçe anlama ve yanıt üretme kalitesinin artırılması
              amacıyla bu modellerin eğitimi, ince ayarı (fine tuning) ve değerlendirilmesi. Veriler reklam, profil
              çıkarma veya satış amacıyla kullanılmaz.
            </p>
          </SubSection>
          <SubSection title="Yöntem ve güvenceler">
            <List
              ordered
              items={[
                'Veriler Türkiye’deki sunucumuzda ve kontrolümüzdeki cihazlarda hazırlanır.',
                'Ad, e-posta, telefon, adres, T.C. kimlik numarası, IP adresi, kullanıcı adı ve hesap kimliği gibi tanımlayıcılar otomatik araçlarla ayıklanır.',
                'Özel nitelikli kişisel veri içerdiği ya da kişiyi dolaylı yoldan belirlenebilir kıldığı tespit edilen konuşmalar veri setinden tamamen çıkarılır.',
                'Veri setinin kalitesini ve anonimliğini doğrulamak amacıyla örnekler, gizlilik yükümlülüğü altındaki geliştirici tarafından incelenebilir.',
                'Modeller yalnızca anonim hale getirilmiş veriyle eğitilir. Anonim hale getirilmiş veri, başka verilerle eşleştirilse dahi kimliği belirli veya belirlenebilir bir kişiyle ilişkilendirilemeyen veridir.',
                'Anonim hale getirilmemiş sohbet verileri bu amaçla üçüncü kişilere veya yurt dışına aktarılmaz. Eğitim kiralanan bilgi işlem altyapısında yapılırsa bu altyapıya yalnızca anonim veri aktarılır.',
              ]}
            />
            <p>
              Yedikule gibi modellerimizin ağırlıkları Hugging Face gibi platformlarda herkese açık lisansla
              yayımlanabilir. Bu nedenle eğitime yalnızca anonim hale getirilmiş veri alınır.
            </p>
          </SubSection>
          <SubSection title="Hukuki sebep ve süre">
            <p>
              KVKK md. 5/1 ve sohbetlerde bulunabilecek özel nitelikli verilerin ayıklanması bakımından md. 6/3-a
              uyarınca açık rızanız. Rızanız geri alınana kadar geçerlidir ve hesabınızda kayıtlı olan ile rızanız
              süresince oluşacak sohbetleri kapsar. Bu rıza alınmadan önce hiçbir kullanıcının sohbeti bu amaçla
              kullanılmamıştır.
            </p>
          </SubSection>
          <SubSection title="Rıza beyanı">
            <Callout>
              <p>
                “Açık Rıza Metni’nin 2. bölümünü okudum ve anladım. Sohbet içeriklerimin burada açıklanan kapsamda,
                Marul AI dil modellerinin geliştirilmesi amacıyla anonim hale getirilerek işlenmesine ve bu amaçla
                sohbetlerimdeki özel nitelikli kişisel verilerin veri setinden çıkarılması için otomatik araçlarla tespit
                edilmesine özgür irademle açık rıza veriyorum.”
              </p>
            </Callout>
          </SubSection>
        </Section>

        <Section id="ozel-nitelikli" number={3} title="Özel nitelikli kişisel veriler için açık rıza">
          <SubSection title="Kapsam">
            <p>
              Sağlık, din, mezhep veya diğer inançlar, ırk veya etnik köken, siyasi düşünce, felsefi inanç, dernek,
              vakıf veya sendika üyeliği, kılık ve kıyafet, cinsel hayat, ceza mahkûmiyeti ve güvenlik tedbirleri ile
              biyometrik ve genetik veriler özel nitelikli kişisel veridir. Bu rıza, yalnızca bu tür verileri sohbet
              mesajlarınıza veya kişiselleştirme talimatınıza kendi isteğinizle yazmanız halinde uygulanır. Bu verileri
              sizden hiçbir zaman talep etmeyiz.
            </p>
          </SubSection>
          <SubSection title="Amaç ve yöntem">
            <p>
              Bu veriler yalnızca mesajınıza yanıt üretilmesi ile sohbet geçmişinizin saklanması ve size gösterilmesi
              amacıyla, diğer mesajlarınızla aynı şekilde işlenir. Yanıt üretilmesi için seçtiğiniz modele iletilir:
              Yedikule kontrolümüzdeki bir bilgisayarda çalışır; Qwen3.6 ise ABD’deki Groq, Inc. altyapısında çalışır.
              Bu veriler başka bir amaçla kullanılmaz, sınıflandırılmaz, profil çıkarmak için değerlendirilmez ve model
              geliştirmede kullanılmaz.
            </p>
          </SubSection>
          <SubSection title="Hukuki sebep ve süre">
            <p>
              KVKK md. 6/3-a uyarınca açık rızanız. Rızanız geri alınana veya ilgili sohbeti ya da hesabınızı silene
              kadar geçerlidir.
            </p>
          </SubSection>
          <SubSection title="Rıza vermezseniz">
            <p>
              Hizmetin tamamından aynı şekilde yararlanırsınız. Bu durumda özel nitelikli kişisel verilerinizi
              mesajlarınıza yazmamanız gerekir. Yazdığınızı fark ederseniz ilgili sohbeti silebilir veya silinmesini
              bizden talep edebilirsiniz.
            </p>
          </SubSection>
          <SubSection title="Rıza beyanı">
            <Callout>
              <p>
                “Açık Rıza Metni’nin 3. bölümünü okudum ve anladım. Sohbetlerde kendi isteğimle paylaşabileceğim özel
                nitelikli kişisel verilerimin yalnızca bana yanıt üretilmesi ve sohbet geçmişimin saklanması amacıyla,
                burada açıklanan şekilde işlenmesine özgür irademle açık rıza veriyorum.”
              </p>
            </Callout>
          </SubSection>
        </Section>

        <Section id="geri-alma" number={4} title="Rızanın geri alınması">
          <p>Rızalarınızı ayrı ayrı ve dilediğiniz zaman şu yollarla geri alabilirsiniz:</p>
          <List
            items={[
              <>Web: Sohbet ekranı, sol menüdeki “Plan ve hesap” bölümü, “Gizlilik tercihleri”</>,
              <>Android uygulaması: Menüdeki “Ayarlar” bölümü, “Gizlilik”</>,
              <>
                E-posta: Kayıtlı e-posta adresinizden <MailLink email={CONTROLLER.email} subject="Açık rıza geri alma" />{' '}
                adresine yazarak
              </>,
              <>Hesabınızı silerek</>,
            ]}
          />
          <p>
            Geri alma ileriye dönük sonuç doğurur. Model geliştirme rızasını geri aldığınızda sohbetleriniz hizmet
            kapsamında hesabınızda kalmaya devam eder; henüz anonim hale getirilmemiş kopyalar en geç 30 gün içinde
            eğitim havuzundan silinir ve yeni sohbetleriniz bu amaçla işlenmez. Geri almadan önce anonim hale getirilip
            bir modelin eğitiminde kullanılmış veriler kişisel veri niteliği taşımadığından ve modelden teknik olarak
            ayrıştırılamadığından geri çekilemez.
          </p>
          <p>
            Özel nitelikli veriler için verdiğiniz rızayı geri aldığınızda, bu tür veri içeren sohbetlerinizi silmenizi
            veya silinmesini bizden talep etmenizi öneririz; talebiniz üzerine ilgili sohbetler silinir.
          </p>
        </Section>

        <Section id="haklar" number={5} title="Haklarınız">
          <p>
            KVKK’nın 11. maddesinde sayılan haklarınızı ve bu haklarınızı nasıl kullanacağınızı{' '}
            <a className="text-fg hover:underline" href="/kvkk">KVKK Aydınlatma Metni</a>’nde bulabilirsiniz.
          </p>
        </Section>
      </LegalPage>
    </>
  )
}
