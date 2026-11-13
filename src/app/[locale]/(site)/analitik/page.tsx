import {
  FeatureProductLanding,
  featureProductMetadata,
  featureProductStaticParams,
  type FeatureProductParams,
} from "@/components/sections/landing/feature-product-landing";

export const generateStaticParams = featureProductStaticParams;

export function generateMetadata({ params }: { params: FeatureProductParams }) {
  return featureProductMetadata("analitik", params);
}

export default function AnalyticsPage({
  params,
}: {
  params: FeatureProductParams;
}) {
  return <FeatureProductLanding product="analitik" params={params} />;
}
