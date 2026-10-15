# Registro Studenti

### 1. Che cos’è app.routes.ts e che cosa contiene in questo progetto? Elenca gli URL e il componente che mostrano.
`app.routes.ts` è il file di configurazione del routing di Angular. Contiene un array di oggetti di tipo `Routes` che definisce l'associazione tra ogni percorso URL e il rispettivo componente Angular visualizzato all'interno del `<router-outlet />`.

Elenco delle rotte del progetto:
* `''` (percorso vuoto): effettua un reindirizzamento automatico a `/home` (`pathMatch: 'full'`).
* `/home`: mostra il componente `Home`.
* `/elenco`: mostra il componente `Elenco`.
* `/elenco/:id`: mostra il componente `DettaglioStudente`.
* `/inserimento`: mostra il componente `Inserimento`.
* `/modifica/:id` (dalla prova in autonomia livello 3): mostra il componente `ModificaStudente`.
* `**` (wildcard per rotte non trovate): reindirizza a `/home`.

---

### 2. Che cos’è un service e perché lo si usa? Perché gli studenti stanno in StudentiService e non nel componente Elenco?
Un servizio è una classe TypeScript decorata (con `@Service()` o `@Injectable({ providedIn: 'root' })`) creata in un'unica istanza (singleton) per l'intera applicazione[cite: 2]. Viene utilizzato per gestire lo stato e la logica condivisa tra più pagine e componenti.

Quando l'utente naviga da una pagina all'altra, Angular distrugge il componente di partenza e ne resetta le proprietà locali[cite: 2]. Mantenere gli studenti in `StudentiService` anziché direttamente nel componente `Elenco` garantisce che i dati non vengano persi al cambio di pagina e che componenti diversi (`Home`, `Elenco`, `Inserimento`, `DettaglioStudente`, `ModificaStudente`) possano accedere e aggiornare la stessa sorgente dati in tempo reale senza ricorrere a complessi passaggi di `@Input()` e `@Output()`.

---

### 3. Come si legge l’id dello studente dall’URL? Perché va convertito con Number?
L'id dello studente si legge iniettando `ActivatedRoute` nel componente e sottoscrivendosi al relativo `paramMap` tramite `this.route.paramMap.subscribe(parametri => { ... })` (oppure con `this.route.snapshot.paramMap.get('id')`).

La conversione tramite `Number(...)` è necessaria perché tutti i parametri estratti dall'URL vengono restituiti come stringhe (ad esempio `'2'`). Senza conversione numerica, i metodi di ricerca come `.find(s => s.id === id)` fallirebbero poiché il confronto di uguaglianza stretta in TypeScript confronta tipi diversi (`'2' === 2` restituisce `false`).

---

### 4. Perché il signal dati è privato e i componenti leggono studenti? Che cosa potrebbe succedere se Elenco potesse chiamare set sul signal?
Il signal `dati` è definito come `private` per rispettare il principio dell'incapsulamento. I componenti esterni leggono l'elenco tramite la proprietà pubblica `studenti = this.dati.asReadonly()`, che espone il signal in sola lettura.

Se il componente `Elenco` avesse accesso diretto a `dati.set(...)`, un qualsiasi componente potrebbe sovrascrivere o corrompere l'intero array degli studenti aggirando le regole di business e i metodi validati del servizio (come il calcolo automatico dell'id univoco o la formattazione dei dati).

---

### 5. Come viene calcolato l’id di un nuovo studente? Mostra con un esempio perché “numero di studenti + 1” sarebbe sbagliato.
L'id del nuovo studente viene calcolato dal metodo privato `prossimoId()` trovando il valore massimo tra gli id esistenti e sommando 1:  
`Math.max(0, ...this.dati().map(s => s.id)) + 1`.

**Esempio di errore con "numero + 1":**  
Se ci sono 5 studenti registrati con id `1, 2, 3, 4, 5` e lo studente con id `2` viene eliminato, rimangono 4 studenti. Se si calcolasse il nuovo id come "numero + 1" (`4 + 1`), al sesto studente verrebbe assegnato l'id `5`, creando una chiave duplicata. Usando invece il valore massimo esistente (`5 + 1`), il nuovo id sarà correttamente `6`.

