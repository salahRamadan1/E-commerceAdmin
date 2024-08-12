export function readFileAsImage(file, setImageFn) {
    if (!file || !setImageFn) {
        throw new Error('Missing required arguments: file and setImageFn');
    }

    const reader = new FileReader();
    reader.onload = () => setImageFn(reader.result);
    reader.readAsDataURL(file);
}