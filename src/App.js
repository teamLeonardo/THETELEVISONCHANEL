import { useState } from "react";
import Page from "./component/page/page";
import Visor from "./component/visor/visor";
import "./styles.css";

export default function App() {
  const [open, setOpen] = useState(false);
  const [urlVideo, setUrlVi] = useState("");
  
  return (
    <div className="App">
      <Visor
        video={urlVideo}
        state={open}
        onclose={(res) => {
          setOpen(res);
          setUrlVi("");
        }}
      />
      <Page
        onclick={(res, video) => {
          setOpen(res);
          setUrlVi(video);
        }}
        state={open}
      />
    </div>
  );
}
