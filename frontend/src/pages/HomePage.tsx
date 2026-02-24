import type { JSX } from "react/jsx-dev-runtime"
import {
  BookOfTheWeek,
  LibraryCard,
  LibraryHours,
  UpcomingEvents,
  ContactUs,
} from "../features/landing"

export default function HomePage(): JSX.Element {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col md:flex-row items-start justify-between px-6 md:px-10 py-8 gap-8">
        {/* Left side */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
            <BookOfTheWeek />
          </section>

          <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
            <UpcomingEvents />
          </section>

          <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
            <LibraryCard />
          </section>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 bg-white/85 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
          <LibraryHours />
          <div className="border-t border-blue-200"></div>
          <ContactUs />
        </div>
      </div>
    </>
  )
}
