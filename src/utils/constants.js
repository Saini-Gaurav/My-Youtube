export const API_KEY = "AIzaSyCERZDyfPzmGEjhw2XtAYoTxzgYBw4zfy4"

export const YOUTUBE_API = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=60&regionCode=IN&key=' + API_KEY ;

export const YOUTUBE_VIDEO_WATCH_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=`;

export const btnList = [
    "All",
    "Gaming",
    "Songs",
    "Live",
    "Cricket",
    "News",
    "Bollywood",
    "Computer",
    "Scene",
    "Mixes",
    "History",
    "programming",
    "Hollywood",
  ];

  export const YOUTUBE_SEARCH_VIDEO_WITH_QUERY_API = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=${API_KEY}&q=`;
  export const SEARCH_API = 'https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='
  export const CORS_PROXY = 'https://corsproxy.io/?';