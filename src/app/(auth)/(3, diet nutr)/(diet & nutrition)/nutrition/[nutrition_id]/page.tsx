import { getNutrition } from '@/app/helpers/nutritionHelper';
import NutritionEach from '@/components/Diet & Nutrition/NutritionEach';
import PageNavbar from '@/components/UI/PageNavbar';

interface pageProps {
  params: {
    nutrition_id: string
  }
}

const page = async ({ params }: { params: Promise<pageProps['params']> }) => {
  const resolvedParams = await params
  const { nutrition_id } = resolvedParams

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
      <div className="py-16 px-6 md:px-8 lg:px-10 flex justify-center">
        <div className="py-4 flex flex-col gap-2 sm:gap-4 w-full max-w-[800px]">
          <NutritionEach nutritionTarget={nutritionTarget} />
        </div>
      </div>
    </>
  );
};

export default page;
