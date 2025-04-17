export function truncateString(str: string, limit?: number) {
  // Check string length and return it if less than or equal to 15 characters
  if (limit && str.length <= limit) {
    return str;
  } else if (limit) {
    return str.substring(0, limit) + "...";
  }

  if (!limit && str.length <= 10) {
    return str;
  }

  // Truncate the string and add "..."
  return str.substring(0, 10) + "...";
}

export const convertToFormattedNaira = (amount: number) => {
  return `₦${new Intl.NumberFormat().format(amount)}`;
};

export const getRandomRealEstateCompany = (): string => {
  const companies = [
    "Adron Homes and Properties",
    "RevolutionPlus Property",
    "PWAN Group",
    "ThinkLab",
    "Brains and Hammers",
    "Cosgrove",
    "Zylus Group International",
    "Zavatti",
    "Veritasi Homes",
    "Abuja Property Development Company",
    "Tribitat Real Estate",
    "Fine and Country West Africa",
    "Alpha Mead Development Company",
    "Amdykos Properties Limited",
    "The Address Homes",
  ];

  const randomIndex = Math.floor(Math.random() * companies.length);
  return companies[randomIndex];
};

export const generateRandomState = (): string => {
  const companies = ["Kano", "Maiduguri", "Abuja", "Minna", "Lagos"];

  const randomIndex = Math.floor(Math.random() * companies.length);
  return companies[randomIndex];
};

export const companiesDisplay = [
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
  {
    img: "/home.jpg",
    company: getRandomRealEstateCompany(),
    location: generateRandomState(),
    status: "pending",
  },
];

export function generatePassword(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}
