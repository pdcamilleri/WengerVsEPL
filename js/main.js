window.onload = function() {

    var wengers = {
        name: "Arsène Wenger",
        club: "Arsenal",
        startDate: "01-10-1996",
        daysInCharge: -1, // Calculated later.
        playersAlmostSigned: 1 / 0
    };

    // #4 - try and move to external file.
    // All dates taken from wikipedia - https://en.wikipedia.org/wiki/List_of_Premier_League_managers
    var otherManagers = [
        {
            name: "Eddie Howe",
            club: "AFC Bournemouth",
            startDate: "01-07-2016" // The year they were promoted to the EPL.
            // startDate: "12-10-2012" // according to wikipedia link above.
        }, {
            name: "Sean Dyche",
            club: "Burnley",
            startDate: "01-07-2017" // promoted in 2016
            //startDate: "30-10-2012"
        }, {
            name: "Antonio Conte",
            club: "Chelsea",
            startDate: "01-07-2016" // signed in April, but wont start till 16/17 season.
            // could arguably make this the date that italy gets knocked out of euro 2016, final being 11 july.
        }, {
            name: "Alan Pardew",
            club: "Crystal Palace",
            startDate: "02-01-2015"
        }, {
            name: "Ronald Koeman",
            club: "Everton",
            startDate: "14-06-2016"
        }, {
            name: "Steve Bruce",
            club: "Hull City",
            startDate: "01-07-2016" // promoted in 2016
            //startDate: "08-06-2012" // start date on wiki
        }, {
            name: "Claudio Ranieri",
            club: "Leicester City",
            startDate: "13-07-2015"
        }, {
            name: "Jürgen Klopp",
            club: "Liverpool",
            startDate: "08-10-2015"
        }, {
            name: "Josep Guardiola",
            club: "Manchester City",
            startDate: "01-07-2016"
            // signed in february, but didnt start till 16/17 season
        }, {
            name: "José Mourinho",
            club: "Manchester United",
            startDate: "27-05-2016"
        }, {
            name: "Aitor Karanka",
            club: "Middlesbrough",
            startDate: "01-07-2016" // promoted in 2016
            //startDate: "13-11-2013" // datae from wiki link above.
        }, {
            name: "No manager",
            club: "Southampton",
            startDate: "01-07-2016" // new manager incoming...
        }, {
            name: "Mark Hughes",
            club: "Stoke City",
            startDate: "30-05-2013"
        }, {
            name: "Sam Allardyce",
            club: "Sunderland",
            startDate: "09-10-2015"
        }, {
            name: "Francesco Guidolin",
            club: "Swansea City",
            startDate: "18-01-2016"
        }, {
            name: "Mauricio Pochettino",
            club: "Tottenham Hotspur",
            startDate: "27-05-2014"
        }, {
            name: "Walter Mazzarri",
            club: "Watford",
            startDate: "01-07-2016"
            // signed for watford in may, contract with watford didnt start till july 1st.
        }, {
            name: "Tony Pulis",
            club: "W.B.A.",
            startDate: "01-01-2015"
        }, {
            name: "Slaven Bilić",
            club: "West Ham United",
            startDate: "09-06-2015"
        }
    ];

    // Calculate the daysInCharge for each manager based on the startDate.
    calculateEmploymentLength([wengers]);
    calculateEmploymentLength(otherManagers);

    // Add the managers to the HTML document.
    addManagers(document.getElementById("otherManagersTable"), otherManagers);
    addManagers(document.getElementById("wengerTable"), [wengers]);

    // Calculate if Wenger or the other managers have employment periods.
    var wengerTotalDaysEmployed = sumEmploymentLengths([wengers]);
    var otherManagersTotalDaysEmployed = sumEmploymentLengths(otherManagers);
    var difference = wengerTotalDaysEmployed - otherManagersTotalDaysEmployed;

    // Display the result
    // TODO is there a cleaner way to do this?
    document.getElementById("otherManagersTable").innerHTML += getRowTemplate()({
        daysInCharge: otherManagersTotalDaysEmployed,
        name: 'total',
        club: ''
    });
    document.getElementsByClassName("wengerDays")[0].innerHTML = wengerTotalDaysEmployed;
    document.getElementsByClassName("otherManagersDays")[0].innerHTML = otherManagersTotalDaysEmployed;
    // Also display how long until other managers catch up.
    document.getElementById("daysUntilWengerLoses").innerHTML = Math.ceil(difference / 19);
    //document.getElementById("daysUntilWengerLoses").parentElement.hidden = false;


    if (difference >= 0) {
        showWengerWinning();
    } else {
        showWengerLosing();
    }

    //////////////////////
    // Helper functions //
    //////////////////////

    // Shows all of the given HTML elements.
    function showById() {
        for (var i = 0; i < arguments.length; ++i) {
            document.getElementById(arguments[i]).hidden = false;
        }
    }

    // Hide all of the given HTML elements.
    function hideById() {
        for (var i = 0; i < arguments.length; ++i) {
            document.getElementById(arguments[i]).hidden = true;
        }
    }

    // Adds other managers to the HTML document
    function addManagers(targetElement, managers) {
        var template = getRowTemplate();
        for (var i = 0; i < managers.length; ++i) {
            targetElement.innerHTML += template(managers[i]);
        }

        // TODO Also add a total row at the bottom
    }

    function getRowTemplate() {
        return Handlebars.compile(document.getElementById("hbTableRow").innerHTML);
    }

    // Given a list of managers, calculates the length of their current employment period.
    // Saves the length of employment in the manager object under 'daysInCharge'
    function calculateEmploymentLength(managers) {
        return managers.map(
            (manager) => manager.daysInCharge = daysSince(manager.startDate)
        );
    }

    // Sums up the total daysInCharge for each manager.
    function sumEmploymentLengths(managers) {
        return managers.map((manager) => manager.daysInCharge)
                        .reduce((total, curr) => total + curr, 0);
    }

    function daysSince(date) {
        return -moment(date, "DD-MM-YYYY").diff(moment(), 'days')
    }

    // Shows images and other html elements associated with a Wenger loss..
    function showWengerLosing() {
        document.getElementById("winningText").innerHTML = "EPL Mangers Win!";
        showById("wengerLoses");
        showById("othersWin");
        hideById("wengerWins");
        hideById("othersLose");
    }

    // Shows images and other html elements associated with a Wenger victory.
    function showWengerWinning() {
        document.getElementById("winningText").innerHTML = "Wenger Wins!";
        showById("wengerWins");
        showById("othersLose");
        hideById("wengerLoses");
        hideById("othersWin");
    }

};