import Compress from '@yireen/squoosh-browser'
import {
  defaultPreprocessorState,
  defaultProcessorState,
  encoderMap,
  EncoderState
} from '@yireen/squoosh-browser/dist/client/lazy-app/feature-meta'
import { CompressEncoderEnum } from '@/common/model'

/**
 * 压缩图片时，上传区域 loading
 */
export const compressImgLoading = () => {
  return ElLoading.service({
    target: '.upload-area',
    text: '正在压缩图片...'
  })
}

/**
 * 压缩图片
 * @param file
 * @param encoder
 */
export const compressImage = async (file: File, encoder: CompressEncoderEnum) => {
  const compress = new Compress(file, {
    encoderState: {
      type: encoder,
      options: encoderMap[encoder].meta.defaultOptions
    } as EncoderState,
    processorState: defaultProcessorState,
    preprocessorState: defaultPreprocessorState
  })

  return compress.process()
}
