import FullPageSlide from "@shared/components/FullPageSlide/FullPageSlide";
import Event1 from "./Event1/Event1";
import Event2 from "./Event2/Event2";
import Event3 from "./Event3/Event3";
import EventSection from "./EventSection/EventSection";

const pages = [
  { id: 2, color: "#00A8FF", title: "Event 2", render: () => <Event2 /> },
  { id: 1, color: "#FF6B6B", title: "Event 1", render: () => <Event1 /> },
  { id: 3, color: "#45B7D1", title: "Event 3", render: () => <Event3 /> },
];

export default function EventLandingPage() {
  return (
    <FullPageSlide totalIndex={pages.length - 1} excludedHeight={76}>
      {pages.map(({ id, color, title, render }) => (
        <EventSection key={id} badgeColor={color} badgeText={title}>
          {render()}
        </EventSection>
      ))}
    </FullPageSlide>
  );
}
