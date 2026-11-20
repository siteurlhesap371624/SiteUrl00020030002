export interface ArchivedSection {
  title: string
  items: string[]
}

export interface ArchivedDocument {
  key: string
  title: string
  date: string
  version: string
  intro: string
  sections: ArchivedSection[]
}

export const ARCHIVED_DOCUMENTS: ArchivedDocument[] = [
  {
    key: 'terms',
    title: 'Kullanım şartları',
    date: '14 Mayıs 2026',
    version: '2026-05',
    intro: 'Marul AI hizmetinden faydalanırken aşağıdaki şartları okuyup kabul etmiş sayılırsınız. Hizmeti kullanmaya devam etmeniz, bu şartlara onay verdiğiniz anlamına gelir.',
    sections: [
      {
        title: 'Hizmet tanımı',
        items: [
          'Marul AI, kullanıcılarına metin tabanlı yapay zeka asistanı hizmeti sunar. Servis; kendi geliştirdiğimiz Yedikule modeli ve açık kaynak Qwen3.6 modelinin sunulması yoluyla çalışır.'
        ]
      },
      {
        title: 'Yasaklı kullanım',
        items: [
          'Kullanıcı; aşağıdaki amaçlarla hizmeti kullanmayacağını kabul eder:',
          '• Yasa dışı içerik üretimi veya dağıtımı',
          '• Kişilik haklarına saldırı, taciz, nefret söylemi',
          '• Başkasının kimliğine bürünme',
          '• Hizmeti otomatik araçlarla aşırı sorgulama (rate-limit aşımı)',
          '• Sistemin güvenlik mekanizmalarını aşma girişimi'
        ]
      },
      {
        title: 'İçerik sorumluluğu',
        items: [
          'Yapay zeka modelleri her zaman doğru bilgi üretmeyebilir. Marul AI tarafından sağlanan içerikler tıbbi, hukuki ya da finansal tavsiye yerine geçmez. Önemli kararlarınızda her zaman uzman görüşü alın.'
        ]
      },
      {
        title: 'Hesap güvenliği',
        items: [
          'Hesabınızın güvenliği size aittir. Şifrenizi kimseyle paylaşmayın; şüpheli bir hareket fark ettiğinizde derhal şifrenizi sıfırlayın.'
        ]
      },
      {
        title: 'Abonelik ve ödeme',
        items: [
          'Plus aboneliği şu an yalnızca Android uygulaması üzerinden Google Play satın alma akışıyla sunulmaktadır. İade ve iptal işlemleri Google Play kuralları çerçevesinde yapılır.'
        ]
      },
      {
        title: 'Hizmetin sonlandırılması',
        items: [
          'Marul AI; şartları ihlal eden hesapları önceden bildirim yapmaksızın askıya alma veya kapatma hakkını saklı tutar. Kullanıcılar diledikleri zaman hesaplarını kapatabilir.'
        ]
      },
      {
        title: 'Sorumluluk reddi',
        items: [
          'Hizmet "olduğu gibi" sunulur; kesintisiz veya hatasız olacağı garanti edilmez. Marul AI ve Karakuş Tech, hizmetin kullanımından doğabilecek dolaylı zararlardan sorumlu değildir.'
        ]
      },
      {
        title: 'İletişim',
        items: [
          'Şartlarla ilgili sorularınız için info@marulai.com.tr adresinden bize ulaşabilirsiniz.'
        ]
      }
    ]
  },
  {
    key: 'privacy',
    title: 'Gizlilik politikası',
    date: '14 Mayıs 2026',
    version: '2026-05',
    intro: 'Marul AI olarak kullanıcı verilerinin gizliliğini ön planda tutuyoruz. Bu belge; hangi verileri topladığımızı, nasıl kullandığımızı ve hangi haklara sahip olduğunuzu açıklar.',
    sections: [
      {
        title: 'Toplanan veriler',
        items: [
          'Hesap oluşturduğunuzda yalnızca ad-soyad, e-posta adresi ve şifrenizin güvenli özetini (hash) saklarız.',
          'Sohbet sürecinde gönderdiğiniz mesajlar ve modelin verdiği yanıtlar, sohbet geçmişinizi sunmak amacıyla veritabanında tutulur. Hesabınızı sildiğinizde bu veriler kalıcı olarak silinir.',
          'IP adresi gibi teknik veriler kötüye kullanımı önlemek için geçici olarak işlenir; kalıcı olarak saklanmaz.'
        ]
      },
      {
        title: 'Verilerin kullanım amacı',
        items: [
          'Veriler aşağıdaki amaçlar için kullanılır:',
          '• Hesap oluşturma ve oturum yönetimi',
          '• Sohbet servisinin sağlanması ve geçmişin saklanması',
          '• Hizmetin kalitesini ölçmek için anonim teknik ölçümler',
          '• Anonimleştirildikten sonra kendi geliştirdiğimiz Marul AI modellerinin Türkçe performansını artırmak için eğitim verisi olarak kullanılması (detay aşağıda)',
          '• Yasal yükümlülüklerin yerine getirilmesi'
        ]
      },
      {
        title: 'Model eğitimi için veri kullanımı',
        items: [
          'Marul AI, sohbet kayıtlarını anonimleştirildikten sonra kendi geliştirdiğimiz dil modellerinin (Yedikule ve sonraki sürümler) eğitiminde kullanma hakkını saklı tutar. Bu kullanım yalnızca aşağıdaki şartlar altında gerçekleşir:',
          '• Anonimleştirme: ad-soyad, e-posta, IP adresi ve hesabı tanımlayabilecek herhangi bir kişisel kimlik bilgisi sohbet verisinden ayrılır; veriler hesabınızla ilişkilendirilemeyecek şekilde işlenir.',
          '• Hassas içerik filtrelemesi: kişisel bilgi, sağlık verisi, finansal hesap bilgisi gibi içerikler insan veya otomatik filtre ile temizlenir, eğitim setine girmez.',
          '• Üçüncü tarafa devredilmez: Veriler yalnızca Karakuş Tech bünyesinde, Marul AI modellerinin geliştirilmesi amacıyla kullanılır.',
          '• Hesabınızı sildiğinizde sohbet kayıtlarınız sistemden kalıcı olarak silinir; silmeden önce eğitim setine eklenmiş anonimleştirilmiş kopyalar geri çekilemeyebilir (anonim olduğu için zaten sizinle ilişkilendirilemez).',
          '• Opt-out: Bu kullanımı tercih etmiyorsanız info@marulai.com.tr adresine yazarak hesabınızı eğitim havuzundan çıkarmamızı talep edebilirsiniz.'
        ]
      },
      {
        title: 'Veri paylaşımı',
        items: [
          'Kişisel verileriniz hiçbir reklam ağıyla ya da üçüncü taraf veri komisyoncusuyla paylaşılmaz. Yalnızca aşağıdaki teknik altyapı sağlayıcılarıyla iş birliği yapılır:',
          '• Cloudflare (sunucu altyapısı, bot koruma)',
          '• Groq (Qwen3.6 modelinin sunulması için anonim API çağrıları)',
          '• Resend (e-posta doğrulama ve şifre sıfırlama bildirimleri)',
          '• Google (yalnızca Google ile giriş yapmayı tercih ederseniz)'
        ]
      },
      {
        title: 'Veri güvenliği',
        items: [
          'Tüm iletişim HTTPS / TLS 1.3 üzerinden şifreli olarak gerçekleştirilir. Şifreleriniz geri çevrilemez algoritmalarla saklanır, sunucu tarafında düz metin olarak tutulmaz. Oturum açma jetonları (JWT) süresi sınırlı olacak şekilde imzalanır.'
        ]
      },
      {
        title: 'Çocukların gizliliği',
        items: [
          'Marul AI, 13 yaşın altındaki kullanıcıları hedeflememektedir. 13 yaş altı kullanıcıların hesap oluşturmaması rica olunur.'
        ]
      },
      {
        title: 'Kullanıcı hakları ve hesap silme',
        items: [
          'KVKK kapsamında aşağıdaki haklara sahipsiniz:',
          '• Verilerinize erişim talep etme',
          '• Verilerin düzeltilmesini isteme',
          '• Verilerin silinmesini talep etme',
          '• İşleme amaçları hakkında bilgi alma',
          'Hesabınızı uygulama veya web üzerinden kendi başınıza, tek tıkla kalıcı olarak silebilirsiniz:',
          'Web: Sohbet ekranı → sol alttaki profil kartı → Abonelik → Hesabımı sil',
          'Android: Profil ekranı → "Hesabımı sil" → "HESABIMI SIL" onayı',
          'Alternatif olarak info@marulai.com.tr adresine talep gönderebilirsiniz. 30 gün içinde tüm verileriniz kalıcı olarak silinir.'
        ]
      },
      {
        title: 'Çerezler',
        items: [
          'Web sürümünde yalnızca oturum yönetimi için zorunlu teknik çerezler kullanılır. Üçüncü taraf izleme, reklam veya analiz çerezleri kullanılmaz.'
        ]
      },
      {
        title: 'İletişim',
        items: [
          'Gizlilikle ilgili tüm sorularınızı info@marulai.com.tr adresine iletebilirsiniz.'
        ]
      }
    ]
  },
  {
    key: 'kvkk',
    title: 'KVKK aydınlatma metni',
    date: '14 Mayıs 2026',
    version: '2026-05',
    intro: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla Karakuş Tech / Marul AI tarafından düzenlenen aydınlatma metnidir.',
    sections: [
      {
        title: 'Veri sorumlusu',
        items: [
          'Marul AI hizmeti Karakuş Tech tarafından sağlanır. Veri sorumlusu sıfatıyla işlemler bu birim tarafından yürütülür.'
        ]
      },
      {
        title: 'İşlenen kişisel veriler',
        items: [
          '• Kimlik bilgisi: ad-soyad',
          '• İletişim bilgisi: e-posta adresi',
          '• İşlem bilgisi: sohbet kayıtları, hesap ayarları',
          '• Teknik bilgi: IP adresi, oturum bilgileri (güvenlik amacıyla geçici)'
        ]
      },
      {
        title: 'İşleme amaçları',
        items: [
          'Veriler; hizmetin sunulması, hesap güvenliği, kötüye kullanım önleme ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.'
        ]
      },
      {
        title: 'Aktarım',
        items: [
          'Kişisel veriler yurt dışında yer alan Cloudflare ve Groq altyapılarına; hizmetin teknik gereklilikleri çerçevesinde aktarılır. Bunun dışında üçüncü taraflarla paylaşılmaz.'
        ]
      },
      {
        title: 'Haklarınız',
        items: [
          'KVKK Madde 11 uyarınca; verilerinize erişme, düzeltme, silme, işlenmesini durdurma haklarına sahipsiniz.',
          'Başvurularınızı info@marulai.com.tr adresine yazılı olarak iletebilirsiniz.'
        ]
      }
    ]
  }
]
