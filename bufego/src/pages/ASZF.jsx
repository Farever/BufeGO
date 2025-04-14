// src/components/Aszf.jsx (vagy ahova mented)
import React from 'react';

function Aszf() {
  return (
    <div className="aszf-container"> {/* Adj hozzá CSS osztályt a stílusozáshoz */}
      <h1>Általános Szerződési Feltételek (ÁSZF) - BüféGO</h1>
      <p><strong>Hatályos:</strong> [Dátum]-tól visszavonásig</p>

      <h2 className="section-title">1. Preambulum</h2>
      <p>
        Jelen Általános Szerződési Feltételek (a továbbiakban: ÁSZF) a(z) [Cégnév]
        (székhely: [Cím], adószám: [Adószám], cégjegyzékszám: [Cégjegyzékszám],
        képviseli: [Képviselő neve], e-mail: [E-mail cím], telefon: [Telefonszám],
        a továbbiakban: <strong>Szolgáltató</strong>) által üzemeltetett{' '}
        <strong>BüféGO</strong> weboldalon (elérhetőség: [Weboldal címe, pl. www.bufego.hu],
        a továbbiakban: <strong>Weboldal</strong>) keresztül nyújtott szolgáltatások
        (a továbbiakban: <strong>Szolgáltatás</strong>) igénybevételének feltételeit szabályozza.
      </p>
      <p>
        A Weboldal használatával, a regisztrációval, illetve a Szolgáltatás igénybevételével
        (pl. rendelés leadásával) Ön (a továbbiakban: <strong>Felhasználó</strong>) elfogadja és
        magára nézve kötelezőnek ismeri el a jelen ÁSZF-ben foglalt rendelkezéseket. Kérjük,
        figyelmesen olvassa el ezt a dokumentumot a Weboldal használata előtt. Amennyiben az
        ÁSZF bármely pontjával nem ért egyet, kérjük, ne használja a Weboldalt és ne vegye
        igénybe a Szolgáltatást.
      </p>
      {/* Figyelmeztetés: A [...] helyeket töltsd ki valós adatokkal! */}
      <div className="warning-note" style={{ border: '1px solid red', padding: '10px', margin: '15px 0', backgroundColor: '#ffeeee' }}>
          <strong>FONTOS:</strong> Ez egy általános sablon. Mindenképpen szükséges egy jogász által történő felülvizsgálata és testreszabása a BüféGO konkrét működése alapján. A <code>[...]</code> helyekre a konkrét adatokat kell beilleszteni!
      </div>

      <h2 className="section-title">2. A Szolgáltató adatai</h2>
      <ul>
        <li><strong>Cégnév:</strong> [Cégnév]</li>
        <li><strong>Székhely:</strong> [Cím]</li>
        <li><strong>Levelezési cím:</strong> [Ha eltérő, Cím]</li>
        <li><strong>Cégjegyzékszám:</strong> [Cégjegyzékszám, ha van]</li>
        <li><strong>Adószám:</strong> [Adószám]</li>
        <li><strong>Nyilvántartó hatóság:</strong> [Illetékes Cégbíróság vagy Hatóság]</li>
        <li><strong>Képviselő:</strong> [Képviselő neve]</li>
        <li><strong>Telefonszám:</strong> [Telefonszám]</li>
        <li><strong>E-mail cím:</strong> [Ügyfélszolgálati e-mail cím]</li>
        <li><strong>Tárhelyszolgáltató:</strong> [Tárhelyszolgáltató neve, címe, e-mail címe]</li>
      </ul>

      <h2 className="section-title">3. Fogalommeghatározások</h2>
      <ul>
        <li><strong>Szolgáltató:</strong> A fentebb meghatározott, a BüféGO weboldalt üzemeltető és a Szolgáltatást nyújtó jogi vagy természetes személy.</li>
        <li><strong>Felhasználó:</strong> Bármely természetes vagy jogi személy, illetve jogi személyiséggel nem rendelkező szervezet, aki a Weboldalt látogatja, azon regisztrál, vagy a Szolgáltatást igénybe veszi (pl. rendelést ad le).</li>
        <li><strong>Weboldal:</strong> A Szolgáltató által a [Weboldal címe] domain néven üzemeltetett online platform.</li>
        <li><strong>Szolgáltatás:</strong> A Szolgáltató által a Weboldalon keresztül nyújtott szolgáltatások összessége, különösen [Itt pontosítani kell, pl.: étel- és italrendelési lehetőség biztosítása a Partner Büféktől, információszolgáltatás, stb.].</li>
        <li><strong>Partner Büfé / Vendéglátóhely:</strong> Az a vendéglátó egység, amelynek termékei a Weboldalon keresztül megrendelhetők. A Szolgáltató közvetítőként járhat el a Felhasználó és a Partner Büfé között.</li>
        <li><strong>Rendelés:</strong> A Felhasználó által a Weboldalon keresztül kiválasztott termékek megvásárlására irányuló ajánlat a Partner Büfé felé, amelyet a Szolgáltató rendszere továbbít.</li>
        <li><strong>Felek:</strong> A Szolgáltató és a Felhasználó együttesen.</li>
        <li><strong>Adatkezelési Tájékoztató:</strong> A Szolgáltató adatkezelési gyakorlatát részletező dokumentum, amely a Weboldalon elérhető és a jelen ÁSZF elválaszthatatlan részét képezi.</li>
      </ul>

      <h2 className="section-title">4. Az ÁSZF hatálya és elfogadása</h2>
      <p><strong>4.1.</strong> Jelen ÁSZF hatálya kiterjed a Magyarország területén nyújtott, a Weboldalon keresztül elérhető minden Szolgáltatásra.</p>
      <p><strong>4.2.</strong> A Weboldal használatának megkezdésével, a regisztrációval, illetve a Szolgáltatás (pl. rendelés) igénybevételével a Felhasználó kijelenti, hogy megismerte és elfogadja a jelen ÁSZF rendelkezéseit, valamint a Weboldalon szintén elérhető Adatkezelési Tájékoztatóban foglaltakat.</p>
      <p><strong>4.3.</strong> Amennyiben a Felhasználó jogi személy vagy jogi személyiséggel nem rendelkező szervezet nevében jár el, szavatolja, hogy jogosult az adott szervezet képviseletére és nevében kötelezettséget vállalni.</p>

      <h2 className="section-title">5. A Szolgáltatás leírása</h2>
      <p><strong>5.1.</strong> A BüféGO weboldal egy online platform, amely lehetővé teszi a Felhasználók számára, hogy a rendszerben regisztrált Partner Büfék / Vendéglátóhelyek kínálatából étel- és italrendelést adjanak le online.</p>
      <p><strong>5.2.</strong> A Szolgáltató elsődlegesen közvetítő szerepet tölt be a Felhasználó és a kiválasztott Partner Büfé között. Az adásvételi szerződés a termékekre vonatkozóan a Felhasználó és a Partner Büfé között jön létre a rendelés Partner Büfé általi visszaigazolásával.</p>
      <p><strong>5.3.</strong> A Weboldalon feltüntetett termékinformációkat (leírás, ár, allergének, stb.) a Partner Büfék biztosítják. A Szolgáltató törekszik az adatok naprakészen tartására, de azok pontosságáért, teljességéért és aktualitásáért elsődlegesen a Partner Büfé felelős.</p>
      <p><strong>5.4.</strong> A Szolgáltatás igénybevételéhez internetkapcsolat szükséges, melynek költségei a Felhasználót terhelik.</p>

      <h2 className="section-title">6. Regisztráció (Amennyiben szükséges)</h2>
      <p><strong>6.1.</strong> A Weboldal bizonyos funkciói, különösen a rendelés leadása, regisztrációhoz kötöttek lehetnek.</p>
      <p><strong>6.2.</strong> A regisztráció során a Felhasználó köteles valós, pontos és teljes adatokat megadni. Az adatok változása esetén a Felhasználó köteles azokat haladéktalanul frissíteni a felhasználói fiókjában vagy értesíteni a Szolgáltatót.</p>
      <p><strong>6.3.</strong> A Felhasználó felelős a felhasználói fiókjához tartozó jelszó titokban tartásáért és minden olyan tevékenységért, amely a fiókján keresztül történik. A Felhasználó köteles haladéktalanul értesíteni a Szolgáltatót fiókja bármilyen jogosulatlan használatáról vagy a biztonság egyéb megsértéséről.</p>
      <p><strong>6.4.</strong> A Szolgáltató nem vállal felelősséget a regisztrált adatok valótlanságából, pontatlanságából vagy hiányosságából, illetve a jelszó nem megfelelő kezeléséből eredő károkért.</p>
      <p><strong>6.5.</strong> A Szolgáltató jogosult a regisztrációt visszautasítani vagy a már létező felhasználói fiókot felfüggeszteni/törölni, amennyiben a Felhasználó valótlan adatokat ad meg, megszegi az ÁSZF-et, vagy a Weboldalt visszaélésszerűen használja.</p>

      <h2 className="section-title">7. A rendelés menete</h2>
      <p><strong>7.1.</strong> A Felhasználó a Weboldalon böngészhet a Partner Büfék kínálatában, kiválaszthatja a megrendelni kívánt termék(ek)et, és azokat a virtuális "Kosárba" helyezheti.</p>
      <p><strong>7.2.</strong> A Kosár tartalmának véglegesítése után a Felhasználó megadja a szükséges adatokat (pl. átvétel módja, fizetési mód, számlázási adatok, elérhetőség).</p>
      <p><strong>7.3.</strong> A rendelés leadása előtt a Felhasználónak lehetősége van az adatok ellenőrzésére és módosítására.</p>
      <p><strong>7.4.</strong> A rendelés a "Megrendelés elküldése" (vagy hasonló) gombra kattintással válik véglegessé, amely a Felhasználó részéről ajánlatnak minősül a Partner Büfé felé, és fizetési kötelezettséget von maga után.</p>
      <p><strong>7.5.</strong> A rendelés beérkezéséről a Szolgáltató rendszere automatikus visszaigazoló e-mailt küld a Felhasználó által megadott e-mail címre. Ez az e-mail csupán a rendelés beérkezését igazolja, de nem jelenti a Felhasználó ajánlatának elfogadását a Partner Büfé részéről.</p>
      <p><strong>7.6.</strong> A szerződés a Felhasználó és a Partner Büfé között akkor jön létre, amikor a Partner Büfé (vagy a Szolgáltató a Partner Büfé nevében) egy külön e-mailben vagy a Weboldalon keresztül visszaigazolja a rendelés elfogadását és/vagy elkészítésének megkezdését.</p>
      <p><strong>7.7.</strong> A Partner Büfé jogosult a rendelést indokolt esetben (pl. készlethiány, kapacitáshiány) visszautasítani. Erről a Felhasználót a Szolgáltató vagy a Partner Büfé értesíti.</p>

      <h2 className="section-title">8. Árak és fizetési feltételek</h2>
      <p><strong>8.1.</strong> A Weboldalon a termékek mellett feltüntetett árak bruttó árak (tartalmazzák az általános forgalmi adót - ÁFA) és magyar forintban (HUF) értendők. Az árak nem tartalmazzák a kiszállítás díját, amennyiben releváns. A kiszállítás díja (ha van) külön tételként jelenik meg a rendelési folyamat során.</p>
      <p><strong>8.2.</strong> A Szolgáltató fenntartja a jogot az árak módosítására. A módosítás a Weboldalon való megjelenéssel lép hatályba. A módosítás nem érinti a már leadott és visszaigazolt rendelések árait.</p>
      <p><strong>8.3.</strong> A Felhasználó a következő fizetési módok közül választhat (a Partner Büfé által engedélyezett opciók függvényében):</p>
      <ul>
        <li>Online bankkártyás fizetés (a Szolgáltató által megbízott biztonságos fizetési szolgáltató rendszerén keresztül, pl. SimplePay, Barion, Stripe)</li>
        <li>Készpénzes fizetés átvételkor (a Partner Büfénél vagy a futárnál)</li>
        <li>Bankkártyás fizetés átvételkor (amennyiben a Partner Büfé vagy a futár rendelkezik POS terminállal)</li>
        <li>[Esetleges egyéb módok, pl. SZÉP kártya, ha releváns és technikailag megoldott]</li>
      </ul>
      <p><strong>8.4.</strong> Online bankkártyás fizetés esetén a Felhasználó a fizetési szolgáltató biztonságos oldalára kerül átirányításra. A Szolgáltató a Felhasználó bankkártyaadatait nem ismeri meg és nem tárolja.</p>
      <p><strong>8.5.</strong> A Felhasználó a rendelés leadásával elfogadja, hogy a Szolgáltató a vásárlásról elektronikus számlát állíthat ki, amelyet a Felhasználó által megadott e-mail címre küld meg.</p>

      <h2 className="section-title">9. Kiszállítás és átvétel</h2>
      <p><strong>9.1.</strong> A rendelés teljesítését (az étel elkészítését, csomagolását és kiszállítását vagy átvételre való előkészítését) a Felhasználó által kiválasztott Partner Büfé végzi.</p>
      <p><strong>9.2.</strong> A kiszállítási/átvételi időpontok tájékoztató jellegűek, amelyeket a Partner Büfé aktuális kapacitása és a forgalmi viszonyok befolyásolhatnak. A Szolgáltató és a Partner Büfé törekszik a megadott időintervallum betartására, de az esetleges késésekért a Szolgáltató felelősséget nem vállal.</p>
      <p><strong>9.3.</strong> A kiszállítás díját és a kiszállítási területet a Partner Büfé határozza meg, ezek az információk a rendelési folyamat során megjelennek.</p>
      <p><strong>9.4.</strong> Személyes átvétel esetén a Felhasználó a Partner Büfé címén, a megadott időpontban veheti át a rendelést.</p>
      <p><strong>9.5.</strong> Amennyiben a kiszállítás a Felhasználónak felróható okból (pl. pontatlan cím, elérhetetlenség a megadott címen és időben) meghiúsul, a Partner Büfé jogosult a vételárat és a kiszállítási díjat felszámítani.</p>

      <h2 className="section-title">10. Elállási jog (Fogyasztói szerződések esetén)</h2>
      <p><strong>10.1.</strong> A fogyasztónak minősülő Felhasználót (természetes személy, aki szakmája, önálló foglalkozása vagy üzleti tevékenysége körén kívül jár el) a 45/2014. (II. 26.) Korm. rendelet alapján megilleti az indokolás nélküli elállási jog.</p>
      <p><strong>10.2. <span className="warning-note">FONTOS KIVÉTEL:</span></strong> A Felhasználó <strong>nem gyakorolhatja</strong> elállási jogát a romlandó vagy minőségét rövid ideig megőrző termékek (tipikusan: elkészített ételek, italok) tekintetében [45/2014. Korm. rend. 29. § (1) d)].</p>
      <p><strong>10.3.</strong> Amennyiben a Weboldalon nem romlandó termékek (pl. előre csomagolt tartós élelmiszerek, italok, ajándéktárgyak) is rendelhetők, ezekre vonatkozóan a Felhasználót megilleti az elállási jog a termék átvételétől számított 14 napon belül. Elállási szándékát a Felhasználó egyértelmű nyilatkozattal (pl. e-mailben) jelezheti a Szolgáltató vagy közvetlenül a Partner Büfé felé (attól függően, ki az eladó fél a konkrét termék esetében). Az elállási jog gyakorlásának részletes szabályait a 45/2014. (II. 26.) Korm. rendelet tartalmazza.</p>

      <h2 className="section-title">11. Szavatosság, Jótállás, Panaszkezelés</h2>
      <p><strong>11.1. Kellékszavatosság:</strong> A Partner Büfé (mint eladó) felelős a termék hibájáért (kellékszavatosság) a Polgári Törvénykönyv szabályai szerint. Hibás teljesítés esetén a Felhasználó választása szerint kijavítást vagy kicserélést kérhet, kivéve, ha ez lehetetlen vagy aránytalan többletköltséget okozna a Partner Büfének. Ha a Partner Büfé a kijavítást/kicserélést nem vállalta, vagy annak nem tud eleget tenni, a Felhasználó árleszállítást igényelhet, a hibát a Partner Büfé költségére kijavíthatja/kijavíttathatja, vagy elállhat a szerződéstől (jelentéktelen hiba miatt elállásnak nincs helye). A Felhasználó a hiba felfedezése után késedelem nélkül, de legfeljebb 2 hónapon belül köteles a hibát közölni. A szerződés teljesítésétől számított 2 éves elévülési határidőn túl kellékszavatossági jogait már nem érvényesítheti.</p>
      <p><strong>11.2. Termékszavatosság:</strong> Ingó dolog (termék) hibája esetén a fogyasztónak minősülő Felhasználó választása szerint a kellékszavatossági jogát vagy termékszavatossági igényt érvényesíthet a termék gyártójával vagy forgalmazójával (Partner Büfé) szemben. Termékszavatossági igényként a Felhasználó kizárólag a hibás termék kijavítását vagy kicserélését kérheti. A termék akkor hibás, ha nem felel meg a forgalomba hozatalakor hatályos minőségi követelményeknek, vagy nem rendelkezik a gyártó által adott leírásban szereplő tulajdonságokkal. A termékszavatossági igény a termék forgalomba hozatalától számított 2 éven belül érvényesíthető.</p>
      <p><strong>11.3. Jótállás:</strong> Jótállásra a Partner Büfé a jogszabályban meghatározott esetekben (pl. tartós fogyasztási cikkek) vagy önkéntes vállalás alapján köteles. Élelmiszerekre jellemzően nem vonatkozik kötelező jótállás.</p>
      <p><strong>11.4. Panaszkezelés:</strong> A Felhasználó a Szolgáltatással vagy a rendeléssel kapcsolatos panaszait a Szolgáltató 2. pontban megadott elérhetőségein (e-mail, telefon, postai cím) vagy a Partner Büfé elérhetőségein (ha a panasz közvetlenül a termékkel vagy a Partner Büfé szolgáltatásával kapcsolatos) terjesztheti elő. A Szolgáltató a szóbeli panaszt lehetőség szerint azonnal orvosolja, az írásbeli panaszt pedig 30 napon belül kivizsgálja és megválaszolja. A panasz elutasítása esetén a Szolgáltató indokolást ad és tájékoztatja a Felhasználót a jogorvoslati lehetőségekről.</p>
      <p><strong>11.5. Jogorvoslati lehetőségek:</strong></p>
      <ul>
        <li><strong>Békéltető Testület:</strong> A Felhasználó (fogyasztó) a lakóhelye vagy tartózkodási helye szerint illetékes Békéltető Testülethez fordulhat. A Szolgáltató székhelye szerint illetékes testület: [Illetékes Békéltető Testület neve és elérhetősége]. A Szolgáltató köteles a Békéltető Testületi eljárásban együttműködni.</li>
        <li><strong>Online Vitarendezési Platform (ODR):</strong> Az Európai Bizottság által biztosított platform: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a></li>
        <li><strong>Fogyasztóvédelmi Hatóság:</strong> [Illetékes Kormányhivatal Fogyasztóvédelmi Főosztályának elérhetősége]</li>
        <li><strong>Bírósági eljárás:</strong> A Felhasználó jogosult követelését bíróság előtt érvényesíteni a Polgári Perrendtartás szabályai szerint.</li>
      </ul>

      <h2 className="section-title">12. Felelősségkorlátozás</h2>
      <p><strong>12.1.</strong> A Szolgáltató közvetítő szolgáltatóként felelősséget vállal a Weboldal működéséért és a rendelések Partner Büfék felé történő továbbításáért.</p>
      <p><strong>12.2.</strong> A Szolgáltató nem vállal felelősséget:</p>
      <ul>
          <li>A Partner Büfék által biztosított információk (termékleírások, árak, allergén információk, nyitvatartás stb.) pontosságáért, teljességéért és naprakészségéért. Allergia vagy ételintolerancia esetén a Felhasználó kötelessége közvetlenül a Partner Büfénél érdeklődni a pontos összetevőkről a rendelés leadása előtt.</li>
          <li>A Partner Büfék által elkészített ételek minőségéért, ízéért, mennyiségéért vagy a higiéniai előírások betartásáért.</li>
          <li>A kiszállítás pontosságáért és a szállítás közben esetlegesen bekövetkező károkért (ezekért elsődlegesen a Partner Büfé vagy az általa megbízott futárszolgálat felelős).</li>
          <li>A Weboldal ideiglenes elérhetetlenségéből, működési hibáiból eredő károkért, amennyiben azok a Szolgáltató érdekkörén kívül eső elháríthatatlan okból (vis maior) vagy technikai karbantartás miatt következnek be.</li>
          <li>A Felhasználó által megadott adatok pontatlanságából eredő problémákért (pl. sikertelen kézbesítés).</li>
          <li>Harmadik felek által a Weboldalon esetlegesen elhelyezett kártékony kódokból (vírusok, kémprogramok) eredő károkért (a Szolgáltató megtesz minden ésszerű biztonsági intézkedést ezek elkerülésére).</li>
      </ul>
      <p><strong>12.3.</strong> A Szolgáltató felelőssége a Szolgáltatással okozott károkért – a szándékosan okozott, valamint az emberi életet, testi épséget vagy egészséget megkárosító szerződésszegés kivételével – a Felhasználó által az adott rendelésért fizetett összeg mértékéig korlátozott.</p>

      <h2 className="section-title">13. Adatvédelem</h2>
      <p>
        A Felhasználó személyes adatainak kezelésére vonatkozó részletes szabályokat a Weboldalon külön elérhető <strong>Adatkezelési Tájékoztató</strong> tartalmazza, amely jelen ÁSZF elválaszthatatlan mellékletét képezi. A Felhasználó a Weboldal használatával és a Szolgáltatás igénybevételével elfogadja az Adatkezelési Tájékoztatóban foglaltakat.
      </p>

      <h2 className="section-title">14. Szellemi tulajdonjogok</h2>
      <p><strong>14.1.</strong> A BüféGO weboldal, annak teljes tartalma (szövegek, képek, grafikák, logók, szoftverek, elrendezés, design) a Szolgáltató vagy az őt erre feljogosító harmadik személyek szellemi tulajdonát képezi, és szerzői jogi védelem alatt áll.</p>
      <p><strong>14.2.</strong> A Weboldal tartalmának vagy részeinek bármilyen, a magáncélú felhasználást meghaladó (pl. kereskedelmi célú) másolása, többszörözése, terjesztése, átdolgozása, adatbázisban történő tárolása kizárólag a Szolgáltató előzetes írásbeli engedélyével lehetséges.</p>
      <p><strong>14.3.</strong> A BüféGO név és logó a Szolgáltató védjegye vagy védjegyoltalom alatt álló megjelölése lehet, azok használata kizárólag a Szolgáltató engedélyével történhet.</p>

      <h2 className="section-title">15. Az ÁSZF módosítása</h2>
      <p><strong>15.1.</strong> A Szolgáltató jogosult a jelen ÁSZF rendelkezéseit egyoldalúan, bármikor módosítani, különösen a jogszabályi környezet változása, a Szolgáltatás bővülése vagy módosulása esetén.</p>
      <p><strong>15.2.</strong> A módosított ÁSZF a Weboldalon történő közzététellel lép hatályba. A Szolgáltató a regisztrált Felhasználókat a változásról a közzététellel egyidejűleg e-mailben is értesítheti.</p>
      <p><strong>15.3.</strong> Amennyiben a Felhasználó a módosítást követően továbbra is használja a Weboldalt vagy igénybe veszi a Szolgáltatást, az a módosított ÁSZF elfogadásának minősül. Ha a Felhasználó nem ért egyet a módosításokkal, jogosult a továbbiakban a Szolgáltatás igénybevételétől tartózkodni és regisztrációját törölni.</p>

      <h2 className="section-title">16. Irányadó jog és záró rendelkezések</h2>
      <p><strong>16.1.</strong> Jelen ÁSZF-re és a Felek közötti jogviszonyra a magyar jogszabályok, különösen a Polgári Törvénykönyvről szóló 2013. évi V. törvény (Ptk.), az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény (Ekertv.), valamint a fogyasztó és a vállalkozás közötti szerződések részletes szabályairól szóló 45/2014. (II. 26.) Korm. rendelet rendelkezései az irányadók.</p>
      <p><strong>16.2.</strong> Amennyiben az ÁSZF valamely rendelkezése érvénytelen vagy végrehajthatatlan lenne, az nem érinti a többi rendelkezés érvényességét és hatályát. Az érvénytelen rész helyébe a vonatkozó jogszabályok rendelkezései lépnek.</p>
      <p><strong>16.3.</strong> A jelen ÁSZF-ben nem szabályozott kérdésekben a fent hivatkozott jogszabályok rendelkezései az irányadók.</p>
      <p><strong>16.4.</strong> A Felek törekednek a vitás kérdéseket békés úton, tárgyalások révén rendezni.</p>

      <hr />
      <div className="warning-note" style={{ border: '1px solid orange', padding: '10px', margin: '15px 0', backgroundColor: '#fff8e1' }}>
          <strong>Ismételt figyelmeztetés:</strong> Ez a dokumentum egy általános minta JSX formátumban. A BüféGO pontos működésének ismeretében jogásszal szükséges véglegesíteni és testre szabni a szöveg tartalmát a teljes jogi megfelelőség érdekében. Töltsd ki a <code>[...]</code> részeket!
      </div>
    </div>
  );
}

export default Aszf;