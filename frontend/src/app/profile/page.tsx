"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { getUserId } from "@/app/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  interface UserData {
    email: string;
    name?: string;
    avatar_url?: string;
    about_me?: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    const router = useRouter();
    try {
      const userId = await getUserId();
      if (!userId) {
        setError("No user ID found");
        return;
      }
      const response = await apiService.get(`/api/auth/${userId}/`);
      setUserData(response);
    } catch (error) {
      setError("Error fetching user details");
      console.error("Error fetching user details:", error);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload only JPG, JPEG, or PNG files");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size should be less than 5MB");
      return;
    }

    setError(null);
    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await apiService.post(
        "/api/auth/update_avatar/",
        formData,
      );

      if (response.success) {
        setSelectedFile(null);
        setPreviewUrl(null);

        // Fetch updated user details
        await fetchUserDetails();
      } else {
        setError(response.message || "Failed to upload avatar");
      }
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      setError(
        error.response?.data?.message || "An error occurred during upload",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={
                    previewUrl || userData?.avatar_url || "/default-avatar.jpg"
                  }
                  width={160}
                  height={160}
                  className="rounded-full"
                  alt="profile"
                />
                <label
                  htmlFor="avatarUpload"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    />
                  </svg>
                  <input
                    type="file"
                    id="avatarUpload"
                    className="sr-only"
                    onChange={handleFileSelect}
                    accept="image/jpeg,image/jpg,image/png"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={uploading}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-white hover:bg-opacity-90 disabled:bg-opacity-50"
                >
                  {uploading ? "Uploading..." : "Update Avatar"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={uploading}
                  className="inline-flex items-center justify-center rounded-md border border-stroke px-6 py-2 hover:bg-opacity-90 disabled:bg-opacity-50 dark:border-strokedark"
                >
                  Cancel
                </button>
              </div>
            )}

            {error && <div className="mt-4 text-danger">{error}</div>}

            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {userData?.name || "Guest"}
              </h3>
              <p className="font-medium">{userData?.email}</p>
              <div className="mx-auto mt-4.5 max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  About Me
                </h4>

                <p className="mt-4.5">
                  {userData?.about_me ? (
                    userData?.about_me
                  ) : (
                    <Link href="/settings">
                      <>Add your Bio</>
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
