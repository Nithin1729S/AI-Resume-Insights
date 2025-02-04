// hooks/usePageData.ts
import { headers } from 'next/headers'

export async function usePageData() {
  const headersList = await headers()
  const userId = headersList.get('x-user-id')
  const resumeData = JSON.parse(headersList.get('x-resume-data') || '{}')
  
  return { userId, resumeData }
}
