import { getUserId } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';
import { redirect } from 'next/navigation';

export async function usePageData() {
  try {
    const userId = await getUserId();
    if (!userId) {
      redirect('/login');
    }

    const resumeData = await apiService.get(`/api/ats/${userId}`);
    if (!resumeData) {
      redirect('/login');
    }

    return { userId, resumeData };
  } catch (error) {
    console.error('Data fetch error:', error);
    redirect('/login');
  }
}