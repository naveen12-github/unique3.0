import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "eCommerce",
            url: "/",
          },
        ],
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/tables",
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settngs",
          },
        ],
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
        url: "/query/master-flows",
        items: [],
      },
      {
        title: "Workflows",
        icon: Icons.Workflow,
        url: "/query/workflows",
        items: [],
      },
      {
        title: "Databases",
        icon: Icons.Database,
        url: "/query/databases",
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
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
