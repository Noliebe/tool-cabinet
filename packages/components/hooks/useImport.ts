import type {
    UploadInstance,
    UploadProps,
    UploadRawFile,
    UploadProgressEvent,
    UploadFile,
    UploadFiles
} from 'element-plus'
import { ElMessage, ElLoading } from 'element-plus'
import { getToken } from '@/utils/auth'

export function useImport(onSuccess: (url: string) => void, downurl: string) {
    
    const baseUrl = import.meta.env.VITE_APP_BASE_URL
    // import.meta.env.VITE_APP_BASE_URL
    const upUrl = baseUrl  + '/upload/file'
    const token = getToken()
    const upload = ref<UploadInstance>()
    // const drForm = reactive({ url: '' })
    let loading: any

    const handleProgress: UploadProps['onProgress'] = (
        evt: UploadProgressEvent,
        uploadFile: UploadFile,
        uploadFiles: UploadFiles
    ) => {
        loading = ElLoading.service({
            lock: true,
            text: 'Loading'
            // background: 'rgba(0, 0, 0, 0.7)',
        })
    }

    const handleError: UploadProps['onError'] = () => {
        loading.close()
    }

    const handleExceed: UploadProps['onExceed'] = (files) => {
        if (upload.value) {
            upload.value!.clearFiles()
            const file = files[0] as UploadRawFile
            // file.uid = genFileId()
            upload.value!.handleStart(file)
            upload.value!.submit()
        }
    }

    const handleSuccess = (val: any) => {
        loading.close()
        const { data } = val
        if (onSuccess) {
            onSuccess(data.url)
        }
    }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        // console.log('rawFile.type == ', rawFile.type)
        const isExcel = [
            'application/vnd.ms-excel',
            'application/msexcel',
            'application/x-msexcel',
            'application/x-ms-excel',
            'application/x-excel',
            'application/x-dos_ms_excel',
            'application/xls',
            'application/x-xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ].some((item) => rawFile.type === item)
        // if (rawFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        if (!isExcel) {
            ElMessage.error('请选择xlsx或者xls文件')
            return false
        }
        // else if (rawFile.size / 1024 / 1024 > 2) {
        //     ElMessage.error('Avatar picture size can not exceed 2MB!')
        //     return false
        // }
        return true
    }
    const downloadFile = () => {
        const url: string = baseUrl + downurl
        const a = document.createElement('a') // 创建下载链接
        a.href = url
        a.download = '' // 设置为空以使用服务器提供的文件名
        document.body.appendChild(a)
        a.click() // 触发点击下载
        document.body.removeChild(a) // 移除链接
    }

    return {
        upUrl,
        token,
        downloadFile,
        beforeAvatarUpload,
        handleSuccess,
        handleError,
        handleExceed,
        handleProgress
    }
}
