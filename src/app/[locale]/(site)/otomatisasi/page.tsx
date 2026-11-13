import {
  FeatureProductLanding,
  featureProductMetadata,
  featureProductStaticParams,
  type FeatureProductParams,
} from "@/components/sections/landing/feature-product-landing";

export const generateStaticParams = featureProductStaticParams;

export function generateMetadata({ params }: { params: FeatureProductParams }) {
  return featureProductMetadata("otomatisasi", params);
}

export default function AutomationPage({
  params,
}: {
  params: FeatureProductParams;
}) {
  return <FeatureProductLanding product="otomatisasi" params={params} />;
}
