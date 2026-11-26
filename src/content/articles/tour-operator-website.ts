import type { Article } from "@/data/articles";

export const article: Article = {
  id: "article-tour-operator-website",
  slug: "tour-operator-website",
  title: "What should a tour operator website include?",
  excerpt:
    "Plan itinerary pages, a fleet catalogue and an enquiry flow using the Rudra Tours project in Kanpur as a worked example.",
  authorId: "editorial",
  category: "Projects",
  tags: ["Travel websites", "Itineraries", "Web development"],
  datePublished: "2026-11-26",
  dateModified: "2026-11-26",
  status: "published",
  content: [
    {
      type: "p",
      text: "A traveller comparing tours needs to know where they will go, how long the trip takes and whether the operator can accommodate their group. Give each of those questions an obvious place on the site.",
    },
    { type: "h2", id: "itineraries", text: "Give each itinerary a page people can share" },
    {
      type: "p",
      text: "DIMISI’s Rudra Tours project records 25 itineraries alongside city guides and a vehicle fleet. For a catalogue like this, give each itinerary a descriptive name, starting point, duration, stops and inclusions. Link each city guide to trips that actually visit that city.",
    },
    { type: "h2", id: "vehicles", text: "Help groups choose a vehicle" },
    {
      type: "p",
      text: "A family with luggage and a wedding party need different details. Show passenger capacity, luggage space, pickup area and any minimum hire period the operator confirms. Place a link to the enquiry form beside the vehicle details.",
    },
    { type: "h2", id: "enquiries", text: "Carry the trip details into the enquiry" },
    {
      type: "p",
      text: "Preselect the trip or vehicle the visitor was viewing. Ask for travel dates, group size, pickup location and a reply address or phone number. If staff must check availability, tell the traveller when to expect a response. Offer instant booking only when the operator can confirm inventory and price.",
    },
    {
      type: "entity",
      entityId: "rudra-tours",
      note: "Explore the itinerary, fleet and city-guide work in DIMISI’s travel website case study.",
    },
  ],
  sourceIds: ["src-rudra-official", "src-dimisi-client-portfolio"],
  relatedEntities: ["rudra-tours", "dimisi-technologies"],
  seoTitle: "What should a tour operator website include? | DIMISIPEDIA",
  seoDescription:
    "A practical guide to itinerary pages, vehicle catalogues and travel enquiries, illustrated with DIMISI’s Rudra Tours website project.",
};
