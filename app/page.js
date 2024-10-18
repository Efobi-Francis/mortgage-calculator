import Image from "next/image";
import Form from "@/components/Form";

export default function Home() {
  return (
    <div className=" font-PlusJakartaSans font-medium md:flex md:flex-col justify-center items-center md:h-screen md:bg-[hsl(199,81%,94%)] md:px-10 ">
      <Form />

      <div className="attribution mt-10">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
        Coded by <a href="#">Efobi Francis</a>.
      </div>
    </div>
  );
}
