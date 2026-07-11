import {
  BadgeCheck,
  CalendarCheck,
  Fan,
  MapPin,
  Phone,
  Refrigerator,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  WashingMachine,
  Wrench,
} from "lucide-react";

export const company = {
  name: "SaiRaj Cool Service",
  shortName: "SaiRaj AC",
  phone: "+91-6307597050",
  email: "sairaajcoolservice@gmail.com",
  address:
    "Gayatri Sales, Shop No. 2, Mahavir Sadan, near Nirmala Niketan School, Vinayak Nagar Road, Bhayander West.",
  cityLine: "Mira Bhayander, Mumbai",
  whatsapp: "916307597050",
  hours: "Mon-Sun, 9:00 AM - 9:00 PM",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    title: "AC Service & Repair",
    price: "Starts at Rs. 299",
    summary:
      "Split AC, window AC, gas refill, dry service, wet wash, cooling issue and PCB support.",
    icon: Fan,
    stamp: "Most booked",
  },
  {
    title: "Fridge Repair",
    price: "Inspection from Rs. 199",
    summary:
      "Cooling problem, compressor check, thermostat issue, leakage and door gasket support.",
    icon: Refrigerator,
    stamp: "Home visit",
  },
  {
    title: "Washing Machine Repair",
    price: "Inspection from Rs. 199",
    summary:
      "Drum noise, drainage issue, motor check, inlet problem and complete maintenance.",
    icon: WashingMachine,
    stamp: "Quick repair",
  },
  {
    title: "Annual Maintenance",
    price: "Custom plans",
    summary:
      "Routine service schedule for homes, shops and offices with transparent service notes.",
    icon: ShieldCheck,
    stamp: "Best value",
  },
];

export const footerServiceLinks = [
  { href: "/contact?service=AC%20Service%20%26%20Repair", label: "AC service & repair" },
  { href: "/contact?service=Fridge%20Repair", label: "Fridge repair" },
  { href: "/contact?service=Washing%20Machine%20Repair", label: "Washing machine repair" },
  { href: "/contact?service=Annual%20Maintenance", label: "Annual maintenance" },
];

export const serviceDetails = [
  {
    title: "AC Service & Repair",
    intro:
      "For split AC and window AC cooling complaints, regular servicing, leakage checks, gas refill and electrical faults.",
    included: [
      "Indoor filter cleaning and blower inspection",
      "Outdoor unit condition check",
      "Gas pressure and cooling performance check",
      "Drain pipe, leakage and water-drop inspection",
      "PCB, capacitor and wiring diagnosis when needed",
    ],
    commonProblems: [
      "AC is running but room is not cooling",
      "Water leakage from indoor unit",
      "Bad smell or dust coming from AC",
      "Outdoor unit not starting",
      "High electricity bill due to poor cooling",
    ],
    visitNote:
      "Best for summer pre-service, low cooling, gas filling, wet wash and installation/uninstallation requests.",
  },
  {
    title: "Fridge Repair",
    intro:
      "For single-door, double-door and side-by-side refrigerators with cooling, compressor, thermostat or leakage issues.",
    included: [
      "Cooling and compressor sound diagnosis",
      "Thermostat and sensor inspection",
      "Door gasket and ice buildup check",
      "Gas leakage suspicion check",
      "Electrical relay, overload and wiring inspection",
    ],
    commonProblems: [
      "Fridge not cooling properly",
      "Freezer over-freezing or no ice formation",
      "Compressor starts and stops repeatedly",
      "Water collection inside the fridge",
      "Door rubber is loose or warm air is entering",
    ],
    visitNote:
      "Best for cooling loss, compressor checks, gas leakage doubts and regular refrigerator maintenance.",
  },
  {
    title: "Washing Machine Repair",
    intro:
      "For front-load, top-load and semi-automatic machines with drainage, drum, motor, inlet or vibration issues.",
    included: [
      "Drum movement and noise check",
      "Drain pump and pipe inspection",
      "Water inlet valve diagnosis",
      "Motor, belt and panel check",
      "Basic cleaning and usage guidance after repair",
    ],
    commonProblems: [
      "Machine is not draining water",
      "Drum is not spinning",
      "Heavy vibration during wash",
      "Water is not entering the machine",
      "Error code showing on display",
    ],
    visitNote:
      "Best for drainage faults, spin problems, motor checks, sensor issues and noisy wash cycles.",
  },
  {
    title: "Annual Maintenance",
    intro:
      "For homes, shops and offices that need routine checks before the appliance fails during peak usage.",
    included: [
      "Scheduled appliance health check",
      "Cleaning reminders and service records",
      "Priority technician visit planning",
      "Basic performance report after each visit",
      "Transparent repair estimate when a fault is found",
    ],
    commonProblems: [
      "Repeated appliance breakdowns",
      "No record of previous servicing",
      "Office appliances need planned maintenance",
      "Seasonal AC checks before summer",
      "Family home needs one trusted service desk",
    ],
    visitNote:
      "Best for customers who want predictable service, fewer emergency repairs and planned maintenance.",
  },
];

