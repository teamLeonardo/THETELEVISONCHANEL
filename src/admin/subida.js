import { storage } from "../firebase";

export const subirArchivo = (typeFile = "imagenes", file, onProgress, onError, onComplete) => {

    if (validFileType(file, typeFile)) {
        const ref = storage.ref(typeFile + "/" + file.name)
        const upload = ref.put(file)

        upload.on(
            "state_changed",
            function progress(snapshot) {
                onProgress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            function error(error) {
                onError(JSON.stringify(error))
            },
            async function complete() {
                try {
                    const url = await ref.getDownloadURL()
                    onComplete(url)
                } catch (error) {
                    onError(JSON.stringify(error))
                }
            }
        );
    } else {
        onError("basio validacion");
    }
}

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function validFileType(file, type = "imagenes") {
    console.log(file.type);
    const fileTypesImg = [
        "image/jpeg",
        "image/jpg",
        "image/pjpeg",
        "image/webp",
        "image/png"
    ];
    const fileTypesVideo = [
        "video/m4v",
        "video/avi",
        "video/mpg",
        "video/mp4"
    ]
    if (type === "imagenes") {
        return fileTypesImg.includes(file.type);
    } else if (type === "videos") {
        return fileTypesVideo.includes(file.type);
    }
}