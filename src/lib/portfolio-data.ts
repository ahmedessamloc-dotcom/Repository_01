// =============================================================================
// Portfolio Data — Ahmed Essam | Project Manager — Design & Development Management
// Comprehensive TypeScript data file extracted from portfolio presentation
// =============================================================================

// -----------------------------------------------------------------------------
// Type Definitions
// -----------------------------------------------------------------------------

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  budget?: string;
  description: string;
  role: string;
  images: string[];
  award?: string;
  websiteLink?: string;
  portfolioLink?: string;
  portfolioLinkLabel?: string;
}

export interface Award {
  title: string;
  project: string;
  type: string;
  year: string;
}

export interface Experience {
  period: string;
  company: string;
  location: string;
  role: string;
  description: string;
  type: string;
  logo?: string;
}

export interface Competency {
  category: string;
  items: string[];
}

export interface Partner {
  category: string;
  description?: string;
  entries: { name: string; logo?: string; link?: string }[];
}

export interface MapLocation {
  city: string;
  country: string;
  lat: number;
  lng: number;
  projects: string[];
}

export interface AboutData {
  name: string;
  title: string;
  stats: { label: string; value: string }[];
  phone: string;
  email: string;
  linkedin: string;
  website?: string;
  location: string;
  locationLink?: string;
  logo: string;
  portrait: string;
  specialties: string[];
  bio: string;
}

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------

