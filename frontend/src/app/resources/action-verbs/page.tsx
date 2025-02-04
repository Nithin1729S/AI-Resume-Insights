import { usePageData } from "@/hooks/usePageData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ActionVerbs from "@/components/Resources/ActionVerbs/ActionVerbs";


const ActionVerbsPage = async () => {
  const { resumeData } = await usePageData();
  return (
    <DefaultLayout>
      <ActionVerbs resume_url={resumeData.get_pdf_url}/>
    </DefaultLayout>
  );
};

export default  ActionVerbsPage;
