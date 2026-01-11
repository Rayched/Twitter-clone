interface I_ImageFileEncoded {
    ImageFiles: FileList|null;
    onFileLoad: (fileData: string) => void;
};

export function ImageFileEncoded({ImageFiles, onFileLoad}: I_ImageFileEncoded){

    if(ImageFiles && ImageFiles.length === 1){
        const reader = new FileReader();

        reader.onloadend = () => {
            const Result = reader.result as string;
            console.log("Image File, Encoded");
            onFileLoad(Result);
        };
        reader.readAsDataURL(ImageFiles[0]);
    } else {
        return;
    }
};