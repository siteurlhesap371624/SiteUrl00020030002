import { LegalPage, Section } from '@/components/legal/LegalPage'
import { SeoHead } from '@/components/ui/SeoHead'
import { config } from '@/lib/config'

export default function Kvkk() {
  return (
    <>
      <SeoHead title="KVKK aydınlatma metni" path="/kvkk" />
      <LegalPage
        title="KVKK aydınlatma metni"
        lastUpdated="14 Mayıs 2026"
        intro="6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla Karakuş Tech / Marul AI tarafından düzenlenen aydınlatma metnidir."
      >
        <Section title="Veri sorumlusu">
          <p>Marul AI hizmeti Karakuş Tech tarafından sağlanır. Veri sorumlusu sıfatıyla işlemler bu birim tarafından yürütülür.</p>
        </Section>

        <Section title="İşlenen kişisel veriler">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Kimlik bilgisi: ad-soyad</li>
            <li>İletişim bilgisi: e-posta adresi</li>
            <li>İşlem bilgisi: sohbet kayıtları, hesap ayarları</li>
            <li>Teknik bilgi: IP adresi, oturum bilgileri (güvenlik amacıyla geçici)</li>
          </ul>
        </Section>

        <Section title="İşleme amaçları">
          <p>Veriler; hizmetin sunulması, hesap güvenliği, kötüye kullanım önleme ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.</p>
        </Section>

        <Section title="Aktarım">
          <p>Kişisel veriler yurt dışında yer alan Cloudflare ve Groq altyapılarına; hizmetin teknik gereklilikleri çerçevesinde aktarılır. Bunun dışında üçüncü taraflarla paylaşılmaz.</p>
        </Section>

        <Section title="Haklarınız">
          <p>KVKK Madde 11 uyarınca; verilerinize erişme, düzeltme, silme, işlenmesini durdurma haklarına sahipsiniz.</p>
          <p>
            Başvurularınızı{' '}
            <a className="text-fg hover:underline" href={`mailto:${config.legalEmail}?subject=KVKK%20Talebi`}>
              {config.legalEmail}
            </a>{' '}
            adresine yazılı olarak iletebilirsiniz.
          </p>
        </Section>
      </LegalPage>
    </>
  )
}
