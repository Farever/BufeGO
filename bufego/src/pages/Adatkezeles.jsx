// src/components/AdatkezelesiTajekoztato.jsx (vagy ahova mented)
import React from 'react';

function AdatkezelesiTajekoztato() {
  return (
    <div className="adatkezeles-container"> {/* Adj hozzá CSS osztályt a stílusozáshoz */}
      <h1>Adatkezelési Tájékoztató - BüféGO</h1>
      <p><strong>Hatályos:</strong> [Dátum]-tól</p>

      <p>
        Jelen Adatkezelési Tájékoztató (a továbbiakban: <strong>Tájékoztató</strong>) célja,
        hogy tájékoztatást nyújtson a(z) [Cégnév] (székhely: [Cím], adószám: [Adószám],
        cégjegyzékszám: [Cégjegyzékszám], képviseli: [Képviselő neve], e-mail: [E-mail cím],
        telefon: [Telefonszám], a továbbiakban: <strong>Adatkezelő</strong> vagy <strong>Szolgáltató</strong>)
        által a BüféGO weboldalon ([Weboldal címe, pl. www.bufego.hu], a továbbiakban: <strong>Weboldal</strong>)
        és az azon keresztül nyújtott szolgáltatások (a továbbiakban: <strong>Szolgáltatás</strong>)
        kapcsán végzett személyes adatok kezeléséről az Európai Parlament és a Tanács (EU) 2016/679
        rendelete (általános adatvédelmi rendelet, GDPR), valamint az információs önrendelkezési jogról
        és az információszabadságról szóló 2011. évi CXII. törvény (Infotv.) rendelkezéseinek megfelelően.
      </p>
      <p>
        Kérjük, figyelmesen olvassa el ezt a Tájékoztatót, hogy megértse, hogyan kezeljük személyes adatait
        és milyen jogai vannak ezzel kapcsolatban. A Weboldal használatával, a regisztrációval, illetve
        a Szolgáltatás igénybevételével Ön (a továbbiakban: <strong>Érintett</strong> vagy <strong>Felhasználó</strong>)
        elfogadja a jelen Tájékoztatóban foglaltakat.
      </p>

      {/* Figyelmeztetés: A [...] helyeket töltsd ki valós adatokkal és jogásszal egyeztess! */}
      <div className="warning-note" style={{ border: '1px solid red', padding: '10px', margin: '15px 0', backgroundColor: '#ffeeee' }}>
          <strong>FONTOS:</strong> Ez egy általános minta. A tartalom pontosítása, kiegészítése és jogi megfelelőségének ellenőrzése elengedhetetlen adatvédelmi szakértő vagy jogász bevonásával a BüféGO tényleges működése és adatkezelési folyamatai alapján! A <code>[...]</code> helyekre a konkrét adatokat kell beilleszteni!
      </div>

      <h2 className="section-title">1. Az Adatkezelő adatai</h2>
      <ul>
        <li><strong>Név:</strong> [Cégnév]</li>
        <li><strong>Székhely:</strong> [Cím]</li>
        <li><strong>Levelezési cím:</strong> [Ha eltérő, Cím]</li>
        <li><strong>Cégjegyzékszám/Nyilvántartási szám:</strong> [Cégjegyzékszám/Nyilvántartási szám]</li>
        <li><strong>Adószám:</strong> [Adószám]</li>
        <li><strong>Képviselő:</strong> [Képviselő neve]</li>
        <li><strong>Telefonszám:</strong> [Telefonszám]</li>
        <li><strong>E-mail cím (általános):</strong> [Ügyfélszolgálati e-mail cím]</li>
        <li><strong>Adatvédelmi kérdésekben illetékes kapcsolattartó/Adatvédelmi tisztviselő (ha van):</strong></li>
        <li>   Név: [Kapcsolattartó neve / Tisztviselő neve]</li>
        <li>   E-mail: [Adatvédelmi e-mail cím]</li>
        <li>   Telefon: [Adatvédelmi telefonszám, ha van]</li>
      </ul>

      <h2 className="section-title">2. A kezelt személyes adatok köre, az adatkezelés célja és jogalapja</h2>
      <p>Az Adatkezelő a Weboldal működtetése és a Szolgáltatás nyújtása során az alábbi célokból, a megjelölt jogalapokon és a felsorolt típusú személyes adatokat kezeli:</p>

      <h3 className="subsection-title">2.1. A Weboldal látogatása (Sütik/Cookiek)</h3>
      <ul>
        <li><strong>Kezelt adatok:</strong> IP-cím, böngésző típusa, operációs rendszer adatai, látogatás ideje, időtartama, megtekintett oldalak, sütiazonosítók.</li>
        <li><strong>Adatkezelés célja:</strong> A Weboldal működésének biztosítása, fejlesztése, a felhasználói élmény javítása, biztonsági célok, látogatottsági statisztikák készítése, releváns tartalmak megjelenítése.</li>
        <li><strong>Adatkezelés jogalapja:</strong>
          <ul>
            <li>A működéshez technikailag elengedhetetlenül szükséges sütik esetén: Az Adatkezelő jogos érdeke [GDPR 6. cikk (1) f) pont] a weboldal megfelelő működésének biztosítására.</li>
            <li>Statisztikai, marketing és preferencia sütik esetén: Az Érintett hozzájárulása [GDPR 6. cikk (1) a) pont], amelyet a süti-figyelmeztető sávon vagy a süti-beállítások oldalon adhat meg.</li>
          </ul>
        </li>
        <li><em>Részletes tájékoztatást a használt sütikről a különálló Süti (Cookie) Tájékoztatóban talál [Link a Süti Tájékoztatóra, ha van külön].</em></li>
      </ul>

      <h3 className="subsection-title">2.2. Regisztráció (Felhasználói fiók létrehozása)</h3>
      <ul>
        <li><strong>Kezelt adatok:</strong> Név (vezeték- és keresztnév), e-mail cím, jelszó (titkosítva/hash-elve). [Esetleg telefonszám, ha kötelező vagy opcionális]</li>
        <li><strong>Adatkezelés célja:</strong> A Felhasználó azonosítása, felhasználói fiók biztosítása, a rendelési folyamat egyszerűsítése, kapcsolattartás.</li>
        <li><strong>Adatkezelés jogalapja:</strong> A szerződés előkészítése és teljesítése (a regisztráció a szolgáltatás igénybevételének feltétele lehet) [GDPR 6. cikk (1) b) pont].</li>
      </ul>

      <h3 className="subsection-title">2.3. Rendelés leadása és teljesítése</h3>
      <ul>
        <li><strong>Kezelt adatok:</strong> Név, e-mail cím, telefonszám, szállítási cím (ha van kiszállítás), számlázási név és cím, megrendelt termékek adatai, fizetési mód adatai (bankkártyaadatokat az Adatkezelő nem tárol, azokat a biztonságos fizetési szolgáltató kezeli), rendelés időpontja, összege.</li>
        <li><strong>Adatkezelés célja:</strong> A rendelés feldolgozása, a szerződés teljesítése (étel elkészítése, kiszállítása/átadása), számlázás, kapcsolattartás a rendeléssel kapcsolatban, a Partner Büfék értesítése.</li>
        <li><strong>Adatkezelés jogalapja:</strong> A szerződés teljesítése [GDPR 6. cikk (1) b) pont]. A számlázási adatok kezelése tekintetében jogi kötelezettség teljesítése (pl. számviteli törvény) [GDPR 6. cikk (1) c) pont].</li>
      </ul>

      <h3 className="subsection-title">2.4. Kapcsolatfelvétel, Ügyfélszolgálat</h3>
      <ul>
        <li><strong>Kezelt adatok:</strong> Név, e-mail cím, telefonszám (ha megadja), az üzenet tárgya és tartalma, a megkeresés dátuma.</li>
        <li><strong>Adatkezelés célja:</strong> Az Érintett megkereséseinek megválaszolása, panaszkezelés, tájékoztatás nyújtása.</li>
        <li><strong>Adatkezelés jogalapja:</strong> Az Érintett hozzájárulása (a kapcsolatfelvétellel) [GDPR 6. cikk (1) a) pont], illetve szerződés teljesítéséhez vagy előkészítéséhez kapcsolódó megkeresés esetén a szerződés teljesítése [GDPR 6. cikk (1) b) pont], vagy az Adatkezelő jogos érdeke a hatékony ügyfélkommunikációhoz [GDPR 6. cikk (1) f) pont].</li>
      </ul>

      <h3 className="subsection-title">2.5. Marketing célú megkeresések (pl. Hírlevél)</h3>
      <ul>
        <li><strong>Kezelt adatok:</strong> Név, e-mail cím. [Esetleg érdeklődési kör, korábbi vásárlások adatai, ha van ilyen célú profilalkotás]</li>
        <li><strong>Adatkezelés célja:</strong> Promóciós ajánlatok, újdonságok, akciók küldése elektronikus úton (hírlevél).</li>
        <li><strong>Adatkezelés jogalapja:</strong> Az Érintett önkéntes, előzetes és kifejezett hozzájárulása [GDPR 6. cikk (1) a) pont]. A hozzájárulás bármikor visszavonható a hírlevelekben található leiratkozási linkre kattintva vagy az Adatkezelő elérhetőségein.</li>
      </ul>

      <h2 className="section-title">3. Az adatkezelés időtartama</h2>
      <p>Az Adatkezelő a személyes adatokat a cél megvalósulásához szükséges ideig, illetve a jogszabályokban (pl. számviteli, adózási törvények) meghatározott megőrzési kötelezettségek lejártáig kezeli.</p>
      <ul>
        <li><strong>Sütik:</strong> A süti típusától függően, a munkamenet végétől néhány perctől akár [pl. 1-2 évig] terjedhet. Részletek a Süti Tájékoztatóban.</li>
        <li><strong>Regisztráció:</strong> A regisztráció fennállásáig, illetve az Érintett törlési kérelméig. [Inaktív fiókok törlésére vonatkozó szabályt is meg lehet itt adni, pl. X év inaktivitás után törlésre kerülhetnek.]</li>
        <li><strong>Rendelési adatok:</strong> A szerződés teljesítéséig, illetve a polgári jogi elévülési idő (általában 5 év) végéig. A számviteli bizonylatokat (számlákat) a jogszabályok alapján legalább 8 évig kell megőrizni.</li>
        <li><strong>Kapcsolatfelvétel adatai:</strong> Az ügy elintézéséig, panasz esetén a panaszügy lezárultáig, illetve az esetleges jogi igények elévüléséig.</li>
        <li><strong>Hozzájáruláson alapuló adatkezelés (pl. hírlevél):</strong> A hozzájárulás visszavonásáig.</li>
      </ul>

      <h2 className="section-title">4. Adatfeldolgozók igénybevétele</h2>
      <p>Az Adatkezelő a tevékenysége során adatfeldolgozókat vehet igénybe. Az adatfeldolgozók önálló döntést nem hoznak, kizárólag az Adatkezelővel kötött szerződés és a kapott utasítások szerint jogosultak eljárni.</p>
      <p><strong>Igénybe vett főbb adatfeldolgozói kategóriák és tevékenységek:</strong></p>
      <ul>
        <li><strong>Tárhelyszolgáltató:</strong> A Weboldal üzemeltetése, adatok tárolása. ([Tárhelyszolgáltató neve, székhelye])</li>
        <li><strong>Fizetési szolgáltató(k):</strong> Online bankkártyás fizetések biztonságos lebonyolítása. ([Fizetési szolgáltató(k) neve(i), pl. SimplePay/OTP Mobil Kft., Barion Payment Zrt., Stripe Inc., székhelye(i)])</li>
        <li><strong>Partner Büfék / Vendéglátóhelyek:</strong> A rendelések teljesítése (név, elérhetőség, rendelés tartalma). [Itt lehet általánosan utalni a Partner Büfékre, mint a rendelés teljesítésében részt vevő felekre, akik a rendelési adatokat megkapják.]</li>
        <li><strong>Kiszállítást végző partnerek (ha van):</strong> A rendelések kézbesítése. [Ha a Büfék saját maguk szállítanak, vagy ha van külső futárszolgálat, azt itt kellene jelezni.]</li>
        <li><strong>Webanalitikai szolgáltatók:</strong> A weboldal-látogatottság mérése. (pl. Google Analytics - Google Ireland Limited / Google LLC)</li>
        <li><strong>Hírlevélküldő / Marketing automatizációs szolgáltató (ha van):</strong> Hírlevelek, marketing üzenetek küldése. ([Szolgáltató neve, székhelye, pl. Mailchimp/The Rocket Science Group LLC])</li>
        <li><strong>Könyvelés, számlázás:</strong> Számviteli feladatok ellátása. ([Könyvelő cég/egyéni vállalkozó neve, székhelye])</li>
        <li><strong>[Egyéb releváns kategóriák, pl. CRM rendszer szolgáltatója, IT üzemeltető]</strong></li>
      </ul>
      <p>Az Adatkezelő biztosítja, hogy csak olyan adatfeldolgozókat vesz igénybe, akik megfelelő garanciákat nyújtanak az adatkezelés biztonságára és a GDPR követelményeinek való megfelelésre.</p>
      <p><strong>Adattovábbítás harmadik országba:</strong> Előfordulhat, hogy egyes adatfeldolgozók (pl. Google, Mailchimp) az Európai Gazdasági Térségen (EGT) kívülre továbbítanak adatokat. Ilyen esetekben az Adatkezelő meggyőződik arról, hogy a továbbítás megfelelő jogalappal (pl. megfelelőségi határozat, általános adatvédelmi záradékok) és garanciákkal történik a GDPR előírásainak megfelelően.</p>

      <h2 className="section-title">5. Adatbiztonsági intézkedések</h2>
      <p>
        Az Adatkezelő megfelelő technikai és szervezési intézkedéseket hajt végre annak érdekében,
        hogy a kockázat mértékének megfelelő szintű adatbiztonságot garantálja, ideértve többek között,
        adott esetben: a személyes adatok álnevesítését és titkosítását; a személyes adatok kezelésére
        használt rendszerek és szolgáltatások folyamatos bizalmas jellegének biztosítását, integritását,
        rendelkezésre állását és ellenálló képességét; fizikai vagy műszaki incidens esetén az arra való
        képességet, hogy a személyes adatokhoz való hozzáférést és az adatok rendelkezésre állását
        kellő időben vissza lehet állítani; az adatkezelés biztonságának garantálására hozott technikai
        és szervezési intézkedések hatékonyságának rendszeres tesztelésére, felmérésére és értékelésére
        szolgáló eljárást.
      </p>
      <p>
        Az Adatkezelő védi az adatokat különösen a jogosulatlan hozzáférés, megváltoztatás, továbbítás,
        nyilvánosságra hozatal, törlés vagy megsemmisítés, valamint a véletlen megsemmisülés, sérülés,
        továbbá az alkalmazott technika megváltozásából fakadó hozzáférhetetlenné válás ellen.
        Az online fizetések biztonságos csatornán keresztül, a fizetési szolgáltató rendszerén át
        történnek, az Adatkezelő a bankkártyaadatokhoz nem fér hozzá.
      </p>

      <h2 className="section-title">6. Az Érintett jogai</h2>
      <p>Az Érintett az Adatkezelő 1. pontban megadott elérhetőségein keresztül bármikor kérelmezheti:</p>
      <ul>
        <li><strong>Hozzáféréshez való jog:</strong> Tájékoztatást kérhet személyes adatai kezeléséről, valamint hozzáférést kérhet ezekhez az adatokhoz.</li>
        <li><strong>Helyesbítéshez való jog:</strong> Kérheti pontatlan személyes adatainak helyesbítését, illetve hiányos adatainak kiegészítését.</li>
        <li><strong>Törléshez való jog ("elfeledtetéshez való jog"):</strong> Kérheti személyes adatainak törlését, kivéve, ha az adatkezelés jogszabályi kötelezettség vagy jogos érdek alapján szükséges.</li>
        <li><strong>Adatkezelés korlátozásához való jog:</strong> Bizonyos esetekben (pl. ha vitatja az adatok pontosságát) kérheti az adatkezelés korlátozását.</li>
        <li><strong>Adat hordozhatósághoz való jog:</strong> Kérheti, hogy a hozzájárulása vagy szerződés alapján kezelt adatait tagolt, széles körben használt, géppel olvasható formátumban megkapja, illetve ezeket más adatkezelőnek továbbítsa.</li>
        <li><strong>Tiltakozáshoz való jog:</strong> Tiltakozhat személyes adatainak jogos érdeken alapuló kezelése ellen. Közvetlen üzletszerzési célú adatkezelés ellen bármikor tiltakozhat.</li>
        <li><strong>Hozzájárulás visszavonásának joga:</strong> Amennyiben az adatkezelés hozzájáruláson alapul (pl. hírlevél), a hozzájárulását bármikor visszavonhatja, ami nem érinti a visszavonás előtti adatkezelés jogszerűségét.</li>
      </ul>
      <p>Az Adatkezelő a kérelmet a lehető legrövidebb időn belül, de legfeljebb a kérelem beérkezésétől számított egy hónapon belül elbírálja és tájékoztatja az Érintettet a megtett intézkedésekről.</p>

      <h2 className="section-title">7. Jogorvoslati lehetőségek</h2>
      <p>
        Amennyiben az Érintett úgy véli, hogy az Adatkezelő megsértette a személyes adatok védelméhez
        fűződő jogait, jogorvoslatért fordulhat az Adatkezelő 1. pontban megadott elérhetőségeihez.
      </p>
      <p>
        Továbbá panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH):
      </p>
      <ul>
        <li>Cím: 1055 Budapest, Falk Miksa utca 9-11.</li>
        <li>Levelezési cím: 1363 Budapest, Pf. 9.</li>
        <li>Telefon: +36 (1) 391-1400</li>
        <li>Fax: +36 (1) 391-1410</li>
        <li>E-mail: ugyfelszolgalat@naih.hu</li>
        <li>Honlap: <a href="https://www.naih.hu" target="_blank" rel="noopener noreferrer">https://www.naih.hu</a></li>
      </ul>
      <p>
        Az Érintett a jogainak megsértése esetén bírósághoz is fordulhat. A per elbírálása a
        törvényszék hatáskörébe tartozik. A per – az Érintett választása szerint – az Érintett
        lakóhelye vagy tartózkodási helye szerinti törvényszék előtt is megindítható.
      </p>

      <h2 className="section-title">8. A Tájékoztató módosítása</h2>
      <p>
        Az Adatkezelő fenntartja a jogot, hogy a jelen Tájékoztatót egyoldalúan módosítsa, különösen
        a jogszabályi környezet vagy az adatkezelési gyakorlat változása esetén. A módosított Tájékoztató
        a Weboldalon való közzététellel lép hatályba. Az Adatkezelő javasolja, hogy rendszeresen
        tekintse át a Tájékoztatót.
      </p>

      <p><strong>Utolsó módosítás dátuma:</strong> [Dátum]</p>

       <hr />
      <div className="warning-note" style={{ border: '1px solid orange', padding: '10px', margin: '15px 0', backgroundColor: '#fff8e1' }}>
          <strong>Ismételt figyelmeztetés:</strong> Ez a dokumentum egy általános minta JSX formátumban. A BüféGO tényleges adatkezelési folyamatainak (gyűjtött adatok, célok, sütik, adatfeldolgozók stb.) pontos ismeretében adatvédelmi szakértővel vagy jogásszal szükséges véglegesíteni és testre szabni a szöveg tartalmát a teljes jogi megfelelőség érdekében. Töltsd ki a <code>[...]</code> részeket! Fontold meg külön Süti (Cookie) Tájékoztató készítését is.
      </div>
    </div>
  );
}

export default AdatkezelesiTajekoztato;