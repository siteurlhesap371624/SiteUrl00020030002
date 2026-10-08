export interface Recipient {
  name: string
  location: string
  role: string
  data: string
  when: string
}

export const RECIPIENTS_ABROAD: Recipient[] = [
  {
    name: 'Groq, Inc.',
    location: 'ABD',
    role: 'Qwen3.6 modelinin çalıştırılması, agent görevleri ve sohbet başlıklarının üretilmesi',
    data: 'Qwen3.6 ile gönderdiğiniz mesajlar, sohbet geçmişinin modele verilen bölümü, adınız, kişiselleştirme talimatınız, agent görevlerinde okunan sayfa ve dosya içerikleri',
    when: 'Qwen3.6 modelini veya agent modunu kullandığınızda',
  },
  {
    name: 'Cloudflare, Inc.',
    location: 'ABD ve küresel sunucu ağı',
    role: 'Alan adı (DNS), güvenlik ve içerik dağıtım ağı, sunucumuza şifreli tünel bağlantısı, Turnstile bot koruması',
    data: 'IP adresi, tarayıcı ve cihaz bilgileri, istek zamanı, sunucumuza iletilen istek ve yanıtlar (şifreli bağlantı Cloudflare ağında sonlandırılır), Turnstile doğrulama sinyalleri',
    when: 'Siteyi veya uygulamayı her kullandığınızda',
  },
  {
    name: 'GitHub, Inc.',
    location: 'ABD',
    role: 'marulai.com.tr internet sitesi dosyalarının barındırılması',
    data: 'Siteyi ziyaret ettiğinizde IP adresi ve istek bilgileri',
    when: 'Siteyi ziyaret ettiğinizde',
  },
  {
    name: 'Resend',
    location: 'ABD',
    role: 'Doğrulama kodu ve şifre sıfırlama e-postalarının gönderilmesi',
    data: 'E-posta adresi, ad, doğrulama kodu veya şifre sıfırlama bağlantısı',
    when: 'Kayıt olurken, kod istediğinizde veya şifre sıfırlarken',
  },
  {
    name: 'Google LLC',
    location: 'ABD',
    role: 'Google Play satın alımlarının sunucumuz tarafından doğrulanması; Google ile girişte oturum kodunun doğrulanması',
    data: 'Satın alma anahtarı, ürün kimliği ve uygulama paket adı; Google ile girişte tek kullanımlık yetkilendirme kodu',
    when: 'Plus satın aldığınızda veya Google ile giriş yaptığınızda',
  },
  {
    name: 'Google LLC (Gmail)',
    location: 'ABD',
    role: 'Destek ve KVKK başvurularının alındığı e-posta hizmeti',
    data: 'Bize gönderdiğiniz e-postalar, ekleri ve e-posta adresiniz',
    when: 'Bize e-posta gönderdiğinizde',
  },
  {
    name: 'ngrok, Inc.',
    location: 'ABD',
    role: 'Yedikule modelinin çalıştığı bilgisayara şifreli tünel bağlantısı',
    data: 'Yedikule ile gönderdiğiniz mesajlar ve sohbet geçmişinin modele verilen bölümü (yalnızca iletim sırasında)',
    when: 'Yedikule modelini kullandığınızda',
  },
  {
    name: 'Arama motorları (ör. Google, Bing, DuckDuckGo)',
    location: 'ABD ve diğer ülkeler',
    role: 'Kendi sunucumuzda çalışan arama altyapısının (SearXNG) arama sonuçlarını alması',
    data: 'Model tarafından oluşturulan arama sorguları (mesajınızdan türetilebilir), sunucumuzun IP adresiyle. Hesap bilgileriniz ve IP adresiniz iletilmez.',
    when: 'Agent veya web araması kullandığınızda',
  },
  {
    name: 'Brave Software, Inc. ve Tavily',
    location: 'ABD',
    role: 'Web araması özelliğinde yedek arama sağlayıcıları',
    data: 'Model tarafından oluşturulan arama sorguları (mesajınızdan türetilebilir). Hesap bilgileriniz ve IP adresiniz iletilmez.',
    when: 'Agent veya web araması kullandığınızda, kendi arama altyapımız yanıt vermezse',
  },
]

export const PAST_RECIPIENTS: Recipient[] = [
  {
    name: 'Cloudflare, Inc. (Workers, D1, KV)',
    location: 'ABD ve küresel sunucu ağı',
    role: 'Ağustos 2026’ya kadar sunucu, veritabanı ve anahtar değer deposu',
    data: 'Hesap, sohbet, kişiselleştirme, satın alma ve Sosyal bölüm verilerinin tamamı',
    when: 'Ağustos 2026’da Türkiye’deki sunucumuza taşındı; bu tarihten sonra yeni veri yazılmamaktadır',
  },
  {
    name: 'Google LLC (Analytics, AdSense)',
    location: 'ABD',
    role: 'Mayıs 2026’dan önceki site sürümünde ziyaret istatistikleri ve reklam gösterimi',
    data: 'IP adresi, çerez kimlikleri, sayfa görüntüleme ve cihaz bilgileri',
    when: 'Mayıs 2026’da kaldırıldı',
  },
  {
    name: 'Cloudflare, Inc. (Web Analytics), cdnjs ve jsDelivr',
    location: 'ABD ve küresel sunucu ağı',
    role: 'Mayıs 2026’dan önceki site sürümünde çerezsiz ziyaret ölçümü ve yazılım kütüphanelerinin yüklenmesi',
    data: 'IP adresi, tarayıcı bilgisi, ziyaret edilen sayfa ve yönlendiren adres',
    when: 'Mayıs 2026’da kaldırıldı',
  },
  {
    name: 'Google LLC (Google Fonts)',
    location: 'ABD',
    role: 'Sitedeki yazı tiplerinin Google sunucularından yüklenmesi',
    data: 'Siteyi ziyaret ettiğinizde IP adresi ve tarayıcı bilgileri',
    when: 'Ekim 2026’da kaldırıldı; yazı tipleri artık kendi sunucumuzdan yüklenir',
  },
]

