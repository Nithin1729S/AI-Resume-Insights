'use client';

import FileInput from "@/components/FileInput";
import UpperLeftLogo from "@/components/Logo/UpperLeftLogo";
import apiService from "../services/apiService";
import { getUserId } from "../lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/Buttons/LogoutButton";
import Loader from "@/components/common/Loader";

const ResumeUpload = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
      const fetchedUserId = await getUserId();
      if (!fetchedUserId) {
        router.push('/login');
      } else {
        setUserId(fetchedUserId);
        setIsLoading(false);
      }
      } catch (error) {
      console.error('Error fetching user ID:', error);
      router.push('/login');
      }
    };

    checkUser();
  }, [router]);

  if (isLoading) {
    return <Loader />; // Use the Loader component here
  }

  return (
    <>
      <UpperLeftLogo />
      <div className="flex items-center justify-center min-h-screen">
        <FileInput />
      </div>
    </>
  );
};

export default ResumeUpload;
