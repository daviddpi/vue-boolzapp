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

        myContacts: [],
        indexContact: 0,
        addNewMessages: "",
        count: 0,
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
            this.count++;
            this.addNewMessages = "";
            console.log(this.count);

        },

        //testo di risposta che si verifica quando l'utente digita un messaggio
        answerText(){
            
            if(this.count){
                let addMessage = {
                    date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                    text: "ok",
                    status: 'received',
                };
                this.myContacts[this.indexContact].messages.push(addMessage);
                this.count = 0;
            }
        }
    },

    mounted(){
        setTimeout( this.answerText, 2000);
        console.log(this.count);
    },

    created(){
        this.copyArray;
        this.indexContact = 0;
        console.log("original: ",this.contacts);
        console.log("copy: ",this.myContacts);
    },

    computed: {

        //copia l'array e Vue sa quando aggiornare il DOM quando uno dei valori dipendenti dall'array copiato è cambiato
        copyArray(){
            this.myContacts = this.contacts.slice();      
        },      
    },
    

    //il messaggio di preview viene tagliato se è maggiore di un tot numero di caratteri
    filters: {
        cutString(str){
            if(str.length > 20){
                return str.slice(0, 22) + "..";
            }
            return str;
        }
    }

});