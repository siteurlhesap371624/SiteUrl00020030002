export interface FaqItem {
  q: string
  a: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Marul AI verilerimi nasıl koruyor?',
    a: 'Tüm istekler HTTPS üzerinden şifreli iletilir ve sohbetleriniz üçüncü taraf reklam ağlarıyla paylaşılmaz. Hesabınızı uygulama içinden tek tıkla silebilir veya marulai.resmi@gmail.com adresine talep iletebilirsiniz. Verilerin nasıl işlendiği gizlilik ve KVKK sayfalarımızda ayrıntılı olarak açıklanır.',
  },
  {
    q: 'Yedikule ile Qwen3.6 arasındaki fark nedir?',
    a: 'Yedikule, Türkçe için sıfırdan eğitilmiş yaklaşık 202 milyon parametreli kendi modelimizdir; ağırlıkları Hugging Face üzerinde herkese açıktır. Günlük sohbette hafiftir ve çok turlu konuşmayı destekler, ancak akıl yürütme ile matematikte güçlü değildir ve araç kullanamaz. Qwen3.6 ise 27 milyar parametreli açık kaynak modeldir; web araması yapar, çok adımlı görevleri yürütür, kod ve tablo dosyaları üretir. Agent modu yalnızca Qwen3.6 ile çalışır.',
  },
  {
    q: 'Ücretsiz planda hangi sınırlar var?',
    a: 'Ücretsiz hesapta sohbet başına 25 mesaj, sınırsız sayıda sohbet ve günde 25 agent görevi hakkınız olur. Misafir modunda oturum başına 10 soru sorabilirsiniz.',
  },
  {
    q: 'Plus nasıl alınır, abonelik mi?',
    a: 'Plus bir abonelik değildir; Google Play üzerinden tek seferlik uygulama içi satın alma olarak alınır ve yenilenmez. Şu anda yalnızca Android uygulaması üzerinden satın alınabilir, web tarafında satın alma henüz yoktur.',
  },
  {
    q: 'Mobil uygulama ile web aynı hesabı paylaşır mı?',
    a: 'Evet. Aynı e-posta ile giriş yaparsanız konuşma geçmişiniz, kişiselleştirme ayarlarınız ve aboneliğiniz her iki platformda da geçerlidir.',
  },
  {
    q: 'Hangi durumlarda Marul AI cevap vermez?',
    a: 'Yasa dışı içerik üretimi, zararlı yazılım talimatları, kişisel veri ifşası gibi istekleri reddeder. Bunlar dışında geniş bir konu yelpazesinde yardımcı olur.',
  },
]