---

### 6. Che cosa succede, passo per passo, quando scrivi una lettera nel campo del filtro?
1. L'utente digita un carattere nel campo `<input [(ngModel)]="filtroClasse">`.
2. La direttiva `[(ngModel)]` intercetta l'evento di digitazione e aggiorna il valore del signal `filtroClasse`.
3. La modifica del signal notifica i valori calcolati `computed` che dipendono da esso (`filtrati` e `visibili`).
4. Il `computed` ricalcola l'elenco applicando la pulizia e conversione (`trim().toUpperCase()`) e filtrando gli studenti del servizio.
5. Il ciclo `@for` del template rileva l'aggiornamento del `computed` e aggiorna la tabella DOM mostrando solo i record corrispondenti.

---

### 7. A che cosa servono #modulo="ngForm" e [disabled]="modulo.invalid"? Quali condizioni rendono il form non valido?
* `#modulo="ngForm"` crea una variabile di template Angular legata all'istanza della direttiva `NgForm` che monitora lo stato del modulo.
* `[disabled]="modulo.invalid"` mantiene disabilitato il pulsante di invio finché il modulo non soddisfa tutti i vincoli prescritti.

Un form risulta non valido quando:
* Un campo obbligatorio con l'attributo `required` viene lasciato vuoto (es. `nome` o `classe`).
* Un campo numerico non rispetta i limiti definiti dagli attributi `min` o `max` (es. `media` inferiore a 1 o superiore a 10).
* Il valore inserito non rispetta l'incremento di `step` specificato.

---

### 8. Perché dopo il salvataggio si usa router.navigate(['/elenco']) invece di un link?
Si utilizza `router.navigate(['/elenco'])` perché la navigazione deve essere eseguita **da codice TypeScript** solo dopo aver completato l'operazione di salvataggio (`studentiService.aggiungi(...)` o `aggiorna(...)`). Un semplice link HTML (`routerLink`) reindirizzerebbe l'utente immediatamente al momento del click, prima che la funzione di salvataggio possa elaborare i dati nel servizio.

---

### 9. Quali input e quale output ha StudenteCard? Perché la card non chiama direttamente il servizio per rimuovere lo studente?
* **Input**:
  * `studente = input.required<Studente>()`: riceve lo studente da mostrare.
  * `azioni = input(true)`: booleano opzionale per mostrare/nascondere i pulsanti d'azione.
* **Output**:
  * `rimosso = output<Studente>()`: emette lo studente selezionato quando si clicca sul pulsante di rimozione.

La card non chiama direttamente il servizio per rimanere un componente "presentazionale" e riutilizzabile in contesti differenti. In questo modo è il componente padre (`Home`, `Elenco` o `DettaglioStudente`) a decidere la logica da applicare quando l'evento viene emesso (es. nascondere il pulsante nella home o effettuare un reindirizzamento nel dettaglio).

---

### 10. Perché Studente successivo funziona solo con paramMap.subscribe? Che cosa vedresti con lo snapshot?
Quando si clicca su "Studente successivo", la navigazione passa da un URL come `/elenco/2` a `/elenco/3`, rimanendo sulla stessa rotta. In questa situazione Angular riutilizza la stessa istanza del componente `DettaglioStudente` per motivi di efficienza, senza ricaricarlo o rieseguire l'hook `ngOnInit`.

* Con `paramMap.subscribe`, il callback viene notificato ad ogni cambio del parametro nell'URL, aggiornando dinamicamente il signal dello studente.
* Con lo **snapshot** (`this.route.snapshot.paramMap.get('id')`), l'id verrebbe letto solo una volta all'apertura del componente: l'URL nella barra del browser cambierebbe, ma la scheda dello studente rimarrebbe bloccata sullo studente iniziale.