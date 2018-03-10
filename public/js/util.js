// on-click for submit button
// reroutes to display page as the playlist is retrieved
$('#submit').on('click', (e) => {
    //prevent refreshing the page, allows pressing enter
    e.preventDefault();

    //get recipe link from form
    const recipe = $('#searchBarForm').val().trim();

    //sends recipe link to db
    $.ajax(`/recipe`, {
        data : { link : recipe },
        dataType : `json`,
        method: `POST`
    }).done(dbRecipe => {
        //use the recipe mirrored back to start the API calls
        //this is to assure that something is on db before API calls start
        const id = dbRecipe.id;
        const link = dbRecipe.links;

        // result of the spoonacular call is the text being returned
        // note that the id is passed through so we can associate later on
        spoonacular(id, link, (id, data) => {
            //data has the whole spoonacular result, for the next call we only need the instructions
            const text = data.instructions

            //pass the text from spoonacular to deepAI
            deepAI(id, text, (id, index) => {
                //now we use the index directly into the spotify api call
                spotify(id, index);
            });
        });
    });
});

//set up functions for API calls
//so we don't have a killer headache tracking the logic
const spoonacular = (id, recipe, callback) => {
    //using the link from user to call spoonacular API
    //using a post to pass data to the server
    $.ajax(`/unirest`, {
        method : `POST`,
        data : {
            link : recipe
        },
        dataType : 'json'
        //pass the result to the next function
    }).done( data => callback(id, data));
}

const deepAI = (id, text, callback) => {
    //create post request
    $.ajax('/deepAI', {
        method : `POST`,
        data : {
            //send to server the text to be analyzed
            'text' : text
        }
        //once the text is analyzed, and the response is processed on the server, pass to the next func
    }).done( result => callback(id, result.retIndex) );
}

const spotify = (id, index, callback) => {
    $.ajax(`/spotify/`, {
        method : 'POST',
        data : {
            searchId : id,
        }
    });
}
