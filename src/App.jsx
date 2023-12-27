import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [streamData, setStreamData] = useState(null);
  const channels = ['freecodecamp', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

  useEffect(() => {
  async function fetchData() {
    const promises = channels.map(channel =>
      axios.get(`https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${channel}`)
    );
    const responses = await Promise.all(promises);
    const data = responses.map(response => response.data);
    setStreamData(data);
  }
  fetchData();
}, [channels]);
console.log(streamData);
  return (
    <div className='container'>
      <h1>Twitch JSON API</h1>
      {streamData?.map((data, index) => (
        <div key={index} id="twitch-viewers">
          {data?.stream ? (
            <p style={{backgroundColor: "rgb(84, 255, 84)"}}>
              {channels[index]} is currently streaming{' '}
              <strong>{data.stream.game}</strong> with{' '}
              <strong>{data.stream.viewers}</strong> viewers.{' '}
              <a href={data.stream.channel.url} target="_blank" rel="noopener noreferrer">
                Watch now
              </a>
              !
            </p>
          ) : (
            <p style={{backgroundColor: "rgb(255, 105, 105)"}}>{channels[index]} is currently offline</p>
          )}
        </div>
      ))}
      <a href="https://github.com/mohamed-benoughidene/Twitch-JSON-API" style={{marginTop: "15px"}}>Source code</a>
    </div>
  );
}
export default App;
