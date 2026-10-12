# Site seminar de muzică

## Ce conține
- `index.html`, `style.css`, `app.js`: site-ul (fără nicio mențiune Claude).
- `config.js`: datele și adresa pentru înscrieri.
- `apps-script/Code.gs`: scriptul care salvează înscrierile într-un Google Sheets.

## 1. Tabelul și scriptul (Google, gratuit)
1. Deschide [sheets.google.com](https://sheets.google.com) și creează o foaie nouă, de exemplu „Înscrieri seminar”.
2. Din meniul **Extensii > Apps Script** deschide editorul.
3. Șterge codul existent și lipește conținutul din `apps-script/Code.gs`.
4. Apasă **Implementează > Implementare nouă**. Tipul: **Aplicație web**. Acces: **Oricine**.
5. Copiază adresa care se termină în `/exec`.

## 2. Configurarea site-ului
Deschide `config.js` și înlocuiește `PUNE_AICI_URL_APPS_SCRIPT` cu adresa copiată.

## 3. Publicarea pe GitHub Pages (gratuit)
1. Pe [github.com](https://github.com), creează un repository nou, de exemplu `seminar-muzica`, public.
2. Încarcă toate fișierele (`index.html`, `style.css`, `app.js`, `config.js`) în repository.
3. Mergi la **Settings > Pages**, la **Source** alege **Deploy from a branch**, branch `main`, folder `/ (root)`, apoi **Save**.
4. După un minut, site-ul apare la `https://<utilizatorul-tău>.github.io/seminar-muzica/`.

Notă: `apps-script/Code.gs` nu trebuie încărcat pe GitHub, ci doar în Google Apps Script.

## Dacă modifici datele
Lista de date este în două locuri: `config.js` (pentru site) și `apps-script/Code.gs` (pentru tabel). Trebuie să fie identice.
