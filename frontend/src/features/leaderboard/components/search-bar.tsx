import { cn } from "@/shared/utils/utils";
import type { LucideIcon } from "lucide-react";
import { SearchIcon, Store, Users } from "lucide-react";
import { useState } from "react";
import UserSearchCard from "./user-search-card";
import PizzeriaSearchCard from "./pizzeria-search-card";

type QueryOpt = "users" | "pizzerias";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [queryOpt, setQueryOpt] = useState<QueryOpt>("users");

  const data = queryOpt === "pizzerias" ? MOCK_PIZZERIAS : MOCK_USERS;

  const onQueryOptChange = (queryOpt: QueryOpt) => {
    setQuery("");
    setQueryOpt(queryOpt);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      <div className="relative grow">
        <label
          htmlFor="query"
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-text text-gray-300"
        >
          <SearchIcon size={18} aria-hidden="true" />
          <span className="sr-only">Search</span>
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQuery("");
            }
          }}
          type="text"
          id="query"
          placeholder={`Search ${queryOpt} by name...`}
          className="w-full rounded-md border border-gray-200 py-3 pr-2 pl-10 text-sm"
        />
      </div>

      <div className="flex w-fit gap-2 rounded-md bg-gray-100 p-1">
        <TabButton
          icon={Users}
          label="Users"
          isActive={queryOpt === "users"}
          onClick={() => onQueryOptChange("users")}
        />
        <TabButton
          icon={Store}
          label="Pizzerias"
          isActive={queryOpt === "pizzerias"}
          onClick={() => onQueryOptChange("pizzerias")}
        />
      </div>

      {data && (
        <div className="w-full space-y-2 border-t border-t-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">X results found</p>
            {data.length > 10 && (
              <p className="text-xs text-gray-400">Showing first 10</p>
            )}
          </div>

          <div>
            {data.length > 0 ? (
              <div className="space-y-2">
                {data.map((entry) => {
                  return queryOpt === "pizzerias" ? (
                    <PizzeriaSearchCard
                      key={entry.id}
                      pizzeria={entry as SearchPizzeria}
                    />
                  ) : (
                    <UserSearchCard key={entry.id} user={entry as SearchUser} />
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                No {queryOpt} found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition",
        isActive
          ? "border-gray-300 bg-white text-gray-900 shadow-sm"
          : "border-transparent bg-transparent text-gray-500 hover:text-gray-700 focus-visible:text-gray-700",
      )}
    >
      <Icon size={16} aria-hidden="true" />
      {label}
    </button>
  );
}

// ── Mock data ──────────────────────────────────────────────────────────

export interface SearchUser {
  id: number;
  avatarURL: string;
  name: string;
  visits: number;
  avgRating: number;
}

export interface SearchPizzeria {
  id: number;
  name: string;
  memberNumber: number;
  nation: string;
}

export const MOCK_USERS: SearchUser[] = [
  {
    id: 1,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Marco",
    name: "Marco Rossi",
    visits: 42,
    avgRating: 4.3,
  },
  {
    id: 2,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Giulia",
    name: "Giulia Bianchi",
    visits: 37,
    avgRating: 4.7,
  },
  {
    id: 3,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Luca",
    name: "Luca Esposito",
    visits: 28,
    avgRating: 3.9,
  },
  {
    id: 4,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sofia",
    name: "Sofia Marino",
    visits: 55,
    avgRating: 4.5,
  },
  {
    id: 5,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alessandro",
    name: "Alessandro Greco",
    visits: 19,
    avgRating: 4.1,
  },
  {
    id: 6,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria",
    name: "Maria Romano",
    visits: 63,
    avgRating: 4.8,
  },
  {
    id: 7,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Tomasz",
    name: "Tomasz Kowalski",
    visits: 31,
    avgRating: 4.0,
  },
  {
    id: 8,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Elena",
    name: "Elena Ferretti",
    visits: 48,
    avgRating: 4.6,
  },
  {
    id: 9,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=James",
    name: "James Carter",
    visits: 12,
    avgRating: 3.7,
  },
  {
    id: 10,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Yuki",
    name: "Yuki Tanaka",
    visits: 22,
    avgRating: 4.4,
  },
  {
    id: 11,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Pierre",
    name: "Pierre Dupont",
    visits: 35,
    avgRating: 4.2,
  },
  {
    id: 12,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Anna",
    name: "Anna Müller",
    visits: 41,
    avgRating: 3.8,
  },
  {
    id: 13,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Carlos",
    name: "Carlos Hernandez",
    visits: 57,
    avgRating: 4.9,
  },
  {
    id: 14,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Chiara",
    name: "Chiara Conti",
    visits: 26,
    avgRating: 4.1,
  },
  {
    id: 15,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Oliver",
    name: "Oliver Smith",
    visits: 14,
    avgRating: 3.5,
  },
  {
    id: 16,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Fatima",
    name: "Fatima Al-Rashid",
    visits: 39,
    avgRating: 4.6,
  },
  {
    id: 17,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Giorgio",
    name: "Giorgio Valentini",
    visits: 71,
    avgRating: 4.7,
  },
  {
    id: 18,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Lisa",
    name: "Lisa Johansson",
    visits: 33,
    avgRating: 4.0,
  },
  {
    id: 19,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Raj",
    name: "Raj Patel",
    visits: 18,
    avgRating: 3.6,
  },
  {
    id: 20,
    avatarURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emilia",
    name: "Emilia Nowak",
    visits: 46,
    avgRating: 4.3,
  },
];

export const MOCK_PIZZERIAS: SearchPizzeria[] = [
  {
    id: 1,
    name: "L'Antica Pizzeria da Michele",
    memberNumber: 1,
    nation: "Italy",
  },
  {
    id: 2,
    name: "Pizzeria Starita a Materdei",
    memberNumber: 34,
    nation: "Italy",
  },
  {
    id: 3,
    name: "Sorbillo - Lievito Madre al Duomo",
    memberNumber: 112,
    nation: "Italy",
  },
  {
    id: 4,
    name: "Kesté Pizza & Vino",
    memberNumber: 245,
    nation: "United States",
  },
  {
    id: 5,
    name: "Santa Maria Pizzeria",
    memberNumber: 389,
    nation: "United Kingdom",
  },
  {
    id: 6,
    name: "Pizzeria Luca",
    memberNumber: 502,
    nation: "Germany",
  },
  {
    id: 7,
    name: "Pizzeria Brandi",
    memberNumber: 7,
    nation: "Italy",
  },
  {
    id: 8,
    name: "Franco Manca",
    memberNumber: 421,
    nation: "United Kingdom",
  },
  {
    id: 9,
    name: "Pizzeria Da Attilio",
    memberNumber: 58,
    nation: "Italy",
  },
  {
    id: 10,
    name: "Tony's Pizza Napoletana",
    memberNumber: 310,
    nation: "United States",
  },
  {
    id: 11,
    name: "Pizzeria Salvo",
    memberNumber: 89,
    nation: "Italy",
  },
  {
    id: 12,
    name: "50 Kalò di Ciro Salvo",
    memberNumber: 156,
    nation: "Italy",
  },
  {
    id: 13,
    name: "La Notizia",
    memberNumber: 203,
    nation: "Italy",
  },
  {
    id: 14,
    name: "Malafemmena",
    memberNumber: 478,
    nation: "Germany",
  },
  {
    id: 15,
    name: "Spacca Napoli Pizzeria",
    memberNumber: 287,
    nation: "United States",
  },
  {
    id: 16,
    name: "Fratelli Figurato",
    memberNumber: 534,
    nation: "Spain",
  },
  {
    id: 17,
    name: "Pizzeria Concettina ai Tre Santi",
    memberNumber: 142,
    nation: "Italy",
  },
  {
    id: 18,
    name: "Seu Pizza Illuminati",
    memberNumber: 367,
    nation: "Italy",
  },
  {
    id: 19,
    name: "Via Toledo Enopizzeria",
    memberNumber: 612,
    nation: "Japan",
  },
  {
    id: 20,
    name: "Pizzeria Popolare",
    memberNumber: 551,
    nation: "France",
  },
];