export const DOMESTIC_RECIPIENTS: { name: string; role: string }[] = [
  {
    name: 'Sunucu altyapı sağlayıcısı',
    role: 'Veritabanımızın ve uygulama sunucumuzun çalıştığı, Türkiye’de bulunan sanal sunucu altyapısının sağlanması ve bakımı',
  },
  {
    name: 'Yetkili kamu kurum ve kuruluşları, yargı mercileri',
    role: 'Kanunlarda öngörülen hallerde ve usulüne uygun talep üzerine',
  },
  {
    name: 'Hukuk ve mali danışmanlar',
    role: 'Hukuki uyuşmazlıklar ve yasal yükümlülükler kapsamında, gerektiği ölçüde ve gizlilik yükümlülüğü altında',
  },
]

export interface RetentionRow {
  data: string
  period: string
}

export const RETENTION: RetentionRow[] = [
  { data: 'Hesap bilgileri (ad, e-posta, şifre özeti, Google hesap kimliği, kayıt tarihi)', period: 'Hesabınız açık olduğu sürece; hesabınızı sildiğinizde derhal silinir' },
  { data: 'Sohbetler, mesajlar, sohbet başlıkları ve yanıtlara ilişkin kaynak bilgileri', period: 'Siz sohbeti veya hesabınızı silene kadar' },
  { data: 'Kişiselleştirme talimatı', period: 'Siz değiştirene, silene veya hesabınızı silene kadar' },
  { data: 'Agent görev kayıtları (görev metni, sonuç, kullanılan kaynaklar, kullanım istatistikleri)', period: 'İlgili sohbet veya hesap silinene kadar; görev adımlarının ayrıntılı olay kayıtları 14 gün' },
  { data: 'Agent tarafından üretilen dosyalar (çalışma alanı)', period: 'Son değişiklikten itibaren en fazla 30 gün; süre dolunca otomatik silinir' },
  { data: 'Sosyal bölüm profili, paylaşımlar, yanıtlar, beğeniler ve görseller', period: 'Siz silene veya hesabınızı silene kadar; kaldırılan içerik hukuki taleplere yanıt verebilmek amacıyla en fazla 1 yıl saklanır' },
  { data: 'Sosyal bölüm bildirimleri (raporlar) ve moderasyon kayıtları', period: 'Kayıt tarihinden itibaren 2 yıl' },
  { data: 'Sosyal bölümdeki paylaşım işlemlerine ait trafik bilgileri (IP adresi, bağlantı noktası, zaman, işlem türü)', period: '5651 sayılı Kanun’un 5. maddesi uyarınca 1 yıl; süre sonunda silinir' },
  { data: 'Satın alma anahtarı ve Plus durumu', period: 'Hesabınız açık olduğu sürece' },
  { data: 'Satın alma işlem kayıtları (sipariş numarası, ürün, tarih ve e-posta adresinizin geri döndürülemez özeti)', period: '6563 sayılı Kanun’un 11. maddesi uyarınca işlem tarihinden itibaren 10 yıl; hesabınızı silseniz de bu süre boyunca saklanır' },
  { data: 'E-posta doğrulama kodları', period: '10 dakika' },
  { data: 'Şifre sıfırlama bağlantıları', period: '1 saat' },
  { data: 'Oturum anahtarları', period: 'En fazla 180 gün; çıkış yaptığınızda geçersiz kılınır' },
  { data: 'Hız sınırı ve kötüye kullanım önleme sayaçları (IP adresi, e-posta adresi)', period: 'İlgili zaman penceresi kadar (dakikalar ile 1 gün arası)' },
  { data: 'Sunucu hata kayıtları (istek yolu ve hata ayrıntısı; mesaj içeriği ve IP adresi yazılmaz)', period: 'En fazla 15 gün' },
  { data: 'Onay kayıtları (onaylanan metin ve sürümü, tarih, IP adresi, tarayıcı bilgisi, e-posta adresinin özeti)', period: 'Hesabınız açık olduğu sürece ve hesabın silinmesinden sonra, olası uyuşmazlıklarda ispat amacıyla 10 yıl' },
  { data: 'KVKK başvuruları ve destek yazışmaları', period: 'Talebin sonuçlanmasından itibaren 3 yıl' },
  { data: 'Silme işlemlerine ilişkin kayıtlar (silinen hesabın e-posta adresinin geri döndürülemez özeti, silinen veri türleri, tarih)', period: '3 yıl' },
  { data: 'Misafir sohbetleri', period: 'Sunucuda saklanmaz; yalnızca cihazınızda, siz silene kadar tutulur' },
]
