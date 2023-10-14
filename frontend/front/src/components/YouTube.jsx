import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';

function YouTube () {
  const ID =["CIRlmM8wI1g","XMrT7gR_AvQ","T18EMDFt6q0","WTDHu79ZBuM","BDK6v95POfw","bPAEp_oCJVA","KeTERZTuOrs","wIzzG0zMNak","bPAEp_oCJVA","psI3u40-MRg","2oHyJW_J1Gs","h5DvjKmbbl4"]

  const [randomNumber, setRandomNumber] = useState(null);
  useEffect(() => {
    const random = Math.floor(Math.random() * 11); // 0から99の乱数を生成
    setRandomNumber(random);
  }, []);
    const opts = {
        playerVars: {
        playsinline: 1,
        autoplay: 1,
        mute: 1,
        loop: 1,
         start: 200, // 300秒から再生を開始
      },
    }
      return (
        <div>
        <Youtube 
        videoId= {ID[randomNumber]}
        opts={opts}
          />
        </div>
      );
    //   <Youtube
    //   //挿入したいyoutube動画のURL末尾を入力
    //   videoId= "13yytDs4TeQ" //挿入したいyoutube動画のURL末尾を入力
    //     />
  }
export default YouTube;