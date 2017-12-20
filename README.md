# SahibindenCalisma1

Yaptığım çalışmadan SCoin dışında Bit Coin ve Ethereum verilerini api vasıtasıyla temin ettim. Toplamda elimde 3 sanal para birimi olmuş oldu. Temin ettiğim bu sanal paraların geçmiş değişimlerini devextreme grafiklerinde gösterdim.

Bitcoin için istediğim gibi bir api bulduğum için direk javascript ile istek gönderdim.
Ethereum için istediğim formatta veri bulamadım. Bulamadığım geçmişe ait günlük açılış veya kapanış fiyatları idi ancak bulamadım genelde saat/dakika bazlı yani anlık değişimlerin hepsini gösteriyordu ve buda benim işimi görmüyordu. İşimi görmemeisnin nedeni o kadar büyük datayı grafikde gösteremem diğer 2 sanal para biriminin veri formatınada uygun değil ondan dolayı bu işi C# tarafında filtreledim. CoinController'da tüm datayı çektim ve günlük değişimler hepsini silerek o güne ait tek bir veri buraktım javasript tarafında da kendi controllar'ıma istek gönderdim.

Grafiğin üzerinde ise anlık kurları gösteren bir ekran yaptım. Alık kurdeğişimini SignalR ile yapacaktım maksat yeşillik olsun diye ama hiç bir espirisi olmaycaktı sonuç olarak bir zamanlı iş tanımlayacaktım falan boşuan iş yükü onun yerini bunu javascript'de yaptım. Javascript'de setinterval kullanarak 50 saniyede bir(evet 60 değil) kurları kontrol ettim. Kontrol derken değişim olsun olmasın gelen veriyi ekrana bastım.

Daha sonra anlık kurların yanında satın alma yerleştirdim. Örneğin SCoin alınca anlık dolar fiyatını harcanan paraya ekledim. Böylelikle elimde Scoin miktarı, bu SCoin'leri alırken harcadığım parayı ve anlık SCoin fiyatı olduğuna göre kar hesabı yapabilirdim. Hesabı doğru orantı ile  yaptım. Aşağıdaki gibi

Kazanc(Harcanan Para, (Coin Adedi x Anlık Fiyatı)) metodunu çalıştırdım. 
var fark = suankiDeger - harcanan; // Farkını buldum
var kazanc = fark * 100 / harcanan; // doğru orantı yaptım
 return Math.round(kazanc * 100) / 100; // virgülden sonra 2 hanesini aldım
 
 Yukarıda ki işlemi kur fiyatları güncellendiğinde yaptım.
 
 Vakit az olduğu için vir veri tabanı kullanmadım. Biraz çakallık yaparak localStorage kullandım yani özetle tarayıcının veri tabanı diyebiliriz :) verileri ordana ldım oraya kaydettim. Bu kısa vakitde ve bu şekilde tke tablolık veriler için kim Entity Framework entegrasi yapacak ki ? Evet tercihim Entity Framework performans olarak dapper a göre kötü olabilir ama bunu tercih ediyorum işimi görüyor sonuçta.
 
 
 Kendimin yazdığı tüm javascriptler /Scripts/Custom.js içersindedir.

Hızlı geliştirme için bide anlık değişimleri göstermek ve grafik kullanmak için javascript kullandığım için artık herşeyi javascript ile yaptım. Yani işime öyle geldi özel bir kuralınız olmadığı için :) olsaydı ona uyardım.

Readme geç yazdım kusuruma bakmayın.
