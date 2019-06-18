'use strict';


const { google } = require('googleapis');


const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyA_v4rJq2EX3n2eIebzczfCj1TzM3kPaLs',
});

const params = {
  part: 'snippet',
  q: 'SoyMotor',
  maxResults: 50,
};

let ids;

youtube.search.list(params, (err, res) => {
  if (err) {
    console.error(err);
    throw err;
  }
  const { data } = res;
  const auxIds = data.items.map(item => item.id.videoId);
  ids = auxIds.filter(item => item !== undefined).join(',');
  buscarVideos(ids);
});


function buscarVideos(id) {
  const paramsVid = {
    part: 'snippet,statistics,player',
    id,
  };

  youtube.videos.list(paramsVid, (err, res) => {
    if (err) {
      console.error(err);
      throw err;
    }
    const { data } = res;
    console.log(data.items);
  });
}
