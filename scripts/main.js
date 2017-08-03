//Sample PouchDb web application.

var db = new PouchDB('rsvpouch');
PouchDB.debug.enable('*');

db.info().then(function (info) {
    console.log(info);
});

var pouchy = new Vue({
    el: '#pouchy',
    data: {
        header: "RSVPouch",
        whatToDo: "Create a list of RSVP's!",
        name: '',
        show: db.info().doc_count > 0
    },
    computed: {
        fullName: "", //todo
        numInParty: "",
        going: ""
    },
    methods: {
        addToDb: function () {
            var content = { "_id": this.data.name.value };

            db.put(content);
        }
    }
});