export const projects: Project[] = [{
    id: 1,
    title: "Oasis Skywalk Hotel & Branded Apartment",
    category: "Hospitality",
    year: "2023",
    location: "6 October, Cairo, Egypt",
    client: "Local Developer",
    budget: "480M LE",
    description:
      "A landmark hospitality and residential mixed-use development in 6th of October City featuring a premium hotel integrated with branded serviced apartments. The design concept merges contemporary luxury with functional efficiency, offering panoramic skywalk views, world-class amenities, and sophisticated interior finishes. The project encompasses over 480M LE in development value and represents one of the most ambitious hospitality ventures in the Greater Cairo area, setting a new benchmark for hotel-apartment hybrid developments in Egypt.",
    role: "Project Manager — Led the full project lifecycle from conceptual design through construction documentation and site supervision. Directed a multidisciplinary design team, coordinated with international brand design guidelines, managed contractor relations, and ensured compliance with international hospitality standards and local building codes.",
    images: ["/portfolio/image3.webp", "/portfolio/image4.webp", "/portfolio/image5.webp"],
  },
{
    id: 27,
    title: "Egyptian Countryside Development Company (ECDC)",
    category: "Mega Projects",
    year: "2018–2023",
    location: "Minya, Al Farafra, Al-Tur — Egypt",
    client: "ECDC — Egyptian Countryside Development Company",
    description:
      "Served as Project Manager for the Egyptian Countryside Development Company (ECDC), overseeing infrastructure and construction for the national 4 million feddan land reclamation initiative — one of Egypt's most ambitious agricultural development programs. Supervised construction execution of roads, facilities, and infrastructure projects across multiple locations spanning Minya, Al Farafra, and Al-Tur. Acted as owner's representative across all project sites, ensuring contractor performance aligned with project specifications, timelines, and quality standards. Reviewed all technical submittals, progress reports, and financial claims with rigorous attention to accuracy and compliance. Coordinated extensively with local authorities for licensing, civil defense approvals, and safety regulations to ensure full regulatory compliance across every project location.",
    role: "Project Manager — Oversaw infrastructure and construction for the national 4M feddan land reclamation initiative. Supervised construction execution of roads, facilities, and infrastructure across Minya, Al Farafra, and Al-Tur. Acted as owner's representative, reviewed submittals, progress reports, and financial claims, and coordinated with local authorities for licensing, civil defense, and safety regulations.",
    images: ["/portfolio/ecdc1.webp", "/portfolio/ecdc2.webp", "/portfolio/ecdc3.webp", "/portfolio/ecdc4.webp", "/portfolio/ecdc5.webp", "/portfolio/ecdc6.webp"],
  },
{
    id: 28,
    title: "Confidential Project — Baghdad",
    category: "Confidential",
    year: "2025",
    location: "Baghdad, Iraq",
    client: "Iraqi Army",
    description:
      "A classified architectural and urban planning project commissioned for the Iraqi Army, encompassing the comprehensive master plan and building design for a military training camp in Baghdad, Iraq. The project involved the full scope of site master planning — including zoning for training areas, barracks, administrative facilities, tactical training zones, support buildings, and infrastructure networks — followed by detailed architectural design for key camp structures. Due to the classified nature of the project, specific details, site imagery, and construction documentation remain undisclosed under confidentiality agreements.",
    role: "Project Manager — Directed the master planning and architectural design development for a classified Iraqi Army training camp in Baghdad. Led the site analysis, master plan layout, and building design coordination, managed design production across multiple disciplines, and ensured compliance with military facility standards and security requirements.",
    images: ["/portfolio/baghdad-thumb.webp"],
  },
{
    id: 2,
    title: "Boutique Hotel",
    category: "Hospitality",
    year: "2024",
    location: "New Cairo, Egypt",
    client: "Local Developer",
    budget: "200M LE",
    description:
      "An intimate luxury boutique hotel in New Cairo designed to deliver a curated hospitality experience through thoughtful architecture and refined interior aesthetics. The project emphasizes privacy, exclusivity, and personalized guest experiences with bespoke room configurations, a signature spa wing, fine-dining outlets, and landscaped courtyards that create a serene urban retreat. The design language draws inspiration from modern minimalist principles while incorporating subtle Egyptian cultural motifs.",
    role: "Project Manager — Oversaw the complete design development and project delivery for this 200M LE hospitality project. Managed the design team in producing construction documents, coordinated with MEP and structural consultants, reviewed contractor submittals, and maintained budget and schedule adherence throughout all project phases.",
    images: ["/portfolio/image6.webp", "/portfolio/image7.webp", "/portfolio/image8.webp"],
  },
{
    id: 3,
    title: "Ministry of Defense Hotel",
    category: "Hospitality",
    year: "2010",
    location: "Luxor, Egypt",
    client: "Ministry of Defense",
    description:
      "A distinguished government-commissioned hotel project in Luxor, designed to serve official and VIP delegations visiting one of Egypt's most historically significant cities. The architectural design respects the rich heritage context of Luxor while providing modern, secure, and fully functional hospitality facilities. The project balances the gravitas of a government institution with the warmth expected of a premium hospitality destination, incorporating state-of-the-art security systems alongside elegant public spaces and guest accommodations.",
    role: "Design Team Leader — Led the architectural design team in developing the concept and schematic design phases. Coordinated with Ministry of Defense representatives to align design with security protocols and institutional requirements, produced detailed design packages, and ensured heritage sensitivity in all design decisions within the Luxor archaeological zone.",
    images: ["/portfolio/image9.webp", "/portfolio/image10.webp", "/portfolio/image11.webp"],
  },
{
    id: 5,
    title: "Spa & Medical Hub",
    category: "Health",
    year: "2025",
    location: "New Cairo, Egypt",
    client: "Ministry of Defense",
    description:
      "A specialized health and wellness center in New Cairo commissioned by the Ministry of Defense, combining medical facilities with luxury spa services in a holistic wellness environment. The facility integrates outpatient clinics, diagnostic imaging centers, physiotherapy units, and premium spa amenities including hydrotherapy pools, treatment suites, and relaxation lounges. The design prioritizes patient comfort, clinical efficiency, and a healing atmosphere through evidence-based design principles, abundant natural light, and biophilic elements.",
    role: "Project Manager — Led the design development and project coordination for this multi-functional health facility. Directed the integration of complex medical equipment requirements with spa design aesthetics, coordinated with healthcare specialists and MEP engineers, and managed the production of detailed construction and working drawings compliant with international health facility codes.",
    images: ["/portfolio/image16.webp", "/portfolio/image17.webp", "/portfolio/image18.webp"],
  },
{
    id: 4,
    title: "Wycombe Abbey Cairo East International School",
    category: "Educational",
    year: "2024",
    location: "New Administrative Capital, Egypt",
    client: "England Operator",
    description:
      "A prestigious international school campus in Egypt's New Administrative Capital, operated under the renowned Wycombe Abbey brand from England. The campus design integrates British educational philosophy with cutting-edge learning environments, featuring state-of-the-art classrooms, science laboratories, performing arts centers, sports facilities, and boarding houses. The architectural masterplan creates a cohesive campus experience with landscaped quads, dedicated faculty zones, and sustainable design elements that promote student wellbeing and academic excellence.",
    role: "Project Manager — Directed the complete design and delivery process for this landmark educational project. Managed coordination between the England-based operator's brand guidelines and local design teams, oversaw construction documentation, liaised with government authorities for permit approvals, and ensured the facility meets international educational and safety standards.",
    images: ["/portfolio/image12.webp", "/portfolio/image13.webp", "/portfolio/image14.webp", "/portfolio/image15.webp"],
    websiteLink: "https://wacairoeast.com/",
    portfolioLink: "https://wacairoeast.com/our-campus/",
    portfolioLinkLabel: "Watch video",
  },
{
    id: 6,
    title: "RKR Villa",
    category: "Renovation",
    year: "2024",
    location: "Cairo, Egypt",
    client: "American Operator",
    description:
      "A comprehensive renovation and modernization of an existing villa in Cairo, reimagined for an American operator seeking a contemporary luxury residence. The project involved structural assessment, complete interior overhaul, and exterior facade refresh while preserving the property's architectural character. The redesigned spaces feature open-plan living areas, a gourmet kitchen, a resort-style swimming pool, landscaped gardens, and smart home automation systems. The renovation harmonizes Egyptian craftsmanship with modern Western design sensibilities.",
    role: "Project Manager — Managed the full renovation scope from initial condition assessment through design development and construction oversight. Coordinated with the American operator to translate their lifestyle preferences into the design, supervised contractor work on site, managed material procurement for imported finishes, and ensured timely project delivery within the approved renovation budget.",
    images: ["/portfolio/image20.webp", "/portfolio/image19.webp", "/portfolio/image21.webp", "/portfolio/image22.webp"],
  },
{
    id: 7,
    title: "Attorney General Building",
    category: "Mega Projects",
    year: "2009",
    location: "Al Rehab, Egypt",
    client: "Ministry of Justice",
    award: "1ST PLACE — EXTERIOR & INTERIOR DESIGN COMPETITION",
    description:
      "A monumental government building for the Attorney General's office in Al Rehab, designed through a prestigious national design competition. The architecture embodies authority, transparency, and civic pride through a powerful facade composition, grand public atrium spaces, secure judicial chambers, and efficiently organized administrative offices. The design competition entry distinguished itself through its innovative approach to balancing the building's symbolic civic presence with functional workplace requirements, earning first place in both exterior and interior design categories.",
    role: "Competition Design Lead — Conceptualized and developed the winning competition entry for this high-profile Ministry of Justice project. Led the schematic design of both exterior massing and interior spatial organization, produced competition presentation materials including 3D visualizations and physical models, and presented the design vision to the competition jury.",
    images: ["/portfolio/image23.webp", "/portfolio/image24.webp", "/portfolio/image25.webp", "/portfolio/image74.webp", "/portfolio/image75.webp"],
  },
{
    id: 8,
    title: "KHandaresa Hotel",
    category: "Mega Projects",
    year: "2009",
    location: "Makkah, KSA",
    client: "Makkah Government",
    award: "2ND PLACE — DESIGN COMPETITION",
    description:
      "A large-scale hotel development project in the holy city of Makkah, Saudi Arabia, designed to serve the millions of pilgrims visiting annually for Hajj and Umrah. The project required sensitivity to the sacred urban context while delivering a high-capacity hospitality facility with modern amenities. The design incorporates efficient circulation systems for large guest volumes, prayer facilities, cultural appropriate interiors, and panoramic views toward the Grand Mosque. The competition entry was recognized with second place for its thoughtful integration of functionality and contextual sensitivity.",
    role: "Competition Design Team Member — Contributed to the architectural design concept and schematic development for this international design competition. Developed massing studies responsive to the Makkah urban fabric, produced detailed design drawings and 3D renderings, and collaborated with the team to address the unique requirements of hospitality design in a sacred religious context.",
    images: ["/portfolio/image26-1.webp", "/portfolio/image26-2.webp", "/portfolio/image27-1.webp", "/portfolio/image27-2.webp"],
  },
{
    id: 21,
    title: "Residential Interior Design 1",
    category: "Interior Design",
    year: "Throughout Career",
    location: "Madinty, Egypt",
    client: "Private Client",
    description:
      "Conceived in Madinty, Egypt, this interior unfolds through a warm minimalist philosophy where natural materials and soft textures converge to create understated elegance. Open living zones flow naturally into intimate alcoves designed for relaxation and entertaining, while an earth-tone palette punctuated by brushed brass hardware and hand-selected stone gives each room its own character. Bespoke joinery dissolves into the architecture — proving restraint and richness are not opposites but allies.",
    role: "Lead Interior Designer — Directed the entire interior scope from first concept sketch through final on-site installation. Authored space plans, produced photorealistic 3D visualizations, designed one-off furniture pieces, authored comprehensive material and finish specifications, generated full construction documentation sets, and supervised contractor work to guarantee design fidelity.",
    images: ["/portfolio/image55.webp"],
  },
{
    id: 22,
    title: "Residential Interior Design 2",
    category: "Interior Design",
    year: "Throughout Career",
    location: "Nasr City, Cairo, Egypt",
    client: "Private Client",
    description:
      "Located in Nasr City, Cairo, this project transforms spatial constraint into an exercise in ingenuity. Every built element serves multiple purposes: storage walls double as room dividers, mirrored panels amplify daylight penetration, and modular furniture reconfigures throughout the day. Polished marble, walnut veneer, and matte black steel compose a layered material strategy that generates visual depth without clutter — demonstrating how disciplined planning elevates a compact footprint into a luxurious living experience.",
    role: "Lead Interior Designer — Led every phase from initial spatial audit through final handover. Conducted precise as-built measurements and circulation analysis, conceived multi-purpose furniture solutions, assembled mood boards and detailed material schedules, coordinated contractor work streams, and tracked budget and timeline milestones to deliver on schedule.",
    images: ["/portfolio/image52.webp"],
  },
{
    id: 23,
    title: "Residential Interior Design 3",
    category: "Interior Design",
    year: "Throughout Career",
    location: "Al Obour, Egypt",
    client: "Private Client",
    description:
      "Set in Al Obour, Egypt, this interior merges handcrafted design with concealed smart-home technology. Motorized shading, hidden climate zones, and automated lighting scenes are embedded within bespoke millwork so seamlessly that technology serves the experience rather than dominating it. The color narrative shifts deliberately — deep charcoal in private retreats, warm ivory and terracotta in social gathering spaces — crafting an emotional journey through the plan. Fluted woodwork and leather-wrapped handles introduce tactile richness at every point of contact.",
    role: "Lead Interior Designer — Managed the complete design with a specialist focus on technology-integrated interiors. Engineered custom millwork housing concealed automation, authored granular joinery specifications, curated the multi-layered color and material scheme, coordinated specialized smart-home subcontractors, and executed staged quality reviews at every installation milestone.",
    images: ["/portfolio/image53.webp"],
  },
{
    id: 41,
    title: "Residential Interior Design 4",
    category: "Interior Design",
    year: "Throughout Career",
    location: "New Cairo, Egypt",
    client: "Private Client",
    description:
      "Positioned in New Cairo, Egypt, this interior is governed by a single principle — continuity between indoor spaces and the surrounding landscape. Floor-to-ceiling glazing frames garden vistas while layered curtain systems manage acoustics and thermal comfort. The open living area merges with an exterior loggia through retractable glass panels, dissolving the boundary between inside and out. A cream-and-beige tonal palette with bronze inlay accents maintains visual calm, while contrasting ceiling heights — double-height in the living zone, coved and intimate in bedrooms — establish a rich spatial cadence.",
    role: "Lead Interior Designer — Spearheaded the design with particular attention to daylight, acoustics, and indoor-outdoor connectivity. Detailed ceiling profiles and glazing specifications, designed bespoke millwork with bronze inlay, produced complete construction drawing sets, supervised curtain and glass installation on site, and refined the material palette across all zones.",
    images: ["/portfolio/image54.webp"],
  },
{
    id: 42,
    title: "Residential Interior Design 5",
    category: "Interior Design",
    year: "Throughout Career",
    location: "Zagazig, Egypt",
    client: "Private Client",
    description:
      "In Zagazig, Egypt, this multi-room interior assigns each space its own design character while weaving a consistent thread of craftsmanship throughout. Bold teal and gold accents energize the living areas against charcoal walls, warm oak paneling and a sculptural chandelier define the dining experience, and private quarters embrace sage and linen for restful simplicity. Hand-carved stone lintels, bespoke wall sconces, and artisan ceramic tiles provide the unifying craft language — creating a curated journey through varied moods that feels both intentional and connected.",
    role: "Lead Interior Designer — Conceived and delivered this multi-space interior with individual room concepts unified by a shared design language. Specified artisan-crafted fixtures and heritage materials, authored comprehensive FF&E and finish schedules, and conducted rigorous on-site quality inspections across the phased installation.",
    images: ["/portfolio/image58.webp", "/portfolio/image59.webp", "/portfolio/image60.webp", "/portfolio/image61.webp"],
  },
{
    id: 18,
    title: "Neama Oasis Touristic Village",
    category: "Urban Planning",
    year: "2017",
    location: "Sharm El Sheikh, Egypt",
    client: "Local Developer",
    description:
      "A comprehensive touristic village masterplan in Sharm El Sheikh, Egypt's premier resort destination on the Sinai Peninsula. The development concept creates an immersive oasis-themed resort experience with a mix of hotel accommodations, residential villas, retail and dining promenades, recreational facilities, and landscaped leisure zones. The masterplan maximizes the site's natural desert beauty while providing shade, water features, and lush landscaping to create comfortable microclimates. Sustainable design principles including passive cooling, water recycling, and solar energy integration are woven throughout the development.",
    role: "Lead Design Architect — Led the architectural design and masterplan development for this resort village project. Developed the site masterplan with detailed zoning and phasing strategies, designed key building typologies and their spatial configurations, coordinated with landscape architects and environmental consultants, and produced comprehensive design presentation and working drawings through the government planning approval process.",
    images: ["/portfolio/image46.webp", "/portfolio/image47.webp"],
  },
{
    id: 11,
    title: "Residential Exterior 1",
    category: "Residential",
    year: "2014",
    location: "El Obour, Egypt",
    client: "Private Client",
    description:
      "Rising in El Obour, Egypt, this facade is articulated through clean horizontal lines and a monolithic material palette of board-formed concrete punctuated by cantilevered timber louvers. Layered planes recede progressively from street to garden, generating visual depth and a sense of journey. A blackened-steel recessed entrance anchors the composition, while a rooftop pergola with slatted screens modulates daylight entering the upper floor. Native grasses and staggered stone planters soften the geometric rigor of the built form.",
    role: "Lead Design Architect — Evolved the exterior concept across all design phases. Produced massing studies and photorealistic renderings, authored detailed facade and material specifications, collaborated with structural engineers on the cantilevered louvers and pergola, and managed the complete drawing package through to construction issue.",
    images: ["/portfolio/image32-1.webp", "/portfolio/image32-2.webp", "/portfolio/image32.webp"],
  },
{
    id: 12,
    title: "Residential Exterior 2",
    category: "Residential",
    year: "2014",
    location: "New Cairo, Egypt",
    client: "Private Client",
    description:
      "In New Cairo, Egypt, this facade rejects conventional symmetry in favor of an asymmetric composition of stacked white-stucco volumes wrapped in vertical timber slats. A full-height glazed slot splits the main mass, channeling natural light deep into the plan while visually stitching the front and rear gardens together. Angled bay windows project from the upper level to frame specific landscape views and add sculptural presence to the street elevation. A sharply angled roof overhang shelters the entrance and casts shifting shadow patterns throughout the day.",
    role: "Lead Design Architect — Conceptualized and developed the complete exterior design. Tested multiple massing iterations through physical and digital models, produced working drawings for the complex facade geometry, specified all cladding and glazing systems, and guided the client through progressive design-stage approvals.",
    images: ["/portfolio/image33-1.webp", "/portfolio/image33-2.webp", "/portfolio/image33-3.webp", "/portfolio/image34-1.webp", "/portfolio/image34-2.webp"],
  },
{
    id: 43,
    title: "Residential Exterior 3",
    category: "Residential",
    year: "2015",
    location: "El Monofiya, Egypt",
    client: "Private Client",
    description:
      "Rooted in El Monofiya, Egypt, this facade reinterprets Mediterranean vernacular architecture through a contemporary lens. Thick masonry walls in warm ochre provide thermal mass, while deep-set arched windows reference regional building traditions. A central courtyard — revealed through a grand arched opening in the primary facade — serves as the design's emotional core, offering privacy, cross-ventilation, and lush garden views to surrounding rooms. Traditional clay barrel tiles cap the roof, and limestone copings bring a handcrafted finish to every parapet edge.",
    role: "Lead Design Architect — Led the exterior with a deep focus on contextual Mediterranean expression. Researched regional vernacular precedents, advanced the design through hand sketches and 3D models, detailed masonry and arched opening specifications, coordinated courtyard landscape design, and produced full construction documentation.",
    images: ["/portfolio/image35-1.webp", "/portfolio/image35-2.webp"],
  },
{
    id: 44,
    title: "Residential Exterior 4",
    category: "Residential",
    year: "2015",
    location: "Muscat, Oman",
    client: "Private Client",
    description:
      "Designed for Muscat, Oman, this facade responds to the Gulf's arid climate and cultural heritage through a deliberate composition of solid and void. Locally quarried sandstone pairs with smooth white plaster, mediating between privacy and openness. Traditional wind-catcher towers are reimagined as sculptural rooftop elements that drive natural ventilation while defining the skyline. Deep eaves, latticed screen walls, and inward-facing courtyards create layered solar protection, while the material palette celebrates Omani stone and gypsum in their natural state.",
    role: "Lead Design Architect — Designed the exterior with a deep commitment to climate-responsive, culturally grounded architecture. Studied Omani vernacular construction, developed passive cooling strategies embedded in the architectural form, produced stone and screen wall specifications, and managed the design through all documentation phases.",
    images: ["/portfolio/image36-1.webp", "/portfolio/image36-2.webp", "/portfolio/image36-3.webp", "/portfolio/image36.webp"],
  },
{
    id: 45,
    title: "Residential Exterior 5",
    category: "Residential",
    year: "2014",
    location: "El Obour, Egypt",
    client: "Private Client",
    description:
      "In El Obour, Egypt, this facade merges living green walls and natural stone within a rigorous geometric grid. The front elevation reads as a matrix of rectilinear bays — rubble stone infill, floor-to-ceiling glazing, and planted vertical gardens alternate to soften the geometry. A cantilevered upper volume in dark composite panels hovers above a transparent ground floor, producing a sense of levitation. Stepped landscape terraces with integrated seating extend the architecture into the garden.",
    role: "Lead Design Architect — Developed the concept around biophilic design principles. Engineered green wall integration with irrigation strategy, authored detailed facade construction drawings, specified composite cladding and structural glazing, and collaborated with landscape architects on terrace and planting design.",
    images: ["/portfolio/image37.webp"],
  },
{
    id: 46,
    title: "Residential Exterior 6",
    category: "Residential",
    year: "2015",
    location: "New Cairo, Egypt",
    client: "Private Client",
    description:
      "Situated in New Cairo, Egypt, this facade distills Egyptian architectural identity into a clean contemporary form. Rhythmic vertical projections in exposed aggregate concrete echo the piers and colonnades of Egyptian modernism. A monochromatic palette of warm grey and sand-colored plaster produces subtle tonal shifts as light conditions change throughout the day. The entrance is announced by a double-height void framed by a perforated concrete screen that casts evolving geometric shadow patterns into the interior. Native trees and landscaped mounds ground the architecture in its natural setting.",
    role: "Lead Design Architect — Led the exterior from concept through construction documentation. Investigated Egyptian modernist precedents to shape the design language, developed concrete screen and facade specifications, built 3D and physical study models, and coordinated with structural and landscape consultants.",
    images: ["/portfolio/image66.webp"],
  },
{
    id: 47,
    title: "Residential Exterior 7",
    category: "Residential",
    year: "2013",
    location: "New Cairo, Egypt",
    client: "Private Client",
    description:
      "In New Cairo, Egypt, this facade is defined by the dynamic interplay of sloping roof planes and contrasting materials. Smooth white volumes sit atop rough-hewn limestone bases, establishing a dialogue between refined and raw surfaces. A dramatic swept roofline descends to shelter a covered outdoor living zone and terminates in a deep overhang marking the entrance portico. Horizontal timber cladding on the upper level introduces warmth, while frameless corner glazing erases the boundary between interior and garden.",
    role: "Lead Design Architect — Conceptualized the design around its expressive roof geometry and material contrasts. Developed the sloped roof form with integrated drainage, specified limestone and timber cladding systems, produced full working drawings with detailed facade junctions, and delivered the design package through construction issue.",
    images: ["/portfolio/image67.webp"],
  },
{
    id: 48,
    title: "Residential Exterior 8",
    category: "Residential",
    year: "2014",
    location: "New Cairo, Egypt",
    client: "Private Client",
    description:
      "In New Cairo, Egypt, this facade sculpts bold prismatic forms through the intersection of solid and glazed volumes. A chamfered corner bay wrapped in frameless structural glass creates a transparent anchor for the street elevation. Adjacent solid masses are clad in alternating bands of fluted concrete and blackened steel, establishing a powerful vertical rhythm. A cantilevered timber-clad upper box projects over the entrance as a dramatic canopy. Angular reflecting pools and precisely placed ornamental trees in the ground landscape mirror the facade's geometric language.",
    role: "Lead Design Architect — Developed the prismatic facade composition from initial massing through final documentation. Designed the chamfered glass corner and cantilevered canopy, produced detailed drawings for fluted concrete and steel cladding, coordinated structural engineering for the cantilever, and delivered complete construction documentation.",
    images: ["/portfolio/image68.webp"],
  },
{
    id: 15,
    title: "Al Okashia Administrative Compound",
    category: "Urban Planning",
    year: "2013",
    location: "Abha, KSA",
    client: "Abha Government",
    description:
      "A government administrative compound in Abha, Saudi Arabia, designed to consolidate multiple municipal departments into a cohesive campus within the distinctive mountainous landscape of the Asir region. The masterplan responds to the dramatic topography and temperate highland climate, incorporating terraced building forms, natural stone facades referencing local Asiri architecture, and landscaped courtyards that capitalize on the panoramic mountain views. The compound provides modern government office facilities, public service halls, and amenity spaces for employees and visitors.",
    role: "Lead Design Architect — Led the architectural design and masterplan development for this government compound project. Developed the site masterplan responsive to topography and climate, designed the building forms referencing local Asiri architecture, produced detailed design packages through all project phases, and contributed to the comprehensive design and tender documentation.",
    images: ["/portfolio/image41.webp", "/portfolio/image42.webp"],
  },
{
    id: 29,
    title: "Ferrari World, Abu Dhabi",
    category: "Mega Projects",
    year: "2013",
    location: "Abu Dhabi, UAE",
    client: "Private Developer",
    description:
      "A confidential architectural project for Ferrari World Abu Dhabi, the iconic indoor theme park on Yas Island, United Arab Emirates. The project involved an extensive scope of working drawings and shop drawings for this world-renowned entertainment destination. The project demanded meticulous technical detailing across a wide range of building components and systems, producing comprehensive construction documentation packages that served as the critical link between design intent and on-site execution. The drawings covered structural coordination, MEP integration, interior fit-out details, facade systems, custom joinery, and specialized fixtures — reflecting a high level of technical proficiency and deep understanding of construction processes. Due to confidentiality agreements, specific project details, scope, and imagery remain undisclosed.",
    role: "Senior Architect — As part of the design team for Ferrari World Abu Dhabi, produced comprehensive working drawings and shop drawings for this iconic indoor theme park development. Delivered detailed technical documentation encompassing structural, MEP, interior, and facade coordination drawings, managed drawing production schedules, coordinated with contractors and specialist consultants, and ensured full compliance with UAE building codes and the client's exacting quality standards.",
    images: ["/portfolio/ferrari-world.webp"],
  },
{
    id: 16,
    title: "Hayer Celebration Arena",
    category: "Urban Planning",
    year: "2012",
    location: "Hayer, KSA",
    client: "Hayer Government",
    description:
      "A multi-purpose celebration and events arena in Hayer, Saudi Arabia, designed to serve as a community focal point for festivals, weddings, cultural events, and public gatherings. The design features a flexible main hall with configurable seating, outdoor celebration terraces, VIP hospitality suites, and supporting facilities including kitchens, parking, and service areas. The architectural expression draws from traditional Saudi celebration spaces while incorporating modern structural systems and event technology infrastructure to accommodate diverse programming requirements.",
    role: "Project Architect — Led the architectural design for this community events venue. Developed the building concept and functional layout, produced schematic and design development drawings, coordinated with structural and MEP engineers, and presented design proposals to the Hayer Government client for review and approval.",
    images: ["/portfolio/image43-1.webp", "/portfolio/image43.webp"],
  },
{
    id: 17,
    title: "El Saraya Plaza",
    category: "Urban Planning",
    year: "2012",
    location: "Janzur, Libya",
    client: "Janzur Government",
    description:
      "A mixed-use urban plaza development in Janzur, Libya, designed to create a vibrant commercial and civic destination for the coastal city. The masterplan integrates retail shops, restaurants, office spaces, and public plazas in a pedestrian-friendly configuration that activates the waterfront location. The design embraces Mediterranean architectural influences with shaded colonnades, arcaded walkways, sea-view terraces, and landscaped public spaces that encourage community interaction and support the local economy.",
    role: "Lead Design Architect — Led the architectural design and masterplan development for this mixed-use plaza project. Conducted site analysis and feasibility studies, developed the masterplan and building designs with Mediterranean architectural influences, produced comprehensive design presentation packages and working drawings for client review and government approval.",
    images: ["/portfolio/image44.webp", "/portfolio/image45.webp"],
  },
{
    id: 36,
    title: "Administrative Compound",
    category: "Mega Projects",
    year: "2012",
    location: "6th of October, Cairo, Egypt",
    client: "Private Client",
    description:
      "A large-scale administrative compound development in 6th of October City, Cairo, designed to house multiple government and corporate office functions within an integrated campus setting. The project encompasses several building volumes arranged around a central landscaped courtyard, providing efficient circulation between departments while creating a cohesive campus identity. The architectural design responds to Cairo's suburban office market demands with a modern facade expression, sustainable passive cooling strategies, and flexible floor plates that accommodate diverse tenant requirements. The compound includes underground parking, shared amenity spaces, and retail facilities at ground level to serve the daily needs of building occupants.",
    role: "Lead Design Architect — Led the architectural design for this large-scale administrative compound. Developed the site masterplan and building massing studies, designed the campus layout with modern facade expression and passive cooling strategies, produced detailed design packages through concept and schematic phases, and coordinated with structural and MEP consultants on comprehensive design and tender documentation.",
    images: ["/portfolio/image76.webp", "/portfolio/image77.webp"],
  },
{
    id: 13,
    title: "HSBC Sheraton Branch",
    category: "Commercial",
    year: "2011",
    location: "Sheraton, Egypt",
    client: "HSBC Bank",
    description:
      "A premium bank branch interior fit-out for HSBC in the Sheraton district of Cairo, designed to deliver a world-class banking experience within the constraints of an existing commercial space. The design adheres to HSBC's global brand design guidelines while accommodating local regulatory requirements for banking security and customer privacy. The branch features a welcoming customer lounge, private meeting rooms, efficient teller stations, a dedicated Premier banking area, and back-of-house operations spaces — all unified by a sophisticated material palette and seamless brand integration.",
    role: "Design Architect — Led the interior design development for this HSBC bank branch fit-out project. Interpreted HSBC's international brand guidelines for local execution, produced detailed interior construction drawings, coordinated with security consultants for vault and ATM placement, specified finishes and fixtures, and managed the design through the construction phase to ensure brand compliance.",
    images: ["/portfolio/image38-1.webp", "/portfolio/image38.webp"],
  },
{
    id: 25,
    title: "Al Kemma Optics",
    category: "Interior Design",
    year: "2011",
    location: "Zagazig, Egypt",
    client: "Al Kemma Optics",
    description:
      "A retail interior design project for Al Kemma Optics, a premium eyewear showroom in Zagazig, Egypt. The design creates a sophisticated retail environment that showcases optical products in an elegant, gallery-like setting while maintaining a welcoming and approachable customer experience. Key design features include custom display shelving with integrated LED lighting, a dedicated eye examination suite, a stylish reception counter, and a comfortable customer waiting area. The interior design reflects the brand's commitment to quality eye care through clean lines, premium materials, and meticulous attention to lighting quality.",
    role: "Interior Design Architect — Developed the complete interior design for this specialty retail showroom. Created the store layout optimizing product display and customer circulation, designed custom display fixtures and furniture, produced detailed interior drawings, specified lighting, finishes, and fixtures, and managed the fit-out through to successful completion and handover.",
    images: ["/portfolio/image64.webp", "/portfolio/image64-1.webp"],
  },
{
    id: 37,
    title: "Holding Company for Water & Wastewater",
    category: "Renovation",
    year: "2011",
    location: "Al Monofia, Egypt",
    client: "Al Monofia Government",
    description:
      "A comprehensive renovation and modernization project for the Holding Company for Water and Wastewater facilities in Al Monofia governorate, Egypt. The project involved the structural assessment, functional reprogramming, and interior overhaul of existing government office buildings to create a modern, efficient headquarters for the regional water and wastewater management authority. The renovation upgraded mechanical and electrical systems, improved accessibility compliance, modernized office layouts with open-plan workstations and meeting rooms, and refreshed the building exterior to project an image of institutional competence and public service quality. The design maintained building operations throughout the renovation phases through careful construction sequencing.",
    role: "Lead Design Architect — Led the architectural design for the renovation and modernization of this government facility. Developed the design concept for the functional reprogramming and interior overhaul, produced detailed renovation drawings and finish specifications, coordinated with structural and MEP consultants, and ensured the design met all government facility standards while maintaining building operations throughout renovation phases.",
    images: ["/portfolio/image78.webp", "/portfolio/image79.webp"],
  },
{
    id: 14,
    title: "Vodafone Renovation",
    category: "Commercial",
    year: "2010",
    location: "El Maady Cornish, Cairo",
    client: "Vodafone",
    description:
      "A comprehensive renovation of an existing Vodafone retail and customer service location on El Maady Cornish, Cairo. The project reimagined the customer journey through an updated store layout, modern interior finishes, enhanced lighting design, and improved customer flow patterns. The renovation maintained operations during construction through careful phasing, minimizing disruption to Vodafone's business continuity while delivering a refreshed, contemporary retail environment aligned with Vodafone's evolving brand identity.",
    role: "Project Architect — Managed the renovation design and construction oversight for this Vodafone retail location. Developed renovation plans while maintaining existing operational constraints, coordinated construction phasing with the client's operations team, supervised on-site contractor work, and ensured all finishes met Vodafone's retail brand standards.",
    images: ["/portfolio/image39.webp", "/portfolio/image40-1.webp", "/portfolio/image40-2.webp", "/portfolio/image40-3.webp"],
  },
{
    id: 31,
    title: "Lowers Syndicate Club — Alexandria",
    category: "Recreational & Social Club",
    year: "2010",
    location: "Alexandria, Egypt",
    client: "Lowers Syndicate",
    description:
      "A comprehensive design project for the Lowers Syndicate Club in Alexandria, Egypt's Mediterranean coastal city known for its vibrant social and cultural life. The club was designed to serve as a premium social and recreational destination for syndicate members, offering a diverse program of amenities including dining facilities, lounges, meeting rooms, outdoor terraces with sea views, and recreational spaces. The architectural design responds to Alexandria's unique coastal character, incorporating elements that harmonize with the city's blend of Mediterranean and Egyptian design traditions. The interior spaces were conceived to create distinct atmospheres for different activities — from formal gathering areas to relaxed casual zones — while maintaining a cohesive design language throughout the facility.",
    role: "Design Architect — Led the architectural and interior design for the Lowers Syndicate Club in Alexandria. Developed the conceptual design through all project phases, produced comprehensive design and working drawings, coordinated with structural and MEP engineers, and managed the design process to ensure the facility met the syndicate's requirements for a high-quality social and recreational venue.",
    images: ["/portfolio/image71.webp", "/portfolio/image70.webp"],
  },
{
    id: 32,
    title: "Lowers Syndicate Club — Luxor",
    category: "Recreational & Social Club",
    year: "2010",
    location: "Luxor, Egypt",
    client: "Lowers Syndicate",
    description:
      "A social and recreational club facility in Luxor, designed as a complementary venue to the Alexandria branch, tailored to the unique character and needs of Upper Egypt. The club provides members with a refined social environment featuring dining areas, event halls, landscaped outdoor spaces, and recreational amenities. The design approach draws inspiration from Luxor's rich architectural heritage while delivering modern comfort and functionality. The facility incorporates climate-responsive design strategies suited to Upper Egypt's warm climate, including shaded courtyards, natural ventilation channels, and carefully oriented openings that maximize comfort while minimizing energy consumption. The project demonstrates versatility in designing social club facilities across diverse Egyptian regional contexts.",
    role: "Design Architect — Managed the architectural design for the Lowers Syndicate Club in Luxor. Adapted the club's design standards to the Luxor context, addressing regional climate considerations and local material availability. Produced complete design documentation and coordinated with the syndicate to ensure the facility aligned with their vision for a distinguished social venue in Upper Egypt.",
    images: ["/portfolio/image72.webp"],
  },
{
    id: 33,
    title: "Pharma Cure Factory",
    category: "Industrial",
    year: "2010",
    location: "Al Obour, Egypt",
    client: "Pharma Cure Company",
    description:
      "An industrial architectural project for the Pharma Cure Company's pharmaceutical manufacturing facility in Al Obour City, Egypt's designated industrial zone northeast of Cairo. The project involved the design of a state-of-the-art pharmaceutical factory meeting stringent Good Manufacturing Practice (GMP) requirements and international pharmaceutical production standards. The facility encompasses clean room production areas, quality control laboratories, warehousing and distribution zones, administrative offices, and employee amenity spaces. The architectural design prioritizes operational efficiency, hygiene compliance, and workflow optimization, with carefully planned material flow paths that prevent cross-contamination between production stages. The building envelope incorporates specialized HVAC infrastructure supports, controlled access points, and robust security provisions appropriate for pharmaceutical manufacturing operations.",
    role: "Design Architect — Led the architectural design for the Pharma Cure pharmaceutical factory in Al Obour. Developed the facility layout in compliance with GMP standards and pharmaceutical manufacturing requirements, coordinated with process engineers and HVAC specialists for clean room integration, produced comprehensive construction documentation, and ensured the design met all regulatory requirements for pharmaceutical production facilities in Egypt.",
    images: ["/portfolio/image73.webp"],
  },
{
    id: 38,
    title: "New Cairo Club — Admin Building",
    category: "Recreational & Social Club",
    year: "2010",
    location: "New Cairo, Egypt",
    client: "New Cairo Club",
    description:
      "An administrative building for New Cairo Club, a prominent social and recreational club in New Cairo, Egypt. The project involved the design of a dedicated administrative facility to serve the club's management operations, member services, and event coordination functions. The building design provides efficient office layouts, member reception and inquiry areas, meeting rooms for club committee gatherings, and back-of-house support spaces. The architectural expression harmonizes with the club's existing built environment while creating a distinguished presence befitting one of New Cairo's established social institutions. The interior design balances professional functionality with the warm, welcoming atmosphere expected of a premium social club.",
    role: "Design Architect — Led the architectural and interior design for the New Cairo Club administrative building. Developed the conceptual design through all project phases, produced comprehensive design and working drawings, coordinated with structural and MEP engineers, specified interior finishes aligned with the club's identity, and managed the design process to ensure the facility met the club's operational and aesthetic requirements.",
    images: ["/portfolio/image80.webp", "/portfolio/image81.webp"],
  },
{
    id: 9,
    title: "Dhofar Municipality",
    category: "Mega Projects",
    year: "2009",
    location: "Dhofar, Oman",
    client: "Dhofar Government",
    award: "2ND PLACE — DESIGN COMPETITION",
    description:
      "A municipal government complex in Dhofar, Oman, designed through an international design competition to house administrative offices, public service halls, and civic spaces. The architectural concept responds to the distinctive Dhofari climate and cultural identity, incorporating passive cooling strategies, traditional Omani design elements reinterpreted in contemporary form, and sustainable building practices. The competition entry earned second place for its sensitive contextual response and innovative approach to creating a people-centered government facility.",
    role: "Competition Design Team Member — Participated in the architectural design development for this Omani government competition project. Conducted contextual analysis of Dhofari architectural traditions, contributed to schematic design development, produced design presentation packages, and helped integrate climate-responsive design strategies into the building's form and envelope.",
    images: ["/portfolio/image28-1.webp", "/portfolio/image28-2.webp", "/portfolio/image28-3.webp", "/portfolio/image29-1.webp", "/portfolio/image29-2.webp", "/portfolio/image29-3.webp"],
  },
{
    id: 10,
    title: "Arabian Lawyers Syndicate",
    category: "Mega Projects",
    year: "2009",
    location: "Nasr City, Cairo",
    client: "Arabian Lawyers Union",
    award: "2ND PLACE — DESIGN COMPETITION",
    description:
      "A headquarters building for the Arabian Lawyers Syndicate in Nasr City, Cairo, designed to serve as the professional home and institutional symbol for the legal community. The architecture conveys the dignity and authority of the legal profession through a formal facade composition, ceremonial spaces for bar gatherings, conference and continuing education facilities, law library, and well-organized administrative offices. The design competition entry received second place recognition for its thoughtful articulation of institutional identity and functional programming.",
    role: "Competition Design Team Member — Contributed to the competition design entry for this prominent syndicate headquarters. Developed the interior spatial planning including public circulation, conference facilities, and office layouts, produced architectural drawings and 3D visualizations, and coordinated the overall design presentation for jury review.",
    images: ["/portfolio/image30-1.webp", "/portfolio/image30-2.webp", "/portfolio/image30-3.webp", "/portfolio/image30.webp", "/portfolio/image31-1.webp", "/portfolio/image31-2.webp", "/portfolio/image31-3.webp", "/portfolio/image31.webp"],
  },
{
    id: 19,
    title: "Rossita Renovation",
    category: "Urban Planning",
    year: "2009",
    location: "Rossita (Rasheed), Egypt",
    client: "Rasheed Government",
    award: "1ST PLACE — GOVERNMENT DESIGN COMPETITION",
    description:
      "A transformative urban renovation project for the historic coastal town of Rossita (Rasheed) in Egypt's Nile Delta region. The project addresses the revitalization of deteriorating heritage buildings, public spaces, and urban infrastructure while preserving the town's distinctive Ottoman-era architectural character and maritime heritage. The winning competition entry proposed a comprehensive strategy integrating heritage restoration, adaptive reuse of historic structures, improved pedestrian circulation, waterfront promenade enhancement, and new community facilities that catalyze economic renewal while honoring the town's cultural legacy.",
    role: "Competition Design Lead — Conceptualized and led the winning competition entry for this government-sponsored urban renovation project. Conducted extensive heritage documentation and urban analysis, developed the renovation masterplan and building design proposals, produced compelling competition presentation materials, and presented the vision to the government jury earning first place recognition.",
    images: ["/portfolio/image48.webp", "/portfolio/image49.webp"],
  },
{
    id: 30,
    title: "Luxor Information Center (LIC)",
    category: "Interior Design",
    year: "2009",
    location: "Luxor, Egypt",
    client: "Luxor Government",
    description:
      "An interior design project for the Luxor Information Center, a public-facing visitor facility serving tourists and the local community in one of Egypt's most historically significant cities. The center was designed to function as a comprehensive information hub, providing visitors with orientation services, exhibition space for heritage displays, multimedia presentation areas, and comfortable waiting lounges. The interior design approach balances modern functionality with subtle references to ancient Egyptian architectural motifs, creating a welcoming atmosphere that enhances the visitor experience while respecting Luxor's unparalleled cultural context. The spatial layout prioritizes intuitive visitor flow, with clear sight lines to information counters, strategically placed interpretive displays, and dedicated zones for ticketing and tour coordination.",
    role: "Design Architect — Developed the interior design concept and spatial layout for the Luxor Information Center. Produced detailed interior construction drawings, specified finishes and fixtures appropriate for a high-traffic public facility in a heritage-sensitive location, and coordinated with exhibition designers and multimedia installers to ensure seamless integration of display systems within the interior architecture.",
    images: ["/portfolio/image69.webp"],
  },
{
    id: 34,
    title: "Luxor Children Park",
    category: "Urban Planning",
    year: "2009",
    location: "Luxor, Egypt",
    client: "Luxor Government",
    description:
      "A public children's park and family recreation area in Luxor, designed to provide a safe, engaging, and culturally responsive play environment for the local community. The park design incorporates age-appropriate play zones, shaded seating areas for parents and guardians, landscaped gardens, and educational outdoor installations that reflect Luxor's rich heritage. The project addresses the critical need for quality public recreational spaces in historic cities, balancing modern playground safety standards with sensitivity to the surrounding archaeological context. The landscape design uses native planting and sustainable irrigation methods suited to the Upper Egyptian climate, while the overall layout encourages family interaction and community gathering.",
    role: "Project Architect — Contributed to the landscape and urban design development for this public park project in Luxor. Developed site plans, play zone layouts, and landscape designs responsive to the local climate and heritage context. Produced construction drawings for pathways, seating areas, playground equipment foundations, and site amenities. Coordinated with heritage authorities to ensure all design interventions respected the archaeological sensitivity of the Luxor context.",
    images: ["/portfolio/image_e854d031.webp", "/portfolio/image_6e5d4bb4.webp"],
  },
{
    id: 39,
    title: "Ras Sidr Touristic Village Competition",
    category: "Hospitality",
    year: "2009",
    location: "Ras Sidr, Egypt",
    client: "FEDA Group",
    description:
      "A competition entry for a touristic village development in Ras Sidr, on the Gulf of Suez coast of Egypt's Sinai Peninsula. The project envisioned a comprehensive resort destination that capitalizes on Ras Sidr's unique position as an emerging tourism hub with pristine beaches, therapeutic hot springs, and dramatic desert landscapes. The masterplan integrates hotel accommodations, residential villas, recreational facilities, retail and dining promenades, and wellness centers within a cohesive seaside community. The design concept responds to the coastal desert climate with passive cooling strategies, shaded pedestrian corridors, and water features that create comfortable microclimates. The architectural language draws from traditional Sinai coastal architecture reinterpreted in a contemporary resort context.",
    role: "Competition Design Team Member — Contributed to the architectural design concept and masterplan development for this touristic village competition entry. Conducted site analysis of the Ras Sidr coastal context, developed the resort masterplan with zoning for hospitality, residential, and recreational zones, produced schematic design drawings and 3D visualizations, and collaborated with the team to deliver a compelling competition presentation that addressed the client's vision for a world-class tourism destination.",
    images: ["/portfolio/image_9fc76e09.webp"],
  },
{
    id: 40,
    title: "New Ismailia City Development",
    category: "Mega Projects",
    year: "2009",
    location: "Ismailia, Egypt",
    client: "Egyptian Government",
    description:
      "A large-scale urban development project for New Ismailia City, commissioned by the Egyptian Government as part of a national initiative to develop new urban communities along the Suez Canal corridor. The project encompasses comprehensive masterplanning for a new city district including residential neighborhoods, commercial zones, educational facilities, healthcare centers, government administrative buildings, public parks, and essential infrastructure networks. The masterplan leverages Ismailia's strategic location on the Suez Canal and its temperate climate relative to other Egyptian cities, creating attractive urban environments that support population growth and economic development in the canal zone. Sustainable urban design principles, efficient transportation networks, and mixed-use planning were central to the development concept.",
    role: "Competition Design Team Member — Participated in the urban planning and architectural design development for this new city development project. Contributed to the masterplan layout including residential, commercial, and public facility zoning, developed building design concepts for key typologies, produced planning presentation materials, and supported the team in creating the comprehensive development proposal for government review.",
    images: ["/portfolio/image_580efc07.webp", "/portfolio/image_f9a55e8.webp"],
  },
{
    id: 24,
    title: "Arabian International Bank – El Thawra Branch",
    category: "Interior Design",
    year: "2008",
    location: "Cairo, Egypt",
    client: "AIB Bank",
    description:
      "A complete interior design and fit-out for the Arabian International Bank's El Thawra branch in Cairo. The project transforms a commercial space into a professional banking environment that balances corporate identity, customer experience, and operational security. The design features a distinguished customer reception area, private banking consultation rooms, efficient teller counters with enhanced security provisions, a manager's office suite, and well-organized back-office operations. The material palette conveys financial stability and modern sophistication through the use of natural stone, timber veneers, brushed metal accents, and strategic lighting design.",
    role: "Design Architect — Led the interior design for this bank branch project from concept to completion. Developed the interior layout optimized for banking operations and customer flow, produced detailed construction drawings, specified all interior finishes and fixtures, coordinated with security specialists, and supervised the fit-out construction to ensure quality and brand alignment.",
    images: ["/portfolio/image62.webp", "/portfolio/image63.webp"],
  },
{
    id: 26,
    title: "Motherhood & Childhood Urban Center",
    category: "Mega Projects",
    year: "2008",
    location: "Luxor, Egypt",
    client: "Luxor Government",
    award: "NOMINATED — AGA KHAN AWARD FOR ARCHITECTURE",
    description:
      "An innovative urban center in Luxor, Egypt, dedicated to motherhood and childhood services, representing a holistic approach to community development through architecture. The project provides essential healthcare facilities for mothers and children, educational spaces, counseling services, outdoor play areas, and community gathering spaces within a design that is deeply responsive to its cultural and climatic context. The architecture employs passive environmental strategies, locally sourced materials, and traditional building techniques reinterpreted in a contemporary architectural language. The project's nomination for the prestigious Aga Khan Award for Architecture recognizes its exemplary contribution to architecture that improves the quality of life in Muslim societies.",
    role: "Competition Design Team Member — Contributed to the architectural design of this internationally recognized project. Participated in concept development focusing on culturally responsive and climate-appropriate design, produced architectural drawings and presentation materials, and supported the team in developing the project narrative that led to the Aga Khan Award nomination.",
    images: ["/portfolio/image65.webp", "/portfolio/image65-1.webp", "/portfolio/image65-2.webp"],
  },
{
    id: 35,
    title: "FPI Training Center",
    category: "Interior Design",
    year: "2008",
    location: "6th of October, Cairo, Egypt",
    client: "Future Pipe Industries",
    description:
      "A corporate training center interior design project for Future Pipe Industries (FPI) in 6th of October City, Cairo. The facility was designed to serve as the company's primary training and professional development hub, featuring flexible classroom spaces, a main auditorium with audiovisual systems, breakout rooms for collaborative workshops, and administrative support areas. The interior design creates a professional yet welcoming learning environment that reflects FPI's corporate identity while optimizing the spatial configuration for diverse training activities — from large-group lectures to small-group seminars and hands-on technical demonstrations. The material palette and lighting design support concentration and comfort during extended training sessions.",
    role: "Interior Design Architect — Developed the complete interior design concept and spatial layout for the FPI corporate training center. Created detailed floor plans optimizing the training flow from reception through classrooms to breakout spaces, specified all interior finishes, fixtures, and furniture, produced comprehensive interior construction drawings, and managed the fit-out through to successful completion and handover.",
    images: ["/portfolio/image_ed47f6f2.webp"],
  },
{
    id: 20,
    title: "El Karnak Temple Park",
    category: "Urban Planning",
    year: "2007",
    location: "Luxor, Egypt",
    client: "Luxor Government",
    description:
      "A landscape and urban design project for the environs of the ancient Karnak Temple complex in Luxor, Egypt. The project creates a dignified public park and visitor experience zone that enhances the approach to one of the world's most significant archaeological sites. The design includes landscaped gardens, interpretive walking paths, shaded rest areas, visitor amenities, and improved vehicular and pedestrian circulation. All design interventions are carefully calibrated to respect the archaeological sensitivity of the site, maintain visual corridors to the ancient temple, and comply with Supreme Council of Antiquities regulations.",
    role: "Project Architect — Contributed to the landscape and urban design development for this culturally sensitive project. Collaborated with archaeologists and heritage specialists, developed site plans and landscape designs, produced construction drawings for pathways, seating areas, and site amenities, and ensured all design work met heritage preservation requirements.",
    images: ["/portfolio/image50.webp", "/portfolio/image51.webp"],
  },
];

