document.getElementById('search').addEventListener('keyup', function() {
    const query = this.value;
    if (query.length > 2) {
        fetch(`http://localhost:8888/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                const results = document.getElementById('results');
                results.innerHTML = '';
                data.tracks.items.forEach(track => {
                    const trackElement = document.createElement('div');
                    trackElement.textContent = `${track.name} by ${track.artists[0].name}`;
                    trackElement.addEventListener('click', () => {
                        const audio = document.getElementById('audio');
                        const albumArt = document.getElementById('album-art');
                        audio.src = track.preview_url;
                        audio.play();
                        albumArt.src = track.album.images[0].url;

                        // Set the duration of the audio control
                        audio.addEventListener('loadedmetadata', () => {
                            audio.duration = track.duration_ms / 1000;
                        });
                    });
                    results.appendChild(trackElement);
                });
            });
    }
});

document.getElementById('download').addEventListener('click', function() {
    const audio = document.getElementById('audio');
    if (audio.src) {
        const link = document.createElement('a');
        link.href = audio.src;
        link.download = 'track.mp3';
        link.click();
    }
});
