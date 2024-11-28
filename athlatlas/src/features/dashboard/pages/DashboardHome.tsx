import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Metric,
  AreaChart,
  BarChart,
  DonutChart,
  Legend,
  Grid,
} from "@tremor/react";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";

// Données simulées
const salesData = [
  {
    date: "Jan 2024",
    Sales: 2890,
    Profit: 2400,
    Customers: 4938,
  },
  {
    date: "Feb 2024",
    Sales: 3890,
    Profit: 3200,
    Customers: 5800,
  },
  // Ajoutez plus de données...
];

const citiesData = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Paris",
    sales: 3908,
  },
  {
    name: "Tokyo",
    sales: 2400,
  },
];

const categories = [
  {
    title: "Total Users",
    metric: "12,345",
    icon: UserGroupIcon,
    color: "blue",
  },
  {
    title: "Revenue",
    metric: "$34,567",
    icon: CurrencyDollarIcon,
    color: "green",
  },
  {
    title: "Conversion Rate",
    metric: "2.4%",
    icon: ChartBarIcon,
    color: "yellow",
  },
  {
    title: "Total Orders",
    metric: "8,765",
    icon: ShoppingCartIcon,
    color: "purple",
  },
];

const cities = ["New York", "London", "Paris", "Tokyo"];
const colors = ["blue", "cyan", "indigo", "violet"];

export function DashboardHome() {
  return (
    <div className="p-6 space-y-8">
      {/* KPI Cards */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        {categories.map((item) => (
          <Card key={item.title} decoration="top" decorationColor={item.color}>
            <div className="flex items-center justify-between">
              <div>
                <Text>{item.title}</Text>
                <Metric>{item.metric}</Metric>
              </div>
              <item.icon className="h-8 w-8 text-gray-400" />
            </div>
          </Card>
        ))}
      </Grid>

      {/* Charts Section */}
      <TabGroup>
        <TabList className="mt-8">
          <Tab>Overview</Tab>
          <Tab>Analytics</Tab>
          <Tab>Reports</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid numItems={1} numItemsLg={2} className="gap-6 mt-6">
              {/* Sales Trend */}
              <Card>
                <Title>Sales Trend</Title>
                <AreaChart
                  className="h-72 mt-4"
                  data={salesData}
                  index="date"
                  categories={["Sales", "Profit"]}
                  colors={["blue", "green"]}
                />
              </Card>

              {/* Regional Sales */}
              <Card>
                <Title>Regional Sales</Title>
                <DonutChart
                  className="h-72 mt-4"
                  data={citiesData}
                  category="sales"
                  index="name"
                  colors={colors}
                />
                <Legend 
                  className="mt-4"
                  categories={cities}
                  colors={colors}
                />
              </Card>
            </Grid>

            {/* Customer Growth */}
            <Card className="mt-6">
              <Title>Customer Growth</Title>
              <BarChart
                className="h-72 mt-4"
                data={salesData}
                index="date"
                categories={["Customers"]}
                colors={["purple"]}
              />
            </Card>
          </TabPanel>

          <TabPanel>
            {/* Analytics Content */}
            <div className="mt-6">
              <Card>
                <Title>Detailed Analytics</Title>
                {/* Add more analytics content */}
              </Card>
            </div>
          </TabPanel>

          <TabPanel>
            {/* Reports Content */}
            <div className="mt-6">
              <Card>
                <Title>Generated Reports</Title>
                {/* Add reports content */}
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 