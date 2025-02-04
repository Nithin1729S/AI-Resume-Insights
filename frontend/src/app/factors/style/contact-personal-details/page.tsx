import { usePageData } from "@/hooks/usePageData";
import ContactPersonalDetails from "@/components/Factors/Style/ContactPersonalDetails";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ContactPersonalDetailsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <ContactPersonalDetails
        resume_url={resumeData.get_pdf_url}
        contact_personal_details_score={
          resumeData.contact_and_personal_details_score
        }
        contact_personal_details_feedback={
          resumeData.contact_and_personal_details_feedback
        }
      />
    </DefaultLayout>
  );
};

export default ContactPersonalDetailsPage;