// -----------------------------------------------------------------------------
// Awards
// -----------------------------------------------------------------------------

export const awards: Award[] = [
  {
    title: "1ST PLACE",
    project: "Attorney General Building",
    type: "Exterior & Interior Design Competition",
    year: "2009",
  },
  {
    title: "1ST PLACE",
    project: "Rossita Renovation",
    type: "Government Design Competition",
    year: "2009",
  },
  {
    title: "2ND PLACE",
    project: "Arabian Lawyers Syndicate",
    type: "Design Competition",
    year: "2009",
  },
  {
    title: "2ND PLACE",
    project: "KHandaresa Hotel",
    type: "Design Competition",
    year: "2009",
  },
  {
    title: "2ND PLACE",
    project: "Dhofar Municipality",
    type: "Design Competition",
    year: "2009",
  },
  {
    title: "NOMINATED",
    project: "Motherhood & Childhood Urban Center",
    type: "Aga Khan Award for Architecture",
    year: "2008",
  },
];

// -----------------------------------------------------------------------------
// Experience
// -----------------------------------------------------------------------------

export const experiences: Experience[] = [
  {
    period: "Jan 2026 – Mar 2026",
    company: "Fedn Consulting Engineering Co.",
    location: "Dammam, KSA",
    role: "Chairman's Advisor & Director of Development",
    description:
      "Provided high-level strategic advisory to the Chairman on development direction and project portfolio strategy. Directed the company's development division, overseeing project acquisition, feasibility assessment, and business development initiatives. Established frameworks for project delivery excellence and fostered key client relationships across the Saudi Arabian market. Contributed institutional knowledge and industry expertise to shape the firm's growth trajectory in the Gulf region.",
    type: "Consulting",
    logo: "/logos/fedn-consulting.webp",
  },
  {
    period: "2023 – 2025",
    company: "PAVILLION ARCHITECTS (PA)",
    location: "Cairo, Egypt",
    role: "Project Manager",
    description:
      "Managed a diverse portfolio of hospitality, residential, and mixed-use projects including the LE 480M Oasis Skywalk Hotel & Branded Apartment and the LE 200M Boutique Hotel in New Cairo. Led multidisciplinary design teams from concept through construction, coordinated with international brand operators on design guideline compliance, managed contractor relations and site supervision, and ensured projects were delivered on schedule and within budget. Established project management processes and quality standards for the firm.",
    type: "Project Management",
    logo: "/logos/pavillion-architects.webp",
  },
  {
    period: "2020 – 2025",
    company: "Remote – Gulf Projects",
    location: "KSA & UAE (Remote)",
    role: "Freelance Architect Engineer",
    description:
      "Delivered architectural design and project management services remotely for clients across Saudi Arabia and the UAE. Provided design consultancy, construction documentation, and technical review services for diverse project types. Managed long-distance collaboration with design teams, contractors, and clients using digital project management tools. Served as a bridge between international design standards and local regulatory requirements in the Gulf construction market.",
    type: "Freelance",
  },
  {
    period: "2018 – 2023",
    company: "Egyptian Countryside Development Company (ECDC)",
    location: "Cairo, Egypt",
    role: "Project Manager",
    description:
      "Oversaw infrastructure and construction for the national 4 million feddan land reclamation initiative. Supervised construction execution of roads, facilities, and infrastructure projects across multiple locations (Minya – Al Farafra – Al-Tur). Acted as owner's representative across all project sites, reviewing submittals, progress reports, and financial claims while coordinating with local authorities for licensing, civil defense, and safety regulations.",
    type: "Project Management",
    logo: "/logos/ecdc.webp",
  },
  {
    period: "2017 – 2018",
    company: "Mohammed Talaat Architects",
    location: "Cairo, Egypt",
    role: "Project Manager (Technical Office)",
    description:
      "Headed the technical office for one of Egypt's prominent architectural firms, overseeing all construction documentation, technical reviews, and contractor coordination activities. Managed the production of tender and working drawings across multiple concurrent projects, reviewed structural and MEP consultant deliverables, resolved technical queries during construction, and ensured design intent was maintained through the building process. Established quality control procedures for technical output.",
    type: "Project Management",
    logo: "/logos/mohammed-talaat.webp",
  },
  {
    period: "2016 – 2017",
    company: "RYAN GROUP",
    location: "Cairo, Egypt",
    role: "Director of Engineering Sector",
    description:
      "Directed the entire engineering division of the RYAN GROUP, providing strategic leadership across all technical disciplines. Oversaw the architecture, structural, MEP, and landscape design departments, ensuring coordinated project delivery. Managed senior technical staff allocation, established design standards and quality benchmarks, reviewed major project designs, and represented the engineering sector in executive management decisions. Drove process improvements to enhance design efficiency and project profitability.",
    type: "Management",
    logo: "/logos/ryan-group.webp",
  },
  {
    period: "2013 – 2016",
    company: "LOCATION",
    location: "Cairo, Egypt",
    role: "Senior Design Architect & Technical Office Head",
    description:
      "Combined senior design responsibilities with technical office management, leading both creative design development and rigorous construction documentation processes. Designed major projects including commercial, hospitality, and mixed-use developments, while simultaneously heading the technical office to ensure all drawings, specifications, and submittals met the highest quality standards. Mentored junior architects and established technical documentation protocols that improved coordination and reduced construction-stage design issues.",
    type: "Design",
    logo: "/logos/location.webp",
  },
  {
    period: "2011 – 2013",
    company: "I-CON",
    location: "Cairo, Egypt",
    role: "Partner & Design Department Head",
    description:
      "Served as a partner and led the design department of I-CON, a design-focused architectural practice. Directed all design activities including concept development, schematic design, and design development across the firm's project portfolio. Managed the design team, established the firm's design philosophy and quality standards, and played a key role in business development and client acquisition. Personally led the design of key projects that defined the firm's market reputation.",
    type: "Design",
  },
  {
    period: "2010 – 2011",
    company: "ETQAN",
    location: "Cairo, Egypt",
    role: "Head of Architectural Department",
    description:
      "Led the architectural department at ETQAN, managing a team of architects in the design and delivery of diverse building projects. Oversaw all architectural design phases from concept through construction documentation, coordinated with engineering consultants and contractors, conducted design reviews and quality assurance, and represented the architectural department in project meetings with clients and stakeholders. Drove departmental efficiency and design quality improvements.",
    type: "Design",
    logo: "/logos/etqan.webp",
  },
  {
    period: "2009 – 2010",
    company: "GULF for Touristic Developments",
    location: "Sharm El-Sheikh, Egypt",
    role: "Team Leader",
    description:
      "Led an architectural design team at GULF for Touristic Developments, focused on tourism and resort projects in the Sinai Peninsula. Managed the design of hotel, resort, and entertainment facilities, coordinated with international operators on brand and operational requirements, and oversaw the production of design packages for construction. Gained valuable experience in tourism sector design standards, resort masterplanning, and the unique challenges of building in environmentally sensitive coastal and desert environments.",
    type: "Design",
  },
  {
    period: "2006 – 2009",
    company: "ARCHPLAN",
    location: "Cairo, Egypt",
    role: "Junior/Senior Architect",
    description:
      "Built foundational architectural skills at ARCHPLAN, one of Egypt's established architectural firms, progressing from junior to senior architect over three years. Contributed to a wide range of project types including residential, commercial, institutional, and competition entries. Developed proficiency in architectural design, 3D modeling, construction documentation, and site supervision. Participated in multiple award-winning competition entries including the Attorney General Building (1st Place) and Rossita Renovation (1st Place) that established early recognition for design excellence.",
    type: "Design",
    logo: "/logos/archplan.webp",
  },
];

