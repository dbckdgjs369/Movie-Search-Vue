import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../store/UserInfoContext";

export default function GoogleLoginPage(props) {
  const [playlistId, setPlaylistId] = useState("");
  const [playlistName, setPlaylistName] = useState("YPG");
  const API_ENDPOINT = "https://www.googleapis.com/youtube/v3/playlists";

  const { accessToken, authorization_code } = useContext(UserContext);
  console.log(authorization_code);
  console.log(props.songIdList);
  async function makeNewPlayList() {
    console.log("access: " + accessToken);
    const description = "Youtube Playlist Generator";
    const add = axios.post(
      `${API_ENDPOINT}?access_token=${accessToken}&part=snippet,status&resource.snippet.title=${playlistName}&resource.snippet.description=${description}`
    );
    setPlaylistId((await add).data.id);
  }
  function addToPlayList() {
    console.log(props.songIdList);
    console.log(accessToken);
    props.songIdList.forEach((element) =>
      axios.post(
        `https://www.googleapis.com/youtube/v3/playlistItems?access_token=${accessToken}&part=snippet&resource.snippet.playlistId=${playlistId}&resource.snippet.resourceId.videoId=${element}&resource.snippet.resourceId.kind=youtube%23video`
      )
    );
  }

  return (
    <div>
      <br />
      <label>playlist 이름을 입력해주세요</label>
      <br />
      <input onChange={(e) => setPlaylistName(e.target.value)} />
      <button onClick={makeNewPlayList}>Make PlayList</button>
      <br />
      <button onClick={addToPlayList}>addToPlayList</button>
    </div>
  );
}
