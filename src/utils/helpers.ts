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


/**
 * Calculates monthly mortgage payment.
 * 
 * @param principal - Total loan amount (e.g., 200000)
 * @param annualInterestRate - Annual interest rate in percent (e.g., 6.5 for 6.5%)
 * @param loanTermYears - Loan term in years (e.g., 30)
 * @returns Monthly payment amount
 */
export function calculateMortgage(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  if (monthlyRate === 0) {
    return principal / totalPayments; // No interest
  }

  const monthlyPayment =
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments));

  return Math.round(monthlyPayment * 100) / 100; // Round to 2 decimal places
}
