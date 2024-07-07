// import { GetFormStats, GetForms } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from '@/formBuilder/components/ui/card';
import { Skeleton } from '@/formBuilder/components/ui/skeleton';
import { Suspense } from 'react';
import CreateFormBtn from '@/formBuilder/components/CreateFormBtn';
import axios from 'axios';
import { BASE_URL_API } from 'config-global';

export default function Home() {
  return (
    <div className="container pt-4">
      <CreateFormBtn />
      {/* <Suspense
        fallback={[1, 2, 3, 4].map((el) => (
          <FormCardSkeleton key={el} />
        ))}
      >
        <FormCards />
      </Suspense> */}
    </div>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await axios.get(
    `${BASE_URL_API}form/QUESTION?searchFilterModel={"searchFilterBoxList":[{"restrictionList":[]}],"sortList":[{"fieldName":"id","type":"DSC"}],"page":0,"rows":10}`
  );
  console.log('forms==================================== :>> ', forms);
  return <>{forms?.data?.map((form: any) => <FormCard key={form.id} form={form} />)}</>;
}

function FormCard({ form }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || 'No description'}
      </CardContent>
    </Card>
  );
}
