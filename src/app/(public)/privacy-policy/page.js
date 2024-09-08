export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy page",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="lg:mx-auto lg:w-3/4">
      <div>
        <div className="container space-y-6">
          <h1 className="text-5xl font-extrabold text-primary-black">
            Privacy Policy
          </h1>

          <p className="font-kumbh-sans text-xl font-thin text-primary-black/95 lg:text-xl">
            Ensuring Your Information Is Secure: Our Commitment to Privacy.
          </p>
        </div>
      </div>

      <div className="container mt-10 text-lg text-primary-black">
        <div className="space-y-5">
          <p>
            Welcome to [Your Company Name]. Before using our logo design
            service, please carefully review the following Terms and Conditions,
            as they govern the contractual relationship between you (the Client)
            and [Your Company Name] (the Service Provider). By using our logo
            design service, you acknowledge that you have read, understood, and
            agreed to these Terms and Conditions in their entirety.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <h1 className="text-3xl font-bold">→ What data do we process?</h1>
          <div className="space-y-6">
            <p>
              a. [Your Company Name] will provide custom logo design services to
              the Client based on the specifications provided by the Client.{" "}
            </p>
            <p>
              b. The Service Provider will deliver the final logo design in the
              agreed-upon format upon completion and full payment of the service
              fee.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          <h1 className="text-3xl font-bold">→ What are your rights?</h1>
          <div className="space-y-6">
            <p>
              a. The Client acknowledges that all rights, title, and ownership
              of the final logo design will belong solely to the Client after
              full payment has been received by the Service Provider.
            </p>
            <p>
              b. Final payment ensures that only the agreed design becomes the
              client’s property. Any previous ideas/concepts remain the property
              of The Service Provider, unless any prior agreement has been made.
            </p>

            <p>
              c. The Service Provider reserves the right to showcase the
              completed logo design in their portfolio or promotional materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
