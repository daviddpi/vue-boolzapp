let app = new Vue({

    el: "#root",
    data: {

        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },

            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
        
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },

            {
                name: 'Luisa',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        
        indexContact: 0,
        indexDelete: 0,
        addNewMessages: "",
        search: "",
        showMenu: {
            visible: false,
            index: 0
        },
    },

    methods: {  
        //cliccando su una delle chat, cambia l'indice dell'array
        chooceContact(index){
            this.indexContact = index; 
        },

        //aggiunge dell'array il testo e la data che viene poi stampato sull'HTML
        addtext(){
            let addMessage = {
                date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                text: this.addNewMessages,
                status: 'sent',
            };
            this.myContacts[this.indexContact].messages.push(addMessage);   
            this.addNewMessages = "";

            this.answerText();
        },

        //testo di risposta che si verifica quando l'utente digita un messaggio
        answerText(){
            let timeContact = this.myContacts[this.indexContact];
            let randomAnswer = ['Si, va bene', 'Ok' , 'Ci vediamo dopo', "Fantastico! Non vedo l\'ora", 'Non lo so'];
            setTimeout( function(){
                let addMessage = {
                    date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                    text: randomAnswer[Math.floor(Math.random() * randomAnswer.length)],
                    status: 'received',
                };
                timeContact.messages.push(addMessage);
            }, 4500)
        },

        deleteMex(index){
            
            let confirm = document.querySelector('#confirm');
            document.querySelector('.container').classList.add("blur-effect");
            confirm.classList.remove("d-none");
            this.indexDelete = index;

        },

        confirmDelete(value){
            let confirm = document.querySelector('#confirm');

            if(value == "Cancella"){
                this.myContacts[this.indexContact].messages.splice(this.indexDelete, 1);
            }

            //aggiunge la classe display none per chiudere la box di conferma
            confirm.classList.add("d-none");
            document.querySelector('.container').classList.remove("blur-effect");
            this.showMenu.visible = false;
        },

        copyMex(element, index) {          
            let copyText = element.text;
            navigator.clipboard.writeText(copyText);
            this.showMenu.index = index;
            this.showMenu.visible = false;
        },

        toggleMenu(element, index){
            if(this.showMenu.index != index){
                this.showMenu.visible = false;
            };
            this.showMenu.index = index;
            this.showMenu.visible = !this.showMenu.visible;
        },

        clickAnywhere(){
            if(this.showMenu.visible == true){
                this.showMenu.visible = false;
            }
        },

    },

    //premendo il tasto esc chiude il box conferma elimina messaggio
    created(){
        let that = this;
        document.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 27) {
                that.confirmDelete(evt);
            }
        });
    },

    computed: {

        //copia l'array e Vue sa quando aggiornare il DOM quando uno dei valori dipendenti dall'array copiato ?? cambiato
        myContacts(){
            return this.contacts.map( element => {
               return element;
            });
        },
        
        // funzione di ricerca, ritorna il nome dell'elemento incluso nell'input e attraverso il v-for lo stampa
        filterContacts() {
            return this.myContacts.filter(element => {
                return element.name.toLowerCase().includes(this.search.toLowerCase());       
            });
        },
        
    },

    //il messaggio di preview viene tagliato se ?? maggiore di un tot numero di caratteri
    filters: {
        cutString(str){
            if(str.length > 20){
                return str.slice(0, 22) + "..";
            }
            return str;
        }
    }

});

