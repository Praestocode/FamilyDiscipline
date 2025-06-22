**TO DO:**
1) Impostare bene lo stile su TASKS CARD.
2) correggere la card del peso (punto 15 su **GENERALE**)
3) DOPO TUTTO QUESTO LAVORONE, rileggi le note ed cancella tutto ciò che non è necessario, risolvi i rimanenti (quelli che puoi risolvere)
e dopo? inventa altre robe in homepage e sei apposto!


**HOMEPAGE**

**REWARDS**

**SETTINGS**
1) METTERE IN WEIGHT CARD in alto a DX un button per resettare tutto (icona semplice)
2) IN TASKS CARD METTERE CHE SE E' GIORNO FERIALE NON PUOI COMPLETARE LE TASK DELLA TABELLA DEL WEEKEND, E VICEVERSA.
3) IN TASKS CARD METTERE BUTTON PER LA CANCELLAZIONE DI TUTTE LE TASKS (MODAL DI CONFERMA).
4) IN TASKS CARD METTERE IN BASSO PROGRESSBAR PER MOSTRARE IN PERCENTUALE QUANTE TASKS HAI COMPLETATO, OVVIAMENTE IN RELAZIONE A QUELLE ASSEGNATE.
5) SU SMOKE CARD METTERE QUANTI GIORNI MANCANO PER SMETTERE DI FUMARE (Se si rispettano i limiti)

**PROFILE**
1) Metti che si possono scrivere su delle note i tuoi obiettivi a breve, medio e lungo termine. Non saranno dei componenti interattivi ma saranno solo una
sorta di appunti per ricordarti ciò che vuoi raggiungere.

**GENERALE**
1) Gli indirizzi delle chiamate API devono essere scritte con una variabile e non hardcoded, forse nel file .env, basta che la variabile sia esportata
in tutta la web app a livello globale
2) quando cambi status ci sarà l'animazione dei confetti, una toast in alto che te lo notifica e si ricarica la pagina in cui sei (qualunque essa sia).
3) Mettere un servizio "scroll-to-top" quando cambi pagina.
4) IN GENERALE IL PUNTEGGIO DEVE SEMPRE MATCHARE LO STATUS. sia che il punteggio diminuisca sia che aumenti.
5) SENZA LOGGARMI SE SCRIVO QUALCOSA NELL'URL CHE NON ESISTE MI PORTA ALLA PAGINA NOTFOUND (Invece dovrebbe farmi rimanere lì) - la notfound è solo se cerchi qualcosa
e sei loggato.
6) I nomi delle pagine dovrebbero combaciare ed essere uguali sia sulla bottom nav che sul titolo di pagina in alto, (anche sulla rotta sarebbe cool...però sticazzi)
7) Mettere sezione "CARICA": Con foto, frasi e video che ti danno la carica.
8) PER NON FAR BARARE:
   1. Rendere pubblici i progressi del peso con 'peso iniziale' e 'peso ideale' per ogni utente
   2. Gestire bene tabella tasks (da creare)
10) Quando una persona smette di fumare? cosa visualizza? a parte che dovrebbe ricevere 20'000 punti bonus ma vabbè
11) Se la web app è aperta in più schede che succede? si fuckuppa l'auth? controllare queste cose testando con utilizzo.
12) Scrivere da qualche parte, in qualche nota (forse nel profilo) che è l'utilizzo di questa web app è stato previsto SOLO da smartphone:
la web app è del tutto accesibile e funzionante da altri dispositivi come pc e tablet MA il layout è tutto fuckuppato...sti gran cazzi.
13) Quando andrà in produzione siamo sicuri che se un utente è nella web app allo scoccare della mezzanotte non riceve il doppio dei punti?
(cronjob in backend + timer componente frontend). Controllare, il timer, non dovrebbe esserci.
14) CORREGGERE: Nella card weight un utente può impostare peso iniziale '80' e peso ideale '70.5' o '70', quindi perdendo anche mezzo kg o un kg
può guadagnare 5000 punti. O facciamo che i 5000 punti vengono dati solo se il peso ideale è inferiore almeno di 5kg al peso iniziale, oppure 
semplicemente mettiamo la scritta "Vabbè...se volevi 5000 punti bastava chiedere...".
15) MOLTO, MOLTO IMPORTANTE: Se imposto peso iniziale a 50kg e peso ideale a 50kg e poi peso attuale a 50kg mi vengono dati 5000 punti. ciò non deve essere possibile
16) AVVOLTE MI SEMBRA CHE LE CHIAMATE API VENGANO CHIAMATE DUE VOLTE: Dopo il login vai in profilo e fai logout e controlla il terminale di Laravel
17) Aggiungi Button su card tasks affianco al reset che se cliccato ti porta all'ora attuale (button con orologia e freccia in basso). Solo su card in uso
non su festiva/feriale
17) Aggiungi Button su card NON IN USO tasks affianco al reset che se cliccato ti porta al button soto 'salva impostazione'. Solo su card NON in uso
non su festiva/feriale

**NOTE**

**ALLA FINE**
1) Togliere ogni console.log