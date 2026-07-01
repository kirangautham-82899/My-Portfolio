import { PortfolioExperience } from "@/components/portfolio-experience";
import { portfolioData } from "@/lib/portfolio-data";

export default function Home() {
  return <PortfolioExperience data={portfolioData} />;
}
