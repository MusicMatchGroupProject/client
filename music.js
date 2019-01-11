function getTopSong () {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/musics",
        dataType: "json"
    })
    .done((response) => {
        let data = response.data.message.body.track_list
        // console.log(data)
        for( let i = 0 ; i < data.length ; i++) {
            // console.log(data[i].track)
            $.ajax({
                method: "get",
                url: `http://localhost:3000/musics/songs/${data[i].track.track_name}`,
                dataType: "json"
            })
            .done((response) => {
                var img  = response.data.data[0].artist.picture_big
                var song = response.data.data[0].preview
                var listgenre = data[i].track["primary_genres"].music_genre_list
                var genre = []
                listgenre.forEach(element => {
                    genre.push(element.music_genre.music_genre_name)
                });
                $('.row').append(
                    `
                    <div class="col-md-4">
                    <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
                    <div class="card-header">
                    <img src="${img}" alt="..." class="img-thumbnail">
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${data[i].track.track_name}</h5>
                      <p class="card-text">
                      <lu> 
                        <li>
                            Album: ${data[i].track.album_name}
                         </li>
                        <li>
                            Artist: ${data[i].track.artist_name}
                        </li>
                        <li> 
                            Genre: ${genre.join("|")}
                        </li>             
                        <li> 
                            Rating: ${data[i].track.track_rating}
                        </li>
                      <lu>
                      </p>
                      ${data[i].track.track_name}', '${img}', '${song}
                      <button type="button" onClick="Play('${data[i].track.track_name}', '${img}', '${song}')" class="btn btn-secondary">Play</button>
                    </div>
                  </div>
                  </div>`
                )
            })
            .catch((error)=> {
                console.log(error)
            })
            
        }
    })
    .fail((err) => {
        console.log(err)
    })
}

function Play(title, img ,songs, id ) {
    console.log('masuuukkkkk')
    $('.row').empty()
    $.ajax({
        type: "get",
        url: `http://localhost:3000/musics/${title}`,
        dataType: "json"
    })
    .done((response) => {
        let data = response.data.message.body.track_list[0]
        let id = response.data.message.body.track_list[0].track.track_id
        console.log(id)
        var listgenre = data.track["primary_genres"].music_genre_list
        var genre = []   
        listgenre.forEach(element => {
            genre.push(element.music_genre.music_genre_name)
        });
        $.ajax({
            type: "get",
            url: `http://localhost:3000/musics/lyrics/?id='${id}'`
        })
        .done((response) => {
            console.log(response.data,"=========")
        })
        .fail(error => {
            console.log(error)
        })
        $('.row').append(
            `
            <div class="col-md-4">
            <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">
            <img src="${img}" alt="..." class="img-thumbnail">
            </div>
            <div class="card-body">
              <h5 class="card-title">${data.track.track_name}</h5>
              <p class="card-text">
              <lu> 
                <li>
                    Album: ${data.track.album_name}
                 </li>
                <li>
                    Artist: ${data.track.artist_name}
                </li>
                <li> 
                    Genre: ${genre.join("|")}
                </li>  
                <li> 
                    Rating: ${data.track.track_rating}
                </li>
              <lu>
              </p>
            </div>
          </div>
          </div>`
        )

        $('#app').append(`
            <audio
            controls
            src="${songs}">
                Your browser does not support the
                <code>audio</code> element.
        </audio>
    `)
    })
    .fail((error) => {
        console.log(error)
    })

}