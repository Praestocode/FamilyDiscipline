**GUIDA**
Lo so, non hai voglia di fare una minchia - ma non è questo lo spirito giusto, fatti un bel caffè e affronta le cose una
alla volta e vedrai che finirai prima di quello che pensi.
Non guardare tutti gli step, ma solo uno alla volta, concentrati su quello e mentre lo fai non guardare nemmeno gli altri,
non preoccupartene, vai avanti un passo alla volta e avrai finito.
- Procedi così: 
1. metti lo scroll to top
2. Metti button 'reset' su weight card 
3. Correggi la colorazione light/dark mode in tutta la web app
-- CHIUDI TUTTO --
-- RIAPRI TUTTO --
1. Metti i famcoins anche su card smoke con icona (50 se rispetti limite giornaliero - scompare se superi limite)
2. Correggi la infocard mettono icona famcoins
3. Fai che lo status matchi sempre il punteggio, in ogni sezione in modo dinamico.
-- CHIUDI TUTTO --
-- RIAPRI TUTTO --
1. Aggiungi le robe in homepage: prima decidi cosa aggiungere valutando a priori complessità/scalabilità/utlità e coolness (è un grande lavoro ma ce la farai!).
-- CHIUDI TUTTO --
-- RIAPRI TUTTO --
1. Fai ciò che rimane in 'prima del rilascio'**----------SEI QUI!!!!!----------SEI QUI!!!!!----------SEI QUI!!!!!----------**
2. Compra il dominio - setta tutto - fa il rilascio
-- TESTING --
1. Vedi cosa c'è da correggere obbligatoriamente e nel caso correggi, poi rilascia pubblicamente.

**HOMEPAGE**

**REWARDS**

**SETTINGS**
1) METTERE IN WEIGHT CARD in alto a DX un button per resettare tutto (icona semplice)
2) SU SMOKE CARD METTERE QUANTI GIORNI MANCANO PER SMETTERE DI FUMARE (Se si rispettano i limiti)

**PROFILE** 

**GENERALE**
1) Arricchire sezione 'confronti' 
- mettere i limiti degli utenti e da quanto tempo stanno rispettando per SMOKE
- Mettere obiettivo peso e peso attuale per WEIGHT
- mettere n. Tasks impostate ed eseguite per giorno corrente

**NOTE**

**PRIMA DEL 1° RILASCIO**
00) Arricchire sezione 'confronti' 
- mettere i limiti degli utenti e da quanto tempo stanno rispettando per SMOKE
- Mettere obiettivo peso e peso attuale per WEIGHT
- mettere n. Tasks impostate ed eseguite per giorno corrente
0) Mettere schermata che blocca la visualizzazione della web app da tablet o desktop - deve essere SOLO per smartphone
1) Gli indirizzi delle chiamate API devono essere scritte con una variabile e non hardcoded, forse nel file .env, basta che la variabile sia esportata
in tutta la web app a livello globale
2) Correggere bene i nomi dei titoli sulla TASKS CARD e anche messaggi nel modal di reset.
3) Togliere ogni console.log
4) FIXXA SE POSSIBILE GLI NPM AUDIT (Vedi se ne vale la pena e capisci se sono un rischio solo in locale o anche in prod. - studia bene situazione, e VALUTA BENE prima di agire, se è troppo sbatti lascia perdere)
5) AVVOLTE MI SEMBRA CHE LE CHIAMATE API VENGANO CHIAMATE DUE VOLTE: Dopo il login vai in profilo e fai logout e controlla il terminale di Laravel

**DOPO IL 1° RILASCIO**
1) Se la web app è aperta in più schede che succede? si fuckuppa l'auth? controllare queste cose testando con utilizzo.
2) Quando andrà in produzione siamo sicuri che se un utente è nella web app allo scoccare della mezzanotte non riceve il doppio dei punti?
(cronjob in backend + timer componente frontend). Controllare, il timer, non dovrebbe esserci.

**SECONDARIE - IMPLEMENTAZIONE IN FUTURA BETA**
1) Mettere sezione "CARICA": Con foto, frasi e video che ti danno la carica.
2) Quando una persona smette di fumare? cosa visualizza? a parte che dovrebbe ricevere 20'000 punti bonus ma vabbè
3) Scrivere da qualche parte, in qualche nota (forse nel profilo) che è l'utilizzo di questa web app è stato previsto SOLO da smartphone:
la web app è del tutto accesibile e funzionante da altri dispositivi come pc e tablet MA il layout è tutto fuckuppato...sti gran cazzi.
4) quando cambi status ci sarà l'animazione dei confetti, una toast in alto che te lo notifica e si ricarica la pagina in cui sei (qualunque essa sia).
5) I nomi delle pagine dovrebbero combaciare ed essere uguali sia sulla bottom nav che sul titolo di pagina in alto, (anche sulla rotta sarebbe cool...però sticazzi)