// -----------------------------------------------------------------------------
// Competencies
// -----------------------------------------------------------------------------

export const competencies: Competency[] = [
  {
    category: "Design & Planning",
    items: [
      "Architectural Concept Design",
      "Interior Design & FF&E",
      "Master Planning & Urban Design",
      "3D Modeling & Visualization",
      "Landscape Architecture",
      "Heritage Restoration",
    ],
  },
  {
    category: "Project Management",
    items: [
      "Design Team Leadership",
      "Construction Documentation",
      "Contractor Coordination",
      "Site Supervision",
      "Budget & Schedule Control",
      "Multi-Disciplinary Coordination",
    ],
  },
  {
    category: "Technical & Compliance",
    items: [
      "International Codes (NFPA, ADA)",
      "Brand Design Guidelines",
      "Building Permits & Licensing",
      "BOQ & Cost Estimation",
      "Shop & Working Drawings",
      "BIM Coordination",
    ],
  },
];

// -----------------------------------------------------------------------------
// Partners
// -----------------------------------------------------------------------------

export const partners: Partner[] = [
  {
    category: "Offices & Firms",
    description: "It has been a true privilege to collaborate with some of the most respected architecture and engineering firms across Egypt and the Gulf region. Each firm has shaped my professional growth, and I carry forward the standards of excellence, discipline, and creative ambition instilled through these partnerships. I am deeply honored to have contributed to their legacies and to have been part of teams that delivered impactful projects for renowned clients.",
    entries: [
      { name: "Fedn Consulting Engineering", logo: "/logos/fedn-consulting.webp", link: "https://fedn.info/" },
      { name: "PAVILLION ARCHITECTS (PA)", logo: "/logos/pavillion-architects.webp", link: "https://pavillionarchitects.com/" },
      { name: "ECDC", logo: "/logos/ecdc.webp", link: "https://elreefelmasry.com/" },
      { name: "Mohammed Talaat Architects", logo: "/logos/mohammed-talaat.webp", link: "https://m-talaat.com/" },
      { name: "RYAN GROUP", logo: "/logos/ryan-group.webp" },
      { name: "LOCATION", logo: "/logos/location.webp" },
      { name: "I-CON" },
      { name: "ETQAN", logo: "/logos/etqan.webp" },
      { name: "GULF for Touristic Developments" },
      { name: "ARCHPLAN", logo: "/logos/archplan.webp", link: "https://archplan-eg.com/" },
    ],
  },
  {
    category: "Commercial Brands",
    description: "Transforming the spatial identity of iconic brands is among the most rewarding aspects of my career. From reimagining retail environments for national household names to redesigning corporate branches for international institutions, these projects demanded a deep understanding of each brand's DNA. The design solutions I delivered years ago continue to serve these brands today — living proof that thoughtful, brand-rooted architecture endures beyond trends and stands the test of time.",
    entries: [
      { name: "B.TECH", logo: "/logos/btech.webp" },
      { name: "Elezaby Pharmacy", logo: "/logos/elezaby-pharmacy.webp" },
      { name: "Al Kemma Optics", logo: "/logos/al-kemma-optics.webp" },
      { name: "Citystars", logo: "/logos/citystars.webp" },
      { name: "BIM", logo: "/logos/bim.webp" },
      { name: "Radio Talaat", logo: "/logos/radio-talaat.webp" },
      { name: "Al-Masrya Auto", logo: "/logos/al-masrya-auto.webp" },
    ],
  },
  {
    category: "Government & Institutional",
    description: "Working with government entities and institutional clients requires the highest standards of professionalism, precision, and accountability. Our approach is built on a foundation of rigorous compliance, transparent communication, and unwavering commitment to national development goals. Whether serving ministries, municipal authorities, or defense institutions, we bring the same level of dedication and expertise — ensuring every project meets the exacting requirements of the most discerning professional clients.",
    entries: [
      { name: "Ministry of Defense" },
      { name: "Ministry of Justice" },
      { name: "Abu Dhabi Government" },
      { name: "Iraqi Army" },
      { name: "Big Projects Department — Prime Minister's Office" },
      { name: "Makkah Government" },
      { name: "Dhofar Government" },
      { name: "Abha Government" },
      { name: "Hayer Government" },
      { name: "Rasheed Government" },
      { name: "Luxor Government" },
      { name: "Janzur Government" },
      { name: "Arabian Lawyers Union" },
      { name: "Al Monofia Government" },
      { name: "Egyptian Government" },
      { name: "Watanya for Roads" },
      { name: "Electricity Holding Company — Egypt" },
      { name: "Petroleum Authority — Egypt" },
      { name: "Water & Wastewater Holding Company — Egypt" },
    ],
  },
];

