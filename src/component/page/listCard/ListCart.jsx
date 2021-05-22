import { CardHover } from "../card";
import "./listCart.sass"
export default ({ videos, onclick }) => {
    return (
        <div className="area-video">
            <div className="list-video">
                {videos.docs.map((doc) => {
                    return (
                        <CardHover
                            datos={{ id: doc.id, ...doc.data() }}
                            click={(res, video) => {
                                onclick(res, video);
                            }}
                            key={doc.id}
                        >
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                title
                            </div>
                        </CardHover>
                    );
                })}
            </div>
        </div>
    )
}