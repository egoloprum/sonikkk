import { getNutrition } from '@/app/helpers/nutritionHelper';
import NutritionEach from '@/components/Diet & Nutrition/NutritionEach';
import PageNavbar from '@/components/UI/PageNavbar';

interface pageProps {
  params: {
    nutrition_id: string;
  };
}

const page = async ({ params }: { params: Promise<pageProps['params']> }) => {
  const resolvedParams = await params; // Await the params
  const { nutrition_id } = resolvedParams; // Now you can safely access nutrition_id

  console.log(nutrition_id)

  let nutritionTarget = {} as NutritionTarget
  try {
    nutritionTarget = await getNutrition(nutrition_id)
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <PageNavbar pageName="Edit My Nutrition Target" />
      <div className="py-16 px-6 sm:px-8 md:px-10 lg:px-12 max-w-[800px]">
        <div className="py-4 flex flex-col gap-4">
          <NutritionEach nutritionTarget={nutritionTarget} />
        </div>
      </div>
    </>
  );
};

export default page;