// -----------------------------------------------------------------------------
// Project Locations (Map Data)
// -----------------------------------------------------------------------------

export const mapLocations: MapLocation[] = [
  {
    city: "Cairo",
    country: "Egypt",
    lat: 30.0444,
    lng: 31.2357,
    projects: [
      "RKR Villa",
      "HSBC Sheraton Branch",
      "Vodafone Renovation",
      "Arabian International Bank – El Thawra Branch",
    ],
  },
  {
    city: "Luxor",
    country: "Egypt",
    lat: 25.6872,
    lng: 32.6396,
    projects: [
      "Ministry of Defense Hotel",
      "El Karnak Temple Park",
      "Motherhood & Childhood Urban Center",
      "Luxor Information Center (LIC)",
      "Lowers Syndicate Club — Luxor",
      "Luxor Children Park",
    ],
  },
  {
    city: "6th of October",
    country: "Egypt",
    lat: 29.9461,
    lng: 30.9136,
    projects: ["Oasis Skywalk Hotel & Branded Apartment", "FPI Training Center", "Administrative Compound"],
  },
  {
    city: "New Administrative Capital",
    country: "Egypt",
    lat: 30.0131,
    lng: 31.7341,
    projects: ["Wycombe Abbey Cairo East International School"],
  },
  {
    city: "New Cairo",
    country: "Egypt",
    lat: 30.0131,
    lng: 31.4504,
    projects: [
      "Boutique Hotel",
      "Spa & Medical Hub",
      "Residential Exterior 2",
      "Residential Exterior 6",
      "Residential Exterior 7",
      "Residential Exterior 8",
      "New Cairo Club — Admin Building",
      "Residential Interior Design 4",
    ],
  },
  {
    city: "Sharm El Sheikh",
    country: "Egypt",
    lat: 27.9158,
    lng: 34.33,
    projects: [
      "Neama Oasis Touristic Village",
    ],
  },
  {
    city: "Madinty",
    country: "Egypt",
    lat: 30.0745,
    lng: 31.5062,
    projects: ["Residential Interior Design 1"],
  },
  {
    city: "Nasr City",
    country: "Egypt",
    lat: 30.0626,
    lng: 31.3485,
    projects: ["Residential Interior Design 2", "Arabian Lawyers Syndicate"],
  },
  {
    city: "Al Rehab",
    country: "Egypt",
    lat: 30.0625,
    lng: 31.4778,
    projects: ["Attorney General Building"],
  },
  {
    city: "Al Monofia",
    country: "Egypt",
    lat: 30.5965,
    lng: 30.9703,
    projects: ["Holding Company for Water & Wastewater", "Residential Exterior 3"],
  },
  {
    city: "Ras Sidr",
    country: "Egypt",
    lat: 29.5753,
    lng: 32.6508,
    projects: ["Ras Sidr Touristic Village Competition"],
  },
  {
    city: "Ismailia",
    country: "Egypt",
    lat: 30.5965,
    lng: 32.2715,
    projects: ["New Ismailia City Development"],
  },
  {
    city: "Rossita (Rasheed)",
    country: "Egypt",
    lat: 31.4007,
    lng: 30.4164,
    projects: ["Rossita Renovation"],
  },
  {
    city: "Makkah",
    country: "KSA",
    lat: 21.3891,
    lng: 39.8579,
    projects: ["KHandaresa Hotel"],
  },
  {
    city: "Abha",
    country: "KSA",
    lat: 18.2164,
    lng: 42.5053,
    projects: ["Al Okashia Administrative Compound"],
  },
  {
    city: "Hayer",
    country: "KSA",
    lat: 25.715,
    lng: 49.5,
    projects: ["Hayer Celebration Arena"],
  },
  {
    city: "Dammam",
    country: "KSA",
    lat: 26.3927,
    lng: 49.9777,
    projects: [],
  },
  {
    city: "Dhofar",
    country: "Oman",
    lat: 17.0151,
    lng: 54.0924,
    projects: ["Dhofar Municipality"],
  },
  {
    city: "Janzur",
    country: "Libya",
    lat: 32.8775,
    lng: 13.2814,
    projects: ["El Saraya Plaza"],
  },
  {
    city: "Baghdad",
    country: "Iraq",
    lat: 33.3152,
    lng: 44.3661,
    projects: ["Confidential Project — Baghdad"],
  },
  {
    city: "Abu Dhabi",
    country: "UAE",
    lat: 24.4539,
    lng: 54.3773,
    projects: ["Ferrari World, Abu Dhabi"],
  },
  {
    city: "Minya",
    country: "Egypt",
    lat: 28.1099,
    lng: 30.7503,
    projects: ["Egyptian Countryside Development Company (ECDC)"],
  },
  {
    city: "Al Farafra",
    country: "Egypt",
    lat: 27.0597,
    lng: 27.2857,
    projects: ["Egyptian Countryside Development Company (ECDC)"],
  },
  {
    city: "Al-Tur",
    country: "Egypt",
    lat: 28.2367,
    lng: 33.6172,
    projects: ["Egyptian Countryside Development Company (ECDC)"],
  },
  {
    city: "Zagazig",
    country: "Egypt",
    lat: 30.5877,
    lng: 31.502,
    projects: ["Al Kemma Optics", "Residential Interior Design 5"],
  },
  {
    city: "Alexandria",
    country: "Egypt",
    lat: 31.2001,
    lng: 29.9187,
    projects: ["Lowers Syndicate Club — Alexandria"],
  },
  {
    city: "Al Obour",
    country: "Egypt",
    lat: 30.2256,
    lng: 31.4867,
    projects: ["Pharma Cure Factory", "Residential Exterior 1", "Residential Exterior 5", "Residential Interior Design 3"],
  },
  {
    city: "Muscat",
    country: "Oman",
    lat: 23.588,
    lng: 58.3829,
    projects: ["Residential Exterior 4"],
  },
];

