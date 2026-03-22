import * as ImagePicker from 'expo-image-picker'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRef, useCallback } from 'react'

export function useImagePicker() {
  const cameraRef = useRef<CameraView>(null)
  const [permission, requestPermission] = useCameraPermissions()

  const pickFromCamera = useCallback(async (): Promise<string | null> => {
    if (!permission?.granted) {
      const result = await requestPermission()
      if (!result.granted) return null
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: false,
    })

    if (result.canceled) return null
    return result.assets[0].uri
  }, [permission, requestPermission])

  const pickFromGallery = useCallback(async (): Promise<string | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: false,
    })

    if (result.canceled) return null
    return result.assets[0].uri
  }, [])

  return {
    cameraRef,
    permission,
    requestPermission,
    pickFromCamera,
    pickFromGallery,
  }
}