export const servicePageNotes = [
  {
    title: "Clear inspection first",
    text: "Technician checks the appliance and explains the issue before starting paid repair work.",
  },
  {
    title: "Parts are quoted separately",
    text: "Visit, service and labour can be estimated early. Spare parts depend on brand, model and condition.",
  },
  {
    title: "6-month service warranty",
    text: "Our focus is honest work and perfectly working service, with 6 months warranty on the particular service done.",
  },
];

export const trustPoints = [
  { label: "15+ years experience", icon: BadgeCheck },
  { label: "Doorstep technician", icon: MapPin },
  { label: "Same-day booking", icon: Timer },
  { label: "6-month service warranty", icon: ShieldCheck },
];

export const aboutStats = [
  { value: "15+", label: "years appliance service experience" },
  { value: "3", label: "major appliance categories covered" },
  { value: "6 months", label: "warranty on the particular service" },
  { value: "Honest", label: "inspection and perfectly working repair focus" },
];

export const aboutValues = [
  {
    title: "Honest diagnosis",
    text: "We first identify the real fault, then explain whether service, repair, part replacement or maintenance is actually needed.",
    icon: BadgeCheck,
  },
  {
    title: "Respectful home visit",
    text: "Technicians work neatly, check the appliance carefully and avoid unnecessary disturbance inside the customer home or shop.",
    icon: MapPin,
  },
  {
    title: "Repair before replacement",
    text: "If a part can be repaired safely, we tell you. If replacement is better, we explain why before work starts.",
    icon: Wrench,
  },
  {
    title: "After-service guidance",
    text: "Customers get simple usage and maintenance tips, plus 6 months warranty on the particular service completed.",
    icon: ShieldCheck,
  },
];

export const customerTypes = [
  "Families needing quick AC, fridge or washing machine help",
  "Tenants and homeowners who want doorstep diagnosis",
  "Small shops and offices with regular appliance usage",
  "Customers who prefer one trusted local technician desk",
];

export const aboutTimeline = [
  {
    title: "Complaint received",
    text: "We note appliance type, issue, location and urgency.",
  },
  {
    title: "Technician assigned",
    text: "A suitable technician is planned according to the issue and nearby route.",
  },
  {
    title: "Diagnosis at site",
    text: "The appliance is checked and the customer is told what is wrong.",
  },
  {
    title: "Repair and final testing",
    text: "Work is completed only after price clarity, then performance is tested.",
  },
];

export const testimonials = [
  {
    name: "Ramesh P.",
    area: "Bhayander West",
    text: "My AC was not cooling properly. The technician explained the gas and cleaning issue clearly and finished the work neatly.",
    icon: Star,
  },
  {
    name: "Nisha S.",
    area: "Mira Road",
    text: "Fridge cooling stopped suddenly. They checked compressor sound, relay and cooling line before suggesting the repair.",
    icon: Star,
  },
  {
    name: "Amit K.",
    area: "Bhayander East",
    text: "Washing machine drainage problem was fixed at home. Good thing was they told the cost before starting the repair.",
    icon: Star,
  },
  {
    name: "Farida M.",
    area: "Mira Road East",
    text: "The AC wet service was done properly and the technician tested cooling before leaving. The warranty explanation was also clear.",
    icon: Star,
  },
  {
    name: "Suresh T.",
    area: "Bhayander East",
    text: "My fridge had ice buildup and low cooling. They checked the gasket and sensor instead of directly changing expensive parts.",
    icon: Star,
  },
  {
    name: "Priya D.",
    area: "Mira Bhayander",
    text: "I liked that they shared maintenance tips after washing machine repair. The visit felt honest and practical.",
    icon: Star,
  },
];

export const serviceAreas = [
  "Bhayander West",
  "Bhayander East",
  "Mira Road",
  "Mira Bhayander",
  "Nearby Mumbai suburbs",
  "Home and shop visits",
];

export const processSteps = [
  {
    title: "Call or book",
    text: "Share your appliance problem and preferred time.",
    icon: Phone,
  },
  {
    title: "Technician visit",
    text: "A trained mechanic checks the issue at your location.",
    icon: CalendarCheck,
  },
  {
    title: "Repair with notes",
    text: "You get clear pricing before repair work starts.",
    icon: Wrench,
  },
  {
    title: "Final check",
    text: "Cooling, washing or compressor performance is tested before closing.",
    icon: Sparkles,
  },
];
