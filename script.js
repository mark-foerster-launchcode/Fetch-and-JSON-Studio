window.addEventListener( 'load', () => {
    fetch( 'https://handlers.education.launchcode.org/static/astronauts.json' )
    .then( response => response.json() ).then( json => {
        const astroHeader = document.getElementById( 'astroheader' );
        astroHeader.textContent += ` (${json.length} of them)`;
        json.sort( (a, b) => b.hoursInSpace - a.hoursInSpace );
        const htmlInsert = json.reduce( (accum, cur) => {
            accum += '<div class="astronaut">' +
                    '<div class="bio">' +
                        `<h3>${cur.firstName} ${cur.lastName}</h3>` +
                        '<ul>' +
                            `<li>Hours in space: ${cur.hoursInSpace}</li>` +
                            '<li' + (cur.active ? ' style="color:green"' : '') +
                                `>Active: ${cur.active}</li>` +
                            '<li>Skills: ' +
                            cur.skills.reduce( (skillList, skill, si) => {
                                skillList += skill;
                                if ( si < cur.skills.length - 1 ) {
                                    skillList += ', ';
                                }
                                return skillList;
                            }, `` ) +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                    `<img class="avatar" src="${cur.picture}">` +
                '</div>';
            return accum;
        }, ``);
        const astroContainer = document.getElementById( 'container' );
        astroContainer.innerHTML = htmlInsert;
    } )
} );