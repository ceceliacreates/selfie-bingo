import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { SavedFileImage } from '@/types'

export const usePhotoGallery = () => {
  const savedFileImage = ref<SavedFileImage>();

    const takePhoto = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      const fileName = Date.now() + '.jpeg';
      savedFileImage.value = {
        filepath: fileName,
        webviewPath: photo.webPath,
}
    };
  
    return {
      takePhoto, savedFileImage
    };
  };