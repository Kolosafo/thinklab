// import RestaurantDetailsForm from "@/components/auth/restaurant-details-form";
// import getServerSession from "@/lib/auth/server";
import RegDetailForm from "@/components/auth/RegDetailForm";


async function DetailsPage({ _className }: { _className?: string }) {
  return (
    <div className={`container max-w-3xl py-10 ${_className}`}>
      <div className="mb-8 w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Apply To Market On Our Platform</h1>
        <p className="text-muted-foreground mt-2">
          Please fill the form to complete your registration.
        </p>
      </div>
      <RegDetailForm />
    </div>
  );
}

export default DetailsPage;
