// src/utils/s3Upload.js

// ⚠️ 임시 Mock 버전 - 실제 S3 업로드는 별도 구현 필요
// aws-sdk는 브라우저 환경에서 번들 크기가 크고 호환성 문제가 있어서
// 실제 프로덕션에서는 AWS SDK v3 또는 서버사이드 업로드 API 사용 권장

export const uploadToS3 = async (file) => {
  // 임시로 로컬 Object URL 반환 (실제로는 서버에 업로드되지 않음)
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file)
      console.log('📎 Mock S3 Upload:', file.name, '→', mockUrl)
      resolve(mockUrl)
    }, 500)
  })
}

/*
// 실제 S3 업로드를 구현하려면 아래와 같이 사용:
// 1. AWS SDK v3 사용 (@aws-sdk/client-s3, @aws-sdk/s3-request-presigner)
// 2. 또는 백엔드 API로 파일 업로드 후 S3에 저장

import AWS from 'aws-sdk'

const REGION = import.meta.env.VITE_AWS_REGION
const BUCKET = import.meta.env.VITE_AWS_BUCKET
const ACCESS_KEY = import.meta.env.VITE_AWS_ACCESS_KEY
const SECRET_KEY = import.meta.env.VITE_AWS_SECRET_KEY

AWS.config.update({
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
})

const s3 = new AWS.S3()

export const uploadToS3 = async (file) => {
  const params = {
    Bucket: BUCKET,
    Key: `uploads/${Date.now()}_${file.name}`,
    Body: file,
    ContentType: file.type,
  }

  const result = await s3.upload(params).promise()
  return result.Location
}
*/
