import { DayList } from "~ui/day-list";

export default function Home() {
  return (
    <main className="min-h-screen p-8 ">
      <h1 className="text-3xl font-bold mb-8">50 Days of UI Challenge</h1>
      <div className=" ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{
          Array.from({ length: 52 }, (_, index) => (
            <DayList key={index} title={`Day ${index + 1}`} href={`/day-${index + 1}`} preview_image={""} />
          ))
        }
        </div>
      </div>

    </main >
  );
}
