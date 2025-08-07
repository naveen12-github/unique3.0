import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "",
        items: [],
      },
    ],
  },
  {
    label: "FILTERS",
    items: [
      {
        title: "Search",
        icon: Icons.Search,
        url: "/pages/settings",
        items: [],
      },
      {
        title: "Unsubscribe",
        icon: Icons.BellOff,
        url: "/filters/unsubscribe",
        items: [],
      },
      {
        title: "Mapping",
        icon: Icons.MapPin,
        url: "/filters/mapping",
        items: [],
      },
    ],
  },
  {
    label: "EMAIL SYSTEM",
    items: [
      {
        title: "Mail Config",
        icon: Icons.Mail,
        url: "/email/mail-config",
        items: [],
      },
      {
        title: "Engage",
        icon: Icons.MessageSquare,
        url: "/email/engage",
        items: [],
      },
      {
        title: "Email Scheduling",
        icon: Icons.Clock,
        url: "/email/scheduling",
        items: [],
      },
      {
        title: "Drift Emails",
        icon: Icons.Send,
        url: "/email/drift",
        items: [],
      },
    ],
  },
  {
    label: "QUERY CHAIN",
    items: [
      {
        title: "Master Flows",
        icon: Icons.Layers,
        url: "/querychain/masterflows",
        items: [],
      },
      {
        title: "Workflows",
        icon: Icons.Workflow,
        url: "/querychain/workflows",
        items: [],
      },
      {
        title: "Databases",
        icon: Icons.Database,
        url: "/querychain/database",
        items: [],
      },
      {
        title: "Unique Tables",
        icon: Icons.Table,
        url: "/query/unique-tables",
        items: [],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        url: null,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
            items: [],
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        url: null,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
            items: [],
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
            items: [],
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        url: null,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
            items: [],
          },
        ],
      },
    ],
  },
];
 