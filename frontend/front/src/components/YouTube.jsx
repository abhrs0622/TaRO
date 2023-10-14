import React from 'react';
import Youtube from 'react-youtube';

function YouTube () {
    const opts = {
        playerVars: {
        playsinline: 1,
        autoplay: 1,
        mute: 1,
  　    loop: 1,
      },
    }
      return (
        <Youtube 
        videoId= "13yytDs4TeQ"
        opts={opts}
          />
      );
    //   <Youtube
    //   //挿入したいyoutube動画のURL末尾を入力
    //   videoId= "13yytDs4TeQ" //挿入したいyoutube動画のURL末尾を入力
    //     />
  }
export default YouTube;