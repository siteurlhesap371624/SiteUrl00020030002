import { LegalPage, Section } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { config } from '@/lib/config'

export default function Privacy() {
  return (
    <>
      <SeoHead title="Gizlilik politikası" path="/gizlilik" />
      <LegalPage
        title="Gizlilik politikası"
        lastUpdated="14 Mayıs 2026"
        intro="Marul AI olarak kullanıcı verilerinin gizliliğini ön planda tutuyoruz. Bu belge; hangi verileri topladığımızı, nasıl kullandığımızı, hangi haklara sahip olduğunuzu açıklar."
      >
        <Section title="Toplanan veriler">
          <p>Hesap oluşturduğunuzda yalnızca ad-soyad, e-posta adresi ve şifrenizin güvenli özetini (hash) saklarız.</p>
          <p>
            Sohbet sürecinde gönderdiğiniz mesajlar ve modelin verdiği yanıtlar, sohbet geçmişinizi
            sunmak amacıyla veritabanında tutulur. Hesabınızı sildiğinizde bu veriler kalıcı olarak
            silinir.
          </p>
          <p>
            IP adresi gibi teknik veriler kötüye kullanımı önlemek için geçici olarak işlenir;
            kalıcı olarak saklanmaz.
          </p>
        </Section>

        <Section title="Verilerin kullanım amacı">
          <p>Veriler aşağıdaki amaçlar için kullanılır:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Hesap oluşturma ve oturum yönetimi</li>
            <li>Sohbet servisinin sağlanması ve geçmişin saklanması</li>
            <li>Hizmetin kalitesini ölçmek için anonim teknik ölçümler</li>
            <li>
              <strong>Anonimleştirildikten sonra</strong> kendi geliştirdiğimiz Marul AI modellerinin
              Türkçe performansını artırmak için eğitim verisi olarak kullanılması (detay aşağıda)
            </li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>
        </Section>

        <Section title="Model eğitimi için veri kullanımı">
          <p>
            Marul AI, sohbet kayıtlarını <strong>anonimleştirildikten sonra</strong> kendi
            geliştirdiğimiz dil modellerinin (Yedikule ve sonraki sürümler) eğitiminde kullanma
            hakkını saklı tutar. Bu kullanım yalnızca aşağıdaki şartlar altında gerçekleşir:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Anonimleştirme: ad-soyad, e-posta, IP adresi ve hesabı tanımlayabilecek herhangi bir
              kişisel kimlik bilgisi sohbet verisinden ayrılır; veriler hesabınızla
              ilişkilendirilemeyecek şekilde işlenir.
            </li>
            <li>
              Hassas içerik filtrelemesi: kişisel bilgi, sağlık verisi, finansal hesap bilgisi gibi
              içerikler insan veya otomatik filtre ile temizlenir, eğitim setine girmez.
            </li>
            <li>
              Üçüncü tarafa satılmaz veya devredilmez. Veriler yalnızca Karakuş Tech bünyesinde,
              Marul AI modellerinin geliştirilmesi amacıyla kullanılır.
            </li>
            <li>
              Hesabınızı sildiğinizde sohbet kayıtlarınız sistemden kalıcı olarak silinir; ancak
              silmeden önce eğitim setine eklenmiş anonimleştirilmiş kopyalar geri çekilemeyebilir
              (anonim olduğu için sizinle ilişkilendirilemez zaten).
            </li>
            <li>
              Bu kullanımı tercih etmiyorsanız <a className="text-fg hover:underline" href={`mailto:${config.legalEmail}?subject=EGITIM%20VERISI%20OPT-OUT`}>{config.legalEmail}</a> adresine yazarak hesabınızı eğitim havuzundan çıkarmamızı talep
              edebilirsiniz.
            </li>
          </ul>
        </Section>

        <Section title="Veri paylaşımı">
          <p>
            Kişisel verileriniz hiçbir reklam ağıyla ya da üçüncü taraf veri komisyoncusuyla
            paylaşılmaz. Yalnızca aşağıdaki teknik altyapı sağlayıcılarıyla işbirliği yapılır:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Cloudflare (sunucu altyapısı, bot koruma)</li>
            <li>Groq (Qwen3.6 modelinin sunulması için anonim API çağrıları)</li>
            <li>Resend (e-posta doğrulama ve şifre sıfırlama bildirimleri)</li>
            <li>Google (yalnızca Google ile giriş yapmayı tercih ederseniz)</li>
          </ul>
        </Section>

        <Section title="Veri güvenliği">
          <p>
            Tüm iletişim HTTPS / TLS 1.3 üzerinden şifreli olarak gerçekleştirilir. Şifreleriniz
            geri çevrilemez algoritmalarla saklanır, sunucu tarafında düz metin olarak tutulmaz.
            Oturum açma jetonları (JWT) süresi sınırlı olacak şekilde imzalanır.
          </p>
        </Section>

        <Section title="Çocukların gizliliği">
          <p>
            Marul AI, 13 yaşın altındaki kullanıcıları hedeflememektedir. 13 yaş altı kullanıcıların
            hesap oluşturmaması rica olunur.
          </p>
        </Section>

        <Section title="Kullanıcı hakları">
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Verilerinize erişim talep etme</li>
            <li>Verilerin düzeltilmesini isteme</li>
            <li>Verilerin silinmesini talep etme</li>
            <li>İşleme amaçları hakkında bilgi alma</li>
          </ul>
          <p>
            Hesabınızı uygulama içinden tek tıkla kalıcı olarak silebilirsiniz: <strong>Sohbet sayfası → Abonelik → Hesabımı sil</strong>.
            Alternatif olarak <a className="text-fg hover:underline" href={`mailto:${config.legalEmail}?subject=HESAP%20SILME%20TALEBI`}>{config.legalEmail}</a>{' '}
            adresine talep gönderebilirsiniz.
          </p>
        </Section>

        <Section title="Çerezler">
          <p>
            Web sürümünde yalnızca oturum yönetimi için zorunlu teknik çerezler kullanılır. Üçüncü
            taraf izleme, reklam veya analiz çerezleri kullanılmaz.
          </p>
        </Section>

        <Section title="İletişim">
          <p>
            Gizlilikle ilgili sorularınızı{' '}
            <a className="text-fg hover:underline" href={`mailto:${config.legalEmail}`}>
              {config.legalEmail}
            </a>{' '}
            adresine iletebilirsiniz.
          </p>
        </Section>
      </LegalPage>
    </>
  )
}
