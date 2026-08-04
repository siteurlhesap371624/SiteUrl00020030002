import { LegalPage, Section } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { config } from '@/lib/config'

export default function Terms() {
  return (
    <>
      <SeoHead title="Kullanım şartları" path="/sartlar" />
      <LegalPage
        title="Kullanım şartları"
        lastUpdated="14 Mayıs 2026"
        intro="Marul AI hizmetinden faydalanırken aşağıdaki şartları okuyup kabul etmiş sayılırsınız. Hizmeti kullanmaya devam etmeniz, bu şartlara onay verdiğiniz anlamına gelir."
      >
        <Section title="Hizmet tanımı">
          <p>
            Marul AI, kullanıcılarına metin tabanlı yapay zeka asistanı hizmeti sunar. Servis;
            kendi geliştirdiğimiz Yedikule modeli ve açık kaynak Qwen3.6 modelinin sunulması yoluyla
            çalışır.
          </p>
        </Section>

        <Section title="Yasaklı kullanım">
          <p>Kullanıcı; aşağıdaki amaçlarla hizmeti kullanmayacağını kabul eder:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Yasa dışı içerik üretimi veya dağıtımı</li>
            <li>Kişilik haklarına saldırı, taciz, nefret söylemi</li>
            <li>Başkasının kimliğine bürünme</li>
            <li>Hizmeti otomatik araçlarla aşırı sorgulama (rate-limit aşımı)</li>
            <li>Sistemin güvenlik mekanizmalarını aşma girişimi</li>
          </ul>
        </Section>

        <Section title="İçerik sorumluluğu">
          <p>
            Yapay zeka modelleri her zaman doğru bilgi üretmeyebilir. Marul AI tarafından sağlanan
            içerikler tıbbi, hukuki ya da finansal tavsiye yerine geçmez. Önemli kararlarınızda her
            zaman uzman görüşü alın.
          </p>
        </Section>

        <Section title="Hesap güvenliği">
          <p>
            Hesabınızın güvenliği size aittir. Şifrenizi kimseyle paylaşmayın; şüpheli bir hareket
            fark ettiğinizde derhal şifrenizi sıfırlayın.
          </p>
        </Section>

        <Section title="Abonelik ve ödeme">
          <p>
            Plus aboneliği şu an yalnızca Android uygulaması üzerinden Google Play satın alma akışıyla
            sunulmaktadır. İade ve iptal işlemleri Google Play kuralları çerçevesinde yapılır.
          </p>
        </Section>

        <Section title="Hizmetin sonlandırılması">
          <p>
            Marul AI; şartları ihlal eden hesapları önceden bildirim yapmaksızın askıya alma veya
            kapatma hakkını saklı tutar. Kullanıcılar diledikleri zaman hesaplarını kapatabilir.
          </p>
        </Section>

        <Section title="Sorumluluk reddi">
          <p>
            Hizmet "olduğu gibi" sunulur; kesintisiz veya hatasız olacağı garanti edilmez. Marul AI
            ve Karakuş Tech, hizmetin kullanımından doğabilecek dolaylı zararlardan sorumlu değildir.
          </p>
        </Section>

        <Section title="İletişim">
          <p>
            Şartlarla ilgili sorularınız için{' '}
            <a className="text-fg hover:underline" href={`mailto:${config.supportEmail}`}>
              {config.supportEmail}
            </a>{' '}
            adresinden bize ulaşabilirsiniz.
          </p>
        </Section>
      </LegalPage>
    </>
  )
}
