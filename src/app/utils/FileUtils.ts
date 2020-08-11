class FileUtils {

    async urlToObject(img_url: string): Promise<any> {
        const response = await fetch(img_url);

        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });

        return file
    }

}

export default new FileUtils()