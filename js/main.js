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
            startDate: "12-10-2012"
        }, {
            name: "Sean Dyche",
            club: "Burnley",
            startDate: "30-10-2012"
        }, {
            name: "Guus Hiddink",
            club: "Chelsea",
            startDate: "19-12-2015"
        }, {
            name: "Alan Pardew",
            club: "Crystal Palace",
            startDate: "02-01-2015"
        }, {
            name: "David Unsworth", // this is koeman now isnt it?
            club: "Everton",
            startDate: "12-05-2016"
        }, {
            name: "Steve Bruce",
            club: "Hull City",
            startDate: "08-06-2012"
        }, {
            name: "Claudio Ranieri",
            club: "Leicester City",
            startDate: "13-07-2015"
        }, {
            name: "Jürgen Klopp",
            club: "Liverpool",
            startDate: "08-10-2015"
        }, {
            name: "Manuel Pellegrini", // this is wrong
            club: "Manchester City",
            startDate: "14-06-2013"
        }, {
            name: "José Mourinho",
            club: "Manchester United",
            startDate: "27-05-2016"
        }, {
            name: "Aitor Karanka",
            club: "Middlesbrough",
            startDate: "13-11-2013"
        }, {
            name: "Ronald Koeman",
            club: "Southampton",
            startDate: "16-06-2014"
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
            name: "Who is managing them now?", // ???
            club: "Watford",
            startDate: "02-03-2011"
        }, {
            name: "Tony Pulis",
            club: "West Bromwich Albion",
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

    // TODO cleaner way to do this?
    document.getElementById("otherManagersTable").innerHTML += getRowTemplate()({
        daysInCharge: otherManagersTotalDaysEmployed,
        name: 'total',
        club: ''
    });

    // Display the result
    if (difference >= 0) {
        showWengerWinning();
    } else {
        showWengerLosing();
    }

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
        showById("wengerLoses");
        showById("othersWin");
        hideById("wengerWins");
        hideById("othersLose");
    }

    // Shows images and other html elements associated with a Wenger victory.
    function showWengerWinning() {
        showById("wengerWins");
        showById("othersLose");
        hideById("wengerLoses");
        hideById("othersWin");

        // Also display how long until other managers catch up.
        document.getElementById("daysUntilWengerLoses").innerHTML = Math.ceil(difference / 19);
        document.getElementById("daysUntilWengerLoses").parentElement.hidden = false;
    }

};