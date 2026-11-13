import {
  FeatureProductLanding,
  featureProductMetadata,
  featureProductStaticParams,
  type FeatureProductParams,
} from "@/components/sections/landing/feature-product-landing";

export const generateStaticParams = featureProductStaticParams;

export function generateMetadata({ params }: { params: FeatureProductParams }) {
  return featureProductMetadata("broadcast", params);
}

export default function BroadcastPage({
  params,
}: {
  params: FeatureProductParams;
}) {
  return <FeatureProductLanding product="broadcast" params={params} />;
}
