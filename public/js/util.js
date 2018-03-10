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
    }).done(dbRecipe => console.log(dbRecipe));

});
