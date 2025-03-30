import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
    <section className="card-cta">
      <div className=" flex flex-col gap-6 max-w-lg">
        <h2>get Interview with AI Powered Practice & Feedback

        </h2>
        <p className="text-lg">
          Practice on real Interview questions & get instant feedback
        </p>

        <Button asChild className="btn-primary max-sm:w-full" >
          <Link href={"/interview"}> Start an Interview</Link>
        </Button>
      </div>
      <Image src={"/robot.png"} alt="robo dude" height={400} width={400}  className="max-sm:hidden" />
    </section>

    <section className=" flex flex-col gap-6 mt-8 ">
      <h2>Your interviews</h2>
      <div className="interviews-section">
        <p>{dummyInterviews.map((interview)=>{
          return <InterviewCard key={interview.id} {...interview}></InterviewCard>
        })}</p>

        <p>You haven&apos;t taken any interviws yet </p>
      </div>
    </section>

    <section className="flex flex-col gap-6 mt-8 ">
      <h2>Take an interview</h2>
      <div className="interviews-section">
        <p>No Interviews available</p>
      </div>
    </section>
    </>
  );
}
