//Sample PouchDb web application.

PouchDB.debug.enable('*');

var db = new PouchDB('rsvpouch');
var entryList = [];
var docs = [];

db.info().then(function (info) {
    docs = info.doc_count > 0 ? fillDocs() : [];
    console.log(info);
    console.log("Docs: " + docs);
});

var pouchy = new Vue({
    el: '#pouchy',
    data: {
        header: "RSVPouch",
        whatToDo: "Create a list of RSVP's!",
        name: '',
        partySize: '',
        fullName: "Full Name",
        numInParty: "In Party:",
        dateRsvpd: "Date RSVP'd"
    },
    computed: {
        entries: {
            get: getEntries,
            set: function (newValue) { this.entries = newValue; }
        }
    },
    methods: {
        addToDb: function () {
            var content = {
                _id : new Date().toISOString(),
                name: this.name.valueOf(),
                numInParty: this.partySize.valueOf()
            };

            console.log("Entered name: " + content.name);
            console.log("Entered party size: " + content.numInParty);

            dbPut(content);
        }
    }
});

function fillDocs() {
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        docs = result.rows;
    }).catch(function (err) {
        console.log(err);
    });
}

function getEntries() {
    docs.forEach(function (doc) {
        entryList.push({
            fullName: doc.fullName,
            numInParty: doc.numInParty,
            dateRsvpd: doc._id.toLocaleString()
        })
    });
    return entryList;
}

function dbPut(content) {
    db.put(content).then(function (response) {
        docs.push(content);
        pouchy.name = '';
        pouchy.partySize = '';
        console.log("dbPut: Success for " + content._id + "!")
    }).catch(function (error) {
        console.log("Put for " + content._id + " FAILED. \n Reason: " + error);
    });
}