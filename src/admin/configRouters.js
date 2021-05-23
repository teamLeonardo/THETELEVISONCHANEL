import Config from "./Config";
import Mesagge from "./Mesagge";
import Perfil from "./Perfil";
import Video from "./Video";

export const configRouterAdmin = {
    path: "/admin",
    rout: [
        {
            path: "/profile",
            name: "Profile",
            classs: "fas fa-male",
            componente: Perfil
        },
        {
            path: "/videos",
            name: "Videos",
            classs: "fas fa-video",
            componente: Video
        },
        {
            path: "/message",
            name: "Message",
            classs: "fas fa-envelope",
            componente: Mesagge
        },
        {
            path: "/config",
            name: "Config",
            classs: "fas fa-cogs",
            componente: Config
        },

    ]
}