// -----------------------------------------------------------------------------
// About / Profile Data
// -----------------------------------------------------------------------------

export const aboutData: AboutData = {
  name: "Ahmed Essam",
  title: "Project Manager — Design & Development Management",
  stats: [
    { label: "Years Experience", value: "20" },
    { label: "Projects Completed", value: "150+" },
    { label: "Countries Worked In", value: "6+" },
  ],
  phone: "+20 122 377 3261",
  email: "arch_a_essam@yahoo.com",
  linkedin: "linkedin.com/in/ahmed-essam-helal",
  website: "ahmed-essam-profile.vercel.app",
  location: "Cairo, Egypt",
  locationLink: "https://maps.app.goo.gl/u4VpxcQR2LeWmCKw8",
  logo: "/portfolio/image1.webp",
  portrait: "/portfolio/image2.webp",
  specialties: [
    "Hospitality",
    "Educational",
    "Renovation",
    "Mega Projects",
    "Commercial",
    "Urban Planning",
    "Industrial",
  ],
  bio: "Ahmed Essam is a seasoned Project Manager and Architect with over 20 years of multidisciplinary experience spanning hospitality, educational, commercial, residential, and urban planning sectors across Egypt, Saudi Arabia, Oman, Libya, Iraq, and the UAE. His career reflects a rare blend of design excellence, construction management acumen, and strategic leadership in delivering complex, large-scale projects from concept to completion. With a proven track record of managing LE 480M+ project portfolios, leading multidisciplinary teams, and winning multiple national and international design competitions — including a nomination for the prestigious Aga Khan Award for Architecture — Ahmed brings a unique perspective that bridges creative vision with operational precision. His expertise in brand design guidelines, heritage conservation, and international code compliance makes him a distinctive voice in the built environment.",
};

// -----------------------------------------------------------------------------
// Derived / Helper Data
// -----------------------------------------------------------------------------

export const projectCategories: string[] = Array.from(
  new Set(projects.map((p) => p.category))
);

export const projectYears: string[] = Array.from(
  new Set(projects.map((p) => p.year))
)
  .filter((y) => y !== "Throughout Career")
  .sort((a, b) => Number(b) - Number(a));

export const awardedProjects: Project[] = projects.filter(
  (p) => p.award !== undefined
);

export const projectCountByCategory: Record<string, number> = projects.reduce(
  (acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

export const experienceTypes: string[] = Array.from(
  new Set(experiences.map((e) => e.type))
